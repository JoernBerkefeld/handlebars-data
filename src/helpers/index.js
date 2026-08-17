// AUTO-SPLIT from the original single-file src/index.js. Data moved verbatim.
// Reassembles the raw MCN Handlebars helper catalog from the per-category files
// and restores the exact original source order so downstream order
// (CANONICAL_HELPERS, completions) is byte-for-byte unchanged.
import { MATH_HELPERS } from './math.js';
import { COMPARISON_HELPERS } from './comparison.js';
import { STRING_HELPERS } from './string.js';
import { DATE_TIME_HELPERS } from './date-time.js';
import { OBJECTS_HELPERS } from './objects.js';
import { UTILITY_HELPERS } from './utility.js';
import { CONTENT_HELPERS } from './content.js';
import { PERSONALIZATION_HELPERS } from './personalization.js';

const CATEGORY_ENTRIES = [
    ...MATH_HELPERS,
    ...COMPARISON_HELPERS,
    ...STRING_HELPERS,
    ...DATE_TIME_HELPERS,
    ...OBJECTS_HELPERS,
    ...UTILITY_HELPERS,
    ...CONTENT_HELPERS,
    ...PERSONALIZATION_HELPERS,
];

// Original source order of helper names (preserves the curated ordering).
const ORDER = [
    'add',
    'and',
    'char',
    'compare',
    'concat',
    'dateAdd',
    'dateDiff',
    'divide',
    'each',
    'equals',
    'fallback',
    'filter',
    'flatten',
    'format',
    'formatCurrency',
    'formatNumber',
    'get',
    'getContentBlock',
    'hash',
    'if',
    'iif',
    'indexOf',
    'isEmpty',
    'jsonPath',
    'length',
    'lookup',
    'lowercase',
    'map',
    'modulo',
    'multiply',
    'not',
    'now',
    'or',
    'personalizationResult',
    'properCase',
    'query',
    'queryFirst',
    'raiseError',
    'random',
    'repeat',
    'replace',
    'set',
    'slice',
    'sort',
    'substring',
    'subtract',
    'timeZoneConversion',
    'trim',
    'unless',
    'uppercase',
    'with',
];

const byName = new Map(CATEGORY_ENTRIES.map((helper) => [helper.name, helper]));

/**
 * Raw MCN Handlebars helper catalog (before docUrl enrichment), in original
 * source order.
 *
 * @type {typeof CATEGORY_ENTRIES}
 */
export const HELPERS_RAW = ORDER.map((name) => byName.get(name));
