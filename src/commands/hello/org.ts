import { IConfig, LoadOptions } from '@oclif/config';
import { core, flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { ApexTestRunCommand } from 'salesforce-alm/dist/commands/force/apex/test/run';
import { CoverageItem } from '../../models/coverageItem';
import { Report } from '../../models/report';
import { Summary } from '../../models/summary';


// Initialize Messages with the current plugin directory
import fs = require('fs');
import { parseToHtml } from '../../templates/templates';
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-test-runner', 'org');

export default class Org extends ApexTestRunCommand {

  public static args = [{name: 'file'}];

  public async run(): Promise<unknown> {
    const coverage = this.flags['codecoverage'];
    const resultformat = this.flags['resultformat'];
    if (!coverage) {
      this.flags['codecoverage'] = true;
    }
    if (!resultformat) {
      this.flags['resultformat'] = 'json';
    }

    const testRunResult = await super.run();

    const html = parseToHtml(testRunResult as Report);

    fs.writeFile('report.html', html, err => {
      if (err) {
          return console.error(err);
      }
      console.log('The file was saved!');
    });

    return testRunResult;
  }
}
