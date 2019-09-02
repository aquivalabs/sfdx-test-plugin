import fs = require('fs');
import { ApexExecuteCommand } from 'salesforce-alm/dist/commands/force/apex/execute';

function runApex(fileName, username) {
  const sfdxArgs = [`-f=${fileName}`];
  if (username) {
    sfdxArgs.push(`-u=${username}`);
  }
  return ApexExecuteCommand.run(sfdxArgs);
}

export async function runApexCode(apexCode: string, username?: string) {
  const tempFileName = 'tmp.apex';

  fs.writeFileSync(tempFileName, apexCode);
  const apexResult = await runApex(tempFileName, username);
  fs.unlink(tempFileName, (err) => {
    if (err) {
      console.log('Error removing temp file:', err);
    }
  });
  return apexResult;
}
