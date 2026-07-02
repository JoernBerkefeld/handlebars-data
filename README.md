# handlebars-data

Canonical data catalog for **Handlebars for Marketing Cloud Next (MCN)**. This package is the single source of truth for MCN Handlebars language intelligence across the SFMC tooling suite (language server, ESLint plugin, Prettier plugin, and MCP server).

Marketing Cloud Next's templating engine is based on [Handlebars.Net](https://github.com/Handlebars-Net/Handlebars.Net), not handlebars.js. The engine is **locked down**: you cannot register helpers, partials, decorators, or custom formatters. In exchange, MCN pre-bundles a fixed, release-gated helper catalog plus Salesforce-only data-access and personalization helpers and bindings.

## Exports

| Export | Description |
| --- | --- |
| `HELPERS` | Array of all 51 MCN Handlebars helper definitions, enriched with `docUrl`. |
| `helperLookup` | `Map` of lowercase helper name → definition. |
| `helperNames` | `Set` of lowercase helper names. |
| `CANONICAL_HELPERS` | Ordered list of canonical camelCase helper names. |
| `getHelper(name)` | Case-insensitive helper lookup. |
| `isHelper(name)` | Case-insensitive membership check. |
| `getHelperMcnSince(name)` | API version a helper first shipped in, or `null`. |
| `BUILTIN_BINDINGS` | The three `{!$...}` built-in data-source bindings, each enriched with `docUrl`. |
| `bindingLookup` / `bindingNames` / `isBuiltinBinding(name)` | Binding lookups. |
| `UNSUPPORTED_CONSTRUCTS` | Handlebars constructs the MCN engine does not support (flagged as errors). |
| `unsupportedByNodeType` | `Map` of `@handlebars/parser` AST node type → unsupported entries. |

## Helper metadata

Each helper carries:

- `name` — canonical camelCase name.
- `category` — one of Math, Comparison, String, Objects, Utility, Date & Time, Content, Personalization.
- `origin` — `handlebars-builtin`, `mcn-helper`, or `mcn-platform`.
- `helperType` — `inline`, `block`, or `both`.
- `mcnSince` — MCN API version (65 = Winter '26, 67 = Summer '26).
- `params`, `returnType`, `description`, `docUrl`.

## License

MIT © Joern Berkefeld
