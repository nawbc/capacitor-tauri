import chalk from 'chalk';

import { doAdd } from './add';
import { log } from './common';
import { doOpen } from './open';

async function doAddTask() {
  return await doAdd();
}

async function doOpenTask() {
  return await doOpen();
}

(async () => {
  const scriptToRun = process.argv[2] ? process.argv[2] : null;
  if (scriptToRun !== null) {
    switch (scriptToRun) {
      case 'add':
        await doAddTask();
        break;
      case 'copy':
        log(
          `\n${chalk.bold(
            'Tauri Platform:',
          )} Copy isn't necessary on the Tauri platform, as it uses your build folder from the web app directly 👍\n`,
        );
        break;
      case 'run':
      case 'open':
        await doOpenTask();
        break;
      case 'update':
        throw new Error(`Invalid script chosen: ${scriptToRun}`);
      case 'sync':
        throw new Error(`Invalid script chosen: ${scriptToRun}`);
      default:
        throw new Error(`Invalid script chosen: ${scriptToRun}`);
    }
  } else {
    throw new Error(`Invalid script chosen: ${scriptToRun}`);
  }
})();
