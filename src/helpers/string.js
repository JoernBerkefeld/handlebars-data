// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// String helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const STRING_HELPERS = [
    {
        name: 'char',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Repeating a character works (`{{char 65 3}}` gives `AAA`), but `{{char 65602 1}}` made the email preview fail with HTTP 500; other codes above 255 were not tested.',
        description: 'Returns the Unicode character for a character code, optionally repeated.',
        params: [
            { name: 'code', type: 'number', description: 'Unicode character code in decimal.' },
            {
                name: 'repeated',
                type: 'integer',
                optional: true,
                description: 'How many times to repeat the character. Defaults to 1.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'concat',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Combines multiple values into a single string. Null values are skipped.',
        params: [
            { name: 'value1', type: 'any', description: 'First value to concatenate.' },
            { name: 'value2', type: 'any', optional: true, description: 'Second value.' },
            {
                name: 'valueN',
                type: 'any',
                optional: true,
                variadic: true,
                description: 'Additional values to concatenate.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'indexOf',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description:
            'Returns the 1-based position of a substring within a string (case-insensitive).',
        params: [
            { name: 'subject', type: 'string', description: 'The string to search within.' },
            { name: 'search', type: 'string', description: 'The string to find.' },
        ],
        returnType: 'integer',
    },
    {
        name: 'lowercase',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Converts all letters in a string to lowercase.',
        params: [
            { name: 'subject', type: 'string', description: 'The string to convert to lowercase.' },
            {
                name: 'culture',
                type: 'string',
                optional: true,
                description: 'POSIX locale code for culture-specific conversion.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'propercase',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Helper names are case-sensitive: write propercase in lowercase (properCase is rejected at save). The spaces between words are dropped: {{propercase "hELLO wORLD"}} renders HelloWorld, not Hello World.',
        description: 'Capitalizes the first letter of each word and lowercases the rest.',
        params: [
            {
                name: 'subject',
                type: 'string',
                description: 'The string to convert to proper case.',
            },
            {
                name: 'culture',
                type: 'string',
                optional: true,
                description: 'POSIX locale code for culture-specific conversion.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'replace',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Matching ignores letter case: `{{replace "Aa" "a" "x"}}` gives `xx` instead of `Ax`.',
        description: 'Replaces every occurrence of a substring with another (case-sensitive).',
        params: [
            {
                name: 'subject',
                type: 'string',
                description: 'The string to search and replace in.',
            },
            { name: 'search', type: 'string', description: 'The substring to search for.' },
            { name: 'replacement', type: 'string', description: 'The replacement substring.' },
            {
                name: 'culture',
                type: 'string',
                optional: true,
                description: 'BCP 47 locale code for culture-specific comparison.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'substring',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Works with double braces, but in triple-brace (unescaped) output it prints an internal Java object name (`...HandlebarResultWrapper@...`) instead of the text.',
        description: 'Extracts a portion of a string starting from a 1-based position.',
        params: [
            { name: 'subject', type: 'string', description: 'The string to extract from.' },
            {
                name: 'start',
                type: 'integer',
                description: 'Starting position. The first character is at position 1.',
            },
            {
                name: 'length',
                type: 'integer',
                optional: true,
                description: 'Number of characters to extract.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'trim',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'matches-docs',
        description: 'Removes leading and trailing whitespace from a string.',
        params: [{ name: 'subject', type: 'string', description: 'The string value to trim.' }],
        returnType: 'string',
    },
    {
        name: 'uppercase',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Works with double braces, but in triple-brace (unescaped) output it prints an internal Java object name (`...HandlebarResultWrapper@...`) instead of the text.',
        description: 'Converts all letters in a string to uppercase.',
        params: [
            { name: 'subject', type: 'string', description: 'The string to convert to uppercase.' },
            {
                name: 'culture',
                type: 'string',
                optional: true,
                description: 'POSIX locale code for culture-specific conversion.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'regExMatch',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description:
            'Applies a regular expression (Java regex syntax) to a string and returns the matched text or one capture group. Returns an empty string when nothing matches.',
        params: [
            { name: 'subject', type: 'string', description: 'The string to search within.' },
            { name: 'pattern', type: 'string', description: 'The regular expression to apply.' },
            {
                name: 'group',
                type: 'string',
                description:
                    'Name or number of the capture group to return; "0" is the whole match.',
            },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description:
                    'Named boolean flags: explicitCapture, ignoreCase, ignorePatternWhitespace, multiline.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'stringToHex',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description:
            'Returns the hexadecimal representation of the encoded characters of a string.',
        params: [
            { name: 'subject', type: 'string', description: 'The string to convert.' },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description: 'Named argument charSet: UTF-8 (default) or UTF-16.',
            },
        ],
        returnType: 'string',
    },
];
