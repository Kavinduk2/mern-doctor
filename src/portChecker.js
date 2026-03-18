import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import ora from 'ora';
import { confirm } from '@inquirer/prompts'; 

// Convert the old callback-based exec into modern async/await
const exec = promisify(execCallback);

export const checkPorts = async (port, autoFix) => {
  const spinner = ora(`Diagnosing port ${port}...`).start();
  
  // 1. Detect the Operating System
  const isWindows = process.platform === 'win32';
  
  // 2. Assign the correct OS-level command to find the port
  const findCmd = isWindows 
    ? `netstat -ano | findstr :${port}` 
    : `lsof -ti:${port}`;

  try {
    // If this command successfully finds something, it means the port is IN USE.
    const { stdout } = await exec(findCmd);
    
    spinner.stop(); // Stop the loading spinner
    console.log(chalk.red(`\n Uh oh! Port ${port} is already in use by a ghost process.`));

    // 3. Extract the Process ID (PID) safely based on OS
    let pid;
    if (isWindows) {
       // Windows output: "TCP 0.0.0.0:5000 0.0.0.0:0 LISTENING 12345"
       const lines = stdout.trim().split('\n');
       const firstLine = lines[0].trim();
       pid = firstLine.split(/\s+/).pop(); 
    } else {
       pid = stdout.trim();
    }

    // 4. Determine if we should kill it (via --fix flag OR asking the user)
    let shouldKill = autoFix;

    if (!shouldKill) {
      shouldKill = await confirm({ 
        message: `Do you want me to kill process ${pid} and free up port ${port}?`, 
        default: true 
      });
    }

    // 5. Execute the kill command or leave it alone
    if (shouldKill) {
      const killSpinner = ora(`Assassinating process ${pid}...`).start();
      const killCmd = isWindows ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`;
      
      try {
         await exec(killCmd);
         killSpinner.succeed(chalk.green(`Boom!  Process killed. Port ${port} is now completely yours.`));
      } catch (killErr) {
         killSpinner.fail(chalk.red(`Failed to kill process ${pid}. You might need Administrator privileges.`));
      }
    } else {
      // The updated fallback message!
      console.log(chalk.yellow(`\n Okay, leaving port ${port} alone. Please change your PORT to 3000 (or another available port) in your .env or server files.`));
    }

  } catch (err) {
    // If the exec command fails/throws an error, it means it found NO processes. The port is free!
    spinner.succeed(chalk.green(`Great news! Port ${port} is completely free and ready for your server.`));
  }
};