class Lexer {
    tokenize(sourceCode) {
        const tokens = [];
        const regex = /[a-zA-Z_][\w]*|[0-9]+|[+-/*=<>!]+|[(){};,.]/g;
        let match;

        while ((match = regex.exec(sourceCode)) !== null) {
            tokens.push({
                type: this.getTokenType(match[0]),
                value: match[0],
                position: match.index
            });
        }
        return tokens;
    }

    getTokenType(token) {
        if (/^[a-zA-Z_]\w*$/.test(token)) {
            return 'IDENTIFIER';
        } else if (/^\d+$/.test(token)) {
            return 'NUMBER';
        } else {
            return 'OPERATOR';
        }
    }
}

module.exports = Lexer;
