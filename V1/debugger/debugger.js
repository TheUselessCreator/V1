class Debugger {
    constructor() {
        this.breakpoints = new Set();
        this.logs = [];
        this.executionPaused = false;
        this.context = {}; // Store variables for execution
        this.startTime = null;
    }

    // Start debugging session
    startSession() {
        console.log("Debugger session started.");
        this.startTime = Date.now();
    }

    // Add or remove a breakpoint
    toggleBreakpoint(line) {
        if (this.breakpoints.has(line)) {
            this.breakpoints.delete(line);
            console.log(`Breakpoint removed at line ${line}`);
        } else {
            this.breakpoints.add(line);
            console.log(`Breakpoint set at line ${line}`);
        }
    }

    // Check for a breakpoint and pause execution
    checkBreakpoint(line) {
        if (this.breakpoints.has(line)) {
            console.log(`Paused at breakpoint on line ${line}`);
            this.executionPaused = true;
        }
    }

    // Resume execution
    resumeExecution() {
        if (this.executionPaused) {
            console.log("Execution resumed.");
            this.executionPaused = false;
        } else {
            console.log("Execution is not paused.");
        }
    }

    // Execute code dynamically in a sandboxed environment
    executeLine(line, code) {
        console.log(`Executing line ${line}: ${code}`);
        this.checkBreakpoint(line);

        if (this.executionPaused) {
            console.log("Execution paused. Use resumeExecution() to continue.");
            return;
        }

        try {
            // Create a function with isolated execution context
            const sandbox = new Function("context", `
                with (context) {
                    return eval(\`${code}\`);
                }
            `);

            // Execute the line with the current context
            const result = sandbox(this.context);
            console.log(`Line ${line} executed. Result:`, result);
        } catch (error) {
            console.error(`Error on line ${line}:`, error.message);
        }
    }

    // Inspect a variable in the current context
    inspectVariable(variableName) {
        if (this.context.hasOwnProperty(variableName)) {
            console.log(`Variable "${variableName}":`, this.context[variableName]);
        } else {
            console.log(`Variable "${variableName}" not found in the current context.`);
        }
    }

    // Update the context with a variable
    updateContext(variableName, value) {
        this.context[variableName] = value;
        console.log(`Context updated: ${variableName} =`, value);
    }

    // End debugging session
    endSession() {
        const endTime = Date.now();
        console.log("Debugger session ended.");
        console.log(`Total execution time: ${endTime - this.startTime}ms`);
        console.log("Execution logs:");
        this.logs.forEach((log) => console.log(log));
    }
}

module.exports = Debugger;
