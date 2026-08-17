// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Objects helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const OBJECTS_HELPERS = [
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
];
