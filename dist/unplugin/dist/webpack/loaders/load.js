'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_path = require('node:path');
var picomatch = require('picomatch');
var acorn = require('acorn');
var node_buffer = require('node:buffer');
var process$1 = require('node:process');
var node_module = require('node:module');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
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

const require$1 = node_module.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('load.js', document.baseURI).href)));
function getSource(fileSource) {
	const webpack = require$1("webpack");
	return new webpack.sources.RawSource(typeof fileSource === "string" ? fileSource : node_buffer.Buffer.from(fileSource.buffer));
}
function createBuildContext(options, compiler, compilation, loaderContext) {
	return {
		parse,
		addWatchFile(id) {
			options.addWatchFile(node_path.resolve(process$1.cwd(), id));
		},
		emitFile(emittedFile) {
			const outFileName = emittedFile.fileName || emittedFile.name;
			if (emittedFile.source && outFileName) {
				if (!compilation) throw new Error("unplugin/webpack: emitFile outside supported hooks  (buildStart, buildEnd, load, transform, watchChange)");
				compilation.emitAsset(outFileName, getSource(emittedFile.source));
			}
		},
		getWatchFiles() {
			return options.getWatchFiles();
		},
		getNativeBuildContext() {
			return {
				framework: "webpack",
				compiler,
				compilation,
				loaderContext
			};
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

//#region src/webpack/loaders/load.ts
async function load(source, map) {
	const callback = this.async();
	const { plugin } = this.query;
	let id = this.resource;
	if (!plugin?.load || !id) return callback(null, source, map);
	if (id.startsWith(plugin.__virtualModulePrefix)) id = decodeURIComponent(id.slice(plugin.__virtualModulePrefix.length));
	const context = createContext(this);
	const { handler } = normalizeObjectHook("load", plugin.load);
	const res = await handler.call(Object.assign({}, createBuildContext({
		addWatchFile: (file) => {
			this.addDependency(file);
		},
		getWatchFiles: () => {
			return this.getDependencies();
		}
	}, this._compiler, this._compilation, this), context), normalizeAbsolutePath(id));
	if (res == null) callback(null, source, map);
	else if (typeof res !== "string") callback(null, res.code, res.map ?? map);
	else callback(null, res, map);
}

exports.default = load;
