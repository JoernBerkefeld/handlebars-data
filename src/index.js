/**
 * Canonical Handlebars for Marketing Cloud Next (MCN) catalog.
 *
 * Single source of truth consumed by:
 *   - sfmc-language-lsp     (completions, hover, signature help, diagnostics)
 *   - eslint-plugin-sfmc    (-next configs: unknown-helper, unsupported-construct)
 *   - prettier-plugin-sfmc  (helper casing reference)
 *   - mcp-server-sfmc       (helper lookup, conversion, completion tools)
 *   - vscode-sfmc-language  (indirectly, via sfmc-language-lsp)
 *
 * MCN's templating engine is based on Handlebars.Net (NOT handlebars.js). The
 * engine is locked down: you cannot register helpers, partials, decorators, or
 * custom formatters. MCN pre-bundles a fixed, release-gated helper catalog plus
 * Salesforce-only data-access and personalization helpers and bindings.
 *
 * `origin` classifies where each helper comes from:
 *   - 'handlebars-builtin' core Handlebars.Net built-in helper (if/each/with/...)
 *   - 'mcn-helper'         bundled Handlebars.Net.Helpers-style helper, PascalCase
 *   - 'mcn-platform'       Salesforce-only data access / personalization / content
 *
 * `mcnSince` is the Marketing Cloud Next API version that first shipped the
 * helper (65 = Winter '26, 67 = Summer '26).
 */

// ── Documentation URL derivation ─────────────────────────────────────────────

const DEV_DOCS_BASE =
    'https://developer.salesforce.com/docs/marketing/handlebars-for-marketing-cloud-next/references';

/** Map from category -> [folder, file-prefix] used to build doc URLs. */
const CATEGORY_DOC = {
    Math: ['mcn-handlebars-math-references', 'mcn-handlebars-reference-math'],
    Comparison: ['mcn-handlebars-comparison-references', 'mcn-handlebars-reference-comparison'],
    String: ['mcn-handlebars-string-references', 'mcn-handlebars-reference-string'],
    Objects: ['mcn-handlebars-objects-references', 'mcn-handlebars-reference-objects'],
    Utility: ['mcn-handlebars-utility-references', 'mcn-handlebars-reference-utility'],
    'Date & Time': ['mcn-handlebars-date-time-references', 'mcn-handlebars-reference-date-time'],
    Content: ['mcn-handlebars-content-references', 'mcn-handlebars-reference-content'],
    Personalization: [
        'mcn-handlebars-personalization-references',
        'mcn-handlebars-reference-personalization',
    ],
};

/**
 * Builds the developer.salesforce.com documentation URL for a helper.
 *
 * @param {string} category - The helper category (e.g. 'Math').
 * @param {string} name - The camelCase helper name.
 * @returns {string} Fully-qualified documentation URL.
 */
function helperDocUrl(category, name) {
    const [folder, prefix] = CATEGORY_DOC[category];
    return `${DEV_DOCS_BASE}/${folder}/${prefix}-${name.toLowerCase()}.html`;
}

// ── Helper catalog ───────────────────────────────────────────────────────────

/**
 * A single MCN Handlebars helper definition (before docUrl enrichment).
 *
 *  @type {{name: string, category: string, origin: 'handlebars-builtin' | 'mcn-helper' | 'mcn-platform', helperType: 'inline' | 'block' | 'both', mcnSince: number, description: string, params: {name: string, type: string, optional?: boolean, variadic?: boolean, description: string}[], returnType: string, subexpressionOnly?: boolean}[]}
 */
const HELPERS_RAW = [
    {
        name: 'add',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns the sum of two numbers, rounded to 2 decimal places.',
        params: [
            { name: 'value1', type: 'number', description: 'First value to add.' },
            { name: 'value2', type: 'number', description: 'Second value to add.' },
        ],
        returnType: 'number',
    },
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
        name: 'char',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'concat',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'dateAdd',
        category: 'Date & Time',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Adds or subtracts an amount of time to a date.',
        params: [
            { name: 'date', type: 'string', description: 'The starting date.' },
            {
                name: 'number',
                type: 'integer',
                description: 'Amount of time to add. Use a negative value to subtract.',
            },
            {
                name: 'interval',
                type: 'string',
                description: 'Time unit: Y, M, D, H, MI, or S.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'dateDiff',
        category: 'Date & Time',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Calculates the time difference between two dates in a specified unit.',
        params: [
            { name: 'date1', type: 'string', description: 'The first date.' },
            { name: 'date2', type: 'string', description: 'The second date.' },
            {
                name: 'interval',
                type: 'string',
                description: 'Unit of time: Y, M, D, H, MI, or S.',
            },
        ],
        returnType: 'integer',
    },
    {
        name: 'divide',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'each',
        category: 'Objects',
        origin: 'handlebars-builtin',
        helperType: 'block',
        mcnSince: 65,
        description:
            'Iterates over arrays, lists, and objects, rendering a block for each element.',
        params: [
            {
                name: 'collection',
                type: 'array',
                description: 'The array, list, or object to iterate over.',
            },
        ],
        returnType: 'string',
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
        name: 'filter',
        category: 'Objects',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns a list of items that match a field/operator/value condition.',
        params: [
            { name: 'list', type: 'array', description: 'The list of objects to filter.' },
            { name: 'fieldName', type: 'string', description: 'The field to filter on.' },
            {
                name: 'comparisonOperator',
                type: 'string',
                description: 'Comparison operator (e.g. >, ==, CONTAINS).',
            },
            { name: 'targetValue', type: 'any', description: 'The value to compare against.' },
            {
                name: 'filterAs',
                type: 'string',
                description: 'The type to filter as: string, number, or date.',
            },
        ],
        returnType: 'array',
    },
    {
        name: 'flatten',
        category: 'Objects',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Flattens a nested list of lists into a single list.',
        params: [
            { name: 'nestedList', type: 'array', description: 'The list of lists to flatten.' },
        ],
        returnType: 'array',
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
        name: 'get',
        category: 'Objects',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Retrieves a value from a list or map by index or key.',
        params: [
            { name: 'collection', type: 'any', description: 'The list or map to retrieve from.' },
            {
                name: 'indexOrKey',
                type: 'any',
                description: 'The list index or the map key to retrieve.',
            },
        ],
        returnType: 'any',
    },
    {
        name: 'getContentBlock',
        category: 'Content',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Retrieves and renders a content block within a template.',
        params: [
            {
                name: 'key',
                type: 'string',
                description: 'The unique identifier of the content block to retrieve.',
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
        name: 'indexOf',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description:
            'Returns the 1-based position of a substring within a string (case-insensitive).',
        params: [
            { name: 'subject', type: 'string', description: 'The string to search within.' },
            { name: 'search', type: 'string', description: 'The string to find.' },
        ],
        returnType: 'integer',
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
        name: 'jsonPath',
        category: 'Objects',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Queries and filters JSON objects using a JSONPath expression.',
        params: [
            {
                name: 'object',
                type: 'any',
                description: 'The JSON object, array, or JSON string to query.',
            },
            {
                name: 'expression',
                type: 'string',
                description: 'The JSONPath expression to apply, beginning with $.',
            },
        ],
        returnType: 'any',
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
        name: 'lookup',
        category: 'Objects',
        origin: 'handlebars-builtin',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Dynamically accesses an object property or array element by a variable key.',
        params: [
            {
                name: 'object',
                type: 'any',
                description: 'The object or array to look up a value from.',
            },
            {
                name: 'key',
                type: 'any',
                description: 'The property name or array index to retrieve.',
            },
        ],
        returnType: 'any',
    },
    {
        name: 'lowercase',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'map',
        category: 'Objects',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Extracts a specific field from each object in a list.',
        params: [
            { name: 'list', type: 'array', description: 'The list of objects to map.' },
            {
                name: 'fieldName',
                type: 'string',
                description: 'The field to extract from each object.',
            },
        ],
        returnType: 'array',
    },
    {
        name: 'modulo',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        description: 'Returns the product of two numbers, rounded to 2 decimal places.',
        params: [
            { name: 'value1', type: 'number', description: 'First value to multiply.' },
            { name: 'value2', type: 'number', description: 'Second value to multiply.' },
        ],
        returnType: 'number',
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
        name: 'now',
        category: 'Date & Time',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Returns the current server date and time in UTC. Takes no parameters.',
        params: [],
        returnType: 'string',
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
        name: 'personalizationResult',
        category: 'Personalization',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Retrieves a personalized value by key from the subscriber context.',
        params: [
            {
                name: 'key',
                type: 'string',
                description: 'The personalization key to retrieve.',
            },
        ],
        returnType: 'any',
    },
    {
        name: 'properCase',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'random',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'replace',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'slice',
        category: 'Objects',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns a portion of a list between two indices (end index exclusive).',
        params: [
            { name: 'list', type: 'array', description: 'The list to slice.' },
            {
                name: 'startIndex',
                type: 'integer',
                description: 'The starting index. Negative counts from the end.',
            },
            {
                name: 'endIndex',
                type: 'integer',
                optional: true,
                description: 'The ending index (exclusive). Negative counts from the end.',
            },
        ],
        returnType: 'array',
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
        name: 'substring',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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
        name: 'subtract',
        category: 'Math',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Returns the difference of subtracting the second value from the first.',
        params: [
            { name: 'value1', type: 'number', description: 'The value to subtract from.' },
            { name: 'value2', type: 'number', description: 'The value to subtract.' },
        ],
        returnType: 'number',
    },
    {
        name: 'timeZoneConversion',
        category: 'Date & Time',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        description: 'Converts a date from one time zone to another.',
        params: [
            { name: 'date', type: 'string', description: 'The date to convert.' },
            { name: 'sourceTZ', type: 'string', description: 'The source time zone.' },
            { name: 'targetTZ', type: 'string', description: 'The target time zone.' },
        ],
        returnType: 'string',
    },
    {
        name: 'trim',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
        description: 'Removes leading and trailing whitespace from a string.',
        params: [{ name: 'subject', type: 'string', description: 'The string value to trim.' }],
        returnType: 'string',
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
    {
        name: 'uppercase',
        category: 'String',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 65,
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

/**
 * Canonical MCN Handlebars helper catalog, enriched with documentation URLs.
 *
 *  @type {({name: string, category: string, origin: 'handlebars-builtin' | 'mcn-helper' | 'mcn-platform', helperType: 'inline' | 'block' | 'both', mcnSince: number, description: string, params: {name: string, type: string, optional?: boolean, variadic?: boolean, description: string}[], returnType: string, subexpressionOnly?: boolean, docUrl: string})[]}
 */
export const HELPERS = HELPERS_RAW.map((helper) => ({
    ...helper,
    docUrl: helperDocUrl(helper.category, helper.name),
}));

/** Case-insensitive lookup: lowercase helper name -> helper definition. */
export const helperLookup = new Map(HELPERS.map((helper) => [helper.name.toLowerCase(), helper]));

/** Set of lowercase helper names for quick membership checks. */
export const helperNames = new Set(HELPERS.map((helper) => helper.name.toLowerCase()));

/** Ordered list of canonical camelCase helper names. */
export const CANONICAL_HELPERS = HELPERS.map((helper) => helper.name);

/**
 * Returns the helper definition for a name (case-insensitive), or undefined.
 *
 * @param {string} name - The helper name.
 * @returns {object | undefined} The helper definition, or undefined.
 */
export function getHelper(name) {
    return helperLookup.get(String(name).toLowerCase());
}

/**
 * Returns true when the given name is a known MCN Handlebars helper.
 *
 * @param {string} name - The helper name (case-insensitive).
 * @returns {boolean} True when the helper exists.
 */
export function isHelper(name) {
    return helperNames.has(String(name).toLowerCase());
}

/**
 * Returns the MCN API version a helper first shipped in, or null if unknown.
 *
 * @param {string} name - The helper name (case-insensitive).
 * @returns {number | null} The API version (e.g. 65) or null.
 */
export function getHelperMcnSince(name) {
    return getHelper(name)?.mcnSince ?? null;
}

// ── Built-in data-source bindings ────────────────────────────────────────────

/**
 * Documentation URL shared by all built-in bindings. The bindings are described
 * on the data-sources guide page (a guide page, not a per-binding reference).
 */
const BINDING_DOC_URL =
    'https://developer.salesforce.com/docs/marketing/handlebars-for-marketing-cloud-next/guide/mcn-handlebars-guide-data-sources.html';

/**
 * Salesforce-only built-in bindings written with the `{!$namespace.Field}`
 * syntax. These are reserved data-source references, not Handlebars helpers.
 *
 *  @type {{name: string, token: string, namespace: string, mcnSince: number, description: string}[]}
 */
const BUILTIN_BINDINGS_RAW = [
    {
        name: 'organization.Address',
        token: '{!$organization.Address}',
        namespace: 'organization',
        mcnSince: 65,
        description: 'The physical address of the organization that is sending the email.',
    },
    {
        name: 'link.EmailAddressOptOutUrl',
        token: '{!$link.EmailAddressOptOutUrl}',
        namespace: 'link',
        mcnSince: 65,
        description: 'The URL for the recipient to unsubscribe from the email.',
    },
    {
        name: 'link.PreferenceCenterUrl',
        token: '{!$link.PreferenceCenterUrl}',
        namespace: 'link',
        mcnSince: 65,
        description: 'The URL for the recipient to manage their email preferences.',
    },
];

/**
 * Canonical built-in `{!$...}` binding catalog, enriched with a documentation URL.
 *
 *  @type {{name: string, token: string, namespace: string, mcnSince: number, description: string, docUrl: string}[]}
 */
export const BUILTIN_BINDINGS = BUILTIN_BINDINGS_RAW.map((binding) => ({
    ...binding,
    docUrl: BINDING_DOC_URL,
}));

/** Case-insensitive lookup: lowercase binding name -> binding definition. */
export const bindingLookup = new Map(
    BUILTIN_BINDINGS.map((binding) => [binding.name.toLowerCase(), binding]),
);

/** Set of lowercase binding names for quick membership checks. */
export const bindingNames = new Set(BUILTIN_BINDINGS.map((binding) => binding.name.toLowerCase()));

/**
 * Returns true when the given binding name (without `{!$ }`) is a built-in binding.
 *
 * @param {string} name - The binding name, e.g. 'organization.Address'.
 * @returns {boolean} True when the binding exists.
 */
export function isBuiltinBinding(name) {
    return bindingNames.has(String(name).toLowerCase());
}

// ── Unsupported Handlebars constructs ────────────────────────────────────────

/**
 * Handlebars.js / Handlebars.Net constructs that are NOT supported by the
 * locked-down MCN engine. Tooling flags these as errors (red squiggly) when a
 * document targets Marketing Cloud Next, mirroring how unsupported ECMAScript
 * features are flagged for SSJS.
 *
 * `astNodeType` is the node type produced by `@handlebars/parser`.
 * `helperName` narrows matching to a specific path/helper name (null = match
 * the node type regardless of name).
 *
 *  @type {{id: string, astNodeType: string, helperName: string | null, label: string, message: string}[]}
 */
export const UNSUPPORTED_CONSTRUCTS = [
    {
        id: 'partial',
        astNodeType: 'PartialStatement',
        helperName: null,
        label: 'Partial',
        message:
            'Partials ({{> ...}}) are not supported in Handlebars for Marketing Cloud Next. The MCN engine is locked down and cannot register partials.',
    },
    {
        id: 'partial-block',
        astNodeType: 'PartialBlockStatement',
        helperName: null,
        label: 'Partial block',
        message:
            'Partial blocks ({{#> ...}}...{{/...}}) are not supported in Handlebars for Marketing Cloud Next. The MCN engine cannot register partials.',
    },
    {
        id: 'decorator',
        astNodeType: 'Decorator',
        helperName: null,
        label: 'Decorator',
        message:
            'Decorators ({{* ...}}) are not supported in Handlebars for Marketing Cloud Next. The MCN engine cannot register decorators.',
    },
    {
        id: 'decorator-block',
        astNodeType: 'DecoratorBlock',
        helperName: null,
        label: 'Inline partial / decorator block',
        message:
            'Inline partials and decorator blocks ({{#*inline ...}}...{{/inline}}) are not supported in Handlebars for Marketing Cloud Next.',
    },
    {
        id: 'log',
        astNodeType: 'MustacheStatement',
        helperName: 'log',
        label: 'log helper',
        message:
            'The {{log}} helper is a handlebars.js debugging helper and is not available in Handlebars for Marketing Cloud Next.',
    },
];

/** Lookup of unsupported constructs by astNodeType -> entries sharing that node type. */
export const unsupportedByNodeType = UNSUPPORTED_CONSTRUCTS.reduce((map, entry) => {
    const list = map.get(entry.astNodeType) ?? [];
    list.push(entry);
    map.set(entry.astNodeType, list);
    return map;
}, new Map());
