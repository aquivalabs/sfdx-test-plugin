import { FlagsConfig } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { ApexTestRunCommand } from 'salesforce-alm/dist/commands/force/apex/test/run';
import { Report } from '../../models/report';
import * as path from "path";


// Initialize Messages with the current plugin directory
import fs = require('fs');
import { parseToHtml } from '../../templates/templates';
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-test-runner', 'org');

const REPORT_NAME = 'report.html';

const flagsConfig = ApexTestRunCommand.flagsConfig;
flagsConfig.codecoverage = undefined;
flagsConfig.resultformat = undefined;

export default class Org extends ApexTestRunCommand {

  public static flagsConfig: FlagsConfig = flagsConfig;

  public static theDescription = `By default, runs all Apex tests in the org’s namespace.

  To run specific test classes, specify class names or suite names, or set a --testlevel value.

  To run specific test methods, use --tests.

  Generates html report.`;

  public static examples = [
    `$ sfdx testdx:force:apex:run -n MyClassTest,MyOtherClassTest`,
    `$ sfdx testdx:force:apex:run -s MySuite,MyOtherSuite`,
    `$ sfdx testdx:force:apex:run -t MyClassTest.testCoolFeature,MyClassTest.testAwesomeFeature,AnotherClassTest,namespace.TheirClassTest.testThis`,
    `$ sfdx testdx:force:apex:run -l RunLocalTests -u me@my.org`,
  ];

  public static args = [{name: 'file'}];

  public async run(): Promise<unknown> {
    const coverage = this.flags['codecoverage'];
    const resultformat = this.flags['resultformat'];
    const outputdir = this.flags['outputdir'];
    let reportPath = path.isAbsolute(outputdir) ? outputdir : path.resolve(outputdir);

    // fill in defaults for ApexTestRunCommand to run properly
    if (!coverage) {
      this.flags['codecoverage'] = true;
    }
    if (!resultformat) {
      this.flags['resultformat'] = 'json';
    }
    if (outputdir) {
      this.flags['outputdir'] = undefined;
      reportPath = `${path.resolve(outputdir)}/${REPORT_NAME}`;
    } else {
      reportPath = REPORT_NAME;
    }

    const testRunResult = await super.run();

    const html = parseToHtml(testRunResult as Report);

    fs.writeFile(reportPath, html, err => {
      if (err) {
          return console.error(err);
      }
      console.log('The file was saved!');
    });

    return testRunResult;
  }
}
