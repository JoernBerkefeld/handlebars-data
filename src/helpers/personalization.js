// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Personalization helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const PERSONALIZATION_HELPERS = [
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
];
