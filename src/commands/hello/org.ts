import { IConfig, LoadOptions } from '@oclif/config';
import { core, flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { ApexTestRunCommand } from 'salesforce-alm/dist/commands/force/apex/test/run';
// import * as junit from 'junit-viewer';
// Initialize Messages with the current plugin directory
const fs = require('fs')
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-test-runner', 'org');

export default class Org extends ApexTestRunCommand {

  // public static description = messages.getMessage('commandDescription');

  // public static examples = [
  // `$ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  // Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  // My hub org id is: 00Dxx000000001234
  // `,
  // `$ sfdx hello:org --name myname --targetusername myOrg@example.com
  // Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  // `
  // ];

  public static args = [{name: 'file'}];

  public async run(): Promise<unknown> {
    const testRunResult = await super.run();

    console.log('testRunResult >>', testRunResult);
    const html = this.parseToHtml(testRunResult);

    fs.writeFile('report.html', html, (err) => {
      if (err) {
          return console.error(err);
      }
        console.log('The file was saved!');
    });

    return testRunResult;
  }

  public parseToHtml(json) {
    return `
      <div style="max-width: 1024px; margin: 0 auto">
      ${json.result.tests.map.map(this.testTemplate).join("")}
      </div>
    `;
  }

  public testTemplate(test) {
    const bgc = test.Outcome.toLowerCase() === 'pass' ? ('background-color: #7dde79') : ('background-color: #e87966');
    const row = `display: flex; justify-content: space-between; padding: 10px; ${bgc}`;
    const elem =' width: 20%; padding: 6px 10px; ';
    return `
      <div style='${row}'>
        <div style='${elem}'>${test.ApexClass.attributes.type}</div>
        <div style='${elem}'>${test.ApexClass.Name}</div>
        <div style='${elem}'>${test.Outcome}</div>
        <div style='${elem}'>Numbers</div>
        <div style='${elem}'>Numbers</div>
      </div>
    `;
  }
}
