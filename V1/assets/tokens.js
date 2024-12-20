const tokenDefinitions = [
    { regex: /^\s+/, type: null },
    { regex: /^VAR\b/, type: 'VAR' },
    { regex: /^FUNCTION\b/, type: 'FUNCTION' },
    { regex: /^RETURN\b/, type: 'RETURN' },
    { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, type: 'IDENTIFIER' },
    { regex: /^=/, type: 'ASSIGN' },
    { regex: /^\+/, type: 'PLUS' },
    { regex: /^-/, type: 'MINUS' },
    { regex: /^\*/, type: 'MULTIPLY' },
    { regex: /^\//, type: 'DIVIDE' },
    { regex: /^\d+/, type: 'NUMBER' },
    { regex: /^"[^"]*"/, type: 'STRING' },
    { regex: /^'[^']*'/, type: 'STRING' },
    { regex: /^\(/, type: 'LPAREN' },
    { regex: /^\)/, type: 'RPAREN' },
    { regex: /^\{/, type: 'LBRACE' },
    { regex: /^\}/, type: 'RBRACE' },
    { regex: /^;/, type: 'SEMICOLON' },
    { regex: /^,/, type: 'COMMA' },
    { regex: /^==/, type: 'EQUALITY' },
    { regex: /^!=/, type: 'INEQUALITY' },
    { regex: /^&&/, type: 'AND' },
    { regex: /^\|\|/, type: 'OR' },
    { regex: /^!/, type: 'NOT' },
    { regex: /^PRINT\b/, type: 'PRINT' },
    { regex: /^true\b|^false\b/, type: 'BOOLEAN' },
    { regex: /^IF\b/, type: 'IF' },
    { regex: /^ELSE\b/, type: 'ELSE' },
    { regex: /^WHILE\b/, type: 'WHILE' },
    { regex: /^FOR\b/, type: 'FOR' },
    { regex: /^DO\b/, type: 'DO' },
    { regex: /^SWITCH\b/, type: 'SWITCH' },
    { regex: /^CASE\b/, type: 'CASE' },
    { regex: /^DEFAULT\b/, type: 'DEFAULT' },
    { regex: /^BREAK\b/, type: 'BREAK' },
    { regex: /^CONTINUE\b/, type: 'CONTINUE' },
    { regex: /^CONST\b/, type: 'CONST' },
    { regex: /^LET\b/, type: 'LET' },
    { regex: /^TRY\b/, type: 'TRY' },
    { regex: /^CATCH\b/, type: 'CATCH' },
    { regex: /^FINALLY\b/, type: 'FINALLY' },
    { regex: /^THROW\b/, type: 'THROW' },
    { regex: /^NEW\b/, type: 'NEW' },
    { regex: /^INSTANCEOF\b/, type: 'INSTANCEOF' },
    { regex: /^TYPEOF\b/, type: 'TYPEOF' },
    { regex: /^THIS\b/, type: 'THIS' },
    { regex: /^IN\b/, type: 'IN' },
    { regex: /^DELETE\b/, type: 'DELETE' },
    { regex: /^EXTENDS\b/, type: 'EXTENDS' },
    { regex: /^SUPER\b/, type: 'SUPER' },
    { regex: /^AWAIT\b/, type: 'AWAIT' },
    { regex: /^ASYNC\b/, type: 'ASYNC' },
    { regex: /^IMPORT\b/, type: 'IMPORT' },
    { regex: /^EXPORT\b/, type: 'EXPORT' },
    { regex: /^\.\.\./, type: 'SPREAD' },
    { regex: /^\./, type: 'DOT' },
    { regex: /^\[/, type: 'LBRACKET' },
    { regex: /^\]/, type: 'RBRACKET' },
    { regex: /^<\//, type: 'CLOSE_TAG' },
    { regex: /^</, type: 'LT' },
    { regex: /^>/, type: 'GT' },
    { regex: /^<=/, type: 'LTE' },
    { regex: /^>=/, type: 'GTE' },
    { regex: /^\?/, type: 'TERNARY_Q' },
    { regex: /^:/, type: 'TERNARY_COLON' },
    { regex: /^MOD\b/, type: 'MOD' }
];

module.exports = tokenDefinitions;
