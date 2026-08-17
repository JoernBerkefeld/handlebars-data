// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Unsupported Handlebars constructs + their by-node-type index.

// ── Unsupported Handlebars constructs ────────────────────────────────────────

/**
 * Handlebars.js / Handlebars.Net constructs that are NOT supported by the
 * locked-down MCN engine. Tooling flags these as errors (red squiggly) when a
 * document targets Marketing Cloud Next, mirroring how unsupported ECMAScript
 * features are flagged for SSJS.
 *
 * `astNodeType` is the node type produced by `@handlebars/parser`.
 * `helperName` narrows matching to a specific path/helper name (null = match
 * the node type regardless of name).
 *
 *  @type {{id: string, astNodeType: string, helperName: string | null, label: string, message: string}[]}
 */
export const UNSUPPORTED_CONSTRUCTS = [
    {
        id: 'partial',
        astNodeType: 'PartialStatement',
        helperName: null,
        label: 'Partial',
        message:
            'Partials ({{> ...}}) are not supported in Handlebars for Marketing Cloud Next. The MCN engine is locked down and cannot register partials.',
    },
    {
        id: 'partial-block',
        astNodeType: 'PartialBlockStatement',
        helperName: null,
        label: 'Partial block',
        message:
            'Partial blocks ({{#> ...}}...{{/...}}) are not supported in Handlebars for Marketing Cloud Next. The MCN engine cannot register partials.',
    },
    {
        id: 'decorator',
        astNodeType: 'Decorator',
        helperName: null,
        label: 'Decorator',
        message:
            'Decorators ({{* ...}}) are not supported in Handlebars for Marketing Cloud Next. The MCN engine cannot register decorators.',
    },
    {
        id: 'decorator-block',
        astNodeType: 'DecoratorBlock',
        helperName: null,
        label: 'Inline partial / decorator block',
        message:
            'Inline partials and decorator blocks ({{#*inline ...}}...{{/inline}}) are not supported in Handlebars for Marketing Cloud Next.',
    },
    {
        id: 'log',
        astNodeType: 'MustacheStatement',
        helperName: 'log',
        label: 'log helper',
        message:
            'The {{log}} helper is a handlebars.js debugging helper and is not available in Handlebars for Marketing Cloud Next.',
    },
];

/**
 * Lookup of unsupported constructs by astNodeType -> entries sharing that node type.
 */
export const unsupportedByNodeType = new Map();
for (const entry of UNSUPPORTED_CONSTRUCTS) {
    const list = unsupportedByNodeType.get(entry.astNodeType) ?? [];
    list.push(entry);
    unsupportedByNodeType.set(entry.astNodeType, list);
}
