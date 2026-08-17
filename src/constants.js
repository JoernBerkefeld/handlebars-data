// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Shared documentation-URL constants (not part of the public API).

// ── Documentation URL derivation ─────────────────────────────────────────────

export const DEV_DOCS_BASE =
    'https://developer.salesforce.com/docs/marketing/handlebars-for-marketing-cloud-next/references';

/**
 * Map from category -> [folder, file-prefix] used to build doc URLs.
 */
export const CATEGORY_DOC = {
    Math: ['mcn-handlebars-math-references', 'mcn-handlebars-reference-math'],
    Comparison: ['mcn-handlebars-comparison-references', 'mcn-handlebars-reference-comparison'],
    String: ['mcn-handlebars-string-references', 'mcn-handlebars-reference-string'],
    Objects: ['mcn-handlebars-objects-references', 'mcn-handlebars-reference-objects'],
    Utility: ['mcn-handlebars-utility-references', 'mcn-handlebars-reference-utility'],
    'Date & Time': ['mcn-handlebars-date-time-references', 'mcn-handlebars-reference-date-time'],
    Content: ['mcn-handlebars-content-references', 'mcn-handlebars-reference-content'],
    Personalization: [
        'mcn-handlebars-personalization-references',
        'mcn-handlebars-reference-personalization',
    ],
};

/**
 * Documentation URL shared by all built-in bindings. The bindings are described
 * on the data-sources guide page (a guide page, not a per-binding reference).
 */
export const BINDING_DOC_URL =
    'https://developer.salesforce.com/docs/marketing/handlebars-for-marketing-cloud-next/guide/mcn-handlebars-guide-data-sources.html';
