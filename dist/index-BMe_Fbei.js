'use strict';

var fs = require('node:fs');
var node_url = require('node:url');
var path = require('node:path');
var assert = require('node:assert');
var process$1 = require('node:process');
var v8 = require('node:v8');
var node_util = require('node:util');
var fsPromises = require('node:fs/promises');
var bundle = require('./bundle.js');
require('node:module');
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

const b=/^(?:( )+|\t+)/,d$1="space",h$1="tab";function g(e,t){const n=new Map;let s=0,o,i;for(const c of e.split(/\n/g)){if(!c)continue;let f,a,l,p,r;const y=c.match(b);if(y===null)s=0,o="";else {if(f=y[0].length,a=y[1]?d$1:h$1,t&&a===d$1&&f===1)continue;a!==o&&(s=0),o=a,l=1,p=0;const u=f-s;if(s=f,u===0)l=0,p=1;else {const I=u>0?u:-u;i=T(a,I);}r=n.get(i),r=r===void 0?[1,0]:[r[0]+l,r[1]+p],n.set(i,r);}}return n}function T(e,t){return (e===d$1?"s":"t")+String(t)}function w(e){const n=e[0]==="s"?d$1:h$1,s=Number(e.slice(1));return {type:n,amount:s}}function E(e){let t,n=0,s=0;for(const[o,[i,c]]of e)(i>n||i===n&&c>s)&&(n=i,s=c,t=o);return t}function S$2(e,t){return (e===d$1?" ":"	").repeat(t)}function _(e){if(typeof e!="string")throw new TypeError("Expected a string");let t=g(e,true);t.size===0&&(t=g(e,false));const n=E(t);let s,o=0,i="";return n!==void 0&&({type:s,amount:o}=w(n),i=S$2(s,o)),{amount:o,type:s,indent:i}}const m=Symbol.for("__confbox_fmt__"),k=/^(\s+)/,v=/(\s+)$/;function x$2(e,t={}){const n=t.indent===void 0&&t.preserveIndentation!==false&&e.slice(0,t?.sampleSize||1024),s=t.preserveWhitespace===false?void 0:{start:k.exec(e)?.[0]||"",end:v.exec(e)?.[0]||""};return {sample:n,whiteSpace:s}}function N$1(e,t,n){!t||typeof t!="object"||Object.defineProperty(t,m,{enumerable:false,configurable:true,writable:true,value:x$2(e,n)});}function C(e,t){if(!e||typeof e!="object"||!(m in e))return {indent:2,whitespace:{start:"",end:""}};const n=e[m];return {indent:_(n.sample||"").indent,whitespace:n.whiteSpace||{start:"",end:""}}}

function $$1(n,l=false){const g=n.length;let e=0,u="",p=0,k=16,A=0,o=0,O=0,B=0,b=0;function I(i,T){let s=0,c=0;for(;s<i;){let t=n.charCodeAt(e);if(t>=48&&t<=57)c=c*16+t-48;else if(t>=65&&t<=70)c=c*16+t-65+10;else if(t>=97&&t<=102)c=c*16+t-97+10;else break;e++,s++;}return s<i&&(c=-1),c}function V(i){e=i,u="",p=0,k=16,b=0;}function F(){let i=e;if(n.charCodeAt(e)===48)e++;else for(e++;e<n.length&&L(n.charCodeAt(e));)e++;if(e<n.length&&n.charCodeAt(e)===46)if(e++,e<n.length&&L(n.charCodeAt(e)))for(e++;e<n.length&&L(n.charCodeAt(e));)e++;else return b=3,n.substring(i,e);let T=e;if(e<n.length&&(n.charCodeAt(e)===69||n.charCodeAt(e)===101))if(e++,(e<n.length&&n.charCodeAt(e)===43||n.charCodeAt(e)===45)&&e++,e<n.length&&L(n.charCodeAt(e))){for(e++;e<n.length&&L(n.charCodeAt(e));)e++;T=e;}else b=3;return n.substring(i,T)}function a(){let i="",T=e;for(;;){if(e>=g){i+=n.substring(T,e),b=2;break}const s=n.charCodeAt(e);if(s===34){i+=n.substring(T,e),e++;break}if(s===92){if(i+=n.substring(T,e),e++,e>=g){b=2;break}switch(n.charCodeAt(e++)){case 34:i+='"';break;case 92:i+="\\";break;case 47:i+="/";break;case 98:i+="\b";break;case 102:i+="\f";break;case 110:i+=`
`;break;case 114:i+="\r";break;case 116:i+="	";break;case 117:const t=I(4);t>=0?i+=String.fromCharCode(t):b=4;break;default:b=5;}T=e;continue}if(s>=0&&s<=31)if(r(s)){i+=n.substring(T,e),b=2;break}else b=6;e++;}return i}function w(){if(u="",b=0,p=e,o=A,B=O,e>=g)return p=g,k=17;let i=n.charCodeAt(e);if(J(i)){do e++,u+=String.fromCharCode(i),i=n.charCodeAt(e);while(J(i));return k=15}if(r(i))return e++,u+=String.fromCharCode(i),i===13&&n.charCodeAt(e)===10&&(e++,u+=`
`),A++,O=e,k=14;switch(i){case 123:return e++,k=1;case 125:return e++,k=2;case 91:return e++,k=3;case 93:return e++,k=4;case 58:return e++,k=6;case 44:return e++,k=5;case 34:return e++,u=a(),k=10;case 47:const T=e-1;if(n.charCodeAt(e+1)===47){for(e+=2;e<g&&!r(n.charCodeAt(e));)e++;return u=n.substring(T,e),k=12}if(n.charCodeAt(e+1)===42){e+=2;const s=g-1;let c=false;for(;e<s;){const t=n.charCodeAt(e);if(t===42&&n.charCodeAt(e+1)===47){e+=2,c=true;break}e++,r(t)&&(t===13&&n.charCodeAt(e)===10&&e++,A++,O=e);}return c||(e++,b=1),u=n.substring(T,e),k=13}return u+=String.fromCharCode(i),e++,k=16;case 45:if(u+=String.fromCharCode(i),e++,e===g||!L(n.charCodeAt(e)))return k=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return u+=F(),k=11;default:for(;e<g&&v(i);)e++,i=n.charCodeAt(e);if(p!==e){switch(u=n.substring(p,e),u){case "true":return k=8;case "false":return k=9;case "null":return k=7}return k=16}return u+=String.fromCharCode(i),e++,k=16}}function v(i){if(J(i)||r(i))return  false;switch(i){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return  false}return  true}function j(){let i;do i=w();while(i>=12&&i<=15);return i}return {setPosition:V,getPosition:()=>e,scan:l?j:w,getToken:()=>k,getTokenValue:()=>u,getTokenOffset:()=>p,getTokenLength:()=>e-p,getTokenStartLine:()=>o,getTokenStartCharacter:()=>p-B,getTokenError:()=>b}}function J(n){return n===32||n===9}function r(n){return n===10||n===13}function L(n){return n>=48&&n<=57}var Q;((function(n){n[n.lineFeed=10]="lineFeed",n[n.carriageReturn=13]="carriageReturn",n[n.space=32]="space",n[n._0=48]="_0",n[n._1=49]="_1",n[n._2=50]="_2",n[n._3=51]="_3",n[n._4=52]="_4",n[n._5=53]="_5",n[n._6=54]="_6",n[n._7=55]="_7",n[n._8=56]="_8",n[n._9=57]="_9",n[n.a=97]="a",n[n.b=98]="b",n[n.c=99]="c",n[n.d=100]="d",n[n.e=101]="e",n[n.f=102]="f",n[n.g=103]="g",n[n.h=104]="h",n[n.i=105]="i",n[n.j=106]="j",n[n.k=107]="k",n[n.l=108]="l",n[n.m=109]="m",n[n.n=110]="n",n[n.o=111]="o",n[n.p=112]="p",n[n.q=113]="q",n[n.r=114]="r",n[n.s=115]="s",n[n.t=116]="t",n[n.u=117]="u",n[n.v=118]="v",n[n.w=119]="w",n[n.x=120]="x",n[n.y=121]="y",n[n.z=122]="z",n[n.A=65]="A",n[n.B=66]="B",n[n.C=67]="C",n[n.D=68]="D",n[n.E=69]="E",n[n.F=70]="F",n[n.G=71]="G",n[n.H=72]="H",n[n.I=73]="I",n[n.J=74]="J",n[n.K=75]="K",n[n.L=76]="L",n[n.M=77]="M",n[n.N=78]="N",n[n.O=79]="O",n[n.P=80]="P",n[n.Q=81]="Q",n[n.R=82]="R",n[n.S=83]="S",n[n.T=84]="T",n[n.U=85]="U",n[n.V=86]="V",n[n.W=87]="W",n[n.X=88]="X",n[n.Y=89]="Y",n[n.Z=90]="Z",n[n.asterisk=42]="asterisk",n[n.backslash=92]="backslash",n[n.closeBrace=125]="closeBrace",n[n.closeBracket=93]="closeBracket",n[n.colon=58]="colon",n[n.comma=44]="comma",n[n.dot=46]="dot",n[n.doubleQuote=34]="doubleQuote",n[n.minus=45]="minus",n[n.openBrace=123]="openBrace",n[n.openBracket=91]="openBracket",n[n.plus=43]="plus",n[n.slash=47]="slash",n[n.formFeed=12]="formFeed",n[n.tab=9]="tab";}))(Q||(Q={})),new Array(20).fill(0).map((n,l)=>" ".repeat(l));const N=200;new Array(N).fill(0).map((n,l)=>`
`+" ".repeat(l)),new Array(N).fill(0).map((n,l)=>"\r"+" ".repeat(l)),new Array(N).fill(0).map((n,l)=>`\r
`+" ".repeat(l)),new Array(N).fill(0).map((n,l)=>`
`+"	".repeat(l)),new Array(N).fill(0).map((n,l)=>"\r"+"	".repeat(l)),new Array(N).fill(0).map((n,l)=>`\r
`+"	".repeat(l));var U;(function(n){n.DEFAULT={allowTrailingComma:false};})(U||(U={}));function S$1(n,l=[],g=U.DEFAULT){let e=null,u=[];const p=[];function k(o){Array.isArray(u)?u.push(o):e!==null&&(u[e]=o);}return P(n,{onObjectBegin:()=>{const o={};k(o),p.push(u),u=o,e=null;},onObjectProperty:o=>{e=o;},onObjectEnd:()=>{u=p.pop();},onArrayBegin:()=>{const o=[];k(o),p.push(u),u=o,e=null;},onArrayEnd:()=>{u=p.pop();},onLiteralValue:k,onError:(o,O,B)=>{l.push({error:o,offset:O,length:B});}},g),u[0]}function P(n,l,g=U.DEFAULT){const e=$$1(n,false),u=[];let p=0;function k(f){return f?()=>p===0&&f(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter()):()=>true}function A(f){return f?m=>p===0&&f(m,e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter()):()=>true}function o(f){return f?m=>p===0&&f(m,e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter(),()=>u.slice()):()=>true}function O(f){return f?()=>{p>0?p++:f(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter(),()=>u.slice())===false&&(p=1);}:()=>true}function B(f){return f?()=>{p>0&&p--,p===0&&f(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter());}:()=>true}const b=O(l.onObjectBegin),I=o(l.onObjectProperty),V=B(l.onObjectEnd),F=O(l.onArrayBegin),a=B(l.onArrayEnd),w=o(l.onLiteralValue),v=A(l.onSeparator),j=k(l.onComment),i=A(l.onError),T=g&&g.disallowComments,s=g&&g.allowTrailingComma;function c(){for(;;){const f=e.scan();switch(e.getTokenError()){case 4:t(14);break;case 5:t(15);break;case 3:t(13);break;case 1:T||t(11);break;case 2:t(12);break;case 6:t(16);break}switch(f){case 12:case 13:T?t(10):j();break;case 16:t(1);break;case 15:case 14:break;default:return f}}}function t(f,m=[],y=[]){if(i(f),m.length+y.length>0){let _=e.getToken();for(;_!==17;){if(m.indexOf(_)!==-1){c();break}else if(y.indexOf(_)!==-1)break;_=c();}}}function D(f){const m=e.getTokenValue();return f?w(m):(I(m),u.push(m)),c(),true}function G(){switch(e.getToken()){case 11:const f=e.getTokenValue();let m=Number(f);isNaN(m)&&(t(2),m=0),w(m);break;case 7:w(null);break;case 8:w(true);break;case 9:w(false);break;default:return  false}return c(),true}function M(){return e.getToken()!==10?(t(3,[],[2,5]),false):(D(false),e.getToken()===6?(v(":"),c(),E()||t(4,[],[2,5])):t(5,[],[2,5]),u.pop(),true)}function X(){b(),c();let f=false;for(;e.getToken()!==2&&e.getToken()!==17;){if(e.getToken()===5){if(f||t(4,[],[]),v(","),c(),e.getToken()===2&&s)break}else f&&t(6,[],[]);M()||t(4,[],[2,5]),f=true;}return V(),e.getToken()!==2?t(7,[2],[]):c(),true}function Y(){F(),c();let f=true,m=false;for(;e.getToken()!==4&&e.getToken()!==17;){if(e.getToken()===5){if(m||t(4,[],[]),v(","),c(),e.getToken()===4&&s)break}else m&&t(6,[],[]);f?(u.push(0),f=false):u[u.length-1]++,E()||t(4,[],[4,5]),m=true;}return a(),f||u.pop(),e.getToken()!==4?t(8,[4],[]):c(),true}function E(){switch(e.getToken()){case 3:return Y();case 1:return X();case 10:return D(true);default:return G()}}return c(),e.getToken()===17?g.allowEmptyContent?true:(t(4,[],[]),false):E()?(e.getToken()!==17&&t(9,[],[]),true):(t(4,[],[]),false)}var W;(function(n){n[n.None=0]="None",n[n.UnexpectedEndOfComment=1]="UnexpectedEndOfComment",n[n.UnexpectedEndOfString=2]="UnexpectedEndOfString",n[n.UnexpectedEndOfNumber=3]="UnexpectedEndOfNumber",n[n.InvalidUnicode=4]="InvalidUnicode",n[n.InvalidEscapeCharacter=5]="InvalidEscapeCharacter",n[n.InvalidCharacter=6]="InvalidCharacter";})(W||(W={}));var H;(function(n){n[n.OpenBraceToken=1]="OpenBraceToken",n[n.CloseBraceToken=2]="CloseBraceToken",n[n.OpenBracketToken=3]="OpenBracketToken",n[n.CloseBracketToken=4]="CloseBracketToken",n[n.CommaToken=5]="CommaToken",n[n.ColonToken=6]="ColonToken",n[n.NullKeyword=7]="NullKeyword",n[n.TrueKeyword=8]="TrueKeyword",n[n.FalseKeyword=9]="FalseKeyword",n[n.StringLiteral=10]="StringLiteral",n[n.NumericLiteral=11]="NumericLiteral",n[n.LineCommentTrivia=12]="LineCommentTrivia",n[n.BlockCommentTrivia=13]="BlockCommentTrivia",n[n.LineBreakTrivia=14]="LineBreakTrivia",n[n.Trivia=15]="Trivia",n[n.Unknown=16]="Unknown",n[n.EOF=17]="EOF";})(H||(H={}));const K=S$1;var q;(function(n){n[n.InvalidSymbol=1]="InvalidSymbol",n[n.InvalidNumberFormat=2]="InvalidNumberFormat",n[n.PropertyNameExpected=3]="PropertyNameExpected",n[n.ValueExpected=4]="ValueExpected",n[n.ColonExpected=5]="ColonExpected",n[n.CommaExpected=6]="CommaExpected",n[n.CloseBraceExpected=7]="CloseBraceExpected",n[n.CloseBracketExpected=8]="CloseBracketExpected",n[n.EndOfFileExpected=9]="EndOfFileExpected",n[n.InvalidCommentToken=10]="InvalidCommentToken",n[n.UnexpectedEndOfComment=11]="UnexpectedEndOfComment",n[n.UnexpectedEndOfString=12]="UnexpectedEndOfString",n[n.UnexpectedEndOfNumber=13]="UnexpectedEndOfNumber",n[n.InvalidUnicode=14]="InvalidUnicode",n[n.InvalidEscapeCharacter=15]="InvalidEscapeCharacter",n[n.InvalidCharacter=16]="InvalidCharacter";})(q||(q={}));function x$1(n,l){const g=JSON.parse(n,l?.reviver);return N$1(n,g,l),g}function z(n,l){const g=C(n),e=JSON.stringify(n,l?.replacer,g.indent);return g.whitespace.start+e+g.whitespace.end}function h(n,l){const g=K(n,l?.errors,l);return N$1(n,g,l),g}function d(n,l){return z(n,l)}

var O,x;function j(){if(x)return O;x=1;const{hasOwnProperty:y}=Object.prototype,d=(e,t={})=>{typeof t=="string"&&(t={section:t}),t.align=t.align===true,t.newline=t.newline===true,t.sort=t.sort===true,t.whitespace=t.whitespace===true||t.align===true,t.platform=t.platform||typeof process<"u"&&process.platform,t.bracketedArray=t.bracketedArray!==false;const s=t.platform==="win32"?`\r
`:`
`,r=t.whitespace?" = ":"=",c=[],o=t.sort?Object.keys(e).sort():Object.keys(e);let g=0;t.align&&(g=h(o.filter(n=>e[n]===null||Array.isArray(e[n])||typeof e[n]!="object").map(n=>Array.isArray(e[n])?`${n}[]`:n).concat([""]).reduce((n,i)=>h(n).length>=h(i).length?n:i)).length);let l="";const m=t.bracketedArray?"[]":"";for(const n of o){const i=e[n];if(i&&Array.isArray(i))for(const f of i)l+=h(`${n}${m}`).padEnd(g," ")+r+h(f)+s;else i&&typeof i=="object"?c.push(n):l+=h(n).padEnd(g," ")+r+h(i)+s;}t.section&&l.length&&(l="["+h(t.section)+"]"+(t.newline?s+s:s)+l);for(const n of c){const i=k(n,".").join("\\."),f=(t.section?t.section+".":"")+i,u=d(e[n],{...t,section:f});l.length&&u.length&&(l+=s),l+=u;}return l};function k(e,t){var s=0,r=0,c=0,o=[];do if(c=e.indexOf(t,s),c!==-1){if(s=c+t.length,c>0&&e[c-1]==="\\")continue;o.push(e.slice(r,c)),r=c+t.length;}while(c!==-1);return o.push(e.slice(r)),o}const w=(e,t={})=>{t.bracketedArray=t.bracketedArray!==false;const s=Object.create(null);let r=s,c=null;const o=/^\[([^\]]*)\]\s*$|^([^=]+)(=(.*))?$/i,g=e.split(/[\r\n]+/g),l={};for(const n of g){if(!n||n.match(/^\s*[;#]/)||n.match(/^\s*$/))continue;const i=n.match(o);if(!i)continue;if(i[1]!==void 0){if(c=A(i[1]),c==="__proto__"){r=Object.create(null);continue}r=s[c]=s[c]||Object.create(null);continue}const f=A(i[2]);let u;t.bracketedArray?u=f.length>2&&f.slice(-2)==="[]":(l[f]=(l?.[f]||0)+1,u=l[f]>1);const a=u&&f.endsWith("[]")?f.slice(0,-2):f;if(a==="__proto__")continue;const p=i[3]?A(i[4]):true,b=p==="true"||p==="false"||p==="null"?JSON.parse(p):p;u&&(y.call(r,a)?Array.isArray(r[a])||(r[a]=[r[a]]):r[a]=[]),Array.isArray(r[a])?r[a].push(b):r[a]=b;}const m=[];for(const n of Object.keys(s)){if(!y.call(s,n)||typeof s[n]!="object"||Array.isArray(s[n]))continue;const i=k(n,".");r=s;const f=i.pop(),u=f.replace(/\\\./g,".");for(const a of i)a!=="__proto__"&&((!y.call(r,a)||typeof r[a]!="object")&&(r[a]=Object.create(null)),r=r[a]);r===s&&u===f||(r[u]=s[n],m.push(n));}for(const n of m)delete s[n];return s},_=e=>e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"),h=e=>typeof e!="string"||e.match(/[=\r\n]/)||e.match(/^\[/)||e.length>1&&_(e)||e!==e.trim()?JSON.stringify(e):e.split(";").join("\\;").split("#").join("\\#"),A=e=>{if(e=(e||"").trim(),_(e)){e.charAt(0)==="'"&&(e=e.slice(1,-1));try{e=JSON.parse(e);}catch{}}else {let t=false,s="";for(let r=0,c=e.length;r<c;r++){const o=e.charAt(r);if(t)"\\;#".indexOf(o)!==-1?s+=o:s+="\\"+o,t=false;else {if(";#".indexOf(o)!==-1)break;o==="\\"?t=true:s+=o;}}return t&&(s+="\\"),s.trim()}return e};return O={parse:w,decode:w,stringify:d,encode:d,safe:h,unsafe:A},O}var I=j();function S(y,d){return I.parse(y,d)}function $(y,d){return I.stringify(y,{whitespace:true,...d})}

const nodeBuiltins = [
  "_http_agent",
  "_http_client",
  "_http_common",
  "_http_incoming",
  "_http_outgoing",
  "_http_server",
  "_stream_duplex",
  "_stream_passthrough",
  "_stream_readable",
  "_stream_transform",
  "_stream_wrap",
  "_stream_writable",
  "_tls_common",
  "_tls_wrap",
  "assert",
  "assert/strict",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "dns/promises",
  "domain",
  "events",
  "fs",
  "fs/promises",
  "http",
  "http2",
  "https",
  "inspector",
  "inspector/promises",
  "module",
  "net",
  "os",
  "path",
  "path/posix",
  "path/win32",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "readline/promises",
  "repl",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "sys",
  "timers",
  "timers/promises",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "util/types",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib"
];

const own$1 = {}.hasOwnProperty;
const classRegExp = /^([A-Z][a-z\d]*)+$/;
const kTypes = /* @__PURE__ */ new Set([
  "string",
  "function",
  "number",
  "object",
  // Accept 'Function' and 'Object' as alternative to the lower cased version.
  "Function",
  "Object",
  "boolean",
  "bigint",
  "symbol"
]);
const messages = /* @__PURE__ */ new Map();
const nodeInternalPrefix = "__node_internal_";
let userStackTraceLimit;
function formatList(array, type = "and") {
  return array.length < 3 ? array.join(` ${type} `) : `${array.slice(0, -1).join(", ")}, ${type} ${array.at(-1)}`;
}
function createError(sym, value, constructor) {
  messages.set(sym, value);
  return makeNodeErrorWithCode(constructor, sym);
}
function makeNodeErrorWithCode(Base, key) {
  return function NodeError(...parameters) {
    const limit = Error.stackTraceLimit;
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = 0;
    const error = new Base();
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = limit;
    const message = getMessage(key, parameters, error);
    Object.defineProperties(error, {
      // Note: no need to implement `kIsNodeError` symbol, would be hard,
      // probably.
      message: {
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      toString: {
        /** @this {Error} */
        value() {
          return `${this.name} [${key}]: ${this.message}`;
        },
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    captureLargerStackTrace(error);
    error.code = key;
    return error;
  };
}
function isErrorStackTraceLimitWritable() {
  try {
    if (v8.startupSnapshot.isBuildingSnapshot()) {
      return false;
    }
  } catch {
  }
  const desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
  if (desc === void 0) {
    return Object.isExtensible(Error);
  }
  return own$1.call(desc, "writable") && desc.writable !== void 0 ? desc.writable : desc.set !== void 0;
}
function hideStackFrames(wrappedFunction) {
  const hidden = nodeInternalPrefix + wrappedFunction.name;
  Object.defineProperty(wrappedFunction, "name", { value: hidden });
  return wrappedFunction;
}
const captureLargerStackTrace = hideStackFrames(function(error) {
  const stackTraceLimitIsWritable = isErrorStackTraceLimitWritable();
  if (stackTraceLimitIsWritable) {
    userStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Number.POSITIVE_INFINITY;
  }
  Error.captureStackTrace(error);
  if (stackTraceLimitIsWritable) Error.stackTraceLimit = userStackTraceLimit;
  return error;
});
function getMessage(key, parameters, self) {
  const message = messages.get(key);
  assert(message !== void 0, "expected `message` to be found");
  if (typeof message === "function") {
    assert(
      message.length <= parameters.length,
      // Default options do not count.
      `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${message.length}).`
    );
    return Reflect.apply(message, self, parameters);
  }
  const regex = /%[dfijoOs]/g;
  let expectedLength = 0;
  while (regex.exec(message) !== null) expectedLength++;
  assert(
    expectedLength === parameters.length,
    `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${expectedLength}).`
  );
  if (parameters.length === 0) return message;
  parameters.unshift(message);
  return Reflect.apply(node_util.format, null, parameters);
}
function determineSpecificType(value) {
  if (value === null || value === void 0) {
    return String(value);
  }
  if (typeof value === "function" && value.name) {
    return `function ${value.name}`;
  }
  if (typeof value === "object") {
    if (value.constructor && value.constructor.name) {
      return `an instance of ${value.constructor.name}`;
    }
    return `${node_util.inspect(value, { depth: -1 })}`;
  }
  let inspected = node_util.inspect(value, { colors: false });
  if (inspected.length > 28) {
    inspected = `${inspected.slice(0, 25)}...`;
  }
  return `type ${typeof value} (${inspected})`;
}
createError(
  "ERR_INVALID_ARG_TYPE",
  (name, expected, actual) => {
    assert(typeof name === "string", "'name' must be a string");
    if (!Array.isArray(expected)) {
      expected = [expected];
    }
    let message = "The ";
    if (name.endsWith(" argument")) {
      message += `${name} `;
    } else {
      const type = name.includes(".") ? "property" : "argument";
      message += `"${name}" ${type} `;
    }
    message += "must be ";
    const types = [];
    const instances = [];
    const other = [];
    for (const value of expected) {
      assert(
        typeof value === "string",
        "All expected entries have to be of type string"
      );
      if (kTypes.has(value)) {
        types.push(value.toLowerCase());
      } else if (classRegExp.exec(value) === null) {
        assert(
          value !== "object",
          'The value "object" should be written as "Object"'
        );
        other.push(value);
      } else {
        instances.push(value);
      }
    }
    if (instances.length > 0) {
      const pos = types.indexOf("object");
      if (pos !== -1) {
        types.slice(pos, 1);
        instances.push("Object");
      }
    }
    if (types.length > 0) {
      message += `${types.length > 1 ? "one of type" : "of type"} ${formatList(
        types,
        "or"
      )}`;
      if (instances.length > 0 || other.length > 0) message += " or ";
    }
    if (instances.length > 0) {
      message += `an instance of ${formatList(instances, "or")}`;
      if (other.length > 0) message += " or ";
    }
    if (other.length > 0) {
      if (other.length > 1) {
        message += `one of ${formatList(other, "or")}`;
      } else {
        if (other[0]?.toLowerCase() !== other[0]) message += "an ";
        message += `${other[0]}`;
      }
    }
    message += `. Received ${determineSpecificType(actual)}`;
    return message;
  },
  TypeError
);
const ERR_INVALID_MODULE_SPECIFIER = createError(
  "ERR_INVALID_MODULE_SPECIFIER",
  /**
   * @param {string} request
   * @param {string} reason
   * @param {string} [base]
   */
  (request, reason, base) => {
    return `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ""}`;
  },
  TypeError
);
const ERR_INVALID_PACKAGE_CONFIG = createError(
  "ERR_INVALID_PACKAGE_CONFIG",
  (path, base, message) => {
    return `Invalid package config ${path}${base ? ` while importing ${base}` : ""}${message ? `. ${message}` : ""}`;
  },
  Error
);
const ERR_INVALID_PACKAGE_TARGET = createError(
  "ERR_INVALID_PACKAGE_TARGET",
  (packagePath, key, target, isImport = false, base) => {
    const relatedError = typeof target === "string" && !isImport && target.length > 0 && !target.startsWith("./");
    if (key === ".") {
      assert(isImport === false);
      return `Invalid "exports" main target ${JSON.stringify(target)} defined in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? '; targets must start with "./"' : ""}`;
    }
    return `Invalid "${isImport ? "imports" : "exports"}" target ${JSON.stringify(
      target
    )} defined for '${key}' in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? '; targets must start with "./"' : ""}`;
  },
  Error
);
const ERR_MODULE_NOT_FOUND = createError(
  "ERR_MODULE_NOT_FOUND",
  (path, base, exactUrl = false) => {
    return `Cannot find ${exactUrl ? "module" : "package"} '${path}' imported from ${base}`;
  },
  Error
);
createError(
  "ERR_NETWORK_IMPORT_DISALLOWED",
  "import of '%s' by %s is not supported: %s",
  Error
);
const ERR_PACKAGE_IMPORT_NOT_DEFINED = createError(
  "ERR_PACKAGE_IMPORT_NOT_DEFINED",
  (specifier, packagePath, base) => {
    return `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath || ""}package.json` : ""} imported from ${base}`;
  },
  TypeError
);
const ERR_PACKAGE_PATH_NOT_EXPORTED = createError(
  "ERR_PACKAGE_PATH_NOT_EXPORTED",
  /**
   * @param {string} packagePath
   * @param {string} subpath
   * @param {string} [base]
   */
  (packagePath, subpath, base) => {
    if (subpath === ".")
      return `No "exports" main defined in ${packagePath}package.json${base ? ` imported from ${base}` : ""}`;
    return `Package subpath '${subpath}' is not defined by "exports" in ${packagePath}package.json${base ? ` imported from ${base}` : ""}`;
  },
  Error
);
const ERR_UNSUPPORTED_DIR_IMPORT = createError(
  "ERR_UNSUPPORTED_DIR_IMPORT",
  "Directory import '%s' is not supported resolving ES modules imported from %s",
  Error
);
const ERR_UNSUPPORTED_RESOLVE_REQUEST = createError(
  "ERR_UNSUPPORTED_RESOLVE_REQUEST",
  'Failed to resolve module specifier "%s" from "%s": Invalid relative URL or base scheme is not hierarchical.',
  TypeError
);
const ERR_UNKNOWN_FILE_EXTENSION = createError(
  "ERR_UNKNOWN_FILE_EXTENSION",
  (extension, path) => {
    return `Unknown file extension "${extension}" for ${path}`;
  },
  TypeError
);
createError(
  "ERR_INVALID_ARG_VALUE",
  (name, value, reason = "is invalid") => {
    let inspected = node_util.inspect(value);
    if (inspected.length > 128) {
      inspected = `${inspected.slice(0, 128)}...`;
    }
    const type = name.includes(".") ? "property" : "argument";
    return `The ${type} '${name}' ${reason}. Received ${inspected}`;
  },
  TypeError
  // Note: extra classes have been shaken out.
  // , RangeError
);

const hasOwnProperty$1 = {}.hasOwnProperty;
const cache = /* @__PURE__ */ new Map();
function read(jsonPath, { base, specifier }) {
  const existing = cache.get(jsonPath);
  if (existing) {
    return existing;
  }
  let string;
  try {
    string = fs.readFileSync(path.toNamespacedPath(jsonPath), "utf8");
  } catch (error) {
    const exception = error;
    if (exception.code !== "ENOENT") {
      throw exception;
    }
  }
  const result = {
    exists: false,
    pjsonPath: jsonPath,
    main: void 0,
    name: void 0,
    type: "none",
    // Ignore unknown types for forwards compatibility
    exports: void 0,
    imports: void 0
  };
  if (string !== void 0) {
    let parsed;
    try {
      parsed = JSON.parse(string);
    } catch (error_) {
      const error = new ERR_INVALID_PACKAGE_CONFIG(
        jsonPath,
        (base ? `"${specifier}" from ` : "") + node_url.fileURLToPath(base || specifier),
        error_.message
      );
      error.cause = error_;
      throw error;
    }
    result.exists = true;
    if (hasOwnProperty$1.call(parsed, "name") && typeof parsed.name === "string") {
      result.name = parsed.name;
    }
    if (hasOwnProperty$1.call(parsed, "main") && typeof parsed.main === "string") {
      result.main = parsed.main;
    }
    if (hasOwnProperty$1.call(parsed, "exports")) {
      result.exports = parsed.exports;
    }
    if (hasOwnProperty$1.call(parsed, "imports")) {
      result.imports = parsed.imports;
    }
    if (hasOwnProperty$1.call(parsed, "type") && (parsed.type === "commonjs" || parsed.type === "module")) {
      result.type = parsed.type;
    }
  }
  cache.set(jsonPath, result);
  return result;
}
function getPackageScopeConfig(resolved) {
  let packageJSONUrl = new URL("package.json", resolved);
  while (true) {
    const packageJSONPath2 = packageJSONUrl.pathname;
    if (packageJSONPath2.endsWith("node_modules/package.json")) {
      break;
    }
    const packageConfig = read(node_url.fileURLToPath(packageJSONUrl), {
      specifier: resolved
    });
    if (packageConfig.exists) {
      return packageConfig;
    }
    const lastPackageJSONUrl = packageJSONUrl;
    packageJSONUrl = new URL("../package.json", packageJSONUrl);
    if (packageJSONUrl.pathname === lastPackageJSONUrl.pathname) {
      break;
    }
  }
  const packageJSONPath = node_url.fileURLToPath(packageJSONUrl);
  return {
    pjsonPath: packageJSONPath,
    exists: false,
    type: "none"
  };
}

const hasOwnProperty = {}.hasOwnProperty;
const extensionFormatMap = {
  __proto__: null,
  ".json": "json",
  ".cjs": "commonjs",
  ".cts": "commonjs",
  ".js": "module",
  ".ts": "module",
  ".mts": "module",
  ".mjs": "module"
};
const protocolHandlers = {
  __proto__: null,
  "data:": getDataProtocolModuleFormat,
  "file:": getFileProtocolModuleFormat,
  "node:": () => "builtin"
};
function mimeToFormat(mime) {
  if (mime && /\s*(text|application)\/javascript\s*(;\s*charset=utf-?8\s*)?/i.test(mime))
    return "module";
  if (mime === "application/json") return "json";
  return null;
}
function getDataProtocolModuleFormat(parsed) {
  const { 1: mime } = /^([^/]+\/[^;,]+)[^,]*?(;base64)?,/.exec(
    parsed.pathname
  ) || [null, null, null];
  return mimeToFormat(mime);
}
function extname(url) {
  const pathname = url.pathname;
  let index = pathname.length;
  while (index--) {
    const code = pathname.codePointAt(index);
    if (code === 47) {
      return "";
    }
    if (code === 46) {
      return pathname.codePointAt(index - 1) === 47 ? "" : pathname.slice(index);
    }
  }
  return "";
}
function getFileProtocolModuleFormat(url, _context, ignoreErrors) {
  const ext = extname(url);
  if (ext === ".js") {
    const { type: packageType } = getPackageScopeConfig(url);
    if (packageType !== "none") {
      return packageType;
    }
    return "commonjs";
  }
  if (ext === "") {
    const { type: packageType } = getPackageScopeConfig(url);
    if (packageType === "none" || packageType === "commonjs") {
      return "commonjs";
    }
    return "module";
  }
  const format = extensionFormatMap[ext];
  if (format) return format;
  if (ignoreErrors) {
    return void 0;
  }
  const filepath = node_url.fileURLToPath(url);
  throw new ERR_UNKNOWN_FILE_EXTENSION(ext, filepath);
}
function defaultGetFormatWithoutErrors(url, context) {
  const protocol = url.protocol;
  if (!hasOwnProperty.call(protocolHandlers, protocol)) {
    return null;
  }
  return protocolHandlers[protocol](url, context, true) || null;
}

const RegExpPrototypeSymbolReplace = RegExp.prototype[Symbol.replace];
const own = {}.hasOwnProperty;
const invalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))?(\\|\/|$)/i;
const deprecatedInvalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))(\\|\/|$)/i;
const invalidPackageNameRegEx = /^\.|%|\\/;
const patternRegEx = /\*/g;
const encodedSeparatorRegEx = /%2f|%5c/i;
const emittedPackageWarnings = /* @__PURE__ */ new Set();
const doubleSlashRegEx = /[/\\]{2}/;
function emitInvalidSegmentDeprecation(target, request, match, packageJsonUrl, internal, base, isTarget) {
  if (process$1.noDeprecation) {
    return;
  }
  const pjsonPath = node_url.fileURLToPath(packageJsonUrl);
  const double = doubleSlashRegEx.exec(isTarget ? target : request) !== null;
  process$1.emitWarning(
    `Use of deprecated ${double ? "double slash" : "leading or trailing slash matching"} resolving "${target}" for module request "${request}" ${request === match ? "" : `matched to "${match}" `}in the "${internal ? "imports" : "exports"}" field module resolution of the package at ${pjsonPath}${base ? ` imported from ${node_url.fileURLToPath(base)}` : ""}.`,
    "DeprecationWarning",
    "DEP0166"
  );
}
function emitLegacyIndexDeprecation(url, packageJsonUrl, base, main) {
  if (process$1.noDeprecation) {
    return;
  }
  const format = defaultGetFormatWithoutErrors(url, { parentURL: base.href });
  if (format !== "module") return;
  const urlPath = node_url.fileURLToPath(url.href);
  const packagePath = node_url.fileURLToPath(new node_url.URL(".", packageJsonUrl));
  const basePath = node_url.fileURLToPath(base);
  if (!main) {
    process$1.emitWarning(
      `No "main" or "exports" field defined in the package.json for ${packagePath} resolving the main entry point "${urlPath.slice(
        packagePath.length
      )}", imported from ${basePath}.
Default "index" lookups for the main are deprecated for ES modules.`,
      "DeprecationWarning",
      "DEP0151"
    );
  } else if (path.resolve(packagePath, main) !== urlPath) {
    process$1.emitWarning(
      `Package ${packagePath} has a "main" field set to "${main}", excluding the full filename and extension to the resolved file at "${urlPath.slice(
        packagePath.length
      )}", imported from ${basePath}.
 Automatic extension resolution of the "main" field is deprecated for ES modules.`,
      "DeprecationWarning",
      "DEP0151"
    );
  }
}
function tryStatSync(path2) {
  try {
    return fs.statSync(path2);
  } catch {
  }
}
function fileExists(url) {
  const stats = fs.statSync(url, { throwIfNoEntry: false });
  const isFile = stats ? stats.isFile() : void 0;
  return isFile === null || isFile === void 0 ? false : isFile;
}
function legacyMainResolve(packageJsonUrl, packageConfig, base) {
  let guess;
  if (packageConfig.main !== void 0) {
    guess = new node_url.URL(packageConfig.main, packageJsonUrl);
    if (fileExists(guess)) return guess;
    const tries2 = [
      `./${packageConfig.main}.js`,
      `./${packageConfig.main}.json`,
      `./${packageConfig.main}.node`,
      `./${packageConfig.main}/index.js`,
      `./${packageConfig.main}/index.json`,
      `./${packageConfig.main}/index.node`
    ];
    let i2 = -1;
    while (++i2 < tries2.length) {
      guess = new node_url.URL(tries2[i2], packageJsonUrl);
      if (fileExists(guess)) break;
      guess = void 0;
    }
    if (guess) {
      emitLegacyIndexDeprecation(
        guess,
        packageJsonUrl,
        base,
        packageConfig.main
      );
      return guess;
    }
  }
  const tries = ["./index.js", "./index.json", "./index.node"];
  let i = -1;
  while (++i < tries.length) {
    guess = new node_url.URL(tries[i], packageJsonUrl);
    if (fileExists(guess)) break;
    guess = void 0;
  }
  if (guess) {
    emitLegacyIndexDeprecation(guess, packageJsonUrl, base, packageConfig.main);
    return guess;
  }
  throw new ERR_MODULE_NOT_FOUND(
    node_url.fileURLToPath(new node_url.URL(".", packageJsonUrl)),
    node_url.fileURLToPath(base)
  );
}
function finalizeResolution(resolved, base, preserveSymlinks) {
  if (encodedSeparatorRegEx.exec(resolved.pathname) !== null) {
    throw new ERR_INVALID_MODULE_SPECIFIER(
      resolved.pathname,
      String.raw`must not include encoded "/" or "\" characters`,
      node_url.fileURLToPath(base)
    );
  }
  let filePath;
  try {
    filePath = node_url.fileURLToPath(resolved);
  } catch (error) {
    Object.defineProperty(error, "input", { value: String(resolved) });
    Object.defineProperty(error, "module", { value: String(base) });
    throw error;
  }
  const stats = tryStatSync(
    filePath.endsWith("/") ? filePath.slice(-1) : filePath
  );
  if (stats && stats.isDirectory()) {
    const error = new ERR_UNSUPPORTED_DIR_IMPORT(filePath, node_url.fileURLToPath(base));
    error.url = String(resolved);
    throw error;
  }
  if (!stats || !stats.isFile()) {
    const error = new ERR_MODULE_NOT_FOUND(
      filePath || resolved.pathname,
      base && node_url.fileURLToPath(base),
      true
    );
    error.url = String(resolved);
    throw error;
  }
  {
    const real = fs.realpathSync(filePath);
    const { search, hash } = resolved;
    resolved = node_url.pathToFileURL(real + (filePath.endsWith(path.sep) ? "/" : ""));
    resolved.search = search;
    resolved.hash = hash;
  }
  return resolved;
}
function importNotDefined(specifier, packageJsonUrl, base) {
  return new ERR_PACKAGE_IMPORT_NOT_DEFINED(
    specifier,
    packageJsonUrl && node_url.fileURLToPath(new node_url.URL(".", packageJsonUrl)),
    node_url.fileURLToPath(base)
  );
}
function exportsNotFound(subpath, packageJsonUrl, base) {
  return new ERR_PACKAGE_PATH_NOT_EXPORTED(
    node_url.fileURLToPath(new node_url.URL(".", packageJsonUrl)),
    subpath,
    base && node_url.fileURLToPath(base)
  );
}
function throwInvalidSubpath(request, match, packageJsonUrl, internal, base) {
  const reason = `request is not a valid match in pattern "${match}" for the "${internal ? "imports" : "exports"}" resolution of ${node_url.fileURLToPath(packageJsonUrl)}`;
  throw new ERR_INVALID_MODULE_SPECIFIER(
    request,
    reason,
    base && node_url.fileURLToPath(base)
  );
}
function invalidPackageTarget(subpath, target, packageJsonUrl, internal, base) {
  target = typeof target === "object" && target !== null ? JSON.stringify(target, null, "") : `${target}`;
  return new ERR_INVALID_PACKAGE_TARGET(
    node_url.fileURLToPath(new node_url.URL(".", packageJsonUrl)),
    subpath,
    target,
    internal,
    base && node_url.fileURLToPath(base)
  );
}
function resolvePackageTargetString(target, subpath, match, packageJsonUrl, base, pattern, internal, isPathMap, conditions) {
  if (subpath !== "" && !pattern && target.at(-1) !== "/")
    throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
  if (!target.startsWith("./")) {
    if (internal && !target.startsWith("../") && !target.startsWith("/")) {
      let isURL = false;
      try {
        new node_url.URL(target);
        isURL = true;
      } catch {
      }
      if (!isURL) {
        const exportTarget = pattern ? RegExpPrototypeSymbolReplace.call(
          patternRegEx,
          target,
          () => subpath
        ) : target + subpath;
        return packageResolve(exportTarget, packageJsonUrl, conditions);
      }
    }
    throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
  }
  if (invalidSegmentRegEx.exec(target.slice(2)) !== null) {
    if (deprecatedInvalidSegmentRegEx.exec(target.slice(2)) === null) {
      if (!isPathMap) {
        const request = pattern ? match.replace("*", () => subpath) : match + subpath;
        const resolvedTarget = pattern ? RegExpPrototypeSymbolReplace.call(
          patternRegEx,
          target,
          () => subpath
        ) : target;
        emitInvalidSegmentDeprecation(
          resolvedTarget,
          request,
          match,
          packageJsonUrl,
          internal,
          base,
          true
        );
      }
    } else {
      throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
    }
  }
  const resolved = new node_url.URL(target, packageJsonUrl);
  const resolvedPath = resolved.pathname;
  const packagePath = new node_url.URL(".", packageJsonUrl).pathname;
  if (!resolvedPath.startsWith(packagePath))
    throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
  if (subpath === "") return resolved;
  if (invalidSegmentRegEx.exec(subpath) !== null) {
    const request = pattern ? match.replace("*", () => subpath) : match + subpath;
    if (deprecatedInvalidSegmentRegEx.exec(subpath) === null) {
      if (!isPathMap) {
        const resolvedTarget = pattern ? RegExpPrototypeSymbolReplace.call(
          patternRegEx,
          target,
          () => subpath
        ) : target;
        emitInvalidSegmentDeprecation(
          resolvedTarget,
          request,
          match,
          packageJsonUrl,
          internal,
          base,
          false
        );
      }
    } else {
      throwInvalidSubpath(request, match, packageJsonUrl, internal, base);
    }
  }
  if (pattern) {
    return new node_url.URL(
      RegExpPrototypeSymbolReplace.call(
        patternRegEx,
        resolved.href,
        () => subpath
      )
    );
  }
  return new node_url.URL(subpath, resolved);
}
function isArrayIndex(key) {
  const keyNumber = Number(key);
  if (`${keyNumber}` !== key) return false;
  return keyNumber >= 0 && keyNumber < 4294967295;
}
function resolvePackageTarget(packageJsonUrl, target, subpath, packageSubpath, base, pattern, internal, isPathMap, conditions) {
  if (typeof target === "string") {
    return resolvePackageTargetString(
      target,
      subpath,
      packageSubpath,
      packageJsonUrl,
      base,
      pattern,
      internal,
      isPathMap,
      conditions
    );
  }
  if (Array.isArray(target)) {
    const targetList = target;
    if (targetList.length === 0) return null;
    let lastException;
    let i = -1;
    while (++i < targetList.length) {
      const targetItem = targetList[i];
      let resolveResult;
      try {
        resolveResult = resolvePackageTarget(
          packageJsonUrl,
          targetItem,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          isPathMap,
          conditions
        );
      } catch (error) {
        const exception = error;
        lastException = exception;
        if (exception.code === "ERR_INVALID_PACKAGE_TARGET") continue;
        throw error;
      }
      if (resolveResult === void 0) continue;
      if (resolveResult === null) {
        lastException = null;
        continue;
      }
      return resolveResult;
    }
    if (lastException === void 0 || lastException === null) {
      return null;
    }
    throw lastException;
  }
  if (typeof target === "object" && target !== null) {
    const keys = Object.getOwnPropertyNames(target);
    let i = -1;
    while (++i < keys.length) {
      const key = keys[i];
      if (isArrayIndex(key)) {
        throw new ERR_INVALID_PACKAGE_CONFIG(
          node_url.fileURLToPath(packageJsonUrl),
          node_url.fileURLToPath(base),
          '"exports" cannot contain numeric property keys.'
        );
      }
    }
    i = -1;
    while (++i < keys.length) {
      const key = keys[i];
      if (key === "default" || conditions && conditions.has(key)) {
        const conditionalTarget = target[key];
        const resolveResult = resolvePackageTarget(
          packageJsonUrl,
          conditionalTarget,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          isPathMap,
          conditions
        );
        if (resolveResult === void 0) continue;
        return resolveResult;
      }
    }
    return null;
  }
  if (target === null) {
    return null;
  }
  throw invalidPackageTarget(
    packageSubpath,
    target,
    packageJsonUrl,
    internal,
    base
  );
}
function isConditionalExportsMainSugar(exports, packageJsonUrl, base) {
  if (typeof exports === "string" || Array.isArray(exports)) return true;
  if (typeof exports !== "object" || exports === null) return false;
  const keys = Object.getOwnPropertyNames(exports);
  let isConditionalSugar = false;
  let i = 0;
  let keyIndex = -1;
  while (++keyIndex < keys.length) {
    const key = keys[keyIndex];
    const currentIsConditionalSugar = key === "" || key[0] !== ".";
    if (i++ === 0) {
      isConditionalSugar = currentIsConditionalSugar;
    } else if (isConditionalSugar !== currentIsConditionalSugar) {
      throw new ERR_INVALID_PACKAGE_CONFIG(
        node_url.fileURLToPath(packageJsonUrl),
        node_url.fileURLToPath(base),
        `"exports" cannot contain some keys starting with '.' and some not. The exports object must either be an object of package subpath keys or an object of main entry condition name keys only.`
      );
    }
  }
  return isConditionalSugar;
}
function emitTrailingSlashPatternDeprecation(match, pjsonUrl, base) {
  if (process$1.noDeprecation) {
    return;
  }
  const pjsonPath = node_url.fileURLToPath(pjsonUrl);
  if (emittedPackageWarnings.has(pjsonPath + "|" + match)) return;
  emittedPackageWarnings.add(pjsonPath + "|" + match);
  process$1.emitWarning(
    `Use of deprecated trailing slash pattern mapping "${match}" in the "exports" field module resolution of the package at ${pjsonPath}${base ? ` imported from ${node_url.fileURLToPath(base)}` : ""}. Mapping specifiers ending in "/" is no longer supported.`,
    "DeprecationWarning",
    "DEP0155"
  );
}
function packageExportsResolve(packageJsonUrl, packageSubpath, packageConfig, base, conditions) {
  let exports = packageConfig.exports;
  if (isConditionalExportsMainSugar(exports, packageJsonUrl, base)) {
    exports = { ".": exports };
  }
  if (own.call(exports, packageSubpath) && !packageSubpath.includes("*") && !packageSubpath.endsWith("/")) {
    const target = exports[packageSubpath];
    const resolveResult = resolvePackageTarget(
      packageJsonUrl,
      target,
      "",
      packageSubpath,
      base,
      false,
      false,
      false,
      conditions
    );
    if (resolveResult === null || resolveResult === void 0) {
      throw exportsNotFound(packageSubpath, packageJsonUrl, base);
    }
    return resolveResult;
  }
  let bestMatch = "";
  let bestMatchSubpath = "";
  const keys = Object.getOwnPropertyNames(exports);
  let i = -1;
  while (++i < keys.length) {
    const key = keys[i];
    const patternIndex = key.indexOf("*");
    if (patternIndex !== -1 && packageSubpath.startsWith(key.slice(0, patternIndex))) {
      if (packageSubpath.endsWith("/")) {
        emitTrailingSlashPatternDeprecation(
          packageSubpath,
          packageJsonUrl,
          base
        );
      }
      const patternTrailer = key.slice(patternIndex + 1);
      if (packageSubpath.length >= key.length && packageSubpath.endsWith(patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && key.lastIndexOf("*") === patternIndex) {
        bestMatch = key;
        bestMatchSubpath = packageSubpath.slice(
          patternIndex,
          packageSubpath.length - patternTrailer.length
        );
      }
    }
  }
  if (bestMatch) {
    const target = exports[bestMatch];
    const resolveResult = resolvePackageTarget(
      packageJsonUrl,
      target,
      bestMatchSubpath,
      bestMatch,
      base,
      true,
      false,
      packageSubpath.endsWith("/"),
      conditions
    );
    if (resolveResult === null || resolveResult === void 0) {
      throw exportsNotFound(packageSubpath, packageJsonUrl, base);
    }
    return resolveResult;
  }
  throw exportsNotFound(packageSubpath, packageJsonUrl, base);
}
function patternKeyCompare(a, b) {
  const aPatternIndex = a.indexOf("*");
  const bPatternIndex = b.indexOf("*");
  const baseLengthA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
  const baseLengthB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
  if (baseLengthA > baseLengthB) return -1;
  if (baseLengthB > baseLengthA) return 1;
  if (aPatternIndex === -1) return 1;
  if (bPatternIndex === -1) return -1;
  if (a.length > b.length) return -1;
  if (b.length > a.length) return 1;
  return 0;
}
function packageImportsResolve(name, base, conditions) {
  if (name === "#" || name.startsWith("#/") || name.endsWith("/")) {
    const reason = "is not a valid internal imports specifier name";
    throw new ERR_INVALID_MODULE_SPECIFIER(name, reason, node_url.fileURLToPath(base));
  }
  let packageJsonUrl;
  const packageConfig = getPackageScopeConfig(base);
  if (packageConfig.exists) {
    packageJsonUrl = node_url.pathToFileURL(packageConfig.pjsonPath);
    const imports = packageConfig.imports;
    if (imports) {
      if (own.call(imports, name) && !name.includes("*")) {
        const resolveResult = resolvePackageTarget(
          packageJsonUrl,
          imports[name],
          "",
          name,
          base,
          false,
          true,
          false,
          conditions
        );
        if (resolveResult !== null && resolveResult !== void 0) {
          return resolveResult;
        }
      } else {
        let bestMatch = "";
        let bestMatchSubpath = "";
        const keys = Object.getOwnPropertyNames(imports);
        let i = -1;
        while (++i < keys.length) {
          const key = keys[i];
          const patternIndex = key.indexOf("*");
          if (patternIndex !== -1 && name.startsWith(key.slice(0, -1))) {
            const patternTrailer = key.slice(patternIndex + 1);
            if (name.length >= key.length && name.endsWith(patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && key.lastIndexOf("*") === patternIndex) {
              bestMatch = key;
              bestMatchSubpath = name.slice(
                patternIndex,
                name.length - patternTrailer.length
              );
            }
          }
        }
        if (bestMatch) {
          const target = imports[bestMatch];
          const resolveResult = resolvePackageTarget(
            packageJsonUrl,
            target,
            bestMatchSubpath,
            bestMatch,
            base,
            true,
            true,
            false,
            conditions
          );
          if (resolveResult !== null && resolveResult !== void 0) {
            return resolveResult;
          }
        }
      }
    }
  }
  throw importNotDefined(name, packageJsonUrl, base);
}
function parsePackageName(specifier, base) {
  let separatorIndex = specifier.indexOf("/");
  let validPackageName = true;
  let isScoped = false;
  if (specifier[0] === "@") {
    isScoped = true;
    if (separatorIndex === -1 || specifier.length === 0) {
      validPackageName = false;
    } else {
      separatorIndex = specifier.indexOf("/", separatorIndex + 1);
    }
  }
  const packageName = separatorIndex === -1 ? specifier : specifier.slice(0, separatorIndex);
  if (invalidPackageNameRegEx.exec(packageName) !== null) {
    validPackageName = false;
  }
  if (!validPackageName) {
    throw new ERR_INVALID_MODULE_SPECIFIER(
      specifier,
      "is not a valid package name",
      node_url.fileURLToPath(base)
    );
  }
  const packageSubpath = "." + (separatorIndex === -1 ? "" : specifier.slice(separatorIndex));
  return { packageName, packageSubpath, isScoped };
}
function packageResolve(specifier, base, conditions) {
  if (nodeBuiltins.includes(specifier)) {
    return new node_url.URL("node:" + specifier);
  }
  const { packageName, packageSubpath, isScoped } = parsePackageName(
    specifier,
    base
  );
  const packageConfig = getPackageScopeConfig(base);
  if (packageConfig.exists && packageConfig.name === packageName && packageConfig.exports !== void 0 && packageConfig.exports !== null) {
    const packageJsonUrl2 = node_url.pathToFileURL(packageConfig.pjsonPath);
    return packageExportsResolve(
      packageJsonUrl2,
      packageSubpath,
      packageConfig,
      base,
      conditions
    );
  }
  let packageJsonUrl = new node_url.URL(
    "./node_modules/" + packageName + "/package.json",
    base
  );
  let packageJsonPath = node_url.fileURLToPath(packageJsonUrl);
  let lastPath;
  do {
    const stat = tryStatSync(packageJsonPath.slice(0, -13));
    if (!stat || !stat.isDirectory()) {
      lastPath = packageJsonPath;
      packageJsonUrl = new node_url.URL(
        (isScoped ? "../../../../node_modules/" : "../../../node_modules/") + packageName + "/package.json",
        packageJsonUrl
      );
      packageJsonPath = node_url.fileURLToPath(packageJsonUrl);
      continue;
    }
    const packageConfig2 = read(packageJsonPath, { base, specifier });
    if (packageConfig2.exports !== void 0 && packageConfig2.exports !== null) {
      return packageExportsResolve(
        packageJsonUrl,
        packageSubpath,
        packageConfig2,
        base,
        conditions
      );
    }
    if (packageSubpath === ".") {
      return legacyMainResolve(packageJsonUrl, packageConfig2, base);
    }
    return new node_url.URL(packageSubpath, packageJsonUrl);
  } while (packageJsonPath.length !== lastPath.length);
  throw new ERR_MODULE_NOT_FOUND(packageName, node_url.fileURLToPath(base), false);
}
function isRelativeSpecifier(specifier) {
  if (specifier[0] === ".") {
    if (specifier.length === 1 || specifier[1] === "/") return true;
    if (specifier[1] === "." && (specifier.length === 2 || specifier[2] === "/")) {
      return true;
    }
  }
  return false;
}
function shouldBeTreatedAsRelativeOrAbsolutePath(specifier) {
  if (specifier === "") return false;
  if (specifier[0] === "/") return true;
  return isRelativeSpecifier(specifier);
}
function moduleResolve(specifier, base, conditions, preserveSymlinks) {
  const protocol = base.protocol;
  const isData = protocol === "data:";
  let resolved;
  if (shouldBeTreatedAsRelativeOrAbsolutePath(specifier)) {
    try {
      resolved = new node_url.URL(specifier, base);
    } catch (error_) {
      const error = new ERR_UNSUPPORTED_RESOLVE_REQUEST(specifier, base);
      error.cause = error_;
      throw error;
    }
  } else if (protocol === "file:" && specifier[0] === "#") {
    resolved = packageImportsResolve(specifier, base, conditions);
  } else {
    try {
      resolved = new node_url.URL(specifier);
    } catch (error_) {
      if (isData && !nodeBuiltins.includes(specifier)) {
        const error = new ERR_UNSUPPORTED_RESOLVE_REQUEST(specifier, base);
        error.cause = error_;
        throw error;
      }
      resolved = packageResolve(specifier, base, conditions);
    }
  }
  assert(resolved !== void 0, "expected to be defined");
  if (resolved.protocol !== "file:") {
    return resolved;
  }
  return finalizeResolution(resolved, base);
}

const DEFAULT_CONDITIONS_SET = /* @__PURE__ */ new Set(["node", "import"]);
const isWindows = /* @__PURE__ */ (() => process.platform === "win32")();
const NOT_FOUND_ERRORS = /* @__PURE__ */ new Set([
  "ERR_MODULE_NOT_FOUND",
  "ERR_UNSUPPORTED_DIR_IMPORT",
  "MODULE_NOT_FOUND",
  "ERR_PACKAGE_PATH_NOT_EXPORTED",
  "ERR_PACKAGE_IMPORT_NOT_DEFINED"
]);
const globalCache = /* @__PURE__ */ (() => (
  // eslint-disable-next-line unicorn/no-unreadable-iife
  globalThis["__EXSOLVE_CACHE__"] ||= /* @__PURE__ */ new Map()
))();
function resolveModuleURL(input, options) {
  const parsedInput = _parseInput(input);
  if ("external" in parsedInput) {
    return parsedInput.external;
  }
  const specifier = parsedInput.specifier;
  let url = parsedInput.url;
  let absolutePath = parsedInput.absolutePath;
  let cacheKey;
  let cacheObj;
  if (options?.cache !== false) {
    cacheKey = _cacheKey(absolutePath || specifier, options);
    cacheObj = options?.cache && typeof options?.cache === "object" ? options.cache : globalCache;
  }
  if (cacheObj) {
    const cached = cacheObj.get(cacheKey);
    if (typeof cached === "string") {
      return cached;
    }
    if (cached instanceof Error) {
      if (options?.try) {
        return void 0;
      }
      throw cached;
    }
  }
  if (absolutePath) {
    try {
      const stat = fs.lstatSync(absolutePath);
      if (stat.isSymbolicLink()) {
        absolutePath = fs.realpathSync(absolutePath);
        url = node_url.pathToFileURL(absolutePath);
      }
      if (stat.isFile()) {
        if (cacheObj) {
          cacheObj.set(cacheKey, url.href);
        }
        return url.href;
      }
    } catch (error) {
      if (error?.code !== "ENOENT") {
        if (cacheObj) {
          cacheObj.set(cacheKey, error);
        }
        throw error;
      }
    }
  }
  const conditionsSet = options?.conditions ? new Set(options.conditions) : DEFAULT_CONDITIONS_SET;
  const bases = _normalizeBases(options?.from);
  const suffixes = options?.suffixes || [""];
  const extensions = options?.extensions ? ["", ...options.extensions] : [""];
  let resolved;
  for (const base of bases) {
    for (const suffix of suffixes) {
      for (const extension of extensions) {
        resolved = _tryModuleResolve(
          _join(specifier || url.href, suffix) + extension,
          base,
          conditionsSet
        );
        if (resolved) {
          break;
        }
      }
      if (resolved) {
        break;
      }
    }
    if (resolved) {
      break;
    }
  }
  if (!resolved) {
    const error = new Error(
      `Cannot resolve module "${input}" (from: ${bases.map((u) => _fmtPath(u)).join(", ")})`
    );
    error.code = "ERR_MODULE_NOT_FOUND";
    if (cacheObj) {
      cacheObj.set(cacheKey, error);
    }
    if (options?.try) {
      return void 0;
    }
    throw error;
  }
  if (cacheObj) {
    cacheObj.set(cacheKey, resolved.href);
  }
  return resolved.href;
}
function resolveModulePath(id, options) {
  const resolved = resolveModuleURL(id, options);
  if (!resolved) {
    return void 0;
  }
  if (!resolved.startsWith("file://") && options?.try) {
    return void 0;
  }
  const absolutePath = node_url.fileURLToPath(resolved);
  return isWindows ? _normalizeWinPath(absolutePath) : absolutePath;
}
function _tryModuleResolve(specifier, base, conditions) {
  try {
    return moduleResolve(specifier, base, conditions);
  } catch (error) {
    if (!NOT_FOUND_ERRORS.has(error?.code)) {
      throw error;
    }
  }
}
function _normalizeBases(inputs) {
  const urls = (Array.isArray(inputs) ? inputs : [inputs]).flatMap(
    (input) => _normalizeBase(input)
  );
  if (urls.length === 0) {
    return [node_url.pathToFileURL("./")];
  }
  return urls;
}
function _normalizeBase(input) {
  if (!input) {
    return [];
  }
  if (input instanceof URL) {
    return [input];
  }
  if (typeof input !== "string") {
    return [];
  }
  if (/^(?:node|data|http|https|file):/.test(input)) {
    return new URL(input);
  }
  try {
    if (input.endsWith("/") || fs.statSync(input).isDirectory()) {
      return node_url.pathToFileURL(input + "/");
    }
    return node_url.pathToFileURL(input);
  } catch {
    return [node_url.pathToFileURL(input + "/"), node_url.pathToFileURL(input)];
  }
}
function _fmtPath(input) {
  try {
    return node_url.fileURLToPath(input);
  } catch {
    return input;
  }
}
function _cacheKey(id, opts) {
  return JSON.stringify([
    id,
    (opts?.conditions || ["node", "import"]).sort(),
    opts?.extensions,
    opts?.from,
    opts?.suffixes
  ]);
}
function _join(a, b) {
  if (!a || !b || b === "/") {
    return a;
  }
  return (a.endsWith("/") ? a : a + "/") + (b.startsWith("/") ? b.slice(1) : b);
}
function _normalizeWinPath(path) {
  return path.replace(/\\/g, "/").replace(/^[a-z]:\//, (r) => r.toUpperCase());
}
function _parseInput(input) {
  if (typeof input === "string") {
    if (input.startsWith("file:")) {
      const url = new URL(input);
      return { url, absolutePath: node_url.fileURLToPath(url) };
    }
    if (path.isAbsolute(input)) {
      return { url: node_url.pathToFileURL(input), absolutePath: input };
    }
    if (/^(?:node|data|http|https):/.test(input)) {
      return { external: input };
    }
    if (nodeBuiltins.includes(input) && !input.includes(":")) {
      return { external: `node:${input}` };
    }
    return { specifier: input };
  }
  if (input instanceof URL) {
    if (input.protocol === "file:") {
      return { url: input, absolutePath: node_url.fileURLToPath(input) };
    }
    return { external: input.href };
  }
  throw new TypeError("id must be a `string` or `URL`");
}

const defaultFindOptions = {
  startingFrom: ".",
  rootPattern: /^node_modules$/,
  reverse: false,
  test: (filePath) => {
    try {
      if (fs.statSync(filePath).isFile()) {
        return true;
      }
    } catch {
    }
  }
};
async function findFile(filename, _options = {}) {
  const filenames = Array.isArray(filename) ? filename : [filename];
  const options = { ...defaultFindOptions, ..._options };
  const basePath = bundle.resolve(options.startingFrom);
  const leadingSlash = basePath[0] === "/";
  const segments = basePath.split("/").filter(Boolean);
  if (filenames.includes(segments.at(-1)) && await options.test(basePath)) {
    return basePath;
  }
  if (leadingSlash) {
    segments[0] = "/" + segments[0];
  }
  let root = segments.findIndex((r) => r.match(options.rootPattern));
  if (root === -1) {
    root = 0;
  }
  if (options.reverse) {
    for (let index = root + 1; index <= segments.length; index++) {
      for (const filename2 of filenames) {
        const filePath = bundle.join(...segments.slice(0, index), filename2);
        if (await options.test(filePath)) {
          return filePath;
        }
      }
    }
  } else {
    for (let index = segments.length; index > root; index--) {
      for (const filename2 of filenames) {
        const filePath = bundle.join(...segments.slice(0, index), filename2);
        if (await options.test(filePath)) {
          return filePath;
        }
      }
    }
  }
  throw new Error(
    `Cannot find matching ${filename} in ${options.startingFrom} or parent directories`
  );
}
function findNearestFile(filename, options = {}) {
  return findFile(filename, options);
}
function findFarthestFile(filename, options = {}) {
  return findFile(filename, { ...options, reverse: true });
}

function _resolvePath(id, opts = {}) {
  if (id instanceof URL || id.startsWith("file://")) {
    return bundle.normalize(node_url.fileURLToPath(id));
  }
  if (bundle.isAbsolute(id)) {
    return bundle.normalize(id);
  }
  return resolveModulePath(id, {
    ...opts,
    from: opts.from || opts.parent || opts.url
  });
}

const FileCache$1 = /* @__PURE__ */ new Map();
function defineTSConfig(tsconfig) {
  return tsconfig;
}
async function readTSConfig(id, options = {}) {
  const resolvedPath = await resolveTSConfig(id, options);
  const cache = options.cache && typeof options.cache !== "boolean" ? options.cache : FileCache$1;
  if (options.cache && cache.has(resolvedPath)) {
    return cache.get(resolvedPath);
  }
  const text = await fs.promises.readFile(resolvedPath, "utf8");
  const parsed = h(text);
  cache.set(resolvedPath, parsed);
  return parsed;
}
async function writeTSConfig(path, tsconfig) {
  await fs.promises.writeFile(path, d(tsconfig));
}
async function resolveTSConfig(id = process.cwd(), options = {}) {
  return findNearestFile("tsconfig.json", {
    ...options,
    startingFrom: _resolvePath(id, options)
  });
}

const lockFiles = [
  "yarn.lock",
  "package-lock.json",
  "pnpm-lock.yaml",
  "npm-shrinkwrap.json",
  "bun.lockb",
  "bun.lock"
];
const workspaceFiles = [
  "pnpm-workspace.yaml",
  "lerna.json",
  "turbo.json",
  "rush.json"
];
const FileCache = /* @__PURE__ */ new Map();
function definePackageJSON(pkg) {
  return pkg;
}
async function readPackageJSON(id, options = {}) {
  const resolvedPath = await resolvePackageJSON(id, options);
  const cache = options.cache && typeof options.cache !== "boolean" ? options.cache : FileCache;
  if (options.cache && cache.has(resolvedPath)) {
    return cache.get(resolvedPath);
  }
  const blob = await fs.promises.readFile(resolvedPath, "utf8");
  let parsed;
  try {
    parsed = x$1(blob);
  } catch {
    parsed = h(blob);
  }
  cache.set(resolvedPath, parsed);
  return parsed;
}
async function writePackageJSON(path, pkg) {
  await fs.promises.writeFile(path, z(pkg));
}
async function resolvePackageJSON(id = process.cwd(), options = {}) {
  return findNearestFile("package.json", {
    ...options,
    startingFrom: _resolvePath(id, options)
  });
}
async function resolveLockfile(id = process.cwd(), options = {}) {
  return findNearestFile(lockFiles, {
    ...options,
    startingFrom: _resolvePath(id, options)
  });
}
const workspaceTests = {
  workspaceFile: (opts) => findFile(workspaceFiles, opts).then((r) => bundle.dirname(r)),
  gitConfig: (opts) => findFile(".git/config", opts).then((r) => bundle.resolve(r, "../..")),
  lockFile: (opts) => findFile(lockFiles, opts).then((r) => bundle.dirname(r)),
  packageJson: (opts) => findFile("package.json", opts).then((r) => bundle.dirname(r))
};
async function findWorkspaceDir(id = process.cwd(), options = {}) {
  const startingFrom = _resolvePath(id, options);
  const tests = options.tests || ["workspaceFile", "gitConfig", "lockFile", "packageJson"];
  for (const testName of tests) {
    const test = workspaceTests[testName];
    if (options[testName] === false || !test) {
      continue;
    }
    const direction = options[testName] || (testName === "gitConfig" ? "closest" : "furthest");
    const detected = await test({
      ...options,
      startingFrom,
      reverse: direction === "furthest"
    }).catch(() => {
    });
    if (detected) {
      return detected;
    }
  }
  throw new Error(`Cannot detect workspace root from ${id}`);
}

function defineGitConfig(config) {
  return config;
}
async function resolveGitConfig(dir, opts) {
  return findNearestFile(".git/config", { ...opts, startingFrom: dir });
}
async function readGitConfig(dir, opts) {
  const path = await resolveGitConfig(dir, opts);
  const ini = await fsPromises.readFile(path, "utf8");
  return parseGitConfig(ini);
}
async function writeGitConfig(path, config) {
  await fsPromises.writeFile(path, stringifyGitConfig(config));
}
function parseGitConfig(ini) {
  return S(ini.replaceAll(/^\[(\w+) "(.+)"\]$/gm, "[$1.$2]"));
}
function stringifyGitConfig(config) {
  return $(config).replaceAll(/^\[(\w+)\.(\w+)\]$/gm, '[$1 "$2"]');
}

exports.defineGitConfig = defineGitConfig;
exports.definePackageJSON = definePackageJSON;
exports.defineTSConfig = defineTSConfig;
exports.findFarthestFile = findFarthestFile;
exports.findFile = findFile;
exports.findNearestFile = findNearestFile;
exports.findWorkspaceDir = findWorkspaceDir;
exports.parseGitConfig = parseGitConfig;
exports.readGitConfig = readGitConfig;
exports.readPackageJSON = readPackageJSON;
exports.readTSConfig = readTSConfig;
exports.resolveGitConfig = resolveGitConfig;
exports.resolveLockfile = resolveLockfile;
exports.resolvePackageJSON = resolvePackageJSON;
exports.resolveTSConfig = resolveTSConfig;
exports.stringifyGitConfig = stringifyGitConfig;
exports.writeGitConfig = writeGitConfig;
exports.writePackageJSON = writePackageJSON;
exports.writeTSConfig = writeTSConfig;
//# sourceMappingURL=index-BMe_Fbei.js.map
