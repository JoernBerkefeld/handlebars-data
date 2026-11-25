// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Math helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const MATH_HELPERS = [
    {
        name: 'add',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Whole numbers add as documented, but mixing a decimal string with a decimal number (e.g. `{{add "1.5" 2.25}}`) makes the email preview fail with HTTP 500.',
        description: 'Returns the sum of two numbers, rounded to 2 decimal places.',
        params: [
            { name: 'value1', type: 'number', description: 'First value to add.' },
            { name: 'value2', type: 'number', description: 'Second value to add.' },
        ],
        returnType: 'number',
    },
    {
        name: 'divide',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Returns the quotient of dividing the first value by the second.',
        params: [
            { name: 'dividend', type: 'number', description: 'The number to be divided.' },
            {
                name: 'divisor',
                type: 'number',
                description: 'The number to divide by. Cannot be 0.',
            },
        ],
        returnType: 'number',
    },
    {
        name: 'modulo',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Returns the remainder after dividing the first value by the second.',
        params: [
            { name: 'value1', type: 'number', description: 'The dividend.' },
            { name: 'value2', type: 'number', description: 'The divisor. Cannot be 0.' },
        ],
        returnType: 'number',
    },
    {
        name: 'multiply',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Returns the product of two numbers, rounded to 2 decimal places.',
        params: [
            { name: 'value1', type: 'number', description: 'First value to multiply.' },
            { name: 'value2', type: 'number', description: 'Second value to multiply.' },
        ],
        returnType: 'number',
    },
    {
        name: 'random',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Returns a random integer between two values (inclusive).',
        params: [
            { name: 'first', type: 'number', description: 'The minimum value.' },
            {
                name: 'second',
                type: 'number',
                description: 'The maximum value. Must be >= first.',
            },
        ],
        returnType: 'integer',
    },
    {
        name: 'subtract',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Whole numbers subtract as documented, but `{{subtract 1.5 2.25}}` made the email preview fail with HTTP 500 instead of giving -0.75; other decimal inputs were not tested.',
        description: 'Returns the difference of subtracting the second value from the first.',
        params: [
            { name: 'value1', type: 'number', description: 'The value to subtract from.' },
            { name: 'value2', type: 'number', description: 'The value to subtract.' },
        ],
        returnType: 'number',
    },
];
