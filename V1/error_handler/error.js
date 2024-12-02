const fs = require('fs');
const path = require('path');

class ErrorHandler {
    static config = {
        logToFile: true,
        logFilePath: path.join(__dirname, 'error.log'),
        verboseLogging: true,
    };

    static handleError(error) {
        const errorType = this.getErrorType(error);

        switch (errorType) {
            case 'SyntaxError':
                this.handleSyntaxError(error);
                break;
            case 'TypeError':
                this.handleTypeError(error);
                break;
            case 'ReferenceError':
                this.handleReferenceError(error);
                break;
            case 'LogicalError':
                this.handleLogicalError(error);
                break;
            default:
                this.handleUnknownError(error);
        }

        if (this.config.logToFile) {
            this.logErrorToFile(error, errorType);
        }
    }

    static handleSyntaxError(error) {
        console.error("Syntax Error:", error.message);
        this.provideDebuggingTips('SyntaxError');
    }

    static handleTypeError(error) {
        console.error("Type Error:", error.message);
        this.provideDebuggingTips('TypeError');
    }

    static handleReferenceError(error) {
        console.error("Reference Error:", error.message);
        this.provideDebuggingTips('ReferenceError');
    }

    static handleLogicalError(error) {
        console.error("Logical Error:", error.message);
        this.provideDebuggingTips('LogicalError');
    }

    static handleUnknownError(error) {
        console.error("Unknown Error:", error.message || error);
        if (error.stack) {
            console.error("Stack Trace:", error.stack);
        }
    }

    static logErrorToFile(error, errorType) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${errorType}: ${error.message}\nStack Trace:\n${error.stack}\n\n`;

        fs.appendFile(this.config.logFilePath, logMessage, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err.message);
            }
        });
    }

    static provideDebuggingTips(errorType) {
        const tips = {
            SyntaxError: [
                "Check for missing or extra brackets, parentheses, or quotes.",
                "Ensure all variable declarations are properly closed.",
            ],
            TypeError: [
                "Check variable types and ensure proper typecasting.",
                "Verify function arguments and expected return values.",
            ],
            ReferenceError: [
                "Check for undefined variables or incorrect variable names.",
                "Ensure proper scope usage for variables and functions.",
            ],
            LogicalError: [
                "Use breakpoints or logs to trace the execution flow.",
                "Verify algorithm correctness and expected outputs.",
            ],
        };

        if (tips[errorType]) {
            console.log("Debugging Tips:");
            tips[errorType].forEach((tip, index) => console.log(`${index + 1}. ${tip}`));
        }
    }

    static getErrorType(error) {
        if (error instanceof SyntaxError) return 'SyntaxError';
        if (error instanceof TypeError) return 'TypeError';
        if (error instanceof ReferenceError) return 'ReferenceError';
        if (error instanceof Error) return 'LogicalError';
        return 'UnknownError';
    }
}

module.exports = ErrorHandler;
