/**
 * Canonical Handlebars for Marketing Cloud Next (MCN) catalog.
 *
 * Single source of truth consumed by:
 *   - sfmc-language-lsp     (completions, hover, signature help, diagnostics)
 *   - eslint-plugin-sfmc    (-next configs: unknown-helper, unsupported-construct)
 *   - prettier-plugin-sfmc  (helper casing reference)
 *   - mcp-server-sfmc       (helper lookup, conversion, completion tools)
 *   - vscode-sfmc-language  (indirectly, via sfmc-language-lsp)
 *
 * MCN's templating engine is based on Handlebars.Net (NOT handlebars.js). The
 * engine is locked down: you cannot register helpers, partials, decorators, or
 * custom formatters. MCN pre-bundles a fixed, release-gated helper catalog plus
 * Salesforce-only data-access and personalization helpers and bindings.
 *
 * `origin` classifies where each helper comes from:
 *   - 'handlebars-builtin' core Handlebars.Net built-in helper (if/each/with/...)
 *   - 'mcn-helper'         bundled Handlebars.Net.Helpers-style helper, PascalCase
 *   - 'mcn-platform'       Salesforce-only data access / personalization / content
 *
 * `mcnSince` is the Marketing Cloud Next API version that first shipped the
 * helper (65 = Winter '26, 67 = Summer '26).
 *
 * ── File layout ──────────────────────────────────────────────────────────────
 * This file is a thin re-export barrel. The catalog data lives in:
 *   - helpers/<category>.js  raw helper entries, split by category
 *   - helpers/index.js       concatenates them and restores original order
 *   - bindings.js            raw `{!$...}` built-in bindings
 *   - unsupported.js         unsupported-construct definitions + node-type index
 *   - constants.js           shared doc-URL constants
 *   - derived.js             docUrl enrichment, lookups, name sets, helper fns
 */

export {
    HELPERS,
    CANONICAL_HELPERS,
    helperLookup,
    helperNames,
    getHelper,
    isHelper,
    getHelperMcnSince,
    BUILTIN_BINDINGS,
    bindingLookup,
    bindingNames,
    isBuiltinBinding,
} from './derived.js';
export { UNSUPPORTED_CONSTRUCTS, unsupportedByNodeType } from './unsupported.js';
