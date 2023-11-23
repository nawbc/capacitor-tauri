import chalk from 'chalk';
import { existsSync, mkdirSync } from 'fs';
import { copySync } from 'fs-extra';
import path from 'path';
import { extract } from 'tar';
import { log, readJSON, writePrettyJSON, formatHrTime } from './common';

const relative = path.relative;
const join = path.join;
const sep = path.sep;
const posixSep = path.posix.sep;

export async function doAdd(): Promise<void> {
  const start = process.hrtime();
  log(`\n${chalk.bold('Tauri Platform:')} Starting add task 🚀`);
  const usersProjectDir = process.env.CAPACITOR_ROOT_DIR as string;
  const builtWebAppDir = process.env.CAPACITOR_WEB_DIR as string;
  const platformNodeModuleTemplateTar = join(usersProjectDir, 'node_modules', 'capacitor-tauri', 'template.tar.gz');
  const destDir = join(usersProjectDir, 'tauri');
  let usersProjectCapConfigFile: string | undefined = undefined;
  let configFileName: string | undefined = undefined;

  const configFileOptions = {
    ts: join(usersProjectDir, 'capacitor.config.ts'),
    js: join(usersProjectDir, 'capacitor.config.js'),
    json: join(usersProjectDir, 'capacitor.config.json'),
  };
  if (existsSync(configFileOptions.ts)) {
    usersProjectCapConfigFile = configFileOptions.ts;
    configFileName = 'capacitor.config.ts';
  } else if (existsSync(configFileOptions.js)) {
    usersProjectCapConfigFile = configFileOptions.js;
    configFileName = 'capacitor.config.js';
  } else {
    usersProjectCapConfigFile = configFileOptions.json;
    configFileName = 'capacitor.config.json';
  }

  const configData = JSON.parse(process.env.CAPACITOR_CONFIG as string);

  if (!existsSync(destDir)) {
    mkdirSync(destDir);
    log(`\n${chalk.bold('Tauri Platform:')} Unpacking template files 📦`);
    await extract({ file: platformNodeModuleTemplateTar, cwd: destDir });
    log(`\n${chalk.bold('Tauri Platform:')} Copying Capacitor config file ⚙`);
    copySync(usersProjectCapConfigFile, join(destDir, configFileName));

    const appName: string = configData.appName;
    const appId: string = configData.appId;
    const platformPackageJson = readJSON(join(destDir, 'package.json'));
    const rootPackageJson = readJSON(join(usersProjectDir, 'package.json'));
    platformPackageJson.name = appName + '-' + 'tauri';
    if (rootPackageJson.repository) {
      platformPackageJson.repository = rootPackageJson.repository;
    }
    log(`\n${chalk.bold('Tauri Platform:')} Setting up Tauri project files 📋`);
    writePrettyJSON(join(destDir, 'package.json'), platformPackageJson);

    const srcTauriPath = join(destDir, 'src-tauri');
    const platformTauriConfigJson = readJSON(join(srcTauriPath, 'tauri.conf.json'));
    platformTauriConfigJson.package.productName = appName;
    platformTauriConfigJson.tauri.windows[0].title = appName;
    platformTauriConfigJson.tauri.bundle.identifier = appId;
    platformTauriConfigJson.build.distDir = relative(srcTauriPath, builtWebAppDir).split(sep).join(posixSep);
    writePrettyJSON(join(destDir, 'src-tauri', 'tauri.conf.json'), platformTauriConfigJson);

    const elapsed = process.hrtime(start);
    log(`\n${chalk.bold('Tauri Platform:')} Add task complete ✅ - ${formatHrTime(elapsed)}`);
    log(`\n🚧🚧🚧🚧🚧🚧: Add ${destDir} to package manager workspace manually 🥳\n`);
  } else {
    throw new Error('Tauri platform already exists.');
  }
}
