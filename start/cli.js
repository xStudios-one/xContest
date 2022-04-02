try {
    const { exec } = require("child_process");
    const prompts = require("prompts");
    const { Signale } = require("signale");
    const cli = new Signale({ scope: "CLI" });
    const apiDirectoryCommand = "cd ../api/";
    console.clear();
    cli.info("Welcome to the xContest smart cli v.1.0.0");
    async function mainMenu() {
        const operation = await prompts({
            type: "select",
            name: "value",
            message: "What do you want to use?",
            choices: [
                {
                    title: "Start all",
                    description: "Starts the API, and frontend",
                    value: "sta-a",
                },
                {
                    title: "Stop all",
                    description: "Stops the API, and frontend",
                    value: "sto-a",
                },
                { title: "Service status", value: "stats-a" },
                { title: "More options", value: "m-opt" },
                { title: "Exit", value: null },
            ],
            initial: 0,
        });
        if (!operation.value) {
            process.exit(0);
        }
        if (operation.value == "m-opt") {
            console.clear();
            moreOptions();
        }
        if (operation.value == "sta-a") {
            exec(`pm2 delete xstudios.one`);
            exec(
                `${apiDirectoryCommand} && pm2 start "npm run start" --name xContestAPI --namespace xstudios.one`
            );
            exec(`pm2 start xContestFrontend`); // TODO add proper function later
            console.clear();
            cli.success("Processess started!");
            mainMenu();
        }
        if (operation.value == "sto-a") {
            exec(`pm2 stop xstudios.one`);
            console.clear();
            cli.success("Processess stopped!");
            mainMenu();
        }
        if (operation.value == "stats-a") {
            cli.info(
                "Please run: \x1b[7mpm2 monit\x1b[0m to monitor your processess!"
            );
        }
    }
    async function moreOptions() {
        const operation = await prompts({
            type: "select",
            name: "value",
            message: "What do you want to use?",
            choices: [
                {
                    title: "Start API",
                    description: "Starts the API only",
                    value: "sta-a",
                },
                {
                    title: "Stop API",
                    description: "Stops the API only",
                    value: "sto-a",
                },
                {
                    title: "Start frontend",
                    description: "Starts the frontend app only",
                    value: "sta-f",
                },
                {
                    title: "Stop frontend",
                    description: "Stops the frontend app only",
                    value: "sto-f",
                },
                { title: "Return", value: "ret" },
            ],
            initial: 0,
        });
        if (!operation.value) {
            process.exit(0);
        }
        if (operation.value == "sta-a") {
            exec(`pm2 start xContestAPI`);
            console.clear();
            cli.success("API started!");
            mainMenu();
        }
        if (operation.value == "sto-a") {
            exec(`pm2 stop xContestAPI`);
            console.clear();
            cli.success("API stopped!");
            mainMenu();
        }
        if (operation.value == "sta-f") {
            exec(`pm2 start xContest Frontend`);
            console.clear();
            cli.success("Frontend started!");
            mainMenu();
        }
        if (operation.value == "sto-f") {
            exec(`pm2 stop xContest Frontend`);
            console.clear();
            cli.success("Frontend stopped!");
            mainMenu();
        }

        if (operation.value == "ret") {
            console.clear();
            mainMenu();
        }
    }
    mainMenu();
} catch (e) {
    console.log(`Please run the command: \x1b[7m./install.sh i\x1b[0m first! `);
    process.exit(2);
}
