const base = [
  ...[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  ...[..."0123456789"],
  ...[...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`],
  ...[..."abcdefghijklmnopqrstuvwxyz"],
];
const generator = (len, base) => {
  return [...Array(len)]
    .map((i) => base[(Math.random() * base.length) | 0])
    .join("");
};
try {
  const { exec } = require("child_process");
  const prompts = require("prompts");
  const { Signale } = require("signale");
  const installer = new Signale({ scope: "INSTALLER" });
  const fs = require("fs");
  const apiDirectoryCommand = "cd ../api/";
  console.log("OUTPUT: ", generator(base, 200));
  installer.info("Welcome to the xContest smart installer v.1.0.0");
  installer.warn("This installer will wipe any existing configuration files!");
  (async () => {
    const continuation = await prompts({
      type: "confirm",
      name: "value",
      message: "Do you want to continue with the installation?",
      initial: true,
    });
    if (continuation.value) {
      installer.info("installing pm2 tool:");
      const screenInstall = exec("sudo npm install pm2 -g");
      screenInstall.stdout.on("data", (data) => {
        installer.info(data.trim());
      });
      screenInstall.on("close", async (code) => {
        if (code != 0) {
          installer.fatal(
            `pm2 couldnt be installed, please try again! process exit code: ${code}`
          );
          process.exit(2);
        }
        installer.success("Installed pm2!");
        installer.watch("the api dependency installation...\n");
        installer.note("It may take time for anything to appear on screen");
        const child = exec(`${apiDirectoryCommand} && npm install`);
        child.stdout.on("data", (data) => {
          installer.info(data.trim());
        });
        //   child.stderr.on("data", (data) => {
        //     console.error(`stderr: ${data}`);
        //   });
        child.on("close", async (code) => {
          installer.info(
            `Api dependency installer exited with the code: ${code}\n`
          );
          const apiConfig = await prompts([
            {
              type: "number",
              name: "port",
              message: "What is the api port that you want to use?",
              initial: 3000,
              style: "default",
              min: 1,
              max: 9999,
            },
            {
              type: "text",
              name: "url",
              message: `Whats the api url?`,
            },
            {
              type: "text",
              name: "secret",
              message: `What is your JWT SECRET (if left blank will be auto generated)`,
            },
          ]);
          var jwtSecret = apiConfig.secret;
          if (!apiConfig.secret) {
            const jwtLength = await prompts({
              type: "number",
              name: "value",
              message: "What is the jwt secret length that you want to use",
              initial: 700,
              style: "default",
              min: 1,
              max: 9999,
            });
            jwtSecret = generator(jwtLength.value, base);
          }
          fs.writeFile(
            "../api/.env",
            `# .env file\n\nDATABASE_URL="file:./dev.db"\nAPI_PORT=${apiConfig.port}\nURL="${apiConfig.url}"\nTIMEOUT=5\nJWT_SECRET="${jwtSecret}"`,
            function (err) {
              if (err) throw err;
              exec(
                `${apiDirectoryCommand} && pm2 start "npm run start" --name xContestAPI --namespace xstudios.one`
              );
              installer.success(
                `\n Your xContest installation is complete, and it is already running, run: \x1b[7m./install.sh\x1b[0m or \x1b[7mnode .\x1b[0m to manage it.`
              );
            }
          );
        });
      });
    } else {
      installer.pause("Installation aborted!");
      return 0;
    }
  })();
} catch (e) {
  console.log(`Please run the command: \x1b[7m./install.sh i\x1b[0m first! `);
  process.exit(2);
}
