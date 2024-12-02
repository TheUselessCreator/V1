#!/usr/bin/env node

const Commands = require('../terminal_commands/commands');
const args = process.argv.slice(2);

const main = () => {
    if (args.length === 0) {
        Commands.help();
        return;
    }

    const command = args[0];
    const file = args[1];

    switch (command) {
        case 'run':
            Commands.run(file);
            break;
        case 'compile':
            Commands.compile(file);
            break;
        case 'help':
            Commands.help();
            break;
        default:
            console.log("Unknown command. Use 'help' for a list of commands.");
    }
};

main();
