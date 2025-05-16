'use strict';

var bundle = require('./bundle.js');
require('node:path');
require('node:process');
require('node:fs');
require('node:module');
require('node:fs/promises');
require('node:url');
require('node:assert');
require('node:v8');
require('node:util');
require('path');
require('fs');
require('node:os');
require('node:buffer');
require('node:querystring');
require('constants');
require('events');
require('util');
require('stream');
require('os');
require('tty');

/**
 * @typedef { import('estree').Node} Node
 * @typedef {{
 *   skip: () => void;
 *   remove: () => void;
 *   replace: (node: Node) => void;
 * }} WalkerContext
 */

class WalkerBase {
	constructor() {
		/** @type {boolean} */
		this.should_skip = false;

		/** @type {boolean} */
		this.should_remove = false;

		/** @type {Node | null} */
		this.replacement = null;

		/** @type {WalkerContext} */
		this.context = {
			skip: () => (this.should_skip = true),
			remove: () => (this.should_remove = true),
			replace: (node) => (this.replacement = node)
		};
	}

	/**
	 * @template {Node} Parent
	 * @param {Parent | null | undefined} parent
	 * @param {keyof Parent | null | undefined} prop
	 * @param {number | null | undefined} index
	 * @param {Node} node
	 */
	replace(parent, prop, index, node) {
		if (parent && prop) {
			if (index != null) {
				/** @type {Array<Node>} */ (parent[prop])[index] = node;
			} else {
				/** @type {Node} */ (parent[prop]) = node;
			}
		}
	}

	/**
	 * @template {Node} Parent
	 * @param {Parent | null | undefined} parent
	 * @param {keyof Parent | null | undefined} prop
	 * @param {number | null | undefined} index
	 */
	remove(parent, prop, index) {
		if (parent && prop) {
			if (index !== null && index !== undefined) {
				/** @type {Array<Node>} */ (parent[prop]).splice(index, 1);
			} else {
				delete parent[prop];
			}
		}
	}
}

/**
 * @typedef { import('estree').Node} Node
 * @typedef { import('./walker.js').WalkerContext} WalkerContext
 * @typedef {(
 *    this: WalkerContext,
 *    node: Node,
 *    parent: Node | null,
 *    key: string | number | symbol | null | undefined,
 *    index: number | null | undefined
 * ) => void} SyncHandler
 */

class SyncWalker extends WalkerBase {
	/**
	 *
	 * @param {SyncHandler} [enter]
	 * @param {SyncHandler} [leave]
	 */
	constructor(enter, leave) {
		super();

		/** @type {boolean} */
		this.should_skip = false;

		/** @type {boolean} */
		this.should_remove = false;

		/** @type {Node | null} */
		this.replacement = null;

		/** @type {WalkerContext} */
		this.context = {
			skip: () => (this.should_skip = true),
			remove: () => (this.should_remove = true),
			replace: (node) => (this.replacement = node)
		};

		/** @type {SyncHandler | undefined} */
		this.enter = enter;

		/** @type {SyncHandler | undefined} */
		this.leave = leave;
	}

	/**
	 * @template {Node} Parent
	 * @param {Node} node
	 * @param {Parent | null} parent
	 * @param {keyof Parent} [prop]
	 * @param {number | null} [index]
	 * @returns {Node | null}
	 */
	visit(node, parent, prop, index) {
		if (node) {
			if (this.enter) {
				const _should_skip = this.should_skip;
				const _should_remove = this.should_remove;
				const _replacement = this.replacement;
				this.should_skip = false;
				this.should_remove = false;
				this.replacement = null;

				this.enter.call(this.context, node, parent, prop, index);

				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}

				if (this.should_remove) {
					this.remove(parent, prop, index);
				}

				const skipped = this.should_skip;
				const removed = this.should_remove;

				this.should_skip = _should_skip;
				this.should_remove = _should_remove;
				this.replacement = _replacement;

				if (skipped) return node;
				if (removed) return null;
			}

			/** @type {keyof Node} */
			let key;

			for (key in node) {
				/** @type {unknown} */
				const value = node[key];

				if (value && typeof value === 'object') {
					if (Array.isArray(value)) {
						const nodes = /** @type {Array<unknown>} */ (value);
						for (let i = 0; i < nodes.length; i += 1) {
							const item = nodes[i];
							if (isNode(item)) {
								if (!this.visit(item, node, key, i)) {
									// removed
									i--;
								}
							}
						}
					} else if (isNode(value)) {
						this.visit(value, node, key, null);
					}
				}
			}

			if (this.leave) {
				const _replacement = this.replacement;
				const _should_remove = this.should_remove;
				this.replacement = null;
				this.should_remove = false;

				this.leave.call(this.context, node, parent, prop, index);

				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}

				if (this.should_remove) {
					this.remove(parent, prop, index);
				}

				const removed = this.should_remove;

				this.replacement = _replacement;
				this.should_remove = _should_remove;

				if (removed) return null;
			}
		}

		return node;
	}
}

/**
 * Ducktype a node.
 *
 * @param {unknown} value
 * @returns {value is Node}
 */
function isNode(value) {
	return (
		value !== null && typeof value === 'object' && 'type' in value && typeof value.type === 'string'
	);
}

/**
 * @typedef {import('estree').Node} Node
 * @typedef {import('./sync.js').SyncHandler} SyncHandler
 * @typedef {import('./async.js').AsyncHandler} AsyncHandler
 */

/**
 * @param {Node} ast
 * @param {{
 *   enter?: SyncHandler
 *   leave?: SyncHandler
 * }} walker
 * @returns {Node | null}
 */
function walk(ast, { enter, leave }) {
	const instance = new SyncWalker(enter, leave);
	return instance.visit(ast, null);
}

async function detectImportsAcorn(code, ctx, options) {
  const s = bundle.getMagicString(code);
  const map = await ctx.getImportMap();
  let matchedImports = [];
  const enableAutoImport = options?.autoImport !== false;
  const enableTransformVirtualImports = options?.transformVirtualImports !== false && ctx.options.virtualImports?.length;
  if (enableAutoImport || enableTransformVirtualImports) {
    const ast = bundle.parse(s.original, {
      sourceType: "module",
      ecmaVersion: "latest",
      locations: true
    });
    const virtualImports = createVirtualImportsAcronWalker(map, ctx.options.virtualImports);
    const scopes = traveseScopes(
      ast,
      enableTransformVirtualImports ? virtualImports.walk : {}
    );
    if (enableAutoImport) {
      const identifiers = scopes.unmatched;
      matchedImports.push(
        ...Array.from(identifiers).map((name) => {
          const item = map.get(name);
          if (item && !item.disabled)
            return item;
          return null;
        }).filter(Boolean)
      );
      for (const addon of ctx.addons)
        matchedImports = await addon.matchImports?.call(ctx, identifiers, matchedImports) || matchedImports;
    }
    virtualImports.ranges.forEach(([start, end]) => {
      s.remove(start, end);
    });
    matchedImports.push(...virtualImports.imports);
  }
  return {
    s,
    strippedCode: code.toString(),
    matchedImports,
    isCJSContext: false,
    firstOccurrence: 0
    // TODO:
  };
}
function traveseScopes(ast, additionalWalk) {
  const scopes = [];
  let scopeCurrent = void 0;
  const scopesStack = [];
  function pushScope(node) {
    scopeCurrent = {
      node,
      parent: scopeCurrent,
      declarations: /* @__PURE__ */ new Set(),
      references: /* @__PURE__ */ new Set()
    };
    scopes.push(scopeCurrent);
    scopesStack.push(scopeCurrent);
  }
  function popScope(node) {
    const scope = scopesStack.pop();
    if (scope?.node !== node)
      throw new Error("Scope mismatch");
    scopeCurrent = scopesStack[scopesStack.length - 1];
  }
  pushScope(void 0);
  walk(ast, {
    enter(node, parent, prop, index) {
      additionalWalk?.enter?.call(this, node, parent, prop, index);
      switch (node.type) {
        // ====== Declaration ======
        case "ImportSpecifier":
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
          scopeCurrent.declarations.add(node.local.name);
          return;
        case "FunctionDeclaration":
        case "ClassDeclaration":
          if (node.id)
            scopeCurrent.declarations.add(node.id.name);
          return;
        case "VariableDeclarator":
          if (node.id.type === "Identifier") {
            scopeCurrent.declarations.add(node.id.name);
          } else {
            walk(node.id, {
              enter(node2) {
                if (node2.type === "ObjectPattern") {
                  node2.properties.forEach((i) => {
                    if (i.type === "Property" && i.value.type === "Identifier")
                      scopeCurrent.declarations.add(i.value.name);
                    else if (i.type === "RestElement" && i.argument.type === "Identifier")
                      scopeCurrent.declarations.add(i.argument.name);
                  });
                } else if (node2.type === "ArrayPattern") {
                  node2.elements.forEach((i) => {
                    if (i?.type === "Identifier")
                      scopeCurrent.declarations.add(i.name);
                    if (i?.type === "RestElement" && i.argument.type === "Identifier")
                      scopeCurrent.declarations.add(i.argument.name);
                  });
                }
              }
            });
          }
          return;
        // ====== Scope ======
        case "BlockStatement":
          pushScope(node);
          return;
        // ====== Reference ======
        case "Identifier":
          switch (parent?.type) {
            case "CallExpression":
              if (parent.callee === node || parent.arguments.includes(node))
                scopeCurrent.references.add(node.name);
              return;
            case "MemberExpression":
              if (parent.object === node)
                scopeCurrent.references.add(node.name);
              return;
            case "VariableDeclarator":
              if (parent.init === node)
                scopeCurrent.references.add(node.name);
              return;
            case "SpreadElement":
              if (parent.argument === node)
                scopeCurrent.references.add(node.name);
              return;
            case "ClassDeclaration":
              if (parent.superClass === node)
                scopeCurrent.references.add(node.name);
              return;
            case "Property":
              if (parent.value === node)
                scopeCurrent.references.add(node.name);
              return;
            case "TemplateLiteral":
              if (parent.expressions.includes(node))
                scopeCurrent.references.add(node.name);
              return;
            case "AssignmentExpression":
              if (parent.right === node)
                scopeCurrent.references.add(node.name);
              return;
            case "IfStatement":
            case "WhileStatement":
            case "DoWhileStatement":
              if (parent.test === node)
                scopeCurrent.references.add(node.name);
              return;
            case "SwitchStatement":
              if (parent.discriminant === node)
                scopeCurrent.references.add(node.name);
              return;
          }
          if (parent?.type.includes("Expression"))
            scopeCurrent.references.add(node.name);
      }
    },
    leave(node, parent, prop, index) {
      additionalWalk?.leave?.call(this, node, parent, prop, index);
      switch (node.type) {
        case "BlockStatement":
          popScope(node);
      }
    }
  });
  const unmatched = /* @__PURE__ */ new Set();
  for (const scope of scopes) {
    for (const name of scope.references) {
      let defined = false;
      let parent = scope;
      while (parent) {
        if (parent.declarations.has(name)) {
          defined = true;
          break;
        }
        parent = parent?.parent;
      }
      if (!defined)
        unmatched.add(name);
    }
  }
  return {
    unmatched,
    scopes
  };
}
function createVirtualImportsAcronWalker(importMap, virtualImports = []) {
  const imports = [];
  const ranges = [];
  return {
    imports,
    ranges,
    walk: {
      enter(node) {
        if (node.type === "ImportDeclaration") {
          if (virtualImports.includes(node.source.value)) {
            ranges.push([node.start, node.end]);
            node.specifiers.forEach((i) => {
              if (i.type === "ImportSpecifier" && i.imported.type === "Identifier") {
                const original = importMap.get(i.imported.name);
                if (!original)
                  throw new Error(`[unimport] failed to find "${i.imported.name}" imported from "${node.source.value}"`);
                imports.push({
                  from: original.from,
                  name: original.name,
                  as: i.local.name
                });
              }
            });
          }
        }
      }
    }
  };
}

exports.createVirtualImportsAcronWalker = createVirtualImportsAcronWalker;
exports.detectImportsAcorn = detectImportsAcorn;
exports.traveseScopes = traveseScopes;
//# sourceMappingURL=detect-acorn-CrlyhzG_.js.map
