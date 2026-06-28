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
]);
const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;

test('HELPERS catalog contains the expected 51 MCN helpers', () => {
    assert.equal(HELPERS.length, 51);
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
        assert.ok(Number.isInteger(helper.mcnSince), `${helper.name}: mcnSince integer`);
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
    assert.equal(getHelperMcnSince('notAHelper'), null);
});

test('mcnSince is only 65 or 67', () => {
    for (const helper of HELPERS) {
        assert.ok([65, 67].includes(helper.mcnSince), `${helper.name}: mcnSince in {65,67}`);
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
    for (const name of ['query', 'queryFirst', 'getContentBlock', 'personalizationResult']) {
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
        assert.ok(Number.isInteger(binding.mcnSince), `${binding.name}: mcnSince integer`);
        assert.ok(
            typeof binding.description === 'string' && binding.description.length > 0,
            `${binding.name}: description`,
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
    const total = [...unsupportedByNodeType.values()].reduce((sum, list) => sum + list.length, 0);
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
