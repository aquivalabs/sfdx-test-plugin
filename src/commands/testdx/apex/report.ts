import { flags, FlagsConfig } from '@salesforce/command';
import * as path from 'path';
import { ApexTestReportCommand } from 'salesforce-alm/dist/commands/force/apex/test/report';
import { Result } from '../../../models/result';

// Initialize Messages with the current plugin directory
import fs = require('fs');
import { parseToHtml } from '../../../templates/templates';

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.

const REPORT_NAME = 'report.html';

const flagsConfig = ApexTestReportCommand.flagsConfig;
flagsConfig.codecoverage = undefined;
ApexTestReportCommand.resultFormatOptions.options.push('html');

flagsConfig.coverage = flags.number({char: 'C', description: 'Code coverage threshold. The report will paint a class red in HTML report in case coverage is less then this value. Defaults to 75'});
flagsConfig.html = flags.boolean({description: 'Generates HTML report. Doesn\'t override --resultformat and --json flags, but works in addition'});

export default class TestDXApexTestRunCommand extends ApexTestReportCommand {

  public static flagsConfig: FlagsConfig = flagsConfig;

  public static theDescription = `By default, runs all Apex tests in the org’s namespace.

  To run specific test classes, specify class names or suite names, or set a --testlevel value.

  To run specific test methods, use --tests.`;

  public static examples = [
    '$ sfdx force:apex:test:report -i <test run id>',
    '$ sfdx force:apex:test:report -i <test run id> -C 85 -r html',
    '$ sfdx force:apex:test:report -i <test run id> -r=junit',
    '$ sfdx force:apex:test:report -i <test run id> --json'
  ];

  public static args = [{name: 'file'}];

  private isToGenerateHtmlReport = false;

  public async run(): Promise<unknown> {
    await this.normalizeFlags();

    const testRunResult = await super.run();

    if (this.isToGenerateHtmlReport) {
      this.generateHtmlReport(testRunResult as Result);
    }

    return testRunResult;
  }

  private generateHtmlReport(testRunResult: Result) {
    const reportPath = this.getReportPath();
    const html = parseToHtml(testRunResult, this.flags['coverage']);
    this.saveToFile(reportPath, html);
    console.log(`The report is generated: ${reportPath}`);
  }

  private getReportPath() {
    const outputdir = this.flags['outputdir'];
    let reportPath;
    if (outputdir) {
      this.flags['outputdir'] = undefined;
      reportPath = path.isAbsolute(outputdir) ? outputdir : path.resolve(outputdir);
      reportPath = `${path.resolve(outputdir)}/${REPORT_NAME}`;
    } else {
      reportPath = REPORT_NAME;
    }
    return reportPath;
  }

  private async normalizeFlags() {
    const resultformat = this.flags['resultformat'];
    const isResultFormatHtml = resultformat && resultformat === 'html';

    this.isToGenerateHtmlReport = !!this.flags['html'] || isResultFormatHtml;

    // fill in defaults for ApexTestRunCommand to run properly
    this.flags['codecoverage'] = true;
    if (!resultformat || isResultFormatHtml) {
      this.flags['resultformat'] = 'json';
    }
  }

  private saveToFile(filePath: string, html: string) {
    return fs.writeFileSync(filePath, html);
  }
}
