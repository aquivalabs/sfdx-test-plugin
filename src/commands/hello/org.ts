import { flags, SfdxCommand, core } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { ApexTestRunCommand } from 'salesforce-alm/dist/commands/force/apex/test/run';
import { LoadOptions, IConfig } from '@oclif/config';
// import * as junit from 'junit-viewer';
// Initialize Messages with the current plugin directory
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

    return testRunResult;
  }
}
