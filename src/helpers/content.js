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
];
