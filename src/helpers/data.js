// Data helpers (raw entries, before docUrl enrichment).
// Named (hash) arguments are collapsed into one trailing variadic `options`
// entry, because consumers count every other `params` entry as positional.

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const DATA_HELPERS = [
    {
        name: 'assignCoupon',
        category: 'Data',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'untested',
        description:
            'Reserves a coupon for the current recipient from a coupon list stored in a marketing object and returns that row. Errors when no coupon can be assigned.',
        params: [
            {
                name: 'list',
                type: 'string',
                description: 'Name of the marketing object holding the coupons.',
            },
        ],
        returnType: 'object',
    },
    {
        name: 'claimRow',
        category: 'Data',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 68,
        mcnStatus: 'untested',
        description:
            'Takes the first row of a marketing object that nobody has claimed yet, marks it as claimed, and returns it. Errors when every row is already claimed.',
        params: [
            {
                name: 'options',
                type: 'any',
                variadic: true,
                description:
                    'Named arguments only: object (marketing object name) and claimCol (column that flags a claimed row) are required, followed by one or more column="value" pairs to write into the claimed row.',
            },
        ],
        returnType: 'object',
    },
    {
        name: 'hash',
        category: 'Data',
        origin: 'mcn-helper',
        helperType: 'inline',
        mcnSince: 67,
        mcnStatus: 'matches-docs',
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
        name: 'query',
        category: 'Data',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 67,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Marketing Cloud Next needs an inline filter on a key field of the marketing object (for example Key__c="value") when type is MO; without one the preview fails with HTTP 500, although the docs list only object and type as required.',
        description:
            'Retrieves multiple records from Sales Cloud or marketing object data sources.',
        params: [
            {
                name: 'options',
                type: 'any',
                variadic: true,
                description:
                    'Named arguments only: object (API name of the target object) and type (CRM or MO) are required; fields, where, params, limit, sortBy and id are optional.',
            },
        ],
        returnType: 'array',
    },
    {
        name: 'queryFirst',
        category: 'Data',
        origin: 'mcn-platform',
        helperType: 'inline',
        mcnSince: 67,
        mcnStatus: 'differs-from-docs',
        mcnNote:
            'Marketing Cloud Next needs an inline filter on a key field of the marketing object (for example Key__c="value") when type is MO; without one the preview fails with HTTP 500, although the docs list only object and type as required.',
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
];
