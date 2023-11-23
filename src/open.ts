import chalk from 'chalk';
import { platform } from 'os';
import { join } from 'path';

import { runExecWithInput, log, formatHrTime } from './common';

export async function doOpen(): Promise<void> {
  const start = process.hrtime();
  log(`\n${chalk.bold('Tauri Platform:')} Starting open/run task 🚀`);
  log(
    `\n${chalk.bold(
      'Tauri Platform:'
    )} 🚨 Note: The first run of this command can take several minutes to show the app. 🚨`
  );
  const usersProjectDir = process.env.CAPACITOR_ROOT_DIR as string;
  const destDir = join(usersProjectDir, 'tauri');
  log(`\n${chalk.bold('Tauri Platform:')} Tauri run dev 🚧`);
  await runExecWithInput(`npm run dev`, destDir);
  const elapsed = process.hrtime(start);
  log(`\n${chalk.bold('Tauri Platform:')} Tauri app start complete ✅ - ${formatHrTime(elapsed)}\n`);
}
