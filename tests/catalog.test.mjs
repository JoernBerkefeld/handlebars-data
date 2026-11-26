import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
    HELPERS,
    helperLookup,
    helperNames,
    CANONICAL_HELPERS,
    getHelper,
    isHelper,
    getHelperMcnSince,
    BUILTIN_BINDINGS,
    bindingLookup,
    bindingNames,
    isBuiltinBinding,
    UNSUPPORTED_CONSTRUCTS,
    unsupportedByNodeType,
} from '../src/index.js';

import { MATH_HELPERS } from '../src/helpers/math.js';
import { COMPARISON_HELPERS } from '../src/helpers/comparison.js';
import { STRING_HELPERS } from '../src/helpers/string.js';
import { OBJECTS_HELPERS } from '../src/helpers/objects.js';
import { UTILITY_HELPERS } from '../src/helpers/utility.js';
import { DATE_TIME_HELPERS } from '../src/helpers/date-time.js';
import { CONTENT_HELPERS } from '../src/helpers/content.js';
import { PERSONALIZATION_HELPERS } from '../src/helpers/personalization.js';
import { DATA_HELPERS } from '../src/helpers/data.js';
import { ENCRYPTION_HELPERS } from '../src/helpers/encryption.js';
import { HTTP_HELPERS } from '../src/helpers/http.js';
import { DEV_DOCS_BASE } from '../src/constants.js';

const VALID_ORIGINS = new Set(['handlebars-builtin', 'mcn-helper', 'mcn-platform']);
const VALID_HELPER_TYPES = new Set(['inline', 'block', 'both']);
const VALID_CATEGORIES = new Set([
    'Math',
    'Comparison',
    'String',
    'Objects',
    'Utility',
    'Date & Time',
    'Content',
    'Personalization',
    'Data',
    'Encryption',
    'HTTP',
]);
const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;

// Helpers first documented for MCN API 68 (Winter '27), by category.
const API_68_HELPERS = {
    Content: ['buildRowSetFromString', 'buildRowSetFromXml', 'buildUrl', 'impressionRegion'],
    Data: ['assignCoupon', 'claimRow'],
    'Date & Time': ['datePart'],
    Encryption: ['encode', 'md5', 'sha1', 'sha256', 'sha512'],
    HTTP: ['encodeURI', 'encodeURIComponent'],
    String: ['regExMatch', 'stringToHex'],
    Utility: ['base64Decode', 'base64Encode', 'domain', 'guid', 'isEmailAddress', 'isNullDefault'],
};

test('HELPERS catalog contains the expected 73 MCN helpers', () => {
    assert.equal(HELPERS.length, 73);
});

test('API 68 helpers are present with the documented casing, category and version', () => {
    const api68Names = Object.values(API_68_HELPERS).flat();
    for (const [category, names] of Object.entries(API_68_HELPERS)) {
        for (const name of names) {
            const helper = HELPERS.find((h) => h.name === name);
            assert.ok(helper, `${name}: present with exact casing`);
            assert.equal(helper.category, category, `${name}: category`);
            assert.equal(helper.mcnSince, 68, `${name}: mcnSince`);
        }
    }
    assert.deepEqual(
        new Set(HELPERS.filter((h) => h.mcnSince === 68).map((h) => h.name)),
        new Set(api68Names),
        'no other helper claims API 68',
    );
});

test('docUrl of the Data, Encryption and HTTP helpers points at their category pages', () => {
    const expected = {
        assignCoupon: 'mcn-handlebars-data-references/mcn-handlebars-reference-data-assigncoupon',
        hash: 'mcn-handlebars-data-references/mcn-handlebars-reference-data-hash',
        query: 'mcn-handlebars-data-references/mcn-handlebars-reference-data-query',
        queryFirst: 'mcn-handlebars-data-references/mcn-handlebars-reference-data-queryfirst',
        sha256: 'mcn-handlebars-encryption-references/mcn-handlebars-reference-encryption-sha256',
        encodeURIComponent:
            'mcn-handlebars-http-references/mcn-handlebars-reference-http-encodeuricomponent',
    };
    for (const [name, path] of Object.entries(expected)) {
        assert.equal(getHelper(name).docUrl, `${DEV_DOCS_BASE}/${path}.html`, `${name}: docUrl`);
    }
});

test('hash, query and queryFirst moved to the Data category and keep API 67', () => {
    for (const name of ['hash', 'query', 'queryFirst']) {
        assert.equal(getHelper(name).category, 'Data', `${name}: category`);
        assert.equal(getHelper(name).mcnSince, 67, `${name}: mcnSince`);
        assert.ok(
            UTILITY_HELPERS.every((h) => h.name !== name),
            `${name}: left Utility`,
        );
    }
});

test('helpers taking only named arguments expose no positional params', () => {
    for (const name of ['claimRow', 'encode', 'query']) {
        const positional = getHelper(name).params.filter((p) => !p.variadic);
        assert.deepEqual(positional, [], `${name}: named arguments only`);
    }
});

test('named arguments of API 68 helpers are not modelled as positional params', () => {
    const positionalCounts = {
        md5: 1,
        sha1: 1,
        sha256: 1,
        sha512: 1,
        stringToHex: 1,
        base64Decode: 1,
        base64Encode: 1,
        buildUrl: 1,
        buildRowSetFromXml: 2,
        regExMatch: 3,
    };
    for (const [name, count] of Object.entries(positionalCounts)) {
        const helper = getHelper(name);
        assert.equal(
            helper.params.filter((p) => !p.variadic).length,
            count,
            `${name}: positional param count`,
        );
        assert.ok(helper.params.at(-1).variadic, `${name}: trailing variadic for named arguments`);
    }
});

test('every helper has required fields with valid values', () => {
    for (const helper of HELPERS) {
        assert.equal(typeof helper.name, 'string', `${helper.name}: name`);
        assert.ok(helper.name.length > 0, `${helper.name}: non-empty name`);
        assert.ok(CAMEL_CASE.test(helper.name), `${helper.name}: camelCase name`);
        assert.ok(VALID_CATEGORIES.has(helper.category), `${helper.name}: valid category`);
        assert.ok(VALID_ORIGINS.has(helper.origin), `${helper.name}: valid origin`);
        assert.ok(VALID_HELPER_TYPES.has(helper.helperType), `${helper.name}: valid helperType`);
        assert.equal(typeof helper.mcnSince, 'number', `${helper.name}: mcnSince is number`);
        assert.ok(Number.isSafeInteger(helper.mcnSince), `${helper.name}: mcnSince integer`);
        assert.ok(
            typeof helper.description === 'string' && helper.description.length > 0,
            `${helper.name}: description`,
        );
        assert.ok(Array.isArray(helper.params), `${helper.name}: params array`);
        assert.equal(typeof helper.returnType, 'string', `${helper.name}: returnType`);
        assert.ok(
            typeof helper.docUrl === 'string' && helper.docUrl.startsWith('https://'),
            `${helper.name}: docUrl`,
        );
    }
});

test('every helper param has name, type, and description', () => {
    for (const helper of HELPERS) {
        for (const param of helper.params) {
            assert.equal(typeof param.name, 'string', `${helper.name}: param name`);
            assert.ok(param.name.length > 0, `${helper.name}: non-empty param name`);
            assert.equal(typeof param.type, 'string', `${helper.name}.${param.name}: type`);
            assert.ok(
                typeof param.description === 'string' && param.description.length > 0,
                `${helper.name}.${param.name}: description`,
            );
        }
    }
});

test('helper names are unique (case-insensitive)', () => {
    assert.equal(helperNames.size, HELPERS.length);
    assert.equal(helperLookup.size, HELPERS.length);
    assert.equal(CANONICAL_HELPERS.length, HELPERS.length);
});

test('getHelper / isHelper / getHelperMcnSince behave case-insensitively', () => {
    assert.ok(isHelper('Add'));
    assert.ok(isHelper('add'));
    assert.ok(isHelper('GETCONTENTBLOCK'));
    assert.ok(!isHelper('contentBlockByKey'));
    assert.equal(getHelper('IF').name, 'if');
    assert.equal(getHelperMcnSince('now'), 67);
    assert.equal(getHelperMcnSince('add'), 65);
    assert.equal(getHelperMcnSince('ENCODEURI'), 68);
    assert.equal(getHelperMcnSince('notAHelper'), null);
});

test('mcnStatus is a known label and mcnNote is set exactly for differs-from-docs / unsupported', () => {
    const statuses = new Set(['matches-docs', 'differs-from-docs', 'unsupported', 'untested']);
    for (const helper of HELPERS) {
        if (helper.mcnStatus === undefined) {
            assert.equal(helper.mcnNote, undefined, `${helper.name}: mcnNote without mcnStatus`);
            continue;
        }
        assert.ok(
            statuses.has(helper.mcnStatus),
            `${helper.name}: unknown mcnStatus ${helper.mcnStatus}`,
        );
        if (helper.mcnStatus === 'differs-from-docs' || helper.mcnStatus === 'unsupported') {
            assert.equal(typeof helper.mcnNote, 'string', `${helper.name}: mcnNote required`);
            assert.ok(helper.mcnNote.trim().length > 0, `${helper.name}: mcnNote non-empty`);
        } else {
            assert.equal(
                helper.mcnNote,
                undefined,
                `${helper.name}: mcnNote only for differs/unsupported`,
            );
        }
    }
});

test('mcnSince is only 65, 67 or 68', () => {
    for (const helper of HELPERS) {
        assert.ok([65, 67, 68].includes(helper.mcnSince), `${helper.name}: mcnSince in {65,67,68}`);
    }
});

test('handlebars-builtin helpers cover the core control-flow set', () => {
    const builtins = HELPERS.filter((h) => h.origin === 'handlebars-builtin').map((h) => h.name);
    for (const name of ['if', 'unless', 'each', 'with', 'lookup']) {
        assert.ok(builtins.includes(name), `${name} should be handlebars-builtin`);
    }
});

test('platform-only helpers are classified as mcn-platform', () => {
    const platform = HELPERS.filter((h) => h.origin === 'mcn-platform').map((h) => h.name);
    for (const name of [
        'query',
        'queryFirst',
        'getContentBlock',
        'personalizationResult',
        'assignCoupon',
        'claimRow',
        'buildUrl',
        'impressionRegion',
    ]) {
        assert.ok(platform.includes(name), `${name} should be mcn-platform`);
    }
});

test('BUILTIN_BINDINGS have the expected shape', () => {
    assert.equal(BUILTIN_BINDINGS.length, 3);
    for (const binding of BUILTIN_BINDINGS) {
        assert.equal(typeof binding.name, 'string');
        assert.ok(
            binding.token.startsWith('{!$') && binding.token.endsWith('}'),
            `${binding.name}: token`,
        );
        assert.equal(typeof binding.namespace, 'string');
        assert.ok(Number.isSafeInteger(binding.mcnSince), `${binding.name}: mcnSince integer`);
        assert.ok(
            typeof binding.description === 'string' && binding.description.length > 0,
            `${binding.name}: description`,
        );
        assert.ok(
            typeof binding.docUrl === 'string' && binding.docUrl.startsWith('https://'),
            `${binding.name}: docUrl`,
        );
    }
});

test('binding lookups behave case-insensitively', () => {
    assert.equal(bindingNames.size, BUILTIN_BINDINGS.length);
    assert.equal(bindingLookup.size, BUILTIN_BINDINGS.length);
    assert.ok(isBuiltinBinding('organization.Address'));
    assert.ok(isBuiltinBinding('LINK.PreferenceCenterUrl'));
    assert.ok(!isBuiltinBinding('unknown.binding'));
});

test('UNSUPPORTED_CONSTRUCTS entries are well-formed', () => {
    assert.ok(UNSUPPORTED_CONSTRUCTS.length > 0);
    const ids = new Set();
    for (const entry of UNSUPPORTED_CONSTRUCTS) {
        assert.ok(typeof entry.id === 'string' && entry.id.length > 0, 'id');
        assert.ok(!ids.has(entry.id), `unique id: ${entry.id}`);
        ids.add(entry.id);
        assert.ok(
            typeof entry.astNodeType === 'string' && entry.astNodeType.length > 0,
            `${entry.id}: astNodeType`,
        );
        assert.ok(
            entry.helperName === null || typeof entry.helperName === 'string',
            `${entry.id}: helperName`,
        );
        assert.ok(typeof entry.label === 'string' && entry.label.length > 0, `${entry.id}: label`);
        assert.ok(
            typeof entry.message === 'string' && entry.message.length > 0,
            `${entry.id}: message`,
        );
    }
});

test('unsupportedByNodeType indexes every construct', () => {
    let total = 0;
    for (const list of unsupportedByNodeType.values()) {
        total += list.length;
    }
    assert.equal(total, UNSUPPORTED_CONSTRUCTS.length);
    assert.ok(unsupportedByNodeType.has('PartialStatement'));
    assert.ok(unsupportedByNodeType.has('Decorator'));
});

test('no unsupported construct collides with a known helper name', () => {
    for (const entry of UNSUPPORTED_CONSTRUCTS) {
        if (entry.helperName) {
            assert.ok(
                !helperNames.has(entry.helperName.toLowerCase()),
                `${entry.id}: ${entry.helperName} must not be a valid helper`,
            );
        }
    }
});

test('each per-category helper file is non-empty and internally consistent', () => {
    const categoryFiles = [
        ['Math', MATH_HELPERS],
        ['Comparison', COMPARISON_HELPERS],
        ['String', STRING_HELPERS],
        ['Objects', OBJECTS_HELPERS],
        ['Utility', UTILITY_HELPERS],
        ['Date & Time', DATE_TIME_HELPERS],
        ['Content', CONTENT_HELPERS],
        ['Personalization', PERSONALIZATION_HELPERS],
        ['Data', DATA_HELPERS],
        ['Encryption', ENCRYPTION_HELPERS],
        ['HTTP', HTTP_HELPERS],
    ];
    let total = 0;
    for (const [category, helpers] of categoryFiles) {
        assert.ok(helpers.length > 0, `${category}: file is non-empty`);
        for (const helper of helpers) {
            assert.equal(
                helper.category,
                category,
                `${helper.name}: category must match its file (${category})`,
            );
        }
        total += helpers.length;
    }
    // The split files together cover every helper, with none missing or extra.
    assert.equal(total, HELPERS.length, 'category files cover all helpers exactly');
});

test('every helper links its canonical sfmc.guide page', () => {
    for (const helper of HELPERS) {
        assert.equal(
            helper.sfmcGuideUrl,
            `https://sfmc.guide/next/handlebars/helpers/${helper.name.toLowerCase()}/`,
            `${helper.name}: non-canonical sfmcGuideUrl`,
        );
    }
});

test('helper names use the case-sensitive spelling of the Marketing Cloud Next docs', () => {
    // Next rejects jsonPath, properCase and timeZoneConversion at save; only the docs spelling works.
    for (const name of ['jsonpath', 'propercase', 'timezoneConversion']) {
        assert.equal(getHelper(name)?.name, name, `${name}: catalog spelling`);
    }
    assert.equal(getHelper('jsonpath').mcnStatus, 'matches-docs');
    assert.equal(getHelper('propercase').mcnStatus, 'differs-from-docs');
    assert.equal(getHelper('timezoneConversion').mcnStatus, 'matches-docs');
});

test('query and queryFirst keep the marketing object caveat', () => {
    for (const name of ['query', 'queryFirst']) {
        const helper = getHelper(name);
        assert.equal(helper.mcnStatus, 'differs-from-docs', `${name}: mcnStatus`);
        assert.match(helper.mcnNote, /inline filter on a field/, `${name}: MO caveat`);
        assert.match(helper.mcnNote, /params=\(hash/, `${name}: where needs params`);
    }
});

test('queryFirst marks type DG as failing and points to the bound data graph', () => {
    const helper = getHelper('queryFirst');
    assert.match(helper.mcnNote, /With type DG every tested form failed with HTTP 500/);
    assert.match(helper.mcnNote, /@root\.\$dataGraph/);
    const typeParam = helper.params.find((p) => p.name === 'type');
    assert.match(typeParam.description, /DG failed with HTTP 500/);
});

test('query marks type DG as failing and filter keeps the data graph finding', () => {
    const query = getHelper('query');
    assert.match(query.mcnNote, /type DG is not listed/);
    assert.match(query.mcnNote, /@root\.\$dataGraph/);
    const filter = getHelper('filter');
    assert.equal(filter.mcnStatus, 'differs-from-docs');
    assert.match(filter.mcnNote, /without filterAs the email save is rejected with HTTP 400/);
});
