const fs = require('fs');
const path = require('path');
const Compiler = require('../compiler/compiler');
const os = require('os');
const readline = require('readline');

class Commands {
    static run(file) {
        const code = fs.readFileSync(file, 'utf8');
        const compiler = new Compiler();
        compiler.compile(code);
    }

    static compile(file) {
        const code = fs.readFileSync(file, 'utf8');
        const compiler = new Compiler();
        compiler.compile(code);
    }

    static help() {
        console.log("Available commands:");
        console.log("  run <file.vo>       - Run the file.");
        console.log("  compile <file.vo>   - Compile the file.");
        console.log("  help                - Show available commands.");
        console.log("  list                - List all files in the current directory.");
        console.log("  create <filename>   - Create a new file with the given name.");
        console.log("  delete <filename>   - Delete the specified file.");
        console.log("  status              - Show system status (CPU, memory usage).");
        console.log("  exit                - Exit the terminal.");
        console.log("  edit <filename>     - Open the specified file for editing.");
        console.log("  clear               - Clear the console.");
    }

    static list() {
        fs.readdir('.', (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                return;
            }
            console.log("Files in the current directory:");
            files.forEach(file => {
                console.log(file);
            });
        });
    }

    static create(filename) {
        if (fs.existsSync(filename)) {
            console.log(`File "${filename}" already exists.`);
            return;
        }
        fs.writeFileSync(filename, '', 'utf8');
        console.log(`File "${filename}" created.`);
    }

    static delete(filename) {
        if (!fs.existsSync(filename)) {
            console.log(`File "${filename}" does not exist.`);
            return;
        }
        fs.unlinkSync(filename);
        console.log(`File "${filename}" deleted.`);
    }

    static status() {
        const cpuInfo = os.cpus();
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const uptime = os.uptime();

        console.log("System Status:");
        console.log(`CPU Info: ${JSON.stringify(cpuInfo, null, 2)}`);
        console.log(`Free Memory: ${freeMem / 1024 / 1024} MB`);
        console.log(`Total Memory: ${totalMem / 1024 / 1024} MB`);
        console.log(`System Uptime: ${Math.floor(uptime / 60)} minutes`);
    }

    static edit(filename) {
        if (!fs.existsSync(filename)) {
            console.log(`File "${filename}" does not exist.`);
            return;
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Editing file: ${filename}\nEnter your changes below. Type "exit" to save and exit:\n`, function editFile(input) {
            if (input.toLowerCase() === 'exit') {
                rl.close();
                console.log('Exiting file editor and saving changes...');
                return;
            }

            fs.appendFileSync(filename, input + os.EOL);
            rl.question(`Added: "${input}".\nEnter more or type "exit" to save and exit:\n`, editFile);
        });
    }

    static clear() {
        console.clear();
        console.log("Console cleared.");
    }

    static exit() {
        console.log("Exiting the terminal.");
        process.exit(0);
    }
}

module.exports = Commands;
