const Lexer = require('./lexer');
const ErrorHandler = require('../error_handler/error');
const tokes = require('../assets/tokens');
const fs = require('fs');

class Compiler {
    constructor() {
        this.lexer = new Lexer();
    }

    compile(sourceCode) {
        try {
            const tokens = this.lexer.tokenize(sourceCode);
            const intermediateCode = this.generateIntermediateCode(tokens);
            const optimizedCode = this.optimize(intermediateCode);
            this.generateCode(optimizedCode);
        } catch (error) {
            this.errorHandling(error);
        }
    }

    optimize(intermediateCode) {
        return this.deadCodeElimination(intermediateCode);
    }

    generateIntermediateCode(tokens) {
        return tokens.map(token => this.processToken(token));
    }

    generateCode(intermediateCode) {
        fs.writeFileSync('output.o', intermediateCode.join('\n'));
    }

    errorHandling(error) {
        console.error("Compilation Error: ", error.message);
    }

    deadCodeElimination(optimizedCode) {
        return optimizedCode.filter(code => this.isReachable(code));
    }
}

module.exports = Compiler;
