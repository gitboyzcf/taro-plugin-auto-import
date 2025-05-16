'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_path = require('node:path');
var picomatch = require('picomatch');
var acorn = require('acorn');
var node_buffer = require('node:buffer');
require('node:fs');

//#region src/utils/general.ts
function toArray(array) {
	array = array || [];
	if (Array.isArray(array)) return array;
	return [array];
}

//#endregion
//#region src/utils/filter.ts
const BACKSLASH_REGEX = /\\/g;
function normalize$1(path$1) {
	return path$1.replace(BACKSLASH_REGEX, "/");
}
const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Z]:)?[/\\|])/i;
function isAbsolute$1(path$1) {
	return ABSOLUTE_PATH_REGEX.test(path$1);
}
function getMatcherString(glob, cwd) {
	if (glob.startsWith("**") || isAbsolute$1(glob)) return normalize$1(glob);
	const resolved = node_path.resolve(cwd, glob);
	return normalize$1(resolved);
}
function patternToIdFilter(pattern) {
	if (pattern instanceof RegExp) return (id) => {
		const normalizedId = normalize$1(id);
		const result = pattern.test(normalizedId);
		pattern.lastIndex = 0;
		return result;
	};
	const cwd = process.cwd();
	const glob = getMatcherString(pattern, cwd);
	const matcher = picomatch(glob, { dot: true });
	return (id) => {
		const normalizedId = normalize$1(id);
		return matcher(normalizedId);
	};
}
function createFilter(exclude, include) {
	if (!exclude && !include) return;
	return (input) => {
		if (exclude?.some((filter) => filter(input))) return false;
		if (include?.some((filter) => filter(input))) return true;
		return !(include && include.length > 0);
	};
}
function normalizeFilter(filter) {
	if (typeof filter === "string" || filter instanceof RegExp) return { include: [filter] };
	if (Array.isArray(filter)) return { include: filter };
	return {
		exclude: filter.exclude ? toArray(filter.exclude) : void 0,
		include: filter.include ? toArray(filter.include) : void 0
	};
}
function createIdFilter(filter) {
	if (!filter) return;
	const { exclude, include } = normalizeFilter(filter);
	const excludeFilter = exclude?.map(patternToIdFilter);
	const includeFilter = include?.map(patternToIdFilter);
	return createFilter(excludeFilter, includeFilter);
}
function createFilterForId(filter) {
	const filterFunction = createIdFilter(filter);
	return filterFunction ? (id) => !!filterFunction(id) : void 0;
}
function normalizeObjectHook(name, hook) {
	let handler;
	let filter;
	if (typeof hook === "function") handler = hook;
	else {
		handler = hook.handler;
		const hookFilter = hook.filter;
		filter = createFilterForId(hookFilter?.id);
	}
	return {
		handler,
		filter: filter || (() => true)
	};
}

//#endregion
//#region src/utils/context.ts
function parse(code, opts = {}) {
	return acorn.Parser.parse(code, {
		sourceType: "module",
		ecmaVersion: "latest",
		locations: true,
		...opts
	});
}

function normalizeAbsolutePath(path$1) {
	if (node_path.isAbsolute(path$1)) return node_path.normalize(path$1);
	else return path$1;
}

//#region src/rspack/context.ts
function createBuildContext(compiler, compilation, loaderContext) {
	return {
		getNativeBuildContext() {
			return {
				framework: "rspack",
				compiler,
				compilation,
				loaderContext
			};
		},
		addWatchFile(file) {
			const cwd = process.cwd();
			compilation.fileDependencies.add(node_path.resolve(cwd, file));
		},
		getWatchFiles() {
			return Array.from(compilation.fileDependencies);
		},
		parse,
		emitFile(emittedFile) {
			const outFileName = emittedFile.fileName || emittedFile.name;
			if (emittedFile.source && outFileName) {
				const { sources } = compilation.compiler.webpack;
				compilation.emitAsset(outFileName, new sources.RawSource(typeof emittedFile.source === "string" ? emittedFile.source : node_buffer.Buffer.from(emittedFile.source)));
			}
		}
	};
}
function createContext(loader) {
	return {
		error: (error) => loader.emitError(normalizeMessage(error)),
		warn: (message) => loader.emitWarning(normalizeMessage(message))
	};
}
function normalizeMessage(error) {
	const err = new Error(typeof error === "string" ? error : error.message);
	if (typeof error === "object") {
		err.stack = error.stack;
		err.cause = error.meta;
	}
	return err;
}

function decodeVirtualModuleId(encoded, _plugin) {
	return decodeURIComponent(node_path.basename(encoded));
}
function isVirtualModuleId(encoded, plugin) {
	return node_path.dirname(encoded) === plugin.__virtualModulePrefix;
}

//#region src/rspack/loaders/load.ts
async function load(source, map) {
	const callback = this.async();
	const { plugin } = this.query;
	let id = this.resource;
	if (!plugin?.load || !id) return callback(null, source, map);
	if (isVirtualModuleId(id, plugin)) id = decodeVirtualModuleId(id);
	const context = createContext(this);
	const { handler } = normalizeObjectHook("load", plugin.load);
	const res = await handler.call(Object.assign({}, this._compilation && createBuildContext(this._compiler, this._compilation, this), context), normalizeAbsolutePath(id));
	if (res == null) callback(null, source, map);
	else if (typeof res !== "string") callback(null, res.code, res.map ?? map);
	else callback(null, res, map);
}

exports.default = load;
//# sourceMappingURL=load.js.map
