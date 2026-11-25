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
        mcnStatus: 'matches-docs',
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
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Simple patterns such as `N2` work, but the negative section of a `;`-separated pattern is ignored (`-1,234.57` instead of `(1,234.57)`) and zero-padding patterns like `000000` leave the number unpadded.',
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
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Amounts format correctly, but for locales such as `de-DE` the gap between amount and currency symbol is a non-breaking space (U+00A0) instead of a regular space.',
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
        mcnStatus: 'matches-docs',
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
        name: 'length',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
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
        name: 'raiseError',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        mcnStatus: 'untested',
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
        mcnStatus: 'matches-docs',
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
        mcnStatus: 'matches-docs',
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
        mcnStatus: 'untested',
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
        mcnStatus: 'matches-docs',
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
    {
        name: 'base64Decode',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description: 'Turns a Base64 string back into readable text.',
        params: [
            { name: 'encoded', type: 'string', description: 'The Base64 text to decode.' },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description:
                    'Named arguments: characterEncoding (ASCII, UTF-7, UTF-8, UTF-16 or UTF-32) and abortSendOnFail (true stops the send when decoding fails; false yields an empty string instead).',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'base64Encode',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description: 'Turns readable text into a Base64 string.',
        params: [
            { name: 'text', type: 'string', description: 'The text to encode.' },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description:
                    'Named argument characterEncoding: ASCII, UTF-7, UTF-8, UTF-16 or UTF-32.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'domain',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description:
            'Returns everything behind the first @ of an email address, or null when the input has no @ or is not a string.',
        params: [
            {
                name: 'emailAddress',
                type: 'string',
                description: 'The email address to read the domain from.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'guid',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description:
            'Creates a new globally unique identifier (GUID). Takes no parameters; any that are passed are ignored.',
        params: [],
        returnType: 'string',
    },
    {
        name: 'isEmailAddress',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description:
            'Checks whether a value has the shape of an email address. It does not check that the mailbox or domain exists.',
        params: [
            { name: 'emailAddress', type: 'string', description: 'The email address to check.' },
        ],
        returnType: 'boolean',
    },
    {
        name: 'isNullDefault',
        category: 'Utility',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description: 'Returns the first value, or the second one when the first is null.',
        params: [
            { name: 'value', type: 'any', description: 'The value to use when it is not null.' },
            {
                name: 'defaultValue',
                type: 'any',
                description: 'The replacement to use when the first value is null.',
            },
        ],
        returnType: 'any',
    },
];
