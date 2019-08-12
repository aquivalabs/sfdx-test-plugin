import { IConfig, LoadOptions } from '@oclif/config';
import { core, flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { ApexTestRunCommand } from 'salesforce-alm/dist/commands/force/apex/test/run';
import { CoverageItem } from '../../models/coverageItem';
import { Report } from '../../models/report';
import { Summary } from '../../models/summary';
// import * as junit from 'junit-viewer';
// Initialize Messages with the current plugin directory
const fs = require('fs');
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-test-runner', 'org');

export default class Org extends ApexTestRunCommand {

  public static args = [{name: 'file'}];

  public async run(): Promise<unknown> {
    const testRunResult = await super.run();
    const html = this.parseToHtml(testRunResult as Report);

    fs.writeFile('report.html', html, err => {
      if (err) {
          return console.error(err);
      }
      console.log('The file was saved!');
    });

    return testRunResult;
  }

  public parseToHtml(json) {
    const testsArray: CoverageItem[] = json.coverage && json.coverage.coverage;
    const summary: Summary = json.summary;
    if (testsArray && summary) {
      return `
        <div style="max-width: 1024px; margin: 0 auto">
          <h1 style="text-align: center">Code Coverage for Apex code</h1>
          <div><h4>Pass rate:</h4><p>${summary.passRate}</p></div>
        </div>
        <div style="max-width: 1024px; border: 1px solid #222; margin: 0 auto">
        ${testsArray.map(this.testTemplate).join('')}
        </div>
      `;
      } else {
        return '<h1>Something went wrong</h1>';
      }
  }

  public testTemplate(test: CoverageItem) {
    const bgc =  Math.round(test.coveredPercent) >= 75 ? '#b6ecb4' : '#fbbaba';
    const row = `display: flex; justify-content: space-between; background-color: ${bgc};`;
    const elem = 'padding: 10px; border: 1px solid #222;';

    const bgBar = Math.round(test.coveredPercent) >= 75 ? '#409e3d' : '#dc4247';
    const bar = `background-color: ${bgBar}; height: 14px;`;
    return `
        <div style='${row}'>
          <div style='${elem}width: 30%'>${test.id}</div>
          <div style='${elem}width: 30%'>${test.name}</div>
          <div style='${elem}width: 20%'>
            <div style='width: 100%; background-color: #fff; border: 2px solid ${bgBar};'>
              <div style='${bar}width: ${Math.round(test.coveredPercent)}%'></div>
            </div>
          </div>
          <div style='${elem}width: 10%;text-align:right;'>${test.coveredPercent.toFixed(2)}%</div>
          <div style='${elem}width: 10%;text-align:right;'>${test.totalCovered} / ${test.totalLines}</div>
        </div>
      `;
  }
}
