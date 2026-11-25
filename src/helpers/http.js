// HTTP helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const HTTP_HELPERS = [
    {
        name: 'encodeURI',
        category: 'HTTP',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Passing the optional second argument (e.g. `{{encodeURI "a b/c" true}}`) makes the email preview fail with HTTP 500. Without it, `{{encodeURI "a b"}}` came back unencoded as `a b`.',
        description:
            'URL-encodes a whole string so it can be placed in a link. For only the part behind the address, such as a query string, use encodeURIComponent.',
        params: [
            { name: 'text', type: 'string', description: 'The text to encode.' },
            {
                name: 'onlySpaces',
                type: 'boolean',
                optional: true,
                description:
                    'true replaces just spaces with %20; false (default) encodes every URL-unsafe character.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'encodeURIComponent',
        category: 'HTTP',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'matches-docs',
        description:
            'URL-encodes the part of a string that comes after the address, such as a query string. For a whole string, use encodeURI.',
        params: [{ name: 'text', type: 'string', description: 'The text to encode.' }],
        returnType: 'string',
    },
];
