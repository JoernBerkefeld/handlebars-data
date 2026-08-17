// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Salesforce-only built-in `{!$...}` bindings (raw entries, before docUrl enrichment).

/**
 * Salesforce-only built-in bindings written with the `{!$namespace.Field}`
 * syntax. These are reserved data-source references, not Handlebars helpers.
 *
 *  @type {{name: string, token: string, namespace: string, mcnSince: number, description: string}[]}
 */
export const BUILTIN_BINDINGS_RAW = [
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
