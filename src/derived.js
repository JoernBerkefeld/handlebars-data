// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Enrichment + lookup layer: builds the public helper/binding catalogs and
// lookups from the raw per-category data.
import { CATEGORY_DOC, DEV_DOCS_BASE, BINDING_DOC_URL } from './constants.js';
import { HELPERS_RAW } from './helpers/index.js';
import { BUILTIN_BINDINGS_RAW } from './bindings.js';

/**
 * A single MCN Handlebars helper definition (before docUrl enrichment).
 *
 * @typedef {{name: string, category: string, origin: 'handlebars-builtin' | 'mcn-helper' | 'mcn-platform', helperType: 'inline' | 'block' | 'both', mcnSince: number, description: string, params: {name: string, type: string, optional?: boolean, variadic?: boolean, description: string}[], returnType: string, subexpressionOnly?: boolean}} HelperRaw
 */

/**
 * Builds the developer.salesforce.com documentation URL for a helper.
 *
 * @param {string} category - The helper category (e.g. 'Math').
 * @param {string} name - The camelCase helper name.
 * @returns {string} Fully-qualified documentation URL.
 */
function helperDocUrl(category, name) {
    const [folder, prefix] = CATEGORY_DOC[category];
    return `${DEV_DOCS_BASE}/${folder}/${prefix}-${name.toLowerCase()}.html`;
}

/**
 * Canonical MCN Handlebars helper catalog, enriched with documentation URLs.
 *
 *  @type {({name: string, category: string, origin: 'handlebars-builtin' | 'mcn-helper' | 'mcn-platform', helperType: 'inline' | 'block' | 'both', mcnSince: number, description: string, params: {name: string, type: string, optional?: boolean, variadic?: boolean, description: string}[], returnType: string, subexpressionOnly?: boolean, docUrl: string})[]}
 */
export const HELPERS = HELPERS_RAW.map((helper) => ({
    ...helper,
    docUrl: helperDocUrl(helper.category, helper.name),
}));

/**
 * Case-insensitive lookup: lowercase helper name -> helper definition.
 */
export const helperLookup = new Map(HELPERS.map((helper) => [helper.name.toLowerCase(), helper]));

/**
 * Set of lowercase helper names for quick membership checks.
 */
export const helperNames = new Set(HELPERS.map((helper) => helper.name.toLowerCase()));

/**
 * Ordered list of canonical camelCase helper names.
 */
export const CANONICAL_HELPERS = HELPERS.map((helper) => helper.name);

/**
 * Returns the helper definition for a name (case-insensitive), or undefined.
 *
 * @param {string} name - The helper name.
 * @returns {object | undefined} The helper definition, or undefined.
 */
export function getHelper(name) {
    return helperLookup.get(String(name).toLowerCase());
}

/**
 * Returns true when the given name is a known MCN Handlebars helper.
 *
 * @param {string} name - The helper name (case-insensitive).
 * @returns {boolean} True when the helper exists.
 */
export function isHelper(name) {
    return helperNames.has(String(name).toLowerCase());
}

/**
 * Returns the MCN API version a helper first shipped in, or null if unknown.
 *
 * @param {string} name - The helper name (case-insensitive).
 * @returns {number | null} The API version (e.g. 65) or null.
 */
export function getHelperMcnSince(name) {
    return getHelper(name)?.mcnSince ?? null;
}

/**
 * Canonical built-in `{!$...}` binding catalog, enriched with a documentation URL.
 *
 *  @type {{name: string, token: string, namespace: string, mcnSince: number, description: string, docUrl: string}[]}
 */
export const BUILTIN_BINDINGS = BUILTIN_BINDINGS_RAW.map((binding) => ({
    ...binding,
    docUrl: BINDING_DOC_URL,
}));

/**
 * Case-insensitive lookup: lowercase binding name -> binding definition.
 */
export const bindingLookup = new Map(
    BUILTIN_BINDINGS.map((binding) => [binding.name.toLowerCase(), binding]),
);

/**
 * Set of lowercase binding names for quick membership checks.
 */
export const bindingNames = new Set(BUILTIN_BINDINGS.map((binding) => binding.name.toLowerCase()));

/**
 * Returns true when the given binding name (without `{!$ }`) is a built-in binding.
 *
 * @param {string} name - The binding name, e.g. 'organization.Address'.
 * @returns {boolean} True when the binding exists.
 */
export function isBuiltinBinding(name) {
    return bindingNames.has(String(name).toLowerCase());
}
