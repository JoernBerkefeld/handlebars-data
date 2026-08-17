// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Utility helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const UTILITY_HELPERS = [
    {
        name: 'fallback',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'both',
        mcnSince: 65,
        description:
            'Returns a fallback value when the first argument is null, empty, or throws an exception.',
        params: [
            { name: 'value', type: 'any', description: 'The primary value to check.' },
            {
                name: 'fallbackValue',
                type: 'primitive',
                description: 'Static value to use if the primary value is null or errors.',
            },
        ],
        returnType: 'any',
    },
    {
        name: 'format',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Formats output based on a format string and optional type specification.',
        params: [
            { name: 'subject', type: 'any', description: 'The value to format.' },
            { name: 'formatString', type: 'string', description: 'The format pattern to apply.' },
            {
                name: 'type',
                type: 'string',
                optional: true,
                description: 'Format type: date or numeric.',
            },
            {
                name: 'culture',
                type: 'string',
                optional: true,
                description: 'Culture code, such as en-US.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'formatCurrency',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Formats a number as a currency value for a locale.',
        params: [
            { name: 'number', type: 'number', description: 'The number to format as currency.' },
            {
                name: 'cultureCode',
                type: 'string',
                optional: true,
                description: 'Locale code. Defaults to en_US.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'formatNumber',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Formats a number as a specific numeric type, such as decimal or percentage.',
        params: [
            { name: 'number', type: 'number', description: 'The number to format.' },
            {
                name: 'formatType',
                type: 'string',
                description: 'Number format type: C, D, E, F, G, N, P, R, or X.',
            },
            {
                name: 'cultureCode',
                type: 'string',
                optional: true,
                description: 'Locale code. Defaults to en_US.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'hash',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        subexpressionOnly: true,
        description:
            'Constructs an object from key-value pairs. Used only as a subexpression within other helpers.',
        params: [
            {
                name: 'pairs',
                type: 'any',
                variadic: true,
                description: 'Key-value pairs, e.g. name="Alice" age=30.',
            },
        ],
        returnType: 'object',
    },
    {
        name: 'length',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns the length of a string or the number of elements in an array.',
        params: [
            {
                name: 'subject',
                type: 'any',
                description: 'The string or array to find the length of.',
            },
        ],
        returnType: 'integer',
    },
    {
        name: 'query',
        category: 'Utility',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 67,
        description:
            'Retrieves multiple records from Sales Cloud or marketing object data sources.',
        params: [
            { name: 'object', type: 'string', description: 'The API name of the target object.' },
            {
                name: 'type',
                type: 'string',
                description: 'The data source type: CRM or MO.',
            },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description: 'Named arguments such as fields, where, params, limit, sortBy, id.',
            },
        ],
        returnType: 'array',
    },
    {
        name: 'queryFirst',
        category: 'Utility',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 67,
        description:
            'Retrieves the first record from Sales Cloud, marketing objects, or data graphs matching criteria.',
        params: [
            {
                name: 'object',
                type: 'string',
                description: 'The API name of the target object, marketing object, or data graph.',
            },
            {
                name: 'type',
                type: 'string',
                description: 'The data source type: CRM, MO, or DG.',
            },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description: 'Named arguments such as fields, where, params, sortBy, id.',
            },
        ],
        returnType: 'object',
    },
    {
        name: 'raiseError',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        description:
            'Throws an exception with a message and optional error code, halting rendering.',
        params: [
            { name: 'errorMessage', type: 'string', description: 'The error message to include.' },
            {
                name: 'errorCode',
                type: 'string',
                optional: true,
                description: 'An error code for categorizing the error.',
            },
        ],
        returnType: 'void',
    },
    {
        name: 'repeat',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'block',
        mcnSince: 65,
        description:
            'Repeats a block a specified number of times, exposing index, first, and last loop variables.',
        params: [
            {
                name: 'count',
                type: 'integer',
                description: 'Number of times to repeat. Must be a non-negative integer.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'set',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'block',
        mcnSince: 65,
        description:
            'Performs local variable assignment within the block scope. Variables do not persist outside the block.',
        params: [
            {
                name: 'assignments',
                type: 'any',
                variadic: true,
                description: 'Variable name/value pairs, e.g. name="John" age=30.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'sort',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Sorts a list of objects by a field, order, and type.',
        params: [
            { name: 'list', type: 'array', description: 'The list of objects to sort.' },
            { name: 'fieldName', type: 'string', description: 'The field to sort by.' },
            {
                name: 'sortOrder',
                type: 'string',
                description: 'Sort order: asc or desc.',
            },
            {
                name: 'sortAs',
                type: 'string',
                description: 'Type to sort as: string, number, date, or boolean.',
            },
        ],
        returnType: 'array',
    },
    {
        name: 'with',
        category: 'Utility',
        origin: 'handlebars-builtin',
        helperType: 'block',
        mcnSince: 65,
        description:
            'Changes the block context to a specified object so properties can be accessed directly.',
        params: [
            {
                name: 'object',
                type: 'object',
                description: 'The object to use as the block context.',
            },
        ],
        returnType: 'string',
    },
];
