// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Date & Time helpers (raw entries, before docUrl enrichment).

/**
 * @type {import('../derived.js').HelperRaw[]}
 */
export const DATE_TIME_HELPERS = [
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
];
