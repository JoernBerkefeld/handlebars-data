// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Comparison helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const COMPARISON_HELPERS = [
    {
        name: 'and',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns true only when all operands are truthy.',
        params: [
            { name: 'value1', type: 'any', description: 'First operand.' },
            { name: 'value2', type: 'any', optional: true, description: 'Second operand.' },
            {
                name: 'valueN',
                type: 'any',
                optional: true,
                variadic: true,
                description: 'Additional operands to evaluate.',
            },
        ],
        returnType: 'boolean',
    },
    {
        name: 'compare',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Compares two values using a specified operator.',
        params: [
            { name: 'leftValue', type: 'any', description: 'Left operand.' },
            {
                name: 'operator',
                type: 'string',
                description: 'One of ==, !=, >, >=, <, <=.',
            },
            { name: 'rightValue', type: 'any', description: 'Right operand.' },
        ],
        returnType: 'boolean',
    },
    {
        name: 'equals',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Compares two values for equality, optionally by a comparison type.',
        params: [
            { name: 'value1', type: 'any', description: 'First value to compare.' },
            { name: 'value2', type: 'any', description: 'Second value to compare.' },
            {
                name: 'compareAs',
                type: 'string',
                optional: true,
                description:
                    'Comparison type: date, datetime, number, or string. Defaults to string.',
            },
        ],
        returnType: 'boolean',
    },
    {
        name: 'if',
        category: 'Comparison',
        origin: 'handlebars-builtin',
        helperType: 'block',
        mcnSince: 65,
        description: 'Conditionally renders a block based on whether a value evaluates to true.',
        params: [{ name: 'condition', type: 'any', description: 'The value to evaluate.' }],
        returnType: 'string',
    },
    {
        name: 'iif',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns one of two values based on whether an expression is true or false.',
        params: [
            { name: 'expression', type: 'any', description: 'The expression to evaluate.' },
            {
                name: 'leftResult',
                type: 'any',
                description: 'Value returned when the expression is true.',
            },
            {
                name: 'rightResult',
                type: 'any',
                description: 'Value returned when the expression is false.',
            },
        ],
        returnType: 'any',
    },
    {
        name: 'isEmpty',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns true when a value is null, undefined, or an empty string.',
        params: [
            { name: 'input', type: 'any', description: 'The value to check for null or empty.' },
        ],
        returnType: 'boolean',
    },
    {
        name: 'not',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns true when the operand evaluates to false.',
        params: [{ name: 'value', type: 'any', description: 'The operand to negate.' }],
        returnType: 'boolean',
    },
    {
        name: 'or',
        category: 'Comparison',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns true when at least one operand is truthy.',
        params: [
            { name: 'value1', type: 'any', description: 'First operand.' },
            { name: 'value2', type: 'any', optional: true, description: 'Second operand.' },
            {
                name: 'valueN',
                type: 'any',
                optional: true,
                variadic: true,
                description: 'Additional operands to evaluate.',
            },
        ],
        returnType: 'boolean',
    },
    {
        name: 'unless',
        category: 'Comparison',
        origin: 'handlebars-builtin',
        helperType: 'block',
        mcnSince: 65,
        description: 'Conditionally renders a block based on whether a value evaluates to false.',
        params: [{ name: 'condition', type: 'any', description: 'The value to evaluate.' }],
        returnType: 'string',
    },
];
