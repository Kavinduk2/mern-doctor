#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { checkPorts } from './src/portChecker.js';

// 1. Magically find and read the user's .env file
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// 2. Set the default port to whatever is in their .env, or fallback to 3000
const autoDetectedPort = process.env.PORT || '3000';

const program = new Command();

program
  .name('mern-doctor')
  .description('The ultimate diagnostic tool for MERN stack applications')
  .version('1.0.0');

program
  .command('scan')
  .description('Scans the current MERN project for common errors')
  // 3. Inject the auto-detected port here!
  .option('-p, --port <number>', 'Specific port to check', autoDetectedPort)
  .option('-f, --fix', 'Automatically fix detected issues without asking')
  .action(async (options) => {
    console.log(chalk.cyan.bold('\n Starting MERN Doctor Diagnosis...\n'));
    
    if (process.env.PORT) {
      console.log(chalk.gray(`(Auto-detected PORT=${process.env.PORT} from .env file)`));
    }

    await checkPorts(options.port, options.fix);
    
    console.log(chalk.cyan.bold('\n Diagnosis complete!'));
  });

program.parse(process.argv);