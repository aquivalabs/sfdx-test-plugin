import { CoverageItem } from '../models/coverageItem';
import { Summary } from '../models/summary';

export const parseToHtml = json => {
  const testsArray: CoverageItem[] = json.coverage && json.coverage.coverage;
  const summary: Summary = json.summary;
  const row = 'display: flex; justify-content: space-between; background-color: #fff;';
  const elem = 'padding: 10px; border: 1px solid #222;';
  if (testsArray && summary) {
    return `
      <div style="max-width: 1024px; margin: 0 auto">
        <h1 style="text-align: center">Code Coverage for Apex code</h1>
        <div><h4>TestRunCoverage:</h4><p>${summary.testsRan}%</p></div>
      </div>
      <div style="max-width: 1024px; border: 1px solid #222; margin: 0 auto">
      <div style='${row}'>
        <div style='${elem}width: 30%'>Test Name</div>
        <div style='${elem}width: 30%'></div>
        <div style='${elem}width: 20%;text-align:right;'>Covered %</div>
        <div style='${elem}width: 20%;text-align:right;'>Lines: Covered/ Total</div>
      </div>
      ${testsArray.map(testTemplate).join('')}
      </div>
    `;
    } else {
      return '<h1>Something went wrong</h1>';
    }
};

const testTemplate = (test: CoverageItem) => {
  const bgc =  Math.round(test.coveredPercent) >= 75 ? '#b6ecb4' : '#fbbaba';
  const row = `display: flex; justify-content: space-between; background-color: ${bgc};`;
  const elem = 'padding: 10px; border: 1px solid #222;';

  const bgBar = Math.round(test.coveredPercent) >= 75 ? '#409e3d' : '#dc4247';
  const bar = `background-color: ${bgBar}; height: 14px;`;
  return `
      <div style='${row}'>
        <div style='${elem}width: 30%'>${test.name}</div>
        <div style='${elem}width: 30%'>
          <div style='width: 100%; background-color: #fff; border: 2px solid ${bgBar};'>
            <div style='${bar}width: ${!Number.isNaN(test.coveredPercent) ? Math.round(test.coveredPercent) : 0}%'></div>
          </div>
        </div>
        <div style='${elem}width: 20%;text-align:right;'>${!Number.isNaN(test.coveredPercent) ? Math.round(test.coveredPercent) : 0}%</div>
        <div style='${elem}width: 20%;text-align:right;'>${test.totalCovered} / ${test.totalLines}</div>
      </div>
    `;
}
