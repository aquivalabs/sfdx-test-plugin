import { flags, FlagsConfig } from '@salesforce/command';
import * as path from 'path';
import { ApexTestRunCommand } from 'salesforce-alm/dist/commands/force/apex/test/run';
import { Report } from '../../../models/report';

// Initialize Messages with the current plugin directory
import fs = require('fs');
import { __, clone, filter, includes, map, replace } from 'ramda';
import { parseToHtml } from '../../../templates/templates';
import { runApexCode } from '../../../utils/apex';

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.

const REPORT_NAME = 'report.html';

const flagsConfig = ApexTestRunCommand.flagsConfig;
flagsConfig.codecoverage = undefined;
ApexTestRunCommand.resultFormatOptions.options.push('html');

flagsConfig.coverage = flags.number({char: 'C', description: 'Code coverage threshold. The report will paint a class red in HTML report in case coverage is less then this value. Defaults to 75'});
flagsConfig.html = flags.boolean({description: 'Generates HTML report. Doesn\'t override --resultformat and --json flags, but works in addition'});
flagsConfig.exclude = flags.array({char: 'x', description: 'Specify tests to EXCLUDE from test run. This is useful for granular test runs and risk group management'});

export default class TestDXApexTestRunCommand extends ApexTestRunCommand {

  public static flagsConfig: FlagsConfig = flagsConfig;

  public static theDescription = `By default, runs all Apex tests in the org’s namespace.

  To run specific test classes, specify class names or suite names, or set a --testlevel value.

  To run specific test methods, use --tests.`;

  public static examples = [
    '$ sfdx testdx:apex:run -n MyClassTest,MyOtherClassTest',
    '$ sfdx testdx:apex:run -s MySuite,MyOtherSuite',
    '$ sfdx testdx:apex:run -t MyClassTest.testCoolFeature,MyClassTest.testAwesomeFeature,AnotherClassTest,namespace.TheirClassTest.testThis',
    '$ sfdx testdx:apex:run -l RunLocalTests -u me@my.org'
  ];

  public static args = [{name: 'file'}];

  private isToGenerateHtmlReport = false;

  public async run(): Promise<unknown> {
    await this.normalizeFlags();

    const testRunResult = await super.run();

    if (this.isToGenerateHtmlReport) {
      this.generateHtmlReport(testRunResult as Report);
    }

    return testRunResult;
  }

  private generateHtmlReport(testRunResult: Report) {
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
    const coverage = this.flags['codecoverage'];
    const resultformat = this.flags['resultformat'];
    const isResultFormatHtml = resultformat && resultformat === 'html';
    this.isToGenerateHtmlReport = !!this.flags['html'] || isResultFormatHtml;
    const testsToRun = this.flags['tests'];
    const testsToExclude = this.flags['exclude'];

    // fill in defaults for ApexTestRunCommand to run properly
    if (!coverage) {
      this.flags['codecoverage'] = true;
    }
    if (!resultformat || isResultFormatHtml) {
      this.flags['resultformat'] = 'json';
    }
    this.flags['tests'] = await this.formClassListToRun(testsToRun, testsToExclude);
  }

  private saveToFile(filePath: string, html: string) {
    return fs.writeFileSync(filePath, html);
  }

  private async formClassListToRun(toInclude, toExclude: string[]) {
    let wholeList = clone(toInclude);
    if (!wholeList) {
      wholeList = await this.getTestClassList();
    }
    if (toExclude) {
      wholeList = filter((className) => !includes(className, toExclude), wholeList);
    }
    return wholeList;
  }

  private async getTestClassList() {
    const apexCode = `
    ApexClass[] unitTests = [FIND '@isTest' IN ALL FIELDS RETURNING ApexClass(Id, Name)][0];

    throw new StringException(JSON.serialize(unitTests));
    `;
    const leaveWhatMatters = replace('System.StringException: ', '');

    const apexResult = await runApexCode(apexCode, this.flags['targetusername']);

    const resultStr = leaveWhatMatters(apexResult.exceptionMessage);
    const result = JSON.parse(resultStr);
    const classList = map((cl) => cl.Name, result);
    return classList;
  }
}
