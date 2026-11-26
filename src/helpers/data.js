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
            'With type CRM, where works only with placeholders filled from params=(hash ...): = != < > <= >= on numbers, strings and dates, AND, OR and parentheses, sortBy ASC or DESC and limit (applied after sorting) all work, and = ignores case. Any literal value written inside where makes the preview fail with HTTP 500. LIKE matches the value anywhere in the field and ignores % wildcards. Without fields every field renders empty. <>, IN, NOT IN, NOT (...) and a sortBy with two fields fail with HTTP 500 (write != instead of <>); a null param works; a relationship field such as Account.Name renders empty. With type MO every where form fails with HTTP 500: Marketing Cloud Next needs at least one inline filter on a field of the marketing object (for example Key__c="value"); without one the preview fails with HTTP 500, although the docs list only object and type as required. Inline filters work on key and non-key fields (numbers quoted or not, text, booleans) and several combine with AND. limit works on MO, sortBy fails with HTTP 500. In a test where an inline filter matched two records, only one was returned. Number fields render with one decimal (7 as 7.0). Two MO queries in one email that write the same number field once quoted and once unquoted make the preview fail with HTTP 500. type DG is not listed in the reference for query; every tested DG form (graph name or related DMO as object, with or without a filter, email bound to the same graph) saved but failed the preview with HTTP 500; loop over a related DMO array of the bound data graph through @root.$dataGraph instead.',
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
            'With type CRM, where with placeholders filled from params=(hash ...) and sortBy ASC or DESC work; when nothing matches, the result renders empty without an error. Marketing Cloud Next needs at least one inline filter on a field of the marketing object (for example Key__c="value") when type is MO, on the key or another field; without one the preview fails with HTTP 500, although the docs list only object and type as required. sortBy on MO fails with HTTP 500. With type DG every tested form failed with HTTP 500 (a unified individual id, a source Individual id and the documented contactPointEmail filter, with the email bound to the same data graph in the same data space); read the data graph bound to the email through @root.$dataGraph instead.',
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
                description:
                    'The data source type: CRM, MO, or DG. DG failed with HTTP 500 in every tested form; read the bound data graph through @root.$dataGraph instead.',
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
