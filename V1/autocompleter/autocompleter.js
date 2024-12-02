class Autocompleter {
    constructor() {
        // Store known language keywords and common patterns
        this.keywords = ['function', 'return', 'let', 'const', 'if', 'else', 'for', 'while', 'class'];
        this.userDefinedSymbols = new Set(); // Tracks user-defined variables and functions
    }

    // Main method to analyze the context and provide suggestions
    analyzeContext(code) {
        const context = this.extractContext(code);
        this.updateUserDefinedSymbols(context); // Keep user-defined symbols updated
        return this.provideSuggestions(context);
    }

    // Extract the last few lines of context for analysis
    extractContext(code) {
        const lines = code.split('\n');
        return lines.slice(-5).join('\n');
    }

    // Update user-defined symbols (variables and functions)
    updateUserDefinedSymbols(context) {
        // Regex for function and variable declarations
        const functionRegex = /function\s+(\w+)/g;
        const variableRegex = /(?:let|const|var)\s+(\w+)/g;

        let match;
        while ((match = functionRegex.exec(context)) !== null) {
            this.userDefinedSymbols.add(match[1]);
        }

        while ((match = variableRegex.exec(context)) !== null) {
            this.userDefinedSymbols.add(match[1]);
        }
    }

    // Provide suggestions based on the analyzed context
    provideSuggestions(context) {
        const suggestions = [];

        // Suggest based on detected keywords
        for (const keyword of this.keywords) {
            if (context.includes(keyword)) {
                suggestions.push(keyword);
            }
        }

        // Suggest user-defined symbols (variables and functions)
        for (const symbol of this.userDefinedSymbols) {
            if (!context.includes(symbol)) {
                suggestions.push(symbol);
            }
        }

        // Suggest common patterns based on incomplete statements
        if (context.trim().endsWith('=')) {
            suggestions.push('<value>');
        } else if (context.trim().endsWith('(')) {
            suggestions.push('<parameters>');
        }

        return [...new Set(suggestions)]; // Remove duplicates
    }
}

module.exports = Autocompleter;
