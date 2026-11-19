// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Content helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const CONTENT_HELPERS = [
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
        name: 'buildRowSetFromString',
        category: 'Content',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Splits a string at a delimiter into a rowset with a single unnamed column, one row per value.',
        params: [
            { name: 'text', type: 'string', description: 'The string to split.' },
            { name: 'delimiter', type: 'string', description: 'The text that separates values.' },
        ],
        returnType: 'array',
    },
    {
        name: 'buildRowSetFromXml',
        category: 'Content',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Builds a rowset from the XML nodes an XPath expression selects; each row carries the node value, its XML, and its attributes.',
        params: [
            { name: 'xml', type: 'string', description: 'The XML to read.' },
            { name: 'xpath', type: 'string', description: 'XPath expression picking the nodes.' },
            {
                name: 'options',
                type: 'any',
                variadic: true,
                description:
                    'Required named argument returnEmptyOnError: true yields an empty rowset when parsing or the XPath fails, false raises an error.',
            },
        ],
        returnType: 'array',
    },
    {
        name: 'buildUrl',
        category: 'Content',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Composes a link from a base URL plus UTM and custom query parameters and wraps it for click tracking. Errors when the base URL is empty.',
        params: [
            {
                name: 'base',
                type: 'string',
                description: 'Destination URL; query parameters it already has are kept.',
            },
            {
                name: 'options',
                type: 'any',
                optional: true,
                variadic: true,
                description:
                    'Named arguments: encode, label or sfmclinkalias (not both), noTracking, sfmclinkid, utm_campaign, utm_content, utm_medium, utm_source, utm_term, plus any custom key="value" query parameters.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'impressionRegion',
        category: 'Content',
        origin: 'mcn-platform',
        helperType: 'block',
        mcnSince: 68,
        description:
            'Marks the enclosed part of a message as a named impression region for reporting on dynamic content. Adds no output of its own.',
        params: [
            {
                name: 'name',
                type: 'string',
                description: 'Name of the impression region; given on the opening tag only.',
            },
        ],
        returnType: 'string',
    },
];
