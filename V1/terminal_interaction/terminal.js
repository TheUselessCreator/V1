const readline = require('readline');
const Commands = require('../terminal_command/commands'); // Correct path to the commands.js file

class Terminal {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.displayPrompt();
    }

    displayPrompt() {
        this.rl.setPrompt('V1> ');
        this.rl.prompt();
        this.rl.on('line', (input) => {
            this.executeCommand(input);
        });
    }

    async executeCommand(input) {
        const [command, ...args] = input.trim().split(/\s+/);
        
        // Handling commands
        switch (command.toLowerCase()) {
            case 'run':
                if (args.length === 1) {
                    Commands.run(args[0]);
                } else {
                    console.log('Usage: run <file.vo>');
                }
                break;
            case 'compile':
                if (args.length === 1) {
                    Commands.compile(args[0]);
                } else {
                    console.log('Usage: compile <file.vo>');
                }
                break;
            case 'help':
                Commands.help();
                break;
            case 'list':
                Commands.list();
                break;
            case 'create':
                if (args.length === 1) {
                    Commands.create(args[0]);
                } else {
                    console.log('Usage: create <filename>');
                }
                break;
            case 'delete':
                if (args.length === 1) {
                    Commands.delete(args[0]);
                } else {
                    console.log('Usage: delete <filename>');
                }
                break;
            case 'status':
                Commands.status();
                break;
            case 'edit':
                if (args.length === 1) {
                    Commands.edit(args[0]);
                } else {
                    console.log('Usage: edit <filename>');
                }
                break;
            case 'clear':
                Commands.clear();
                break;
            case 'exit':
                Commands.exit();
                break;
            default:
                console.log(`Unknown command: ${command}. Type 'help' for available commands.`);
                break;
        }
        this.displayPrompt();
    }
}

module.exports = Terminal;
