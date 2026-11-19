// Encryption (hashing) helpers (raw entries, before docUrl enrichment).
// Named (hash) arguments are collapsed into one trailing variadic `options`
// entry, because consumers count every other `params` entry as positional.

const CHARSET_OPTION = {
    name: 'options',
    type: 'any',
    optional: true,
    variadic: true,
    description: 'Named argument charset: UTF-8 (default) or UTF-16.',
};

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const ENCRYPTION_HELPERS = [
    {
        name: 'encode',
        category: 'Encryption',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Hashes a string with an algorithm chosen by name and returns the digest as lowercase hex. Errors on a missing argument or an unknown algorithm or charset.',
        params: [
            {
                name: 'options',
                type: 'any',
                variadic: true,
                description:
                    'Named arguments only: alg (md5, sha1, sha256 or sha512) and value (the text to hash) are required; charset is UTF-8 (default) or UTF-16.',
            },
        ],
        returnType: 'string',
    },
    {
        name: 'md5',
        category: 'Encryption',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Returns the MD5 digest (128 bit) of a string as hex. One-way and not safe for protecting secrets.',
        params: [
            { name: 'text', type: 'string', description: 'The text to hash.' },
            CHARSET_OPTION,
        ],
        returnType: 'string',
    },
    {
        name: 'sha1',
        category: 'Encryption',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Returns the SHA-1 digest (160 bit) of a string as hex. One-way and not safe for protecting secrets.',
        params: [
            { name: 'text', type: 'string', description: 'The text to hash.' },
            CHARSET_OPTION,
        ],
        returnType: 'string',
    },
    {
        name: 'sha256',
        category: 'Encryption',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Returns the SHA-256 digest of a string as hex. One-way and not safe for protecting secrets.',
        params: [
            { name: 'text', type: 'string', description: 'The text to hash.' },
            CHARSET_OPTION,
        ],
        returnType: 'string',
    },
    {
        name: 'sha512',
        category: 'Encryption',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 68,
        description:
            'Returns the SHA-512 digest of a string as hex. One-way and not safe for protecting secrets.',
        params: [
            { name: 'text', type: 'string', description: 'The text to hash.' },
            CHARSET_OPTION,
        ],
        returnType: 'string',
    },
];
