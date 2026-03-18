# mern-doctor 

[![npm version](https://img.shields.io/npm/v/mern-doctor.svg?style=flat-square)](https://www.npmjs.com/package/mern-doctor)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

> **The zero-config, interactive diagnostic tool that auto-fixes common MERN stack and Node.js backend errors.**

We have all been there: You run `npm run dev`, your app crashes, and you are staring at a massive wall of red text because a ghost process is holding your port hostage. 

Stop manually running `netstat`, `lsof`, or restarting your computer. Let **mern-doctor** diagnose the problem, find the rogue process, and securely assassinate it in seconds.

## Quick Start (Zero Installation)

You don't even need to install it to use it. Just run this in your terminal inside your project folder:

```bash
npx mern-doctor scan
```

Want to use it across all your projects? Install it globally on your machine:

```bash
npm install -g mern-doctor
```

Want to add it to your current project? Save it as a dev dependency so your whole team can use it:

```bash
npm install -D mern-doctor
```

## Why mern-doctor? (Features v1.0.0)

### Zero-Config Auto-Detect
It dynamically reads your local .env file to find exactly which PORT your server is trying to use. No need to pass arguments.

### The Port Assassin
Automatically detects background ghost processes, extracts their PID, and safely terminates them.

### Interactive DX
It doesn't blindly delete things. It explains the issue and politely asks: "Do you want me to kill process 12345? (Y/n)"

### True Cross-Platform
Works flawlessly under the hood whether you are on Windows (using netstat/taskkill), macOS, or Linux (using lsof/kill -9).

## Errors We Automatically Fix

If you are running into any of these common Node.js errors, mern-doctor is your instant solution:

- `Error: listen EADDRINUSE: address already in use :::5000`
- `Error: listen EADDRINUSE: address already in use 0.0.0.0:3000`
- `node port already in use`
- `how to kill ghost process nodejs`
- `nodemon crash port in use windows mac`
- `cannot start server address in use`

## How It Works Under the Hood

When you type `mern-doctor scan`, the CLI:

1. Searches your Current Working Directory (CWD) for a .env file.
2. Extracts your custom environment variables (like PORT=5000).
3. Executes native, OS-level shell commands to scan your network interfaces.
4. Identifies the specific Process ID (PID) blocking your development environment.
5. Safely terminates the process using native OS kill commands, freeing your environment instantly.

## Roadmap (Coming Soon)

We are actively building this into the ultimate MERN debugging toolkit.

- [x] v1.0.0: The Port Conflict Assassin (EADDRINUSE auto-fix)
- [ ] v1.1.0: The Dependency Doctor (Scans package.json and auto-installs missing modules)
- [ ] v1.2.0: MongoDB Connection Checker (Validates URI and Atlas IP whitelists)
- [ ] v1.3.0: Environment & CORS Validator

## Contributing

Found a bug or want to add a new "doctor" module? Contributions, issues, and feature requests are highly welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Built with care for the developer community by Kavindu
