// Function.bind  polyfill

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}

// console polyfill

(function(global) {
  'use strict';
  global.console = global.console || {};
  var con = global.console;
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
})(typeof window === 'undefined' ? this : window);





// index Of polly fill
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
;
define("libs/polyfills", function(){});

/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define('jquery',['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
define('libs/Class',[], function(){

  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };


    return Class;

});
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */;
(function($) {
    $.fn.marquee = function(options) {
        return this.each(function() {
            // Extend the options if any provided
            var o = $.extend({}, $.fn.marquee.defaults, options),
                $this = $(this),
                $marqueeWrapper, containerWidth, animationCss, verticalDir, elWidth,
                loopCount = 3,
                playState = 'animation-play-state',
                css3AnimationIsSupported = false,

                // Private methods
                _prefixedEvent = function(element, type, callback) {
                    var pfx = ["webkit", "moz", "MS", "o", ""];
                    for (var p = 0; p < pfx.length; p++) {
                        if (!pfx[p]) type = type.toLowerCase();
                        element.addEventListener(pfx[p] + type, callback, false);
                    }
                },

                _objToString = function(obj) {
                    var tabjson = [];
                    for (var p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            tabjson.push(p + ':' + obj[p]);
                        }
                    }
                    tabjson.push();
                    return '{' + tabjson.join(',') + '}';
                },

                _startAnimationWithDelay = function() {
                    $this.timer = setTimeout(animate, o.delayBeforeStart);
                },

                // Public methods
                methods = {
                    pause: function() {
                        if (css3AnimationIsSupported && o.allowCss3Support) {
                            $marqueeWrapper.css(playState, 'paused');
                        } else {
                            // pause using pause plugin
                            if ($.fn.pause) {
                                $marqueeWrapper.pause();
                            }
                        }
                        // save the status
                        $this.data('runningStatus', 'paused');
                        // fire event
                        $this.trigger('paused');
                    },

                    resume: function() {
                        // resume using css3
                        if (css3AnimationIsSupported && o.allowCss3Support) {
                            $marqueeWrapper.css(playState, 'running');
                        } else {
                            // resume using pause plugin
                            if ($.fn.resume) {
                                $marqueeWrapper.resume();
                            }
                        }
                        // save the status
                        $this.data('runningStatus', 'resumed');
                        // fire event
                        $this.trigger('resumed');
                    },

                    toggle: function() {
                        methods[$this.data('runningStatus') == 'resumed' ? 'pause' : 'resume']();
                    },

                    destroy: function() {
                        // Clear timer
                        clearTimeout($this.timer);
                        // Unbind all events
                        $this.find("*").addBack().unbind();
                        // Just unwrap the elements that has been added using this plugin
                        $this.html($this.find('.js-marquee:first').html());
                    }
                };

            // Check for methods
            if (typeof options === 'string') {
                if ($.isFunction(methods[options])) {
                    // Following two IF statements to support public methods
                    if (!$marqueeWrapper) {
                        $marqueeWrapper = $this.find('.js-marquee-wrapper');
                    }
                    if ($this.data('css3AnimationIsSupported') === true) {
                        css3AnimationIsSupported = true;
                    }
                    methods[options]();
                }
                return;
            }

            /* Check if element has data attributes. They have top priority
               For details https://twitter.com/aamirafridi/status/403848044069679104 - Can't find a better solution :/
               jQuery 1.3.2 doesn't support $.data().KEY hence writting the following */
            var dataAttributes = {},
            attr;
            $.each(o, function(key, value) {
                // Check if element has this data attribute
                attr = $this.attr('data-' + key);
                if (typeof attr !== 'undefined') {
                    // Now check if value is boolean or not
                    switch (attr) {
                        case 'true':
                            attr = true;
                            break;
                        case 'false':
                            attr = false;
                            break;
                    }
                    o[key] = attr;
                }
            });

            // since speed option is changed to duration, to support speed for those who are already using it
            o.duration = o.speed || o.duration;

            // Shortcut to see if direction is upward or downward
            verticalDir = o.direction == 'up' || o.direction == 'down';

            // no gap if not duplicated
            o.gap = o.duplicated ? parseInt(o.gap) : 0;

            // wrap inner content into a div
            $this.wrapInner('<div class="js-marquee"></div>');

            // Make copy of the element
            var $el = $this.find('.js-marquee').css({
                'margin-right': o.gap,
                'float': 'left'
            });

            if (o.duplicated) {
                $el.clone(true).appendTo($this);
            }

            // wrap both inner elements into one div
            $this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');

            // Save the reference of the wrapper
            $marqueeWrapper = $this.find('.js-marquee-wrapper');

            // If direction is up or down, get the height of main element
            if (verticalDir) {
                var containerHeight = $this.height();
                $marqueeWrapper.removeAttr('style');
                $this.height(containerHeight);

                // Change the CSS for js-marquee element
                $this.find('.js-marquee').css({
                    'float': 'none',
                    'margin-bottom': o.gap,
                    'margin-right': 0
                });

                // Remove bottom margin from 2nd element if duplicated
                if (o.duplicated) $this.find('.js-marquee:last').css({
                    'margin-bottom': 0
                });

                var elHeight = $this.find('.js-marquee:first').height() + o.gap;

                // adjust the animation speed according to the text length
                if (o.startVisible && !o.duplicated) {
                    // Compute the complete animation duration and save it for later reference
                    // formula is to: (Height of the text node + height of the main container / Height of the main container) * speed;
                    o._completeDuration = ((parseInt(elHeight, 10) + parseInt(containerHeight, 10)) / parseInt(containerHeight, 10)) * o.duration;

                    // formula is to: (Height of the text node / height of the main container) * speed
                    o.duration = (parseInt(elHeight, 10) / parseInt(containerHeight, 10)) * o.duration;
                } else {
                    // formula is to: (Height of the text node + height of the main container / Height of the main container) * speed;
                    o.duration = ((parseInt(elHeight, 10) + parseInt(containerHeight, 10)) / parseInt(containerHeight, 10)) * o.duration;
                }

            } else {
                // Save the width of the each element so we can use it in animation
                elWidth = $this.find('.js-marquee:first').width() + o.gap;

                // container width
                containerWidth = $this.width();

                // adjust the animation speed according to the text length
                if (o.startVisible && !o.duplicated) {
                    // Compute the complete animation duration and save it for later reference
                    // formula is to: (Width of the text node + width of the main container / Width of the main container) * speed;
                    o._completeDuration = ((parseInt(elWidth, 10) + parseInt(containerWidth, 10)) / parseInt(containerWidth, 10)) * o.duration;

                    // (Width of the text node / width of the main container) * speed
                    o.duration = (parseInt(elWidth, 10) / parseInt(containerWidth, 10)) * o.duration;
                } else {
                    // formula is to: (Width of the text node + width of the main container / Width of the main container) * speed;
                    o.duration = ((parseInt(elWidth, 10) + parseInt(containerWidth, 10)) / parseInt(containerWidth, 10)) * o.duration;
                }
            }

            // if duplicated then reduce the speed
            if (o.duplicated) {
                o.duration = o.duration / 2;
            }

            if (o.allowCss3Support) {
                var
                elm = document.body || document.createElement('div'),
                    animationName = 'marqueeAnimation-' + Math.floor(Math.random() * 10000000),
                    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                    animationString = 'animation',
                    animationCss3Str = '',
                    keyframeString = '';

                // Check css3 support
                if (elm.style.animation) {
                    keyframeString = '@keyframes ' + animationName + ' ';
                    css3AnimationIsSupported = true;
                }

                if (css3AnimationIsSupported === false) {
                    for (var i = 0; i < domPrefixes.length; i++) {
                        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                            var prefix = '-' + domPrefixes[i].toLowerCase() + '-';
                            animationString = prefix + animationString;
                            playState = prefix + playState;
                            keyframeString = '@' + prefix + 'keyframes ' + animationName + ' ';
                            css3AnimationIsSupported = true;
                            break;
                        }
                    }
                }

                if (css3AnimationIsSupported) {
                    animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's infinite ' + o.css3easing;
                    $this.data('css3AnimationIsSupported', true);
                }
            }

            var _rePositionVertically = function() {
                $marqueeWrapper.css('margin-top', o.direction == 'up' ? containerHeight + 'px' : '-' + elHeight + 'px');
            },
            _rePositionHorizontally = function() {
                $marqueeWrapper.css('margin-left', o.direction == 'left' ? containerWidth + 'px' : '-' + elWidth + 'px');
            };

            // if duplicated option is set to true than position the wrapper
            if (o.duplicated) {
                if (verticalDir) {
                    if (o.startVisible) {
                        $marqueeWrapper.css('margin-top', 0);
                    } else {
                        $marqueeWrapper.css('margin-top', o.direction == 'up' ? containerHeight + 'px' : '-' + ((elHeight * 2) - o.gap) + 'px');
                    }
                } else {
                    if (o.startVisible) {
                        $marqueeWrapper.css('margin-left', 0);
                    } else {
                        $marqueeWrapper.css('margin-left', o.direction == 'left' ? containerWidth + 'px' : '-' + ((elWidth * 2) - o.gap) + 'px');
                    }
                }

                // If the text starts out visible we can skip the two initial loops
                if (!o.startVisible) {
                  loopCount = 1;
                }
            } else if (o.startVisible) {
                // We only have two different loops if marquee is duplicated and starts visible
                loopCount = 2;
            } else {
                if (verticalDir) {
                    _rePositionVertically();
                } else {
                    _rePositionHorizontally();
                }
            }

            // Animate recursive method
            var animate = function() {
                if (o.duplicated) {
                    // When duplicated, the first loop will be scroll longer so double the duration
                    if (loopCount === 1) {
                        o._originalDuration = o.duration;
                        if (verticalDir) {
                            o.duration = o.direction == 'up' ? o.duration + (containerHeight / ((elHeight) / o.duration)) : o.duration * 2;
                        } else {
                            o.duration = o.direction == 'left' ? o.duration + (containerWidth / ((elWidth) / o.duration)) : o.duration * 2;
                        }
                        // Adjust the css3 animation as well
                        if (animationCss3Str) {
                            animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                        }
                        loopCount++;
                    }
                    // On 2nd loop things back to normal, normal duration for the rest of animations
                    else if (loopCount === 2) {
                        o.duration = o._originalDuration;
                        // Adjust the css3 animation as well
                        if (animationCss3Str) {
                            animationName = animationName + '0';
                            keyframeString = $.trim(keyframeString) + '0 ';
                            animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                        }
                        loopCount++;
                    }
                }

                if (verticalDir) {
                    if (o.duplicated) {

                        // Adjust the starting point of animation only when first loops finishes
                        if (loopCount > 2) {
                            $marqueeWrapper.css('margin-top', o.direction == 'up' ? 0 : '-' + elHeight + 'px');
                        }

                        animationCss = {
                            'margin-top': o.direction == 'up' ? '-' + elHeight + 'px' : 0
                        };
                    } else if (o.startVisible) {
                        // This loop moves the marquee out of the container
                        if (loopCount === 2) {
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                            }
                            animationCss = {
                                'margin-top': o.direction == 'up' ? '-' + elHeight + 'px' : containerHeight + 'px'
                            };
                            loopCount++;
                        } else if (loopCount === 3) {
                            // Set the duration for the animation that will run forever
                            o.duration = o._completeDuration;
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                    animationName = animationName + '0';
                                    keyframeString = $.trim(keyframeString) + '0 ';
                                    animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                            }
                            _rePositionVertically();
                        }
                    } else {
                        _rePositionVertically();
                        animationCss = {
                            'margin-top': o.direction == 'up' ? '-' + ($marqueeWrapper.height()) + 'px' : containerHeight + 'px'
                        };
                    }
                } else {
                    if (o.duplicated) {

                        // Adjust the starting point of animation only when first loops finishes
                        if (loopCount > 2) {
                            $marqueeWrapper.css('margin-left', o.direction == 'left' ? 0 : '-' + elWidth + 'px');
                        }

                        animationCss = {
                            'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : 0
                        };

                    } else if (o.startVisible) {
                        // This loop moves the marquee out of the container
                        if (loopCount === 2) {
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                            }
                            animationCss = {
                                'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px'
                            };
                            loopCount++;
                        } else if (loopCount === 3) {
                            // Set the duration for the animation that will run forever
                            o.duration = o._completeDuration;
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationName = animationName + '0';
                                keyframeString = $.trim(keyframeString) + '0 ';
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                            }
                            _rePositionHorizontally();
                        }
                    } else {
                        _rePositionHorizontally();
                        animationCss = {
                            'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px'
                        };
                    }
                }

                // fire event
                $this.trigger('beforeStarting');

                // If css3 support is available than do it with css3, otherwise use jQuery as fallback
                if (css3AnimationIsSupported) {
                    // Add css3 animation to the element
                    $marqueeWrapper.css(animationString, animationCss3Str);
                    var keyframeCss = keyframeString + ' { 100%  ' + _objToString(animationCss) + '}',
                         $styles = $marqueeWrapper.find('style');

                    // Now add the keyframe animation to the marquee element
                    if ($styles.length !== 0) {
                        // Bug fixed for jQuery 1.3.x - Instead of using .last(), use following
                        $styles.filter(":last").html(keyframeCss);
                    } else {
                        $('head').append('<style>' + keyframeCss + '</style>');
                    }

                    // Animation iteration event
                    _prefixedEvent($marqueeWrapper[0], "AnimationIteration", function() {
                        $this.trigger('finished');
                    });
                    // Animation stopped
                    _prefixedEvent($marqueeWrapper[0], "AnimationEnd", function() {
                        animate();
                        $this.trigger('finished');
                    });

                } else {
                    // Start animating
                    $marqueeWrapper.animate(animationCss, o.duration, o.easing, function() {
                        // fire event
                        $this.trigger('finished');
                        // animate again
                        if (o.pauseOnCycle) {
                            _startAnimationWithDelay();
                        } else {
                            animate();
                        }
                    });
                }
                // save the status
                $this.data('runningStatus', 'resumed');
            };

            // bind pause and resume events
            $this.bind('pause', methods.pause);
            $this.bind('resume', methods.resume);

            if (o.pauseOnHover) {
                $this.bind('mouseenter', methods.pause);
                $this.bind('mouseleave', methods.resume);
            }

            // If css3 animation is supported than call animate method at once
            if (css3AnimationIsSupported && o.allowCss3Support) {
                animate();
            } else {
                // Starts the recursive method
                _startAnimationWithDelay();
            }

        });
    }; // End of Plugin
    // Public: plugin defaults options
    $.fn.marquee.defaults = {
        // If you wish to always animate using jQuery
        allowCss3Support: true,
        // works when allowCss3Support is set to true - for full list see http://www.w3.org/TR/2013/WD-css3-transitions-20131119/#transition-timing-function
        css3easing: 'linear',
        // requires jQuery easing plugin. Default is 'linear'
        easing: 'linear',
        // pause time before the next animation turn in milliseconds
        delayBeforeStart: 1000,
        // 'left', 'right', 'up' or 'down'
        direction: 'left',
        // true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: false,
        // speed in milliseconds of the marquee in milliseconds
        duration: 5000,
        // gap in pixels between the tickers
        gap: 20,
        // on cycle pause the marquee
        pauseOnCycle: false,
        // on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
        pauseOnHover: false,
        // the marquee is visible initially positioned next to the border towards it will be moving
        startVisible: false
    };
})(jQuery);
define("marquee", ["jquery"], function(){});

define('subapp/header/header_price',['libs/Class','jquery','underscore', 'marquee'],
function(Class,$,_){
   var HeaderPrice = Class.extend({

       get_el: function () {
           return $('#header_price_list');
       },
       get_template: function () {
           return _.template($('#header_price_template').html());
       },

       init:function(option){
           this.$el = this.get_el();
           if(!!!this.$el.length) return ;

           this.template = this.get_template();

            if(!option["feed"]){
                throw Error('can not init a price app without a feed');
            }
            this.dataFeed = option["feed"];
            this.dataFeed.on('data_arrive',this.handle_data.bind(this));
            this.dataFeed.on('data_fail', this.handle_fail.bind(this));

            if(!option["adapter"]){
                throw Error('need adapter to goon');
            }
            this.adapter = option["adapter"];
       },

       handle_data: function(data){
            this.data_list = this.adapter.update(data).spit();
            this.render();
        },

       handle_fail:function(error){
            console.log('price data fail');
            console.log(error);
        },


       get_price_row_width: function () {
           var nav_width = $('.navbar').width();
           if(this.is_mobile()){
               return nav_width;
           }else{
               return nav_width-200;
           }
       },
       start_marquee: function () {
            $('.price-row').css({width: this.get_price_row_width()})
            $('.price-row').marquee({
                duplicated: true,
                pauseOnHover: true,
                gap: 10,
                duration: 12000,
                startVisible:true,
            });
       },
       is_mobile: function () {
           return $(window).width() <= 768;
       },
       render: function(){
            _.map(this.data_list, this._render_item.bind(this));
            if (this.running){
                return ;
            }
            this.start_marquee();
            this.running = true;
        },

       _render_item: function(entry){
           //console.log('entry');
           //console.log(entry);
           var ele = $("[data-symbol="+ entry['symbol'] +"]");
           if(ele.length){
               this.set_price(ele, entry);
           }else{
               var ele = $(this.template(entry));
               this.$el.append(ele);
               this.set_price($(ele), entry);
           }
       },

       set_price:function(elems, quote){
           for(var i =0 , len=elems.length ;i<len ;i++){
               this.set_single_price(elems[i], quote);
           }
       },

       set_single_price:function(elem, quote){
           var change = 0
           try{
                var change = parseFloat(quote['change']);
           }
           catch(error){

           }
           var price_str = quote['price_cny'] +'&nbsp;'+ quote['change_percent'];
           if (change > 0){

               $(elem).find('.price').removeClass('fall').addClass('raise').html(price_str);
               $(elem).find('i').removeClass('fall fa-arrow-down').addClass('fa-arrow-up raise');
           }else{
               $(elem).find('.price').removeClass('raise').addClass('fall').html(price_str);
               $(elem).find('i').removeClass('fa-arrow-up raise').addClass('fall fa-arrow-down');
           }

           return;
       }
   });
   return HeaderPrice;
});
define('subapp/adapters/adapter',['libs/Class','underscore'],function(Class,_){
    var BaseAdapter = Class.extend({
        init: function(dictionary){
            this.dictionary = dictionary;
        },

        update: function(data){
            this.old = this.data;
            this.data = data;
            return this;
        },

        filter_data: function (data) {
            return data;
        },

        spit: function(){
             var data = this.filter_data(this.data);
             return _.map(data, this.handle_data.bind(this));
        },

        clean_entry: function (new_entry) {
            return new_entry;
        },

        handle_data:function(single_entry){
            var new_entry = {}
            _.map(this.dictionary, function(key_right,key_left ){
                new_entry[key_right] = single_entry[key_left];
            });
            return this.clean_entry(new_entry);
        }
    });

    return BaseAdapter;
});
define('subapp/dictionaries/coinmarketcap',[],function(){
    return {
        'symbol':'symbol',
        'name' : 'name',
        'price_cny':'price_cny',
        'percent_change_1h':'percent_change_1h',
        'last_updated':'last_updated',
        'id':'id',
        'percent_change_24h':'change'
    }
});
define('subapp/dictionaries/coin_dic',[],function(){
var CoinDic = {
BTC : "比特币BTC",
ETH : "以太坊ETH",
LTC : "莱特币LTC",
XRP : "瑞波币XRP",
XMR : "门罗币XMR",
LSK : "Lisk LSK",
BCH : "BCC BCH",
ETC : "以太经典ETC",
DGB : "极特币DGB",
BTS : "比特股BTS",
DASH : "达世币DASH",
ZEC : "Zcash ZEC",
SC : "细亚币SC",
XLM : "恒星币XLM",
ZRX : "0x ZRX",
NAV : "NAVCoin NAV",
DOGE : "狗狗币DOGE",
SYS : "系统币SYS",
NXT : "未来币NXT",
BURST : "爆裂币BURST",
GAME : "游戏点GAME",
PINK : "Pinkcoin PINK",
VRC : "维理币VRC",
LBC : "LBRY Credits LBC",
ARDR : "阿朵ARDR",
RADS : "Radium RADS",
EXP : "Expanse EXP",
VTC : "绿币VTC",
AMP : "Synereo AMP AMP",
FLDC : "FoldingCoin FLDC",
XBC : "BitcoinPlus XBC",
SJCX : "Storjcoin X SJCX",
POT : "PotCoin POT",
PASC : "PascalCoin PASC",
XPM : "Primecoin XPM",
XCP : "Counterparty XCP",
FLO : "Florincoin FLO",
BELA : "Bela BELA",
RIC : "Riecoin RIC",
EMC2 : "锿币EMC2",
NMC : "域名币NMC",
NOTE : "DNotes NOTE",
OMNI : "奥妙币OMNI",
BTM : "Bitmark BTM",
NAUT : "Nautiluscoin NAUT",
GRC : "格雷德币GRC",
BCY : "BitCrystals BCY",
XVC : "Vcash XVC",
HUC : "猎手币HUC",
BLK : "黑币BLK",
PPC : "点点币PPC",
BBT : "Brickblock BBT",
XCP : "合约币XCP",
IOTA : "埃欧塔IOTA",
XEM : "新经币XEM",
EMC : "崛起币EMC",
PUT : "普京币PUT",
EAC : "地球币EAC",
XCN : "氪石币XCN",
MGC : "众合币MGC",
ZCC : "招财币ZCC",
XPM : "质数币XPM",
NCS : "资产股NCS",
YBC : "元宝币YBC",
MEC : "美卡币MEC",
NEO : "小蚁股NEO",
MCC : "行云币MCC",
FZ : "冰河币FZ",
TFC : "传送币TFC",
YTC : "一号币YTC",
ZET : "泽塔币ZET",
GOOC : "谷壳币GOOC",
MTC : "猴宝币MTC",
WDC : "世界币WDC",
PLC : "保罗币PLC",
SKT : "鲨之信SKT",
MRYC : "美人鱼币MRYC",
LKC : "幸运币LKC",
DNC : "安网币DNC",
IFC : "无限币IFC",
PEB : "普银PEB",
XZC : "零币XZC",
DACRS : "智能坊DACRS",
INF : "讯链币INF",
ICS : "小企股ICS",
HLB : "活力币HLB",
VASH : "薇币VASH",
};
return CoinDic;
});

define('subapp/adapters/coinmarketcapAdapter',[
    'subapp/adapters/adapter',
    'subapp/dictionaries/coinmarketcap',
    'subapp/dictionaries/coin_dic',
    'underscore'],
    function(AdapterBase, coinmarketDictionary,
             CoinDic
             ,_){

        var CoinMarketAdapter = AdapterBase.extend({
            init:function(){
                this.dictionary = coinmarketDictionary;
            },

            filter_data: function(data){
                return _.filter(data, this._filter.bind(this));
            },
            _filter: function(entry){
                return  (_.contains(_.keys(CoinDic), entry['symbol']))
            },
            get_change_class: function (entry) {
                var change = 0 ;
                try{
                    change = parseFloat(entry['change']);
                    if(NaN == change){
                        change = 0 ;
                    }
                }
                catch(error){

                }
                return change<0 ? 'fall': 'raise';

            },
            get_cnname: function (entry) {
                 return CoinDic[entry['symbol']]? CoinDic[entry['symbol']] :entry['symbol'];
            },
            get_change_percent: function (change_str) {
                 var value = parseFloat(change_str);
                 var percent_str =  value >0 ? '+' + value + '%' : value + '%';
                return percent_str
            },
            clean_entry: function(entry){
                entry['change_class'] = this.get_change_class(entry);
                entry['name_cn'] = this.get_cnname(entry);
                entry['change_percent'] = this.get_change_percent(entry['change']);
                entry['price_cny'] = '¥'+(Math.round(parseFloat(entry['price_cny'] * 100))/100.00);
                return entry;
            }
        });

        return CoinMarketAdapter
});
define('subapp/dictionaries/header_coin_dic',[],function(){
var CoinDic = {
BTC : "比特币BTC",
ETH : "以太坊ETH",
LTC : "莱特币LTC",
BCH : "比特现金BCC",
XRP : "瑞波币XRP"
};
return CoinDic;
});

define('subapp/adapters/HeaderCoinmarketcapAdapter',[
    'subapp/adapters/coinmarketcapAdapter',
    'subapp/dictionaries/header_coin_dic',
    'underscore'],
    function(AdapterBase, header_coin_dic,_){

        var HeaderCoinmarketcapAdapter = AdapterBase.extend({
            _filter: function(entry){
                return  (_.contains(_.keys(header_coin_dic), entry['symbol']))
            },
            clean_entry:function(entry){
                var entry = this._super(entry);
                entry['element_id'] = 'header' + entry['symbol'];
                entry['title_text'] = entry['symbol']+'/CNY';
                if (entry['symbol'] == 'BCH'){
                    entry['title_text'] = 'BCC/CNY';
                }
                return entry;
            }
        });

        return HeaderCoinmarketcapAdapter;
});
define('libs/autocomplete',[],function(){

    function autoComplete(options){
        if (!document.querySelector) return;

        // helpers
        function hasClass(el, className){ return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className); }

        function addEvent(el, type, handler){
            if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
        }
        function removeEvent(el, type, handler){
            // if (el.removeEventListener) not working in IE11
            if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
        }
        function live(elClass, event, cb, context){
            addEvent(context || document, event, function(e){
                var found, el = e.target || e.srcElement;
                while (el && !(found = hasClass(el, elClass))) el = el.parentElement;
                if (found) cb.call(el, e);
            });
        }

        var o = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: function (item, search){
                // escape special characters
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
            },
            onSelect: function(e, term, item){}
        };
        for (var k in options) { if (options.hasOwnProperty(k)) o[k] = options[k]; }

        // init
        var elems = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
        for (var i=0; i<elems.length; i++) {
            var that = elems[i];

            // create suggestions container "sc"
            that.sc = document.createElement('div');
            that.sc.className = 'autocomplete-suggestions '+o.menuClass;

            that.autocompleteAttr = that.getAttribute('autocomplete');
            that.setAttribute('autocomplete', 'off');
            that.cache = {};
            that.last_val = '';

            that.updateSC = function(resize, next){
                var rect = that.getBoundingClientRect();
                that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
                that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
                that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
                if (!resize) {
                    that.sc.style.display = 'block';
                    if (!that.sc.maxHeight) { that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight); }
                    if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
                    if (that.sc.suggestionHeight)
                        if (!next) that.sc.scrollTop = 0;
                        else {
                            var scrTop = that.sc.scrollTop, selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
                            if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0)
                                that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;
                            else if (selTop < 0)
                                that.sc.scrollTop = selTop + scrTop;
                        }
                }
            }
            addEvent(window, 'resize', that.updateSC);
            document.body.appendChild(that.sc);

            live('autocomplete-suggestion', 'mouseleave', function(e){
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) setTimeout(function(){ sel.className = sel.className.replace('selected', ''); }, 20);
            }, that.sc);

            live('autocomplete-suggestion', 'mouseover', function(e){
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.className = sel.className.replace('selected', '');
                this.className += ' selected';
            }, that.sc);

            live('autocomplete-suggestion', 'mousedown', function(e){
                if (hasClass(this, 'autocomplete-suggestion')) { // else outside click
                    var v = this.getAttribute('data-val');
                    that.value = v;
                    o.onSelect(e, v, this);
                    that.sc.style.display = 'none';
                }
            }, that.sc);

            that.blurHandler = function(){
                try { var over_sb = document.querySelector('.autocomplete-suggestions:hover'); } catch(e){ var over_sb = 0; }
                if (!over_sb) {
                    that.last_val = that.value;
                    that.sc.style.display = 'none';
                    setTimeout(function(){ that.sc.style.display = 'none'; }, 350); // hide suggestions on fast input
                } else if (that !== document.activeElement) setTimeout(function(){ that.focus(); }, 20);
            };
            addEvent(that, 'blur', that.blurHandler);

            var suggest = function(data){
                var val = that.value;
                that.cache[val] = data;
                if (data.length && val.length >= o.minChars) {
                    var s = '';
                    for (var i=0;i<data.length;i++) s += o.renderItem(data[i], val);
                    that.sc.innerHTML = s;
                    that.updateSC(0);
                }
                else
                    that.sc.style.display = 'none';
            }

            that.keydownHandler = function(e){
                var key = window.event ? e.keyCode : e.which;
                // down (40), up (38)
                if ((key == 40 || key == 38) && that.sc.innerHTML) {
                    var next, sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (!sel) {
                        next = (key == 40) ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
                        next.className += ' selected';
                        that.value = next.getAttribute('data-val');
                    } else {
                        next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                        if (next) {
                            sel.className = sel.className.replace('selected', '');
                            next.className += ' selected';
                            that.value = next.getAttribute('data-val');
                        }
                        else { sel.className = sel.className.replace('selected', ''); that.value = that.last_val; next = 0; }
                    }
                    that.updateSC(0, next);
                    return false;
                }
                // esc
                else if (key == 27) { that.value = that.last_val; that.sc.style.display = 'none'; }
                // enter
                else if (key == 13 || key == 9) {
                    var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (sel && that.sc.style.display != 'none') { o.onSelect(e, sel.getAttribute('data-val'), sel); setTimeout(function(){ that.sc.style.display = 'none'; }, 20); }
                }
            };
            addEvent(that, 'keydown', that.keydownHandler);

            that.keyupHandler = function(e){
                var key = window.event ? e.keyCode : e.which;
                if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
                    var val = that.value;
                    if (val.length >= o.minChars) {
                        if (val != that.last_val) {
                            that.last_val = val;
                            clearTimeout(that.timer);
                            if (o.cache) {
                                if (val in that.cache) { suggest(that.cache[val]); return; }
                                // no requests if previous suggestions were empty
                                for (var i=1; i<val.length-o.minChars; i++) {
                                    var part = val.slice(0, val.length-i);
                                    if (part in that.cache && !that.cache[part].length) { suggest([]); return; }
                                }
                            }
                            that.timer = setTimeout(function(){ o.source(val, suggest) }, o.delay);
                        }
                    } else {
                        that.last_val = val;
                        that.sc.style.display = 'none';
                    }
                }
            };
            addEvent(that, 'keyup', that.keyupHandler);

            that.focusHandler = function(e){
                that.last_val = '\n';
                that.keyupHandler(e)
            };
            if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
        }

        // public destroy method
        this.destroy = function(){
            for (var i=0; i<elems.length; i++) {
                var that = elems[i];
                removeEvent(window, 'resize', that.updateSC);
                removeEvent(that, 'blur', that.blurHandler);
                removeEvent(that, 'focus', that.focusHandler);
                removeEvent(that, 'keydown', that.keydownHandler);
                removeEvent(that, 'keyup', that.keyupHandler);
                if (that.autocompleteAttr)
                    that.setAttribute('autocomplete', that.autocompleteAttr);
                else
                    that.removeAttribute('autocomplete');
                document.body.removeChild(that.sc);
                that = null;
            }
        };
    }
    return autoComplete;

});
define('subapp/header/search',['libs/Class', 'jquery', 'underscore','libs/autocomplete'],
    function (Class, $, _, AutoComplete) {
        var Search = Class.extend({
            init: function () {
                new AutoComplete({
                    selector: 'input[name="q"]',
                    source: function (term, response) {
                        try { xhr.abort(); } catch(e){}
                        $.getJSON('/search/autocomplete/', {q: term},
                            function(data){
                                $.ajax('http://www.chainnews.com/api/news/autocomplete/', {
                                    jsonp: true,
                                    success: function(data2){
                                        var results = data.results.concat(data2.results);
                                        response(results);
                                    },
                                    method: 'GET',
                                    data: {q: term}
                                });
                            }
                        );
                    }
                });

                // 搜索框内删除输入按钮
                var $cancel = $('.input-cancel-btn');
                $cancel.click(function(){
                    $('input[name="q"]').val('');
                    $cancel.css({
                        display: 'none'
                    });
                });
                var input = document.querySelector('input[name="q"]');
                var parent = document.querySelector('.logo-wrapper');
                $('input[name="q"]').keyup(function(){
                    if(this.value == '') {
                        $cancel.css({
                            display: 'none'
                        });
                    } else {
                        var left = input.getBoundingClientRect().right - parent.getBoundingClientRect().left;
                        $cancel.css({
                            display: 'block',
                            left: left - 20,
                            top: 0
                        });
                    }
                });


            }
        });

        return Search;

    });
define('subapp/header/promo_text',['libs/Class','jquery', 'underscore'], function(Class, $, _){

    var PromoTextApp = Class.extend({
        init: function () {
            var stop = false;
            console.log('in promotext');


            // $('.promo-text-wrapper').marquee({
            //     gap: 150,
            //     duration: 500,
            // });
            // window.setInterval(function(){
            //      if (stop){
            //        $('.promo-text-wrapper').marquee('toggle');
            //      }else{
            //          stop = true;
            //          return ;
            //      }
            //
            // }, 1000);
            this.element_count = 4 ;
            this.current_ele_index = 1 ;
            this.element_width = 150;
            this.$ele_wrapper = $('.promo-text-list');
            if(!this.$ele_wrapper.length){
                return;
            }
            this.start_mq();
        },

        start_mq: function () {
            window.setInterval(this.marquee.bind(this), 2000)
        },
        marquee: function () {
            if(this.current_ele_index == this.element_count){
                this.$ele_wrapper.css({left: -this.element_width * 1});
                this.current_ele_index = 2;
            }
            // console.log('current ele index : ' + this.current_ele_index);
            // console.log('move : ' + this.element_width * (this.current_ele_index-1));
            this.current_ele_index += 1;
            this.$ele_wrapper.animate({left: -this.element_width * (this.current_ele_index-1)}, 500);
        }


    });

    return PromoTextApp;
});
define('subapp/header/header',['libs/Class',
        'subapp/header/header_price',
        'subapp/adapters/HeaderCoinmarketcapAdapter',
        'subapp/header/search',
        'subapp/header/promo_text',
    ],
    function(
        Class,
        HeaderPrice,
        HeaderCoinmarketAdapter,
        Search,
        PromoText
    ){

    var HeaderApp = Class.extend({
        init:function(option){
            // for header price display;
            this.header_price = new HeaderPrice({
                feed: window.app.price_feed,
                adapter : new HeaderCoinmarketAdapter()
            });

            this.search = new Search();
            // for promo text
            new PromoText();

        },

    });
    return HeaderApp;
});
define('libs/event',[], function () {

    var Event = function () {
    }
    Event.prototype = {
        on: function (name, callback, ctx) {
            var e = this.e || (this.e = {});

            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });

            return this;
        },

        once: function (name, callback, ctx) {
            var self = this;

            function listener() {
                self.off(name, listener);
                callback.apply(ctx, arguments);
            };

            listener._ = callback
            return this.on(name, listener, ctx);
        },

        emit: function (name) {
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;

            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }

            return this;
        },

        off: function (name, callback) {
            var e = this.e || (this.e = {});
            var evts = e[name];
            var liveEvents = [];

            if (evts && callback) {
                for (var i = 0, len = evts.length; i < len; i++) {
                    if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                        liveEvents.push(evts[i]);
                }
            }

            // Remove event from queue to prevent memory leak
            // Suggested by https://github.com/lazd
            // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

            (liveEvents.length)
                ? e[name] = liveEvents
                : delete e[name];

            return this;
        }
    }
    return Event;
});
define('subapp/data/feed',['libs/Class', 'libs/event', 'jquery'],function(Class, Event , $){

    var _Feed = Class.extend(Event.prototype);
    var Feed = _Feed.extend({
        init: function (options) {
            this.options = options;
            this.interval = options.interval || 5000;
            this._running = false;
        },

        stop: function(){
            window.clearInterval(this._rid);
        },

        run: function(){
            if(this._running) return ;
            this._running = true;
            this._run();
            if(this.interval>0) {
                this._rid = window.setInterval(this._run.bind(this), this.interval)
            }else{
                this._running = false;
                return ;
            }
        },

        _run: function(){
            $.when($.ajax(this.options)).then(
                this.request_success.bind(this),
                this.request_fail.bind(this)
            )
        },

        request_success:function(data){
            this.emit('data_arrive', data);
        },
        request_fail:function(data){
            this.emit('request_fail',data);
        },

    });

    return Feed;

});
define('subapp/tracker',['libs/Class', 'jquery'],function(Class, $){

    var Tracker = Class.extend({
        init: function(){
            $('a[data-category]').click(this.track_click.bind(this));
        },
        track_click_bd: function (e) {
            var category = $(e.target).attr('data-category');
            var tag = $(e.target).attr('data-tag');
            var site = $(e.target).attr('data-site');
            window._hmt.push(['_trackEvent',
                              'link', 'click',
                              'category', category,
                              'tag', tag,
                              'site', site
                            ]);


        },
        track_click_gg: function (e) {
        //
            var category = $(e.target).attr('data-category');
            var tag = $(e.target).attr('data-tag');
            var site = $(e.target).attr('data-site');
            ga('send', {
                hitType: 'event',
                eventCategory: 'off_site_link',
                eventAction: 'click',
                eventLabel: site,
                transport: 'beacon'

            });
            return ;
        },
        track_click:function(e){
            if(window._hmt){
                this.track_click_bd(e);
            }
            if(window.ga){
                this.track_click_gg(e);
            }
        },
    });

    return Tracker;

});
define('subapp/sidebar/news',['libs/Class', 'subapp/data/feed','jquery', 'underscore'],
    function(Class, Feed, $, _){

        var NewsApp = Class.extend({
            handle_title_click: function(e) {
               var $content  = $(e.currentTarget).parent().find('.news-content');
                   $content.toggleClass('hidden');
                   return ;
            },

            setupTitleClick: function () {
                this.$news_list.on('click', '.news-title', this.handle_title_click.bind(this));
            },

            init: function(option){
                this.$news_list = $('.news-list');
                if(!!!this.$news_list.length) return ;

                this.template =  _.template($('#news_template').html());

                if(!option["feed"]){
                    throw Error('can not init a price app without a feed');
                }

                if(!option["adapter"]){
                    throw Error('need adapter to goon');
                }

                this.dataFeed = option["feed"];
                this.dataFeed.on('data_arrive',this.handle_data.bind(this));
                this.dataFeed.on('data_fail', this.handle_fail.bind(this));

                this.adapter = option["adapter"];
                this.setupTitleClick();
            },

            handle_data: function(data){
                this.data_list = this.adapter.update(data).spit();
                this.render();
             },
            handle_fail: function(data){
                console.log('news data fail');
                console.log(data);
            },
            render: function(){
                 _.map(this.data_list, this._render_item.bind(this));
            },

            _render_item: function(entry){
                 this.create_element(entry);
            },

            create_element: function (entry) {
                this.$news_list.append($(this.template(entry)))
            },

        });
        return NewsApp;

});
define('subapp/data/fakeFeed',['libs/Class', 'libs/event', 'jquery'],function(Class, Event , $){
    //TODO ： baseon interval push event , not use xhr
    var _Feed = Class.extend(Event.prototype);
    var FakeFeed = _Feed.extend({
        init: function (options) {
            this.options = options;
            this.interval = options.interval || 5000;
            this._running = false;

        },

        stop: function(){
            window.clearInterval(this._rid);
        },

        run: function(){
            if(this._running) return ;
            this._running = true;
            this._run();
            if(this.interval>0) {
                this._rid = window.setInterval(this._run.bind(this), this.interval)
            }else{
                this._running = false;
                return ;
            }
        },

        _run: function(){
            this.data = this.options['data'];
            this.request_success(this.data);
        },

        request_success:function(data){
            this.emit('data_arrive', data);
        },
        request_fail:function(data){
            this.emit('request_fail',data);
        },

    });

    return FakeFeed;

});
define('subapp/adapters/coinbeef',[
    'subapp/adapters/adapter',
    'underscore'],
    function(AdapterBase, _){

        var CoinbeefAdapter = AdapterBase.extend({

            is_in_24h: function(entry){
                var entry_date = this.get_entry_date(entry);
                return this.first_date - entry_date <= 1000*60*60*16;
            },

            get_24h_entry: function (results) {
               this.first_date = this.get_entry_date(results[0]);
               return _.filter(results, this.is_in_24h.bind(this));
            },

            get_entry_date: function (entry) {
                return entry['published_at'] * 1000;
            },

            spit: function(){
                var  news_list = this.get_24h_entry(this.data['results']);
                return _.map(news_list, this.add_formatted_time.bind(this));
            },

            format_time: function (time_diff) {
                var sec_diff = Math.ceil(time_diff/1000.0);
                if(sec_diff <= 60){
                    return  sec_diff + '秒前';
                }

                var min_diff = Math.ceil(sec_diff/60.0) - 1;
                if(sec_diff > 60 && sec_diff <= 3600){
                    return  min_diff + '分钟前';
                }

                var hour_diff = Math.ceil(min_diff/60.0) -1;
                if(hour_diff <= 24){
                    return hour_diff + '小时前';
                }

                var day_diff = Math.ceil(hour_diff/24.0) -1;
                if( day_diff <= 7){
                    return day_diff + '天前';
                }

                var week_diff = Math.ceil(day_diff/7.0) ;
                if(day_diff <= 31){
                    return week_diff + '周前';
                }

                var mon_diff = Math.ceil(day_diff/30) ;
                if(day_diff<=365){
                    return mon_diff +'月前';
                }

                var year_diff = Math.ceil(day_diff/365);
                if(day_diff >=366){
                    return year_diff + '年前';
                }
            },
            add_formatted_time: function(entry){
                var utc_fix = new Date().getTimezoneOffset();
                var time_diff = Date.now() + 1000*60*utc_fix - this.get_entry_date(entry);
                entry['time_diff'] = this.format_time(time_diff);
                return entry;
            }
        });

        return CoinbeefAdapter
});
define('subapp/sidebar/allcoinprice',['libs/Class','jquery','underscore'], function(Class,$, _){

    var AllCoinPrice = Class.extend({

        init: function(option){
            this.$coin_list= $('#coin_list');

            if(!!!this.$coin_list.length) return ;

            this.tempalte = _.template($('#coin_template').html())
            if(!option["feed"]){
                throw Error('can not init a price app without a feed');
            }
            this.dataFeed = option["feed"];
            this.dataFeed.on('data_arrive',this.handle_data.bind(this));
            this.dataFeed.on('data_fail', this.handle_fail.bind(this));

            if(!option["adapter"]){
                throw Error('need adapter to goon');
            }
            this.adapter = option["adapter"];
        },

        handle_data: function(data){
            this.data_list = this.adapter.update(data).spit();
            this.render();
        },

        handle_fail:function(error){
            console.log('price data fail');
            console.log(error);
        },

        render: function(){
            _.map(this.data_list, this._render_item.bind(this));
        },

        update_element: function (element, coin_data) {
            var change_class = coin_data['change_class'];
            $(element).find('.coin-price').removeClass('fail raise').addClass(change_class).html(coin_data['price_cny']);
            $(element).find('.coin-change').removeClass('fail raise').addClass(change_class).html(coin_data['change_percent']);
        },

        create_element: function (coin_data) {
            this.$coin_list.append($(this.tempalte(coin_data)))
        },

        _render_item: function(coin_data){
            var element = this.$coin_list.find('#'+coin_data['id']);
            if(element.length){
                this.update_element(element, coin_data);
            }else{
                this.create_element(coin_data);
            }
        },
    });
    return AllCoinPrice;
});
/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 */

;(function(fastdom){

  'use strict';

  // Normalize rAF
  var raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(cb) { return window.setTimeout(cb, 1000 / 60); };

  /**
   * Creates a fresh
   * FastDom instance.
   *
   * @constructor
   */
  function FastDom() {
    this.frames = [];
    this.lastId = 0;

    // Placing the rAF method
    // on the instance allows
    // us to replace it with
    // a stub for testing.
    this.raf = raf;

    this.batch = {
      hash: {},
      read: [],
      write: [],
      mode: null
    };
  }

  /**
   * Adds a job to the
   * read batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.read = function(fn, ctx) {
    var job = this.add('read', fn, ctx);
    var id = job.id;

    // Add this job to the read queue
    this.batch.read.push(job.id);

    // We should *not* schedule a new frame if:
    // 1. We're 'reading'
    // 2. A frame is already scheduled
    var doesntNeedFrame = this.batch.mode === 'reading'
      || this.batch.scheduled;

    // If a frame isn't needed, return
    if (doesntNeedFrame) return id;

    // Schedule a new
    // frame, then return
    this.scheduleBatch();
    return id;
  };

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.write = function(fn, ctx) {
    var job = this.add('write', fn, ctx);
    var mode = this.batch.mode;
    var id = job.id;

    // Push the job id into the queue
    this.batch.write.push(job.id);

    // We should *not* schedule a new frame if:
    // 1. We are 'writing'
    // 2. We are 'reading'
    // 3. A frame is already scheduled.
    var doesntNeedFrame = mode === 'writing'
      || mode === 'reading'
      || this.batch.scheduled;

    // If a frame isn't needed, return
    if (doesntNeedFrame) return id;

    // Schedule a new
    // frame, then return
    this.scheduleBatch();
    return id;
  };

  /**
   * Defers the given job
   * by the number of frames
   * specified.
   *
   * If no frames are given
   * then the job is run in
   * the next free frame.
   *
   * @param  {Number}   frame
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.defer = function(frame, fn, ctx) {

    // Accepts two arguments
    if (typeof frame === 'function') {
      ctx = fn;
      fn = frame;
      frame = 1;
    }

    var self = this;
    var index = frame - 1;

    return this.schedule(index, function() {
      self.run({
        fn: fn,
        ctx: ctx
      });
    });
  };

  /**
   * Clears a scheduled 'read',
   * 'write' or 'defer' job.
   *
   * @param  {Number|String} id
   * @public
   */
  FastDom.prototype.clear = function(id) {

    // Defer jobs are cleared differently
    if (typeof id === 'function') {
      return this.clearFrame(id);
    }

    // Allow ids to be passed as strings
    id = Number(id);

    var job = this.batch.hash[id];
    if (!job) return;

    var list = this.batch[job.type];
    var index = list.indexOf(id);

    // Clear references
    delete this.batch.hash[id];
    if (~index) list.splice(index, 1);
  };

  /**
   * Clears a scheduled frame.
   *
   * @param  {Function} frame
   * @private
   */
  FastDom.prototype.clearFrame = function(frame) {
    var index = this.frames.indexOf(frame);
    if (~index) this.frames.splice(index, 1);
  };

  /**
   * Schedules a new read/write
   * batch if one isn't pending.
   *
   * @private
   */
  FastDom.prototype.scheduleBatch = function() {
    var self = this;

    // Schedule batch for next frame
    this.schedule(0, function() {
      self.batch.scheduled = false;
      self.runBatch();
    });

    // Set flag to indicate
    // a frame has been scheduled
    this.batch.scheduled = true;
  };

  /**
   * Generates a unique
   * id for a job.
   *
   * @return {Number}
   * @private
   */
  FastDom.prototype.uniqueId = function() {
    return ++this.lastId;
  };

  /**
   * Calls each job in
   * the list passed.
   *
   * If a context has been
   * stored on the function
   * then it is used, else the
   * current `this` is used.
   *
   * @param  {Array} list
   * @private
   */
  FastDom.prototype.flush = function(list) {
    var id;

    while (id = list.shift()) {
      this.run(this.batch.hash[id]);
    }
  };

  /**
   * Runs any 'read' jobs followed
   * by any 'write' jobs.
   *
   * We run this inside a try catch
   * so that if any jobs error, we
   * are able to recover and continue
   * to flush the batch until it's empty.
   *
   * @private
   */
  FastDom.prototype.runBatch = function() {
    try {

      // Set the mode to 'reading',
      // then empty all read jobs
      this.batch.mode = 'reading';
      this.flush(this.batch.read);

      // Set the mode to 'writing'
      // then empty all write jobs
      this.batch.mode = 'writing';
      this.flush(this.batch.write);

      this.batch.mode = null;

    } catch (e) {
      this.runBatch();
      throw e;
    }
  };

  /**
   * Adds a new job to
   * the given batch.
   *
   * @param {Array}   list
   * @param {Function} fn
   * @param {Object}   ctx
   * @returns {Number} id
   * @private
   */
  FastDom.prototype.add = function(type, fn, ctx) {
    var id = this.uniqueId();
    return this.batch.hash[id] = {
      id: id,
      fn: fn,
      ctx: ctx,
      type: type
    };
  };

  /**
   * Runs a given job.
   *
   * Applications using FastDom
   * have the options of setting
   * `fastdom.onError`.
   *
   * This will catch any
   * errors that may throw
   * inside callbacks, which
   * is useful as often DOM
   * nodes have been removed
   * since a job was scheduled.
   *
   * Example:
   *
   *   fastdom.onError = function(e) {
   *     // Runs when jobs error
   *   };
   *
   * @param  {Object} job
   * @private
   */
  FastDom.prototype.run = function(job){
    var ctx = job.ctx || this;
    var fn = job.fn;

    // Clear reference to the job
    delete this.batch.hash[job.id];

    // If no `onError` handler
    // has been registered, just
    // run the job normally.
    if (!this.onError) {
      return fn.call(ctx);
    }

    // If an `onError` handler
    // has been registered, catch
    // errors that throw inside
    // callbacks, and run the
    // handler instead.
    try { fn.call(ctx); } catch (e) {
      this.onError(e);
    }
  };

  /**
   * Starts a rAF loop
   * to empty the frame queue.
   *
   * @private
   */
  FastDom.prototype.loop = function() {
    var self = this;
    var raf = this.raf;

    // Don't start more than one loop
    if (this.looping) return;

    raf(function frame() {
      var fn = self.frames.shift();

      // If no more frames,
      // stop looping
      if (!self.frames.length) {
        self.looping = false;

      // Otherwise, schedule the
      // next frame
      } else {
        raf(frame);
      }

      // Run the frame.  Note that
      // this may throw an error
      // in user code, but all
      // fastdom tasks are dealt
      // with already so the code
      // will continue to iterate
      if (fn) fn();
    });

    this.looping = true;
  };

  /**
   * Adds a function to
   * a specified index
   * of the frame queue.
   *
   * @param  {Number}   index
   * @param  {Function} fn
   * @return {Function}
   * @private
   */
  FastDom.prototype.schedule = function(index, fn) {

    // Make sure this slot
    // hasn't already been
    // taken. If it has, try
    // re-scheduling for the next slot
    if (this.frames[index]) {
      return this.schedule(index + 1, fn);
    }

    // Start the rAF
    // loop to empty
    // the frame queue
    this.loop();

    // Insert this function into
    // the frames queue and return
    return this.frames[index] = fn;
  };

  // We only ever want there to be
  // one instance of FastDom in an app
  fastdom = fastdom || new FastDom();

  /**
   * Expose 'fastdom'
   */

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fastdom;
  } else if (typeof define === 'function' && define.amd) {
    define('fastdom',[],function(){ return fastdom; });
  } else {
    window['fastdom'] = fastdom;
  }

})(window.fastdom);


define('libs/scroller',['fastdom', 'jquery', 'libs/Class'], function (fastdom, $, Class) {

    var Scroller = Class.extend({
        init: function () {
            this.setupScrollMenu();
        },

        setupScrollMenu: function () {
            $(window).scroll(this.schedulePriceMove.bind(this));
        },

        schedulePriceMove: function () {
            if (!this.read) {
                this.read = fastdom.read(this._read.bind(this));
            }
            if (this.write) {
                fastdom.clear(this.write);
            }
            this.write = fastdom.write(this._do_write.bind(this));
        },

        _read: function () {

        },

        _do_write: function(){
            this._write();
            this.write = null ;
            this.read = null ;
        },
        _write: function () {

        }
    });

    return Scroller;

});
define('subapp/sidebar/scrollbox',['libs/scroller', 'jquery', 'underscore'],function(Scroller, $, _){

    var ScrollBoxApp = Scroller.extend({
        get_target_height: function () {
            if (!this.target_height) {
                this.target_height = this.get_target().getBoundingClientRect().height;
                console.log(this.target_height);
            }
        }, hide_target: function () {
            $(this.get_target()).addClass('hidden');
        },
        init:function(){
            if (!this.get_target()){
                return ;
            }
            this._super();
            this.origin_width = this.get_box().getBoundingClientRect().width;
            this.get_target_height();
            $(this.get_target()).css({
                                           width:this.origin_width+'px',
                                       });
            this.hide_target();
        },
        get_footer: function(){
            return document.getElementById('footer');
        },
        get_box: function(){
            return document.getElementById('side_bar_bottom');
        },

        get_target:function(){
            return document.getElementById('scroll_target');
        },

        get_touch_bottom: function () {
            var footer = this.get_footer().getBoundingClientRect();
            var target = this.get_target().getBoundingClientRect();
            return footer.top <= target.top+target.height+10;
        },
        _read: function(){
                    var box = this.get_box();
                    var rect = box.getBoundingClientRect();
                    this.top_distance = this.get_footer().getBoundingClientRect().top;
                    this.top = rect.top+rect.height;
                    this.touch_bottom = this.get_touch_bottom();
                    //console.log(this.touch_bottom);
                },

        _write:function(){
               if(this.top<0 && this.top_distance > (this.target_height + 20)){
                    $(this.get_target()).removeClass('hidden').addClass('static-box');

               }else{
                    $(this.get_target()).removeClass('static-box');
               }


        },
    });

    return ScrollBoxApp;

});
/*!
 * jQCloud 2.0.3
 * Copyright 2011 Luca Ongaro (http://www.lucaongaro.eu)
 * Copyright 2013 Daniel White (http://www.developerdan.com)
 * Copyright 2014-2017 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('libs/jqcloud',['jquery'], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
'use strict';

/*
 * Plugin class
 */
var jQCloud = function(element, word_array, options) {
    this.$element = $(element);

    this.word_array = word_array || [];
    this.options = options;

    this.sizeGenerator = null;
    this.colorGenerator = null;

    // Data used internally
    this.data = {
        placed_words: [],
        timeouts: {},
        namespace: null,
        step: null,
        angle: null,
        aspect_ratio: null,
        max_weight: null,
        min_weight: null,
        sizes: [],
        colors: []
    };

    this.initialize();
};

jQCloud.DEFAULTS = {
    width: 100,
    height: 100,
    center: { x: 0.5, y: 0.5 },
    steps: 10,
    delay: null,
    shape: 'elliptic',
    classPattern: 'w{n}',
    encodeURI: true,
    removeOverflowing: true,
    afterCloudRender: null,
    autoResize: false,
    colors: null,
    fontSize: null,
    template: null
};

jQCloud.prototype = {
    initialize: function() {
        // Set/Get dimensions
        if (this.options.width) {
            this.$element.width(this.options.width);
        }
        else {
            this.options.width = this.$element.width();
        }
        if (this.options.height) {
            this.$element.height(this.options.height);
        }
        else {
            this.options.height = this.$element.height();
        }

        // Default options value
        this.options = $.extend(true, {}, jQCloud.DEFAULTS, this.options);

        // Ensure delay
        if (this.options.delay === null) {
            this.options.delay = this.word_array.length > 50 ? 10 : 0;
        }

        // Backward compatibility
        if (this.options.center.x > 1) {
            this.options.center.x = this.options.center.x / this.options.width;
            this.options.center.y = this.options.center.y / this.options.height;
        }

        // Create colorGenerator function from options
        // Direct function
        if (typeof this.options.colors == 'function') {
            this.colorGenerator = this.options.colors;
        }
        // Array of sizes
        else if ($.isArray(this.options.colors)) {
            var cl = this.options.colors.length;
            if (cl > 0) {
                // Fill the sizes array to X items
                if (cl < this.options.steps) {
                    for (var i = cl; i < this.options.steps; i++) {
                        this.options.colors[i] = this.options.colors[cl - 1];
                    }
                }

                this.colorGenerator = function(weight) {
                    return this.options.colors[this.options.steps - weight];
                };
            }
        }

        // Create sizeGenerator function from options
        // Direct function
        if (typeof this.options.fontSize == 'function') {
            this.sizeGenerator = this.options.fontSize;
        }
        // Object with 'from' and 'to'
        else if ($.isPlainObject(this.options.fontSize)) {
            this.sizeGenerator = function(width, height, weight) {
                var max = width * this.options.fontSize.from,
                    min = width * this.options.fontSize.to;
                return Math.round(min + (max - min) * 1.0 / (this.options.steps - 1) * (weight - 1)) + 'px';
            };
        }
        // Array of sizes
        else if ($.isArray(this.options.fontSize)) {
            var sl = this.options.fontSize.length;
            if (sl > 0) {
                // Fill the sizes array to X items
                if (sl < this.options.steps) {
                    for (var j = sl; j < this.options.steps; j++) {
                        this.options.fontSize[j] = this.options.fontSize[sl - 1];
                    }
                }

                this.sizeGenerator = function(width, height, weight) {
                    return this.options.fontSize[this.options.steps - weight];
                };
            }
        }

        this.data.angle = Math.random() * 6.28;
        this.data.step = (this.options.shape === 'rectangular') ? 18.0 : 2.0;
        this.data.aspect_ratio = this.options.width / this.options.height;
        this.clearTimeouts();

        // Namespace word ids to avoid collisions between multiple clouds
        this.data.namespace = (this.$element.attr('id') || Math.floor((Math.random() * 1000000)).toString(36)) + '_word_';

        this.$element.addClass('jqcloud');

        // Container's CSS position cannot be 'static'
        if (this.$element.css('position') === 'static') {
            this.$element.css('position', 'relative');
        }

        // Delay execution so that the browser can render the page before the computatively intensive word cloud drawing
        this.createTimeout($.proxy(this.drawWordCloud, this), 10);

        // Attach window resize event
        if (this.options.autoResize) {
            $(window).on('resize.' + this.data.namespace, throttle(this.resize, 50, this));
        }
    },

    // Helper function to keep track of timeouts so they can be destroyed
    createTimeout: function(callback, time) {
        var timeout = setTimeout($.proxy(function() {
            delete this.data.timeouts[timeout];
            callback();
        }, this), time);
        this.data.timeouts[timeout] = true;
    },

    // Destroy all timeouts
    clearTimeouts: function() {
        $.each(this.data.timeouts, function(key) {
            clearTimeout(key);
        });
        this.data.timeouts = {};
    },

    // Pairwise overlap detection
    overlapping: function(a, b) {
        if (Math.abs(2.0 * a.left + a.width - 2.0 * b.left - b.width) < a.width + b.width) {
            if (Math.abs(2.0 * a.top + a.height - 2.0 * b.top - b.height) < a.height + b.height) {
                return true;
            }
        }
        return false;
    },

    // Helper function to test if an element overlaps others
    hitTest: function(elem) {
        // Check elements for overlap one by one, stop and return false as soon as an overlap is found
        for (var i = 0, l = this.data.placed_words.length; i < l; i++) {
            if (this.overlapping(elem, this.data.placed_words[i])) {
                return true;
            }
        }
        return false;
    },

    // Initialize the drawing of the whole cloud
    drawWordCloud: function() {
        var i, l;

        this.$element.children('[id^="' + this.data.namespace + '"]').remove();

        if (this.word_array.length === 0) {
            return;
        }

        // Make sure every weight is a number before sorting
        for (i = 0, l = this.word_array.length; i < l; i++) {
            this.word_array[i].weight = parseFloat(this.word_array[i].weight, 10);
        }

        // Sort word_array from the word with the highest weight to the one with the lowest
        this.word_array.sort(function(a, b) {
            return b.weight - a.weight;
        });

        // Kepp trace of bounds
        this.data.max_weight = this.word_array[0].weight;
        this.data.min_weight = this.word_array[this.word_array.length - 1].weight;

        // Generate colors
        this.data.colors = [];
        if (this.colorGenerator) {
            for (i = 0; i < this.options.steps; i++) {
                this.data.colors.push(this.colorGenerator(i + 1));
            }
        }

        // Generate font sizes
        this.data.sizes = [];
        if (this.sizeGenerator) {
            for (i = 0; i < this.options.steps; i++) {
                this.data.sizes.push(this.sizeGenerator(this.options.width, this.options.height, i + 1));
            }
        }

        // Iterate drawOneWord on every word, immediately or with delay
        if (this.options.delay > 0) {
            this.drawOneWordDelayed();
        }
        else {
            for (i = 0, l = this.word_array.length; i < l; i++) {
                this.drawOneWord(i, this.word_array[i]);
            }

            if (typeof this.options.afterCloudRender === 'function') {
                this.options.afterCloudRender.call(this.$element);
            }
        }
    },

    // Function to draw a word, by moving it in spiral until it finds a suitable empty place
    drawOneWord: function(index, word) {
        var word_id = this.data.namespace + index,
            word_selector = '#' + word_id,

        // option.shape == 'elliptic'
            angle = this.data.angle,
            radius = 0.0,

        // option.shape == 'rectangular'
            steps_in_direction = 0.0,
            quarter_turns = 0.0,

            weight = Math.floor(this.options.steps / 2),
            word_span,
            word_size,
            word_style;

        // Create word attr object
        word.attr = $.extend({}, word.html, { id: word_id });

        // Linearly map the original weight to a discrete scale from 1 to 10
        // Only if weights are different
        if (this.data.max_weight != this.data.min_weight) {
            weight = Math.round((word.weight - this.data.min_weight) * 1.0 * (this.options.steps - 1) / (this.data.max_weight - this.data.min_weight)) + 1;
        }
        word_span = $('<span>').attr(word.attr);

        word_span.addClass('jqcloud-word');

        // Apply class
        if (this.options.classPattern) {
            word_span.addClass(this.options.classPattern.replace('{n}', weight));
        }

        // Apply color
        if (this.data.colors.length) {
            word_span.css('color', this.data.colors[weight - 1]);
        }

        // Apply color from word property
        if (word.color) {
            word_span.css('color', word.color);
        }

        // Apply size
        if (this.data.sizes.length) {
            word_span.css('font-size', this.data.sizes[weight - 1]);
        }

        //Render using template function if provided.
        if (this.options.template) {
            word_span.html(this.options.template(word));
        } else if (word.link) {
            // Append link if word.link attribute was set
            // If link is a string, then use it as the link href
            if (typeof word.link === 'string') {
                word.link = { href: word.link };
            }

            if (this.options.encodeURI) {
                word.link.href = encodeURI(word.link.href).replace(/'/g, '%27');
            }

            word_span.append($('<a>').attr(word.link).text(word.text));
        }
        else {
            word_span.text(word.text);
        }

        // Bind handlers to words
        if (word.handlers) {
            word_span.on(word.handlers);
        }

        this.$element.append(word_span);

        word_size = {
            width: word_span.outerWidth(),
            height: word_span.outerHeight()
        };
        word_size.left = this.options.center.x * this.options.width - word_size.width / 2.0;
        word_size.top = this.options.center.y * this.options.height - word_size.height / 2.0;

        // Save a reference to the style property, for better performance
        word_style = word_span[0].style;
        word_style.position = 'absolute';
        word_style.left = word_size.left + 'px';
        word_style.top = word_size.top + 'px';

        while (this.hitTest(word_size)) {
            // option shape is 'rectangular' so move the word in a rectangular spiral
            if (this.options.shape === 'rectangular') {
                steps_in_direction++;

                if (steps_in_direction * this.data.step > (1 + Math.floor(quarter_turns / 2.0)) * this.data.step * ((quarter_turns % 4 % 2) === 0 ? 1 : this.data.aspect_ratio)) {
                    steps_in_direction = 0.0;
                    quarter_turns++;
                }

                switch (quarter_turns % 4) {
                    case 1:
                        word_size.left += this.data.step * this.data.aspect_ratio + Math.random() * 2.0;
                        break;
                    case 2:
                        word_size.top -= this.data.step + Math.random() * 2.0;
                        break;
                    case 3:
                        word_size.left -= this.data.step * this.data.aspect_ratio + Math.random() * 2.0;
                        break;
                    case 0:
                        word_size.top += this.data.step + Math.random() * 2.0;
                        break;
                }
            }
            // Default settings: elliptic spiral shape
            else {
                radius += this.data.step;
                angle += (index % 2 === 0 ? 1 : -1) * this.data.step;

                word_size.left = this.options.center.x * this.options.width - (word_size.width / 2.0) + (radius * Math.cos(angle)) * this.data.aspect_ratio;
                word_size.top = this.options.center.y * this.options.height + radius * Math.sin(angle) - (word_size.height / 2.0);
            }
            word_style.left = word_size.left + 'px';
            word_style.top = word_size.top + 'px';
        }

        // Don't render word if part of it would be outside the container
        if (this.options.removeOverflowing && (
                word_size.left < 0 || word_size.top < 0 ||
                (word_size.left + word_size.width) > this.options.width ||
                (word_size.top + word_size.height) > this.options.height
            )
        ) {
            word_span.remove();
            return;
        }

        // Save position for further usage
        this.data.placed_words.push(word_size);

        if (typeof word.afterWordRender === 'function') {
            word.afterWordRender.call(word_span);
        }
    },

    // Draw one word then recall the function after a delay
    drawOneWordDelayed: function(index) {
        index = index || 0;

        // if not visible then do not attempt to draw
        if (!this.$element.is(':visible')) {
            this.createTimeout($.proxy(function() {
                this.drawOneWordDelayed(index);
            }, this), 10);

            return;
        }

        if (index < this.word_array.length) {
            this.drawOneWord(index, this.word_array[index]);

            this.createTimeout($.proxy(function() {
                this.drawOneWordDelayed(index + 1);
            }, this), this.options.delay);
        }
        else {
            if (typeof this.options.afterCloudRender == 'function') {
                this.options.afterCloudRender.call(this.$element);
            }
        }
    },

    // Destroy any data and objects added by the plugin
    destroy: function() {
        if (this.options.autoResize) {
            $(window).off('resize.' + this.data.namespace);
        }

        this.clearTimeouts();
        this.$element.removeClass('jqcloud');
        this.$element.removeData('jqcloud');
        this.$element.children('[id^="' + this.data.namespace + '"]').remove();
    },

    // Update the list of words
    update: function(word_array) {
        this.word_array = word_array;
        this.data.placed_words = [];

        this.clearTimeouts();
        this.drawWordCloud();
    },

    resize: function() {
        var new_size = {
            width: this.$element.width(),
            height: this.$element.height()
        };

        if (new_size.width != this.options.width || new_size.height != this.options.height) {
            this.options.width = new_size.width;
            this.options.height = new_size.height;
            this.data.aspect_ratio = this.options.width / this.options.height;

            this.update(this.word_array);
        }
    },
};

/*
 * Apply throttling to a callback
 * @param callback {function}
 * @param delay {int} milliseconds
 * @param context {object|null}
 * @return {function}
 */
function throttle(callback, delay, context) {
    var state = {
        pid: null,
        last: 0
    };

    return function() {
        var elapsed = new Date().getTime() - state.last,
            args = arguments,
            that = this;

        function exec() {
            state.last = new Date().getTime();
            return callback.apply(context || that, Array.prototype.slice.call(args));
        }

        if (elapsed > delay) {
            return exec();
        }
        else {
            clearTimeout(state.pid);
            state.pid = setTimeout(exec, delay - elapsed);
        }
    };
}

/*
 * jQuery plugin
 */
$.fn.jQCloud = function(word_array, option) {
    var args = arguments;

    return this.each(function() {
        var $this = $(this),
            data = $this.data('jqcloud');

        if (!data && word_array === 'destroy') {
            // Don't even try to initialize when called with 'destroy'
            return;
        }
        if (!data) {
            var options = typeof option === 'object' ? option : {};
            $this.data('jqcloud', (data = new jQCloud(this, word_array, options)));
        }
        else if (typeof word_array === 'string') {
            data[word_array].apply(data, Array.prototype.slice.call(args, 1));
        }
    });
};

$.fn.jQCloud.defaults = {
    set: function(options) {
        $.extend(true, jQCloud.DEFAULTS, options);
    },
    get: function(key) {
        var options = jQCloud.DEFAULTS;
        if (key) {
            options = options[key];
        }
        return $.extend(true, {}, options);
    }
};

}));
define('subapp/sidebar/tagcloud',['libs/Class','jquery', 'libs/jqcloud', 'underscore'],
    function(
    Class,
    $,
    jqCloud,
    _
){
    var TagCloud =  Class.extend({
        _clear_tag: function (tag) {
            var new_tag = _.clone(tag);
                new_tag['text'] = tag['name'];
                new_tag['weight'] = (tag['count'] + 160)/12;
                new_tag['link'] = '/news/tag/'+ tag['name'] +'/';
            return new_tag;

        },
        clear_data: function () {
            this.tag_list = _.map(this.tag_list, this._clear_tag.bind(this));
        },
        init: function(){
            console.log('init tag cloud');
            this.$el = $('#tag_cloud');
            this.tag_list = window.tag_list_json;
            if( !this.tag_list || !this.$el.length){
                return;
            }

            this.clear_data();
            this.render();

        },
        render: function(){
            this.$el.jQCloud(this.tag_list);
            //this.$el.jQCloud(
            //
            //)
        },
    });

    return TagCloud;

});
define('subapp/data/btc_forks',[],function () {

    var fork_list =[
                {
                    'name': '比特币上帝',
                    'ename': 'Bitcoin God ',
                    'height': 501225
                },
                {
                    'name': '比特币王者',
                    'ename': 'BTC King ',
                    'height':499999
                },
            ];

    return fork_list;
});

define('subapp/sidebar/clock',['libs/Class', 'jquery', 'underscore','subapp/data/btc_forks'], function (Class, $, _, ForkList) {

    var sorted_fork_list = _.sortBy(ForkList, function(fork){
        return fork['height'];
    });
    var targetblock = sorted_fork_list[0]['height']; // 2x fork block
    var target_fork_name = sorted_fork_list[0]['name'];
    var interval = 600; // ten minute blocks




    function getBlockheight(callback) {
        var current_block = 0 ;
        $.ajax({
            url: 'https://blockchain.info/q/getblockcount',
            success: callback
        });
    }



    function getSecondsRemaining(blockheight, targetblock, interval) {
        blocksremaining = targetblock - blockheight;
        secondsremaining = blocksremaining * interval * 1000;
        return secondsremaining
    }


    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function renderClock(classname, endtime, blockheight) {
        // display block height;

        $(".top_clockdiv")
            .parent()
            .find('.current_block_count')
            .each(function(index,ele){
            $(ele).html(blockheight);
        });

         $(".top_clockdiv")
            .parent()
            .find('.target_block_count')
            .each(function(index,ele){
            $(ele).html(targetblock);
        });


        function do_update(){
            var clocks = document.getElementsByClassName(classname);
            for (var i=0, len=clocks.length ; i<len; i++) {
                updateClock(clocks[i]);
            }
        }


        function updateClock(clock) {

            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = (t.hours);
            minutesSpan.innerHTML = (t.minutes);
            secondsSpan.innerHTML = (t.seconds);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        do_update();
        var timeinterval = setInterval(do_update, 1000);
    }



    function initClock(result){

        var current_block = parseInt(result);
        if(current_block > targetblock){
            sorted_fork_list = sorted_fork_list.slice(1);
            return Run();
        }

        var deadline =   new Date(Date.parse(new Date()) + getSecondsRemaining(current_block, targetblock, interval));

        renderClock('top_clockdiv', deadline, current_block);

    }

    function Run() {
        $('.main-fork_name').html(target_fork_name);
        getBlockheight(initClock)

        // initializeClock('clockdiv', deadline);
    }

    return Run

});


define('subapp/sidebar/sidebar',['libs/Class',
    'jquery',
    //for news
    'subapp/sidebar/news',
    'subapp/data/fakeFeed',
    'subapp/adapters/coinbeef',
    //for price list
    'subapp/sidebar/allcoinprice',
    'subapp/adapters/coinmarketcapAdapter',

    //for tag scroll
    'subapp/sidebar/scrollbox',
    // tag cloud
    'subapp/sidebar/tagcloud',
    'subapp/sidebar/clock'
],
    function(Class,
             $,
             NewsApp,
             FakeFeed,
             CoinBeefAdapter,

             AllCoin,
             AllCoinAdapter,

             ScrollBox,

             TagCloud,
             ForkClock

    ){

    var SideBarApp = Class.extend({
        init:function(){

            this.newsFeed = new FakeFeed({
                data:window.news_obj,
                interval:-1, // no repeat
            });
            this.news =new NewsApp({
                feed:  this.newsFeed,
                adapter: new CoinBeefAdapter()
            });
            // already rendered by server
            // close the feed
            //this.newsFeed.run();

            new AllCoin({
                    feed: window.app.price_feed,
                    adapter : new AllCoinAdapter()
                });

            // for tags list scroll stick
            new ScrollBox();

            // for tagcloud
            new TagCloud();

            // ForkClock();

        }
    });
    return SideBarApp;
});
define('subapp/data/Feed',['libs/Class', 'libs/event', 'jquery'],function(Class, Event , $){

    var _Feed = Class.extend(Event.prototype);
    var Feed = _Feed.extend({
        init: function (options) {
            this.options = options;
            this.interval = options.interval || 5000;
            this._running = false;
        },

        stop: function(){
            window.clearInterval(this._rid);
        },

        run: function(){
            if(this._running) return ;
            this._running = true;
            this._run();
            if(this.interval>0) {
                this._rid = window.setInterval(this._run.bind(this), this.interval)
            }else{
                this._running = false;
                return ;
            }
        },

        _run: function(){
            $.when($.ajax(this.options)).then(
                this.request_success.bind(this),
                this.request_fail.bind(this)
            )
        },

        request_success:function(data){
            this.emit('data_arrive', data);
        },
        request_fail:function(data){
            this.emit('request_fail',data);
        },

    });

    return Feed;

});
define('subapp/adapters/coinbeef_all',[
    'subapp/adapters/coinbeef',
    'underscore'],

    function(Coinbeef24h, _){

        var CoinbeefAdapterAll = Coinbeef24h.extend({
            spit: function(){
              var result =  _.map(this.data['results'],
                             this.add_formatted_time.bind(this));

              return _.map(result, this.add_time_title.bind(this));

            },
            add_time_title: function(entry){
                var utc_fix = new Date().getTimezoneOffset();
                var local_timestamp = this.get_entry_date(entry) - 1000*60*utc_fix
                var dt = new Date(local_timestamp);
                var month = entry['month'] = dt.getMonth() + 1;
                var date = entry['date'] = dt.getDate();
                var year = entry['year'] = dt.getFullYear();

                if(this.last_show_date == date
                    && this.last_show_month == month
                ){
                    entry['show_time'] = false;
                } else{
                    entry['show_time'] = true;
                    this.last_show_date = date;
                    this.last_show_month = month;
                }

                if(this.last_show_year == year){
                    entry['show_year'] = false;
                }else{
                    entry['show_year'] = true;
                    this.last_show_year = year;
                }

                return entry ;
            }
        });

        return CoinbeefAdapterAll
});
define('subapp/newsline',['libs/Class','subapp/data/fakeFeed','subapp/data/Feed','subapp/adapters/coinbeef_all','underscore'],
    function(Class,FakeFeed,Feed,CoinBeefAdapter,_){

        var NewsLineApp = Class.extend({

            get_feed: function (options) {
                var feed = new Feed(options);
                feed.on('data_arrive',this.handle_data.bind(this));
                feed.on('data_fail', this.handle_fail.bind(this));
                return feed;
            },

            get_fake_feed: function(options){
                var feed = new FakeFeed(options);
                feed.on('data_arrive',this.handle_data.bind(this));
                feed.on('data_fail', this.handle_fail.bind(this));
                return feed;
            },

            display_loading_info: function () {
                if(this.$loadBtn && this.$loadBtn.length){
                    this.$loadBtn.html('加载中...');
                }
            },

            hide_loading_info: function () {
                 if(this.$loadBtn && this.$loadBtn.length){
                     this.$loadBtn.html('加载更多');
                 }
            },

            load_next: function () {
                if(!this.next_page_url) return ;

                this.display_loading_info();

                //release old feed
                delete(this.dataFeed);

                this.dataFeed = this.get_feed({
                    url: this.next_page_url,
                    method: "GET",
                    interval:-1
                });

                this.dataFeed.run();

            },
            initLoadBtn: function () {
                var $btn = this.$loadBtn = $('.btn-load-news');
                if(!$btn.length){
                    return
                }
                $btn.on('click', this.load_next.bind(this));
            },


            init:function(){

                this.$newsline =  $('.newsline');
                if(!!!this.$newsline.length) return ;

                this.template = _.template($('#newsline_template').html());

                //this.dataFeed = this.get_feed({
                //     url: '/news/json/?page=1',
                //    method: 'GET',
                //    interval:-1, // no repeat
                //});

                this.dataFeed = this.get_fake_feed({
                    data: window.news_obj,
                    interval:-1, // no repeat

                });

                this.adapter = new CoinBeefAdapter();

                this.dataFeed.run();
                this.initLoadBtn();
            },

            hide_load_btn: function () {
                 $('.btn-load-news').hide();
            },
            handle_data: function(data){
                this.next_page_url = this.get_next_page_url(data['next']);
                if(!this.next_page_url){
                    this.hide_load_btn();
                }
                this.data_list = this.adapter.update(data).spit();
                this.render();
                this.hide_loading_info();
            },

            get_next_page_url:function(origin_url){
                var host = '/news/json/';
                if(!origin_url){
                    return null;
                }
                var parser = document.createElement('a');
                parser.href = origin_url;
                return host + parser.search;
            },

            handle_fail: function(data){
                console.log('news data fail');
                console.log(data);
                this.hide_loading_info();
            },

            remove_first_year: function () {
                $('.year-wrapper').addClass('shown-year');
                $('.year-wrapper').first().removeClass('shown-year');
            },
            render: function(){
                //console.log(this.data_list);
                _.map(this.data_list, this._render_item.bind(this));
                this.remove_first_year();
            },
            _render_item: function(entry){
                this.create_element(entry);
            },
            create_element: function (entry) {
                this.$newsline.append($(this.template(entry)))
            },


        });

        return NewsLineApp;
    });
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
define("libs/underscore", function(){});

/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 */

;(function(fastdom){

  'use strict';

  // Normalize rAF
  var raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(cb) { return window.setTimeout(cb, 1000 / 60); };

  /**
   * Creates a fresh
   * FastDom instance.
   *
   * @constructor
   */
  function FastDom() {
    this.frames = [];
    this.lastId = 0;

    // Placing the rAF method
    // on the instance allows
    // us to replace it with
    // a stub for testing.
    this.raf = raf;

    this.batch = {
      hash: {},
      read: [],
      write: [],
      mode: null
    };
  }

  /**
   * Adds a job to the
   * read batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.read = function(fn, ctx) {
    var job = this.add('read', fn, ctx);
    var id = job.id;

    // Add this job to the read queue
    this.batch.read.push(job.id);

    // We should *not* schedule a new frame if:
    // 1. We're 'reading'
    // 2. A frame is already scheduled
    var doesntNeedFrame = this.batch.mode === 'reading'
      || this.batch.scheduled;

    // If a frame isn't needed, return
    if (doesntNeedFrame) return id;

    // Schedule a new
    // frame, then return
    this.scheduleBatch();
    return id;
  };

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.write = function(fn, ctx) {
    var job = this.add('write', fn, ctx);
    var mode = this.batch.mode;
    var id = job.id;

    // Push the job id into the queue
    this.batch.write.push(job.id);

    // We should *not* schedule a new frame if:
    // 1. We are 'writing'
    // 2. We are 'reading'
    // 3. A frame is already scheduled.
    var doesntNeedFrame = mode === 'writing'
      || mode === 'reading'
      || this.batch.scheduled;

    // If a frame isn't needed, return
    if (doesntNeedFrame) return id;

    // Schedule a new
    // frame, then return
    this.scheduleBatch();
    return id;
  };

  /**
   * Defers the given job
   * by the number of frames
   * specified.
   *
   * If no frames are given
   * then the job is run in
   * the next free frame.
   *
   * @param  {Number}   frame
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.defer = function(frame, fn, ctx) {

    // Accepts two arguments
    if (typeof frame === 'function') {
      ctx = fn;
      fn = frame;
      frame = 1;
    }

    var self = this;
    var index = frame - 1;

    return this.schedule(index, function() {
      self.run({
        fn: fn,
        ctx: ctx
      });
    });
  };

  /**
   * Clears a scheduled 'read',
   * 'write' or 'defer' job.
   *
   * @param  {Number|String} id
   * @public
   */
  FastDom.prototype.clear = function(id) {

    // Defer jobs are cleared differently
    if (typeof id === 'function') {
      return this.clearFrame(id);
    }

    // Allow ids to be passed as strings
    id = Number(id);

    var job = this.batch.hash[id];
    if (!job) return;

    var list = this.batch[job.type];
    var index = list.indexOf(id);

    // Clear references
    delete this.batch.hash[id];
    if (~index) list.splice(index, 1);
  };

  /**
   * Clears a scheduled frame.
   *
   * @param  {Function} frame
   * @private
   */
  FastDom.prototype.clearFrame = function(frame) {
    var index = this.frames.indexOf(frame);
    if (~index) this.frames.splice(index, 1);
  };

  /**
   * Schedules a new read/write
   * batch if one isn't pending.
   *
   * @private
   */
  FastDom.prototype.scheduleBatch = function() {
    var self = this;

    // Schedule batch for next frame
    this.schedule(0, function() {
      self.batch.scheduled = false;
      self.runBatch();
    });

    // Set flag to indicate
    // a frame has been scheduled
    this.batch.scheduled = true;
  };

  /**
   * Generates a unique
   * id for a job.
   *
   * @return {Number}
   * @private
   */
  FastDom.prototype.uniqueId = function() {
    return ++this.lastId;
  };

  /**
   * Calls each job in
   * the list passed.
   *
   * If a context has been
   * stored on the function
   * then it is used, else the
   * current `this` is used.
   *
   * @param  {Array} list
   * @private
   */
  FastDom.prototype.flush = function(list) {
    var id;

    while (id = list.shift()) {
      this.run(this.batch.hash[id]);
    }
  };

  /**
   * Runs any 'read' jobs followed
   * by any 'write' jobs.
   *
   * We run this inside a try catch
   * so that if any jobs error, we
   * are able to recover and continue
   * to flush the batch until it's empty.
   *
   * @private
   */
  FastDom.prototype.runBatch = function() {
    try {

      // Set the mode to 'reading',
      // then empty all read jobs
      this.batch.mode = 'reading';
      this.flush(this.batch.read);

      // Set the mode to 'writing'
      // then empty all write jobs
      this.batch.mode = 'writing';
      this.flush(this.batch.write);

      this.batch.mode = null;

    } catch (e) {
      this.runBatch();
      throw e;
    }
  };

  /**
   * Adds a new job to
   * the given batch.
   *
   * @param {Array}   list
   * @param {Function} fn
   * @param {Object}   ctx
   * @returns {Number} id
   * @private
   */
  FastDom.prototype.add = function(type, fn, ctx) {
    var id = this.uniqueId();
    return this.batch.hash[id] = {
      id: id,
      fn: fn,
      ctx: ctx,
      type: type
    };
  };

  /**
   * Runs a given job.
   *
   * Applications using FastDom
   * have the options of setting
   * `fastdom.onError`.
   *
   * This will catch any
   * errors that may throw
   * inside callbacks, which
   * is useful as often DOM
   * nodes have been removed
   * since a job was scheduled.
   *
   * Example:
   *
   *   fastdom.onError = function(e) {
   *     // Runs when jobs error
   *   };
   *
   * @param  {Object} job
   * @private
   */
  FastDom.prototype.run = function(job){
    var ctx = job.ctx || this;
    var fn = job.fn;

    // Clear reference to the job
    delete this.batch.hash[job.id];

    // If no `onError` handler
    // has been registered, just
    // run the job normally.
    if (!this.onError) {
      return fn.call(ctx);
    }

    // If an `onError` handler
    // has been registered, catch
    // errors that throw inside
    // callbacks, and run the
    // handler instead.
    try { fn.call(ctx); } catch (e) {
      this.onError(e);
    }
  };

  /**
   * Starts a rAF loop
   * to empty the frame queue.
   *
   * @private
   */
  FastDom.prototype.loop = function() {
    var self = this;
    var raf = this.raf;

    // Don't start more than one loop
    if (this.looping) return;

    raf(function frame() {
      var fn = self.frames.shift();

      // If no more frames,
      // stop looping
      if (!self.frames.length) {
        self.looping = false;

      // Otherwise, schedule the
      // next frame
      } else {
        raf(frame);
      }

      // Run the frame.  Note that
      // this may throw an error
      // in user code, but all
      // fastdom tasks are dealt
      // with already so the code
      // will continue to iterate
      if (fn) fn();
    });

    this.looping = true;
  };

  /**
   * Adds a function to
   * a specified index
   * of the frame queue.
   *
   * @param  {Number}   index
   * @param  {Function} fn
   * @return {Function}
   * @private
   */
  FastDom.prototype.schedule = function(index, fn) {

    // Make sure this slot
    // hasn't already been
    // taken. If it has, try
    // re-scheduling for the next slot
    if (this.frames[index]) {
      return this.schedule(index + 1, fn);
    }

    // Start the rAF
    // loop to empty
    // the frame queue
    this.loop();

    // Insert this function into
    // the frames queue and return
    return this.frames[index] = fn;
  };

  // We only ever want there to be
  // one instance of FastDom in an app
  fastdom = fastdom || new FastDom();

  /**
   * Expose 'fastdom'
   */

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fastdom;
  } else if (typeof define === 'function' && define.amd) {
    define('libs/fastdom',[],function(){ return fastdom; });
  } else {
    window['fastdom'] = fastdom;
  }

})(window.fastdom);


define('subapp/gotop',['jquery', 'libs/underscore', 'libs/Class', 'libs/fastdom'],
    function ($, _, Class, fastdom) {

        var GoTop = Class.extend({
            init: function () {
                this.topLinkWrapper = $('.gotop-wrapper');

                if (this.topLinkWrapper.length) {
                    this.setupWatcher();
                    this.topLinkWrapper.on('click', this.do_top.bind(this));
                } else {
                    return;
                }
            },

            do_top: function () {
                $("html, body").animate(
                    {scrollTop: 0}, 500
                );
                return false;
            },
            setupWatcher: function () {
                $(window).scroll(this.onScroll.bind(this));
            },
            onScroll: function () {
                if (this.read) {
                    fastdom.clear(this.read);
                }
                this.read = fastdom.read(this.doRead.bind(this));
                if (this.write) {
                    fastdom.clear(this.write);
                }
                this.write = fastdom.write(this.doWrite.bind(this));
            },
            doRead: function () {
                this.scrollTop = $(window).scrollTop();
                if (this.topLinkWrapper.length) {
                    this.btnRect = this.topLinkWrapper[0].getBoundingClientRect();
                }
                this.content_rect = $('#content .container')[0].getBoundingClientRect()
                this.footerRect = $('#footer')[0].getBoundingClientRect();
            },
            doWrite: function () {
                var that = this;
                if (!this.scrollTop) {
                    return;
                }
                if (this.scrollTop > 400) {
                    fastdom.write(this.show_top_link.bind(this));

                } else {
                    fastdom.write(this.hide_top_link.bind(this));
                }
            },
            show_top_link:function(){
                var item_left = this.content_rect.left + this.content_rect.width;
                this.topLinkWrapper.show();
            },

            hide_top_link:function(){
                 this.topLinkWrapper.hide();
            }

        });

        return GoTop;
    });
/*!
 * Salvattore 1.0.9 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 */
!function(e,t){"function"==typeof define&&define.amd?define('libs/salvattore',[],t):"object"==typeof exports?module.exports=t():e.salvattore=t()}(this,function(){/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css",t.id="matchmediajs-test",n.parentNode.insertBefore(t,n),r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=n:t.textContent=n,"1px"===r.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}()),/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function(){"use strict";if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,t=e("only all").matches,n=!1,r=0,a=[],i=function(t){clearTimeout(r),r=setTimeout(function(){for(var t=0,n=a.length;n>t;t++){var r=a[t].mql,i=a[t].listeners||[],o=e(r.media).matches;if(o!==r.matches){r.matches=o;for(var c=0,l=i.length;l>c;c++)i[c].call(window,r)}}},30)};window.matchMedia=function(r){var o=e(r),c=[],l=0;return o.addListener=function(e){t&&(n||(n=!0,window.addEventListener("resize",i,!0)),0===l&&(l=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var t=0,n=c.length;n>t;t++)c[t]===e&&c.splice(t,1)},o}}(),function(){"use strict";for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),a=Math.max(0,16-(r-e)),i=window.setTimeout(function(){t(r+a)},a);return e=r+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),"function"!=typeof window.CustomEvent&&!function(){"use strict";function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();var e=function(e,t,n){"use strict";var r={},a=[],i=[],o=[],c=function(e,t,n){e.dataset?e.dataset[t]=n:e.setAttribute("data-"+t,n)};return r.obtainGridSettings=function(t){var n=e.getComputedStyle(t,":before"),r=n.getPropertyValue("content").slice(1,-1),a=r.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/),i=1,o=[];return a?(i=a[1],o=a[2],o=o?o.split("."):["column"]):(a=r.match(/^\s*\.(.+)\s+(\d+)\s*$/),a&&(o=a[1],i=a[2],i&&(i=i.split(".")))),{numberOfColumns:i,columnClasses:o}},r.addColumns=function(e,n){for(var a,i=r.obtainGridSettings(e),o=i.numberOfColumns,l=i.columnClasses,s=new Array(+o),u=t.createDocumentFragment(),d=o;0!==d--;)a="[data-columns] > *:nth-child("+o+"n-"+d+")",s.push(n.querySelectorAll(a));s.forEach(function(e){var n=t.createElement("div"),r=t.createDocumentFragment();n.className=l.join(" "),Array.prototype.forEach.call(e,function(e){r.appendChild(e)}),n.appendChild(r),u.appendChild(n)}),e.appendChild(u),c(e,"columns",o)},r.removeColumns=function(n){var r=t.createRange();r.selectNodeContents(n);var a=Array.prototype.filter.call(r.extractContents().childNodes,function(t){return t instanceof e.HTMLElement}),i=a.length,o=a[0].childNodes.length,l=new Array(o*i);Array.prototype.forEach.call(a,function(e,t){Array.prototype.forEach.call(e.children,function(e,n){l[n*i+t]=e})});var s=t.createElement("div");return c(s,"columns",0),l.filter(function(e){return!!e}).forEach(function(e){s.appendChild(e)}),s},r.recreateColumns=function(t){e.requestAnimationFrame(function(){r.addColumns(t,r.removeColumns(t));var e=new CustomEvent("columnsChange");t.dispatchEvent(e)})},r.mediaQueryChange=function(e){e.matches&&Array.prototype.forEach.call(a,r.recreateColumns)},r.getCSSRules=function(e){var t;try{t=e.sheet.cssRules||e.sheet.rules}catch(n){return[]}return t||[]},r.getStylesheets=function(){var e=Array.prototype.slice.call(t.querySelectorAll("style"));return e.forEach(function(t,n){"text/css"!==t.type&&""!==t.type&&e.splice(n,1)}),Array.prototype.concat.call(e,Array.prototype.slice.call(t.querySelectorAll("link[rel='stylesheet']")))},r.mediaRuleHasColumnsSelector=function(e){var t,n;try{t=e.length}catch(r){t=0}for(;t--;)if(n=e[t],n.selectorText&&n.selectorText.match(/\[data-columns\](.*)::?before$/))return!0;return!1},r.scanMediaQueries=function(){var t=[];if(e.matchMedia){r.getStylesheets().forEach(function(e){Array.prototype.forEach.call(r.getCSSRules(e),function(e){try{e.media&&e.cssRules&&r.mediaRuleHasColumnsSelector(e.cssRules)&&t.push(e)}catch(n){}})});var n=i.filter(function(e){return-1===t.indexOf(e)});o.filter(function(e){return-1!==n.indexOf(e.rule)}).forEach(function(e){e.mql.removeListener(r.mediaQueryChange)}),o=o.filter(function(e){return-1===n.indexOf(e.rule)}),t.filter(function(e){return-1==i.indexOf(e)}).forEach(function(t){var n=e.matchMedia(t.media.mediaText);n.addListener(r.mediaQueryChange),o.push({rule:t,mql:n})}),i.length=0,i=t}},r.rescanMediaQueries=function(){r.scanMediaQueries(),Array.prototype.forEach.call(a,r.recreateColumns)},r.nextElementColumnIndex=function(e,t){var n,r,a,i=e.children,o=i.length,c=0,l=0;for(a=0;o>a;a++)n=i[a],r=n.children.length+(t[a].children||t[a].childNodes).length,0===c&&(c=r),c>r&&(l=a,c=r);return l},r.createFragmentsList=function(e){for(var n=new Array(e),r=0;r!==e;)n[r]=t.createDocumentFragment(),r++;return n},r.appendElements=function(e,t){var n=e.children,a=n.length,i=r.createFragmentsList(a);Array.prototype.forEach.call(t,function(t){var n=r.nextElementColumnIndex(e,i);i[n].appendChild(t)}),Array.prototype.forEach.call(n,function(e,t){e.appendChild(i[t])})},r.prependElements=function(e,n){var a=e.children,i=a.length,o=r.createFragmentsList(i),c=i-1;n.forEach(function(e){var t=o[c];t.insertBefore(e,t.firstChild),0===c?c=i-1:c--}),Array.prototype.forEach.call(a,function(e,t){e.insertBefore(o[t],e.firstChild)});for(var l=t.createDocumentFragment(),s=n.length%i;0!==s--;)l.appendChild(e.lastChild);e.insertBefore(l,e.firstChild)},r.registerGrid=function(n){if("none"!==e.getComputedStyle(n).display){var i=t.createRange();i.selectNodeContents(n);var o=t.createElement("div");o.appendChild(i.extractContents()),c(o,"columns",0),r.addColumns(n,o),a.push(n)}},r.init=function(){var e=t.createElement("style");e.innerHTML="[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}",t.head.appendChild(e);var n=t.querySelectorAll("[data-columns]");Array.prototype.forEach.call(n,r.registerGrid),r.scanMediaQueries()},r.init(),{appendElements:r.appendElements,prependElements:r.prependElements,registerGrid:r.registerGrid,recreateColumns:r.recreateColumns,rescanMediaQueries:r.rescanMediaQueries,init:r.init,append_elements:r.appendElements,prepend_elements:r.prependElements,register_grid:r.registerGrid,recreate_columns:r.recreateColumns,rescan_media_queries:r.rescanMediaQueries}}(window,window.document);return e});
define('subapp/tools/bookmark',['jquery'], function($){

    $(function() {
      $('.bookmarkme').click(function() {
        if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
          window.sidebar.addPanel(document.title, window.location.href, '');
        } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
          window.external.AddFavorite(location.href, document.title);
        } else if (window.opera && window.print) { // Opera Hotlist
          this.title = document.title;
          return true;
        } else { // webkit - safari/chrome
          alert('请按下 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D 来收藏本站。');
        }
      });
    });
});
define('subapp/news/tagtrigger',['jquery','libs/Class'],function ($, Class) {
   var TagTrigger = Class.extend({
       init: function(){
           if(!!!$('.news-line-wrapper .tag-list-filter-list').length) return;

           $('.news-line-wrapper .tag-list-filter-list').prepend(
               '<a class="trigger-btn"><i class="fa fa-sort-down" aria-hidden="true"></i></a>'
           );
           var $btn = $('a.trigger-btn');
           var $btnIcon = $('.news-line-wrapper .tag-list-filter-list i');
           var $ul = $('.news-line-wrapper ul.tag-list-filter-list');
           $btn.on('click', function(){
               $ul.toggleClass('tag-list-filter-list-hide');
               $btnIcon.toggleClass('icon-rotate');
               // $btnIcon.toggleClass('fa-sort-down').toggleClass('fa-sort-up');
           });
       }
   });
   return TagTrigger;
});
define('subapp/captcha/captcha',['jquery','libs/Class'],function ($, Class) {
   var Captcha = Class.extend({
       init: function(){
           var toggleImg = function(){
               $('img.c-image').remove();
               var rd = Math.random();
               $('a.c-refresh').before(
                   $('<img class="c-image image_VhirG6" src="/captcha/?rd='+ rd +'">')
               );
               $('img.c-image').css({
                   height: '40px',
                   width: '150px'
               });
               $('img.c-image').click(toggleImg);
               return false;
           };
           $('img.c-image').click(toggleImg)
               .wrap('<div></div>')
               .after('<a href="javascript:;" class="c-refresh">看不清，换一张</a>');
           $('.c-refresh').click(toggleImg);
       }
   });
   return Captcha;
});
define('libs/csrf',['jquery'],function($){

    function getCookie(name) {
    var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});
define('subapp/submit/getsitedata',['jquery','libs/Class', 'libs/csrf'], function($, Class, CSRF){

    var GetSiteData = Class.extend({
        init: function(){
            var $dom = $('#id_web_site').after('<div class="url-error">网址不合法</div>')
                .parent('div').css('position', 'relative');
            $('.url-error').hide();
            $('#id_web_site').on('blur', function(){
                var url = location.protocol + '//' + location.host + '/tools/site/?url=' + $(this).val();
                var reg = /^(http|https):\/\/([a-zA-Z0-9]+.)+[a-zA-Z0-9]+(\/.+)*\/?$/;
                if(reg.test($(this).val())){
                    $('.url-error').hide();
                    $.getJSON(url, function(data){
                        $('#id_cname').val(data.title);
                        $('#id_description').val(data.description);
                    });
                } else {
                    $('.url-error').show();
                }
            });
        }
    });
    return GetSiteData;
});
define('subapp/header/search_news',['libs/Class', 'jquery'], function(Class, $){
    var SearchNews = Class.extend({
        init: function(){

            $('#search-news-btn').click(function(){
                var q = $('input[name="q"]').val().trim();
                if(q === ''){
                    if(location.pathname === '/'){
                        return false;
                    } else {
                        location.href = '/';
                        return false;
                    }
                }
                window.location.href = '/search/news/?q=' + q;
                return false;
            });

        }
    });
    return SearchNews;
});


define('subapp/header/search_site',['libs/Class', 'jquery'], function(Class, $){
    var SearchSite = Class.extend({
        init: function(){

            $('#search-site-btn').click(function(){
                var q = $('input[name="q"]').val().trim();
                if(q === ''){
                    if(location.pathname === '/'){
                        return false;
                    } else {
                        location.href = '/';
                        return false;
                    }
                }
            });

        }
    });
    return SearchSite;
});
define('subapp/search/search_news_ajax',['libs/Class', 'jquery', 'underscore'], function(Class, $, _){
    var SearchNewsAjax = Class.extend({
        init: function(){

            var $ajaxContent = $('#ajax-news-content');
            if(!!!$ajaxContent.length) return;

            var searchVal = '',
                tpl = '',
                nextURL = '';

            var compiled = _.template($('#search_news_template').html());

            var ajaxCallback = function(data){
                if(data.count == 0) {
                    recommendNews();
                } else {
                    renderTemplate(data);
                }
            };

            var recommendNews = function(){
                console.log('recommendation');
                $.getJSON('http://www.chainnews.com/api/news/recommendation?t=' + searchVal, renderTemplate);
            };

            var renderTemplate = function (data) {
                tpl += compiled(data);
                $('#ajax-news-content .box-body').html(tpl);
                $('#ajax-news-content .box-header').html(
                     '含「<span class="query-word">'
                     + searchVal
                     + '</span>」的搜索结果约 '
                     + data.count + ' 条'
                );
                if(data.next){
                     $('#ajax-news-content .box-footer').css('display', 'block');
                     nextURL = data.next;
                }
            };

            searchVal = decodeURI(location.href.replace(/^http:\/\/.*?q=/, ''));
            $('#ajax-news-content .box-header').html(
                     '含「<span class="query-word">'
                     + searchVal
                     + '</span>」的搜索结果约 '
                     + ' 条'
            );
            $('input[name="q"]').attr('value', searchVal);
            $('#ajax-news-content .box-footer button').click(function(){
                 var ajaxURL = nextURL;
                 if(!ajaxURL) return false;
                 var $that = $(this);
                 $that.html('<i class="fa fa-spinner" aria-hidden="true"></i>');
                 $.ajax({
                     method: 'GET',
                     url: ajaxURL,
                     jsonp: true,
                     success: function(data){
                         ajaxCallback(data);
                         $that.html('加载更多').trigger('blur');
                     }
                 });
            });
            $.ajax({
                 method: 'GET',
                 url: 'http://api.chainnews.com/api/news/search.json?q=' + searchVal,
                 data: {},
                 jsonp: 'true',
                 success: ajaxCallback.bind(this)
            });

        }
    });
    return SearchNewsAjax;
});


define('subapp/countdown/btc_countdown',['libs/Class', 'underscore', 'jquery', 'subapp/data/btc_forks'], function(Class, _, $, fork_list){
    var BtcCountdown = Class.extend({
        init: function(){
            if(!$('.coin-name-sidebar').length) return;


            fork_list.sort(function (a, b) {
                return a.height - b.height;
            });

            var interval = 600;
            render();

            function getBlockHeight(callback){
                $.ajax({
                    url: 'https://blockchain.info/q/getblockcount',
                    success: callback
                });
            }
            function initClock(result){
                var current_block = parseInt(result);
                var deadline = [];
                for(var i = 0; i < fork_list.length; i++){
                    var targetblock = fork_list[i]['height'];
                    deadline.push(new Date(Date.parse(new Date())
                        + getSecondsRemaining(current_block, targetblock, interval)));
                }
                if($('.clockdiv').length) {
                    renderClock('clockdiv', deadline, current_block);
                }
                if($('.top_clockdiv').length) {
                    renderClock('top_clockdiv', deadline, current_block);
                    $('.top_clockdiv .target_block_count').html(fork_list[0].height);
                    $('.coin-name-sidebar').html(fork_list[0].name + '&nbsp;' + fork_list[0].ename)
                }

            }
            function getSecondsRemaining(blockheight, targetblock, interval) {
                var blocksremaining = targetblock - blockheight;
                var secondsremaining = blocksremaining * interval * 1000;
                return secondsremaining;
            }
            function getTimeRemaining(endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            }
            function renderClock(classname, endtime, blockheight) {
                // display block height;

                $('.current_block_count').each(function(index,ele){
                    $(ele).html(blockheight);
                });

                function do_update(){
                    var clocks = document.getElementsByClassName(classname);
                    for (var i=0, len=clocks.length ; i<len; i++) {
                        if(!updateClock(clocks[i], endtime, i)){
                            return ;
                        }
                    }
                }


                function updateClock(clock, endtime, i) {

                    var daysSpan = clock.querySelector('.days');
                    var hoursSpan = clock.querySelector('.hours');
                    var minutesSpan = clock.querySelector('.minutes');
                    var secondsSpan = clock.querySelector('.seconds');

                    var t = getTimeRemaining(endtime[i]);
                    if(t.total <= 0) {
                        fork_list.splice(i, 1);
                        clearInterval(timeinterval);
                        render();
                        return false;
                    } else {
                        daysSpan.innerHTML = t.days;
                        hoursSpan.innerHTML = ('' + t.hours).slice(-2);
                        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
                        return true;
                    }

                }

                do_update();
                var timeinterval = setInterval(do_update, 1000);
            }
            function render(){
                if($('#btc-countdown-tpl').length){
                    var compiled = _.template($('#btc-countdown-tpl').html());
                    var html = compiled({list:fork_list});
                    $('#btc-countdown').html(html);
                }
                getBlockHeight(initClock);
            }
        }
    });

    return BtcCountdown;
});
/* @preserve
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2017 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
/**
 * bluebird build version 3.5.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define('libs/bluebird',[],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Promise=t()}}(function(){var t,e,n;return function r(t,e,n){function i(s,a){if(!e[s]){if(!t[s]){var c="function"==typeof _dereq_&&_dereq_;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return i(n?n:e)},u,u.exports,r,t,e,n)}return e[s].exports}for(var o="function"==typeof _dereq_&&_dereq_,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=new n(t),r=e.promise();return e.setHowMany(1),e.setUnwrap(),e.init(),r}var n=t._SomePromiseArray;t.any=function(t){return e(t)},t.prototype.any=function(){return e(this)}}},{}],2:[function(t,e,n){"use strict";function r(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new u(16),this._normalQueue=new u(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var t=this;this.drainQueues=function(){t._drainQueues()},this._schedule=l}function i(t,e,n){this._lateQueue.push(t,e,n),this._queueTick()}function o(t,e,n){this._normalQueue.push(t,e,n),this._queueTick()}function s(t){this._normalQueue._pushOne(t),this._queueTick()}var a;try{throw new Error}catch(c){a=c}var l=t("./schedule"),u=t("./queue"),p=t("./util");r.prototype.setScheduler=function(t){var e=this._schedule;return this._schedule=t,this._customScheduler=!0,e},r.prototype.hasCustomScheduler=function(){return this._customScheduler},r.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},r.prototype.disableTrampolineIfNecessary=function(){p.hasDevTools&&(this._trampolineEnabled=!1)},r.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},r.prototype.fatalError=function(t,e){e?(process.stderr.write("Fatal "+(t instanceof Error?t.stack:t)+"\n"),process.exit(2)):this.throwLater(t)},r.prototype.throwLater=function(t,e){if(1===arguments.length&&(e=t,t=function(){throw e}),"undefined"!=typeof setTimeout)setTimeout(function(){t(e)},0);else try{this._schedule(function(){t(e)})}catch(n){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}},p.hasDevTools?(r.prototype.invokeLater=function(t,e,n){this._trampolineEnabled?i.call(this,t,e,n):this._schedule(function(){setTimeout(function(){t.call(e,n)},100)})},r.prototype.invoke=function(t,e,n){this._trampolineEnabled?o.call(this,t,e,n):this._schedule(function(){t.call(e,n)})},r.prototype.settlePromises=function(t){this._trampolineEnabled?s.call(this,t):this._schedule(function(){t._settlePromises()})}):(r.prototype.invokeLater=i,r.prototype.invoke=o,r.prototype.settlePromises=s),r.prototype._drainQueue=function(t){for(;t.length()>0;){var e=t.shift();if("function"==typeof e){var n=t.shift(),r=t.shift();e.call(n,r)}else e._settlePromises()}},r.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},r.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},r.prototype._reset=function(){this._isTickUsed=!1},e.exports=r,e.exports.firstLineError=a},{"./queue":26,"./schedule":29,"./util":36}],3:[function(t,e,n){"use strict";e.exports=function(t,e,n,r){var i=!1,o=function(t,e){this._reject(e)},s=function(t,e){e.promiseRejectionQueued=!0,e.bindingPromise._then(o,o,null,this,t)},a=function(t,e){0===(50397184&this._bitField)&&this._resolveCallback(e.target)},c=function(t,e){e.promiseRejectionQueued||this._reject(t)};t.prototype.bind=function(o){i||(i=!0,t.prototype._propagateFrom=r.propagateFromFunction(),t.prototype._boundValue=r.boundValueFunction());var l=n(o),u=new t(e);u._propagateFrom(this,1);var p=this._target();if(u._setBoundTo(l),l instanceof t){var h={promiseRejectionQueued:!1,promise:u,target:p,bindingPromise:l};p._then(e,s,void 0,u,h),l._then(a,c,void 0,u,h),u._setOnCancel(l)}else u._resolveCallback(p);return u},t.prototype._setBoundTo=function(t){void 0!==t?(this._bitField=2097152|this._bitField,this._boundTo=t):this._bitField=-2097153&this._bitField},t.prototype._isBound=function(){return 2097152===(2097152&this._bitField)},t.bind=function(e,n){return t.resolve(n).bind(e)}}},{}],4:[function(t,e,n){"use strict";function r(){try{Promise===o&&(Promise=i)}catch(t){}return o}var i;"undefined"!=typeof Promise&&(i=Promise);var o=t("./promise")();o.noConflict=r,e.exports=o},{"./promise":22}],5:[function(t,e,n){"use strict";var r=Object.create;if(r){var i=r(null),o=r(null);i[" size"]=o[" size"]=0}e.exports=function(e){function n(t,n){var r;if(null!=t&&(r=t[n]),"function"!=typeof r){var i="Object "+a.classString(t)+" has no method '"+a.toString(n)+"'";throw new e.TypeError(i)}return r}function r(t){var e=this.pop(),r=n(t,e);return r.apply(t,this)}function i(t){return t[this]}function o(t){var e=+this;return 0>e&&(e=Math.max(0,e+t.length)),t[e]}var s,a=t("./util"),c=a.canEvaluate;a.isIdentifier;e.prototype.call=function(t){var e=[].slice.call(arguments,1);return e.push(t),this._then(r,void 0,void 0,e,void 0)},e.prototype.get=function(t){var e,n="number"==typeof t;if(n)e=o;else if(c){var r=s(t);e=null!==r?r:i}else e=i;return this._then(e,void 0,void 0,t,void 0)}}},{"./util":36}],6:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){var o=t("./util"),s=o.tryCatch,a=o.errorObj,c=e._async;e.prototype["break"]=e.prototype.cancel=function(){if(!i.cancellation())return this._warn("cancellation is disabled");for(var t=this,e=t;t._isCancellable();){if(!t._cancelBy(e)){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}var n=t._cancellationParent;if(null==n||!n._isCancellable()){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}t._isFollowing()&&t._followee().cancel(),t._setWillBeCancelled(),e=t,t=n}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return void 0===this._branchesRemainingToCancel||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(t){return t===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),this._enoughBranchesHaveCancelled()?(this._invokeOnCancel(),!0):!1)},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),c.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(t,e){if(o.isArray(t))for(var n=0;n<t.length;++n)this._doInvokeOnCancel(t[n],e);else if(void 0!==t)if("function"==typeof t){if(!e){var r=s(t).call(this._boundValue());r===a&&(this._attachExtraTrace(r.e),c.throwLater(r.e))}}else t._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var t=this._onCancel();this._unsetOnCancel(),c.invoke(this._doInvokeOnCancel,this,t)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}},{"./util":36}],7:[function(t,e,n){"use strict";e.exports=function(e){function n(t,n,a){return function(c){var l=a._boundValue();t:for(var u=0;u<t.length;++u){var p=t[u];if(p===Error||null!=p&&p.prototype instanceof Error){if(c instanceof p)return o(n).call(l,c)}else if("function"==typeof p){var h=o(p).call(l,c);if(h===s)return h;if(h)return o(n).call(l,c)}else if(r.isObject(c)){for(var f=i(p),_=0;_<f.length;++_){var d=f[_];if(p[d]!=c[d])continue t}return o(n).call(l,c)}}return e}}var r=t("./util"),i=t("./es5").keys,o=r.tryCatch,s=r.errorObj;return n}},{"./es5":13,"./util":36}],8:[function(t,e,n){"use strict";e.exports=function(t){function e(){this._trace=new e.CapturedTrace(r())}function n(){return i?new e:void 0}function r(){var t=o.length-1;return t>=0?o[t]:void 0}var i=!1,o=[];return t.prototype._promiseCreated=function(){},t.prototype._pushContext=function(){},t.prototype._popContext=function(){return null},t._peekContext=t.prototype._peekContext=function(){},e.prototype._pushContext=function(){void 0!==this._trace&&(this._trace._promiseCreated=null,o.push(this._trace))},e.prototype._popContext=function(){if(void 0!==this._trace){var t=o.pop(),e=t._promiseCreated;return t._promiseCreated=null,e}return null},e.CapturedTrace=null,e.create=n,e.deactivateLongStackTraces=function(){},e.activateLongStackTraces=function(){var n=t.prototype._pushContext,o=t.prototype._popContext,s=t._peekContext,a=t.prototype._peekContext,c=t.prototype._promiseCreated;e.deactivateLongStackTraces=function(){t.prototype._pushContext=n,t.prototype._popContext=o,t._peekContext=s,t.prototype._peekContext=a,t.prototype._promiseCreated=c,i=!1},i=!0,t.prototype._pushContext=e.prototype._pushContext,t.prototype._popContext=e.prototype._popContext,t._peekContext=t.prototype._peekContext=r,t.prototype._promiseCreated=function(){var t=this._peekContext();t&&null==t._promiseCreated&&(t._promiseCreated=this)}},e}},{}],9:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e){return{promise:e}}function i(){return!1}function o(t,e,n){var r=this;try{t(e,n,function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+H.toString(t));r._attachCancellationCallback(t)})}catch(i){return i}}function s(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?H.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function a(){return this._onCancelField}function c(t){this._onCancelField=t}function l(){this._cancellationParent=void 0,this._onCancelField=void 0}function u(t,e){if(0!==(1&e)){this._cancellationParent=t;var n=t._branchesRemainingToCancel;void 0===n&&(n=0),t._branchesRemainingToCancel=n+1}0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function p(t,e){0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function h(){var t=this._boundTo;return void 0!==t&&t instanceof e?t.isFulfilled()?t.value():void 0:t}function f(){this._trace=new S(this._peekContext())}function _(t,e){if(N(t)){var n=this._trace;if(void 0!==n&&e&&(n=n._parent),void 0!==n)n.attachExtraTrace(t);else if(!t.__stackCleaned__){var r=j(t);H.notEnumerableProp(t,"stack",r.message+"\n"+r.stack.join("\n")),H.notEnumerableProp(t,"__stackCleaned__",!0)}}}function d(t,e,n,r,i){if(void 0===t&&null!==e&&W){if(void 0!==i&&i._returnedNonUndefined())return;if(0===(65535&r._bitField))return;n&&(n+=" ");var o="",s="";if(e._trace){for(var a=e._trace.stack.split("\n"),c=w(a),l=c.length-1;l>=0;--l){var u=c[l];if(!U.test(u)){var p=u.match(M);p&&(o="at "+p[1]+":"+p[2]+":"+p[3]+" ");break}}if(c.length>0)for(var h=c[0],l=0;l<a.length;++l)if(a[l]===h){l>0&&(s="\n"+a[l-1]);break}}var f="a promise was created in a "+n+"handler "+o+"but was not returned from it, see http://goo.gl/rRqMUw"+s;r._warn(f,!0,e)}}function v(t,e){var n=t+" is deprecated and will be removed in a future version.";return e&&(n+=" Use "+e+" instead."),y(n)}function y(t,n,r){if(ot.warnings){var i,o=new L(t);if(n)r._attachExtraTrace(o);else if(ot.longStackTraces&&(i=e._peekContext()))i.attachExtraTrace(o);else{var s=j(o);o.stack=s.message+"\n"+s.stack.join("\n")}tt("warning",o)||E(o,"",!0)}}function m(t,e){for(var n=0;n<e.length-1;++n)e[n].push("From previous event:"),e[n]=e[n].join("\n");return n<e.length&&(e[n]=e[n].join("\n")),t+"\n"+e.join("\n")}function g(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}function b(t){for(var e=t[0],n=1;n<t.length;++n){for(var r=t[n],i=e.length-1,o=e[i],s=-1,a=r.length-1;a>=0;--a)if(r[a]===o){s=a;break}for(var a=s;a>=0;--a){var c=r[a];if(e[i]!==c)break;e.pop(),i--}e=r}}function w(t){for(var e=[],n=0;n<t.length;++n){var r=t[n],i="    (No stack trace)"===r||q.test(r),o=i&&nt(r);i&&!o&&($&&" "!==r.charAt(0)&&(r="    "+r),e.push(r))}return e}function C(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),n=0;n<e.length;++n){var r=e[n];if("    (No stack trace)"===r||q.test(r))break}return n>0&&"SyntaxError"!=t.name&&(e=e.slice(n)),e}function j(t){var e=t.stack,n=t.toString();return e="string"==typeof e&&e.length>0?C(t):["    (No stack trace)"],{message:n,stack:"SyntaxError"==t.name?e:w(e)}}function E(t,e,n){if("undefined"!=typeof console){var r;if(H.isObject(t)){var i=t.stack;r=e+Q(i,t)}else r=e+String(t);"function"==typeof D?D(r,n):("function"==typeof console.log||"object"==typeof console.log)&&console.log(r)}}function k(t,e,n,r){var i=!1;try{"function"==typeof e&&(i=!0,"rejectionHandled"===t?e(r):e(n,r))}catch(o){I.throwLater(o)}"unhandledRejection"===t?tt(t,n,r)||i||E(n,"Unhandled rejection "):tt(t,r)}function F(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{e=t&&"function"==typeof t.toString?t.toString():H.toString(t);var n=/\[object [a-zA-Z0-9$_]+\]/;if(n.test(e))try{var r=JSON.stringify(t);e=r}catch(i){}0===e.length&&(e="(empty array)")}return"(<"+x(e)+">, no stack trace)"}function x(t){var e=41;return t.length<e?t:t.substr(0,e-3)+"..."}function T(){return"function"==typeof it}function P(t){var e=t.match(rt);return e?{fileName:e[1],line:parseInt(e[2],10)}:void 0}function R(t,e){if(T()){for(var n,r,i=t.stack.split("\n"),o=e.stack.split("\n"),s=-1,a=-1,c=0;c<i.length;++c){var l=P(i[c]);if(l){n=l.fileName,s=l.line;break}}for(var c=0;c<o.length;++c){var l=P(o[c]);if(l){r=l.fileName,a=l.line;break}}0>s||0>a||!n||!r||n!==r||s>=a||(nt=function(t){if(B.test(t))return!0;var e=P(t);return e&&e.fileName===n&&s<=e.line&&e.line<=a?!0:!1})}}function S(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);it(this,S),e>32&&this.uncycle()}var O,A,D,V=e._getDomain,I=e._async,L=t("./errors").Warning,H=t("./util"),N=H.canAttachTrace,B=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,U=/\((?:timers\.js):\d+:\d+\)/,M=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,q=null,Q=null,$=!1,G=!(0==H.env("BLUEBIRD_DEBUG")||!H.env("BLUEBIRD_DEBUG")&&"development"!==H.env("NODE_ENV")),z=!(0==H.env("BLUEBIRD_WARNINGS")||!G&&!H.env("BLUEBIRD_WARNINGS")),X=!(0==H.env("BLUEBIRD_LONG_STACK_TRACES")||!G&&!H.env("BLUEBIRD_LONG_STACK_TRACES")),W=0!=H.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&(z||!!H.env("BLUEBIRD_W_FORGOTTEN_RETURN"));e.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=-1048577&t._bitField|524288},e.prototype._ensurePossibleRejectionHandled=function(){0===(524288&this._bitField)&&(this._setRejectionIsUnhandled(),I.invokeLater(this._notifyUnhandledRejection,this,void 0))},e.prototype._notifyUnhandledRejectionIsHandled=function(){k("rejectionHandled",O,void 0,this)},e.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},e.prototype._returnedNonUndefined=function(){return 0!==(268435456&this._bitField)},e.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),k("unhandledRejection",A,t,this)}},e.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},e.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=-262145&this._bitField},e.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},e.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},e.prototype._unsetRejectionIsUnhandled=function(){this._bitField=-1048577&this._bitField,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},e.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},e.prototype._warn=function(t,e,n){return y(t,e,n||this)},e.onPossiblyUnhandledRejection=function(t){var e=V();A="function"==typeof t?null===e?t:H.domainBind(e,t):void 0},e.onUnhandledRejectionHandled=function(t){var e=V();O="function"==typeof t?null===e?t:H.domainBind(e,t):void 0};var K=function(){};e.longStackTraces=function(){if(I.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!ot.longStackTraces&&T()){var t=e.prototype._captureStackTrace,r=e.prototype._attachExtraTrace;ot.longStackTraces=!0,K=function(){if(I.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");e.prototype._captureStackTrace=t,e.prototype._attachExtraTrace=r,n.deactivateLongStackTraces(),I.enableTrampoline(),ot.longStackTraces=!1},e.prototype._captureStackTrace=f,e.prototype._attachExtraTrace=_,n.activateLongStackTraces(),I.disableTrampolineIfNecessary()}},e.hasLongStackTraces=function(){return ot.longStackTraces&&T()};var J=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return H.global.dispatchEvent(t),function(t,e){var n=new CustomEvent(t.toLowerCase(),{detail:e,cancelable:!0});return!H.global.dispatchEvent(n)}}if("function"==typeof Event){var t=new Event("CustomEvent");return H.global.dispatchEvent(t),function(t,e){var n=new Event(t.toLowerCase(),{cancelable:!0});return n.detail=e,!H.global.dispatchEvent(n)}}var t=document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent",!1,!0,{}),H.global.dispatchEvent(t),function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(),!1,!0,e),!H.global.dispatchEvent(n)}}catch(e){}return function(){return!1}}(),Y=function(){return H.isNode?function(){return process.emit.apply(process,arguments)}:H.global?function(t){var e="on"+t.toLowerCase(),n=H.global[e];return n?(n.apply(H.global,[].slice.call(arguments,1)),!0):!1}:function(){return!1}}(),Z={promiseCreated:r,promiseFulfilled:r,promiseRejected:r,promiseResolved:r,promiseCancelled:r,promiseChained:function(t,e,n){return{promise:e,child:n}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,n){return{reason:e,promise:n}},rejectionHandled:r},tt=function(t){var e=!1;try{e=Y.apply(null,arguments)}catch(n){I.throwLater(n),e=!0}var r=!1;try{r=J(t,Z[t].apply(null,arguments))}catch(n){I.throwLater(n),r=!0}return r||e};e.config=function(t){if(t=Object(t),"longStackTraces"in t&&(t.longStackTraces?e.longStackTraces():!t.longStackTraces&&e.hasLongStackTraces()&&K()),"warnings"in t){var n=t.warnings;ot.warnings=!!n,W=ot.warnings,H.isObject(n)&&"wForgottenReturn"in n&&(W=!!n.wForgottenReturn)}if("cancellation"in t&&t.cancellation&&!ot.cancellation){if(I.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");e.prototype._clearCancellationData=l,e.prototype._propagateFrom=u,e.prototype._onCancel=a,e.prototype._setOnCancel=c,e.prototype._attachCancellationCallback=s,e.prototype._execute=o,et=u,ot.cancellation=!0}return"monitoring"in t&&(t.monitoring&&!ot.monitoring?(ot.monitoring=!0,e.prototype._fireEvent=tt):!t.monitoring&&ot.monitoring&&(ot.monitoring=!1,e.prototype._fireEvent=i)),e},e.prototype._fireEvent=i,e.prototype._execute=function(t,e,n){try{t(e,n)}catch(r){return r}},e.prototype._onCancel=function(){},e.prototype._setOnCancel=function(t){},e.prototype._attachCancellationCallback=function(t){},e.prototype._captureStackTrace=function(){},e.prototype._attachExtraTrace=function(){},e.prototype._clearCancellationData=function(){},e.prototype._propagateFrom=function(t,e){};var et=p,nt=function(){return!1},rt=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;H.inherits(S,Error),n.CapturedTrace=S,S.prototype.uncycle=function(){var t=this._length;if(!(2>t)){for(var e=[],n={},r=0,i=this;void 0!==i;++r)e.push(i),i=i._parent;t=this._length=r;for(var r=t-1;r>=0;--r){var o=e[r].stack;void 0===n[o]&&(n[o]=r)}for(var r=0;t>r;++r){var s=e[r].stack,a=n[s];if(void 0!==a&&a!==r){a>0&&(e[a-1]._parent=void 0,e[a-1]._length=1),e[r]._parent=void 0,e[r]._length=1;var c=r>0?e[r-1]:this;t-1>a?(c._parent=e[a+1],c._parent.uncycle(),c._length=c._parent._length+1):(c._parent=void 0,c._length=1);for(var l=c._length+1,u=r-2;u>=0;--u)e[u]._length=l,l++;return}}}},S.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=j(t),n=e.message,r=[e.stack],i=this;void 0!==i;)r.push(w(i.stack.split("\n"))),i=i._parent;b(r),g(r),H.notEnumerableProp(t,"stack",m(n,r)),H.notEnumerableProp(t,"__stackCleaned__",!0)}};var it=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():F(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,q=t,Q=e;var n=Error.captureStackTrace;return nt=function(t){return B.test(t)},function(t,e){Error.stackTraceLimit+=6,n(t,e),Error.stackTraceLimit-=6}}var r=new Error;if("string"==typeof r.stack&&r.stack.split("\n")[0].indexOf("stackDetection@")>=0)return q=/@/,Q=e,$=!0,function(t){t.stack=(new Error).stack};var i;try{throw new Error}catch(o){i="stack"in o}return"stack"in r||!i||"number"!=typeof Error.stackTraceLimit?(Q=function(t,e){return"string"==typeof t?t:"object"!=typeof e&&"function"!=typeof e||void 0===e.name||void 0===e.message?F(e):e.toString()},null):(q=t,Q=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6})}([]);"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(D=function(t){console.warn(t)},H.isNode&&process.stderr.isTTY?D=function(t,e){var n=e?"[33m":"[31m";console.warn(n+t+"[0m\n")}:H.isNode||"string"!=typeof(new Error).stack||(D=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var ot={warnings:z,longStackTraces:!1,cancellation:!1,monitoring:!1};return X&&e.longStackTraces(),{longStackTraces:function(){return ot.longStackTraces},warnings:function(){return ot.warnings},cancellation:function(){return ot.cancellation},monitoring:function(){return ot.monitoring},propagateFromFunction:function(){return et},boundValueFunction:function(){return h},checkForgottenReturns:d,setBounds:R,warn:y,deprecated:v,CapturedTrace:S,fireDomEvent:J,fireGlobalEvent:Y}}},{"./errors":12,"./util":36}],10:[function(t,e,n){"use strict";e.exports=function(t){function e(){return this.value}function n(){throw this.reason}t.prototype["return"]=t.prototype.thenReturn=function(n){return n instanceof t&&n.suppressUnhandledRejections(),this._then(e,void 0,void 0,{value:n},void 0)},t.prototype["throw"]=t.prototype.thenThrow=function(t){return this._then(n,void 0,void 0,{reason:t},void 0)},t.prototype.catchThrow=function(t){if(arguments.length<=1)return this._then(void 0,n,void 0,{reason:t},void 0);var e=arguments[1],r=function(){throw e};return this.caught(t,r)},t.prototype.catchReturn=function(n){if(arguments.length<=1)return n instanceof t&&n.suppressUnhandledRejections(),this._then(void 0,e,void 0,{value:n},void 0);var r=arguments[1];r instanceof t&&r.suppressUnhandledRejections();var i=function(){return r};return this.caught(n,i)}}},{}],11:[function(t,e,n){"use strict";e.exports=function(t,e){function n(){return o(this)}function r(t,n){return i(t,n,e,e)}var i=t.reduce,o=t.all;t.prototype.each=function(t){return i(this,t,e,0)._then(n,void 0,void 0,this,void 0)},t.prototype.mapSeries=function(t){return i(this,t,e,e)},t.each=function(t,r){return i(t,r,e,0)._then(n,void 0,void 0,t,void 0)},t.mapSeries=r}},{}],12:[function(t,e,n){"use strict";function r(t,e){function n(r){return this instanceof n?(p(this,"message","string"==typeof r?r:e),p(this,"name",t),void(Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this))):new n(r)}return u(n,Error),n}function i(t){return this instanceof i?(p(this,"name","OperationalError"),p(this,"message",t),this.cause=t,this.isOperational=!0,void(t instanceof Error?(p(this,"message",t.message),p(this,"stack",t.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor))):new i(t)}var o,s,a=t("./es5"),c=a.freeze,l=t("./util"),u=l.inherits,p=l.notEnumerableProp,h=r("Warning","warning"),f=r("CancellationError","cancellation error"),_=r("TimeoutError","timeout error"),d=r("AggregateError","aggregate error");try{o=TypeError,s=RangeError}catch(v){o=r("TypeError","type error"),s=r("RangeError","range error")}for(var y="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),m=0;m<y.length;++m)"function"==typeof Array.prototype[y[m]]&&(d.prototype[y[m]]=Array.prototype[y[m]]);a.defineProperty(d.prototype,"length",{value:0,configurable:!1,writable:!0,enumerable:!0}),d.prototype.isOperational=!0;var g=0;d.prototype.toString=function(){var t=Array(4*g+1).join(" "),e="\n"+t+"AggregateError of:\n";g++,t=Array(4*g+1).join(" ");for(var n=0;n<this.length;++n){for(var r=this[n]===this?"[Circular AggregateError]":this[n]+"",i=r.split("\n"),o=0;o<i.length;++o)i[o]=t+i[o];r=i.join("\n"),e+=r+"\n"}return g--,e},u(i,Error);var b=Error.__BluebirdErrorTypes__;b||(b=c({CancellationError:f,TimeoutError:_,OperationalError:i,RejectionError:i,AggregateError:d}),a.defineProperty(Error,"__BluebirdErrorTypes__",{value:b,writable:!1,enumerable:!1,configurable:!1})),e.exports={Error:Error,TypeError:o,RangeError:s,CancellationError:b.CancellationError,OperationalError:b.OperationalError,TimeoutError:b.TimeoutError,AggregateError:b.AggregateError,Warning:h}},{"./es5":13,"./util":36}],13:[function(t,e,n){var r=function(){"use strict";return void 0===this}();if(r)e.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:r,propertyIsWritable:function(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return!(n&&!n.writable&&!n.set)}};else{var i={}.hasOwnProperty,o={}.toString,s={}.constructor.prototype,a=function(t){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e},c=function(t,e){return{value:t[e]}},l=function(t,e,n){return t[e]=n.value,t},u=function(t){return t},p=function(t){try{return Object(t).constructor.prototype}catch(e){return s}},h=function(t){try{return"[object Array]"===o.call(t)}catch(e){return!1}};e.exports={isArray:h,keys:a,names:a,defineProperty:l,getDescriptor:c,freeze:u,getPrototypeOf:p,isES5:r,propertyIsWritable:function(){return!0}}}},{}],14:[function(t,e,n){"use strict";e.exports=function(t,e){var n=t.map;t.prototype.filter=function(t,r){return n(this,t,r,e)},t.filter=function(t,r,i){return n(t,r,i,e)}}},{}],15:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t,e,n){this.promise=t,this.type=e,this.handler=n,this.called=!1,this.cancelPromise=null}function o(t){this.finallyHandler=t}function s(t,e){return null!=t.cancelPromise?(arguments.length>1?t.cancelPromise._reject(e):t.cancelPromise._cancel(),t.cancelPromise=null,!0):!1}function a(){return l.call(this,this.promise._target()._settledValue())}function c(t){return s(this,t)?void 0:(h.e=t,h)}function l(t){var i=this.promise,l=this.handler;if(!this.called){this.called=!0;var u=this.isFinallyHandler()?l.call(i._boundValue()):l.call(i._boundValue(),t);if(u===r)return u;if(void 0!==u){i._setReturnedNonUndefined();var f=n(u,i);if(f instanceof e){if(null!=this.cancelPromise){if(f._isCancelled()){var _=new p("late cancellation observer");return i._attachExtraTrace(_),h.e=_,h}f.isPending()&&f._attachCancellationCallback(new o(this))}return f._then(a,c,void 0,this,void 0)}}}return i.isRejected()?(s(this),h.e=t,h):(s(this),t)}var u=t("./util"),p=e.CancellationError,h=u.errorObj,f=t("./catch_filter")(r);return i.prototype.isFinallyHandler=function(){return 0===this.type},o.prototype._resultCancelled=function(){s(this.finallyHandler)},e.prototype._passThrough=function(t,e,n,r){return"function"!=typeof t?this.then():this._then(n,r,void 0,new i(this,e,t),void 0)},e.prototype.lastly=e.prototype["finally"]=function(t){return this._passThrough(t,0,l,l)},e.prototype.tap=function(t){return this._passThrough(t,1,l)},e.prototype.tapCatch=function(t){var n=arguments.length;if(1===n)return this._passThrough(t,1,void 0,l);var r,i=new Array(n-1),o=0;for(r=0;n-1>r;++r){var s=arguments[r];if(!u.isObject(s))return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got "+u.classString(s)));i[o++]=s}i.length=o;var a=arguments[r];return this._passThrough(f(i,a,this),1,void 0,l)},i}},{"./catch_filter":7,"./util":36}],16:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t,n,r){for(var o=0;o<n.length;++o){r._pushContext();var s=f(n[o])(t);if(r._popContext(),s===h){r._pushContext();var a=e.reject(h.e);return r._popContext(),a}var c=i(s,r);if(c instanceof e)return c}return null}function c(t,n,i,o){if(s.cancellation()){var a=new e(r),c=this._finallyPromise=new e(r);this._promise=a.lastly(function(){return c}),a._captureStackTrace(),a._setOnCancel(this)}else{var l=this._promise=new e(r);l._captureStackTrace()}this._stack=o,this._generatorFunction=t,this._receiver=n,this._generator=void 0,this._yieldHandlers="function"==typeof i?[i].concat(_):_,this._yieldedPromise=null,this._cancellationPhase=!1}var l=t("./errors"),u=l.TypeError,p=t("./util"),h=p.errorObj,f=p.tryCatch,_=[];p.inherits(c,o),c.prototype._isResolved=function(){return null===this._promise},c.prototype._cleanup=function(){this._promise=this._generator=null,s.cancellation()&&null!==this._finallyPromise&&(this._finallyPromise._fulfill(),this._finallyPromise=null)},c.prototype._promiseCancelled=function(){if(!this._isResolved()){var t,n="undefined"!=typeof this._generator["return"];if(n)this._promise._pushContext(),t=f(this._generator["return"]).call(this._generator,void 0),this._promise._popContext();else{var r=new e.CancellationError("generator .return() sentinel");e.coroutine.returnSentinel=r,this._promise._attachExtraTrace(r),this._promise._pushContext(),t=f(this._generator["throw"]).call(this._generator,r),this._promise._popContext()}this._cancellationPhase=!0,this._yieldedPromise=null,this._continue(t)}},c.prototype._promiseFulfilled=function(t){this._yieldedPromise=null,this._promise._pushContext();var e=f(this._generator.next).call(this._generator,t);this._promise._popContext(),this._continue(e)},c.prototype._promiseRejected=function(t){this._yieldedPromise=null,this._promise._attachExtraTrace(t),this._promise._pushContext();var e=f(this._generator["throw"]).call(this._generator,t);this._promise._popContext(),this._continue(e)},c.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof e){var t=this._yieldedPromise;this._yieldedPromise=null,t.cancel()}},c.prototype.promise=function(){return this._promise},c.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver),this._receiver=this._generatorFunction=void 0,this._promiseFulfilled(void 0)},c.prototype._continue=function(t){var n=this._promise;if(t===h)return this._cleanup(),this._cancellationPhase?n.cancel():n._rejectCallback(t.e,!1);var r=t.value;if(t.done===!0)return this._cleanup(),this._cancellationPhase?n.cancel():n._resolveCallback(r);var o=i(r,this._promise);if(!(o instanceof e)&&(o=a(o,this._yieldHandlers,this._promise),null===o))return void this._promiseRejected(new u("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",String(r))+"From coroutine:\n"+this._stack.split("\n").slice(1,-7).join("\n")));o=o._target();var s=o._bitField;0===(50397184&s)?(this._yieldedPromise=o,o._proxy(this,null)):0!==(33554432&s)?e._async.invoke(this._promiseFulfilled,this,o._value()):0!==(16777216&s)?e._async.invoke(this._promiseRejected,this,o._reason()):this._promiseCancelled();
},e.coroutine=function(t,e){if("function"!=typeof t)throw new u("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var n=Object(e).yieldHandler,r=c,i=(new Error).stack;return function(){var e=t.apply(this,arguments),o=new r(void 0,void 0,n,i),s=o.promise();return o._generator=e,o._promiseFulfilled(void 0),s}},e.coroutine.addYieldHandler=function(t){if("function"!=typeof t)throw new u("expecting a function but got "+p.classString(t));_.push(t)},e.spawn=function(t){if(s.deprecated("Promise.spawn()","Promise.coroutine()"),"function"!=typeof t)return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var r=new c(t,this),i=r.promise();return r._run(e.spawn),i}}},{"./errors":12,"./util":36}],17:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){var a=t("./util");a.canEvaluate,a.tryCatch,a.errorObj;e.join=function(){var t,e=arguments.length-1;if(e>0&&"function"==typeof arguments[e]){t=arguments[e];var r}var i=[].slice.call(arguments);t&&i.pop();var r=new n(i).promise();return void 0!==t?r.spread(t):r}}},{"./util":36}],18:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t,e,n,r){this.constructor$(t),this._promise._captureStackTrace();var i=l();this._callback=null===i?e:u.domainBind(i,e),this._preservedValues=r===o?new Array(this.length()):null,this._limit=n,this._inFlight=0,this._queue=[],f.invoke(this._asyncInit,this,void 0)}function c(t,n,i,o){if("function"!=typeof n)return r("expecting a function but got "+u.classString(n));var s=0;if(void 0!==i){if("object"!=typeof i||null===i)return e.reject(new TypeError("options argument must be an object but it is "+u.classString(i)));if("number"!=typeof i.concurrency)return e.reject(new TypeError("'concurrency' must be a number but it is "+u.classString(i.concurrency)));s=i.concurrency}return s="number"==typeof s&&isFinite(s)&&s>=1?s:0,new a(t,n,s,o).promise()}var l=e._getDomain,u=t("./util"),p=u.tryCatch,h=u.errorObj,f=e._async;u.inherits(a,n),a.prototype._asyncInit=function(){this._init$(void 0,-2)},a.prototype._init=function(){},a.prototype._promiseFulfilled=function(t,n){var r=this._values,o=this.length(),a=this._preservedValues,c=this._limit;if(0>n){if(n=-1*n-1,r[n]=t,c>=1&&(this._inFlight--,this._drainQueue(),this._isResolved()))return!0}else{if(c>=1&&this._inFlight>=c)return r[n]=t,this._queue.push(n),!1;null!==a&&(a[n]=t);var l=this._promise,u=this._callback,f=l._boundValue();l._pushContext();var _=p(u).call(f,t,n,o),d=l._popContext();if(s.checkForgottenReturns(_,d,null!==a?"Promise.filter":"Promise.map",l),_===h)return this._reject(_.e),!0;var v=i(_,this._promise);if(v instanceof e){v=v._target();var y=v._bitField;if(0===(50397184&y))return c>=1&&this._inFlight++,r[n]=v,v._proxy(this,-1*(n+1)),!1;if(0===(33554432&y))return 0!==(16777216&y)?(this._reject(v._reason()),!0):(this._cancel(),!0);_=v._value()}r[n]=_}var m=++this._totalResolved;return m>=o?(null!==a?this._filter(r,a):this._resolve(r),!0):!1},a.prototype._drainQueue=function(){for(var t=this._queue,e=this._limit,n=this._values;t.length>0&&this._inFlight<e;){if(this._isResolved())return;var r=t.pop();this._promiseFulfilled(n[r],r)}},a.prototype._filter=function(t,e){for(var n=e.length,r=new Array(n),i=0,o=0;n>o;++o)t[o]&&(r[i++]=e[o]);r.length=i,this._resolve(r)},a.prototype.preservedValues=function(){return this._preservedValues},e.prototype.map=function(t,e){return c(this,t,e,null)},e.map=function(t,e,n,r){return c(t,e,n,r)}}},{"./util":36}],19:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){var s=t("./util"),a=s.tryCatch;e.method=function(t){if("function"!=typeof t)throw new e.TypeError("expecting a function but got "+s.classString(t));return function(){var r=new e(n);r._captureStackTrace(),r._pushContext();var i=a(t).apply(this,arguments),s=r._popContext();return o.checkForgottenReturns(i,s,"Promise.method",r),r._resolveFromSyncValue(i),r}},e.attempt=e["try"]=function(t){if("function"!=typeof t)return i("expecting a function but got "+s.classString(t));var r=new e(n);r._captureStackTrace(),r._pushContext();var c;if(arguments.length>1){o.deprecated("calling Promise.try with more than 1 argument");var l=arguments[1],u=arguments[2];c=s.isArray(l)?a(t).apply(u,l):a(t).call(u,l)}else c=a(t)();var p=r._popContext();return o.checkForgottenReturns(c,p,"Promise.try",r),r._resolveFromSyncValue(c),r},e.prototype._resolveFromSyncValue=function(t){t===s.errorObj?this._rejectCallback(t.e,!1):this._resolveCallback(t,!0)}}},{"./util":36}],20:[function(t,e,n){"use strict";function r(t){return t instanceof Error&&u.getPrototypeOf(t)===Error.prototype}function i(t){var e;if(r(t)){e=new l(t),e.name=t.name,e.message=t.message,e.stack=t.stack;for(var n=u.keys(t),i=0;i<n.length;++i){var o=n[i];p.test(o)||(e[o]=t[o])}return e}return s.markAsOriginatingFromRejection(t),t}function o(t,e){return function(n,r){if(null!==t){if(n){var o=i(a(n));t._attachExtraTrace(o),t._reject(o)}else if(e){var s=[].slice.call(arguments,1);t._fulfill(s)}else t._fulfill(r);t=null}}}var s=t("./util"),a=s.maybeWrapAsError,c=t("./errors"),l=c.OperationalError,u=t("./es5"),p=/^(?:name|message|stack|cause)$/;e.exports=o},{"./errors":12,"./es5":13,"./util":36}],21:[function(t,e,n){"use strict";e.exports=function(e){function n(t,e){var n=this;if(!o.isArray(t))return r.call(n,t,e);var i=a(e).apply(n._boundValue(),[null].concat(t));i===c&&s.throwLater(i.e)}function r(t,e){var n=this,r=n._boundValue(),i=void 0===t?a(e).call(r,null):a(e).call(r,null,t);i===c&&s.throwLater(i.e)}function i(t,e){var n=this;if(!t){var r=new Error(t+"");r.cause=t,t=r}var i=a(e).call(n._boundValue(),t);i===c&&s.throwLater(i.e)}var o=t("./util"),s=e._async,a=o.tryCatch,c=o.errorObj;e.prototype.asCallback=e.prototype.nodeify=function(t,e){if("function"==typeof t){var o=r;void 0!==e&&Object(e).spread&&(o=n),this._then(o,i,void 0,this,t)}return this}}},{"./util":36}],22:[function(t,e,n){"use strict";e.exports=function(){function n(){}function r(t,e){if(null==t||t.constructor!==i)throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");if("function"!=typeof e)throw new m("expecting a function but got "+f.classString(e))}function i(t){t!==b&&r(this,t),this._bitField=0,this._fulfillmentHandler0=void 0,this._rejectionHandler0=void 0,this._promise0=void 0,this._receiver0=void 0,this._resolveFromExecutor(t),this._promiseCreated(),this._fireEvent("promiseCreated",this)}function o(t){this.promise._resolveCallback(t)}function s(t){this.promise._rejectCallback(t,!1)}function a(t){var e=new i(b);e._fulfillmentHandler0=t,e._rejectionHandler0=t,e._promise0=t,e._receiver0=t}var c,l=function(){return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")},u=function(){return new i.PromiseInspection(this._target())},p=function(t){return i.reject(new m(t))},h={},f=t("./util");c=f.isNode?function(){var t=process.domain;return void 0===t&&(t=null),t}:function(){return null},f.notEnumerableProp(i,"_getDomain",c);var _=t("./es5"),d=t("./async"),v=new d;_.defineProperty(i,"_async",{value:v});var y=t("./errors"),m=i.TypeError=y.TypeError;i.RangeError=y.RangeError;var g=i.CancellationError=y.CancellationError;i.TimeoutError=y.TimeoutError,i.OperationalError=y.OperationalError,i.RejectionError=y.OperationalError,i.AggregateError=y.AggregateError;var b=function(){},w={},C={},j=t("./thenables")(i,b),E=t("./promise_array")(i,b,j,p,n),k=t("./context")(i),F=k.create,x=t("./debuggability")(i,k),T=(x.CapturedTrace,t("./finally")(i,j,C)),P=t("./catch_filter")(C),R=t("./nodeback"),S=f.errorObj,O=f.tryCatch;return i.prototype.toString=function(){return"[object Promise]"},i.prototype.caught=i.prototype["catch"]=function(t){var e=arguments.length;if(e>1){var n,r=new Array(e-1),i=0;for(n=0;e-1>n;++n){var o=arguments[n];if(!f.isObject(o))return p("Catch statement predicate: expecting an object but got "+f.classString(o));r[i++]=o}return r.length=i,t=arguments[n],this.then(void 0,P(r,t,this))}return this.then(void 0,t)},i.prototype.reflect=function(){return this._then(u,u,void 0,this,void 0)},i.prototype.then=function(t,e){if(x.warnings()&&arguments.length>0&&"function"!=typeof t&&"function"!=typeof e){var n=".then() only accepts functions but was passed: "+f.classString(t);arguments.length>1&&(n+=", "+f.classString(e)),this._warn(n)}return this._then(t,e,void 0,void 0,void 0)},i.prototype.done=function(t,e){var n=this._then(t,e,void 0,void 0,void 0);n._setIsFinal()},i.prototype.spread=function(t){return"function"!=typeof t?p("expecting a function but got "+f.classString(t)):this.all()._then(t,void 0,void 0,w,void 0)},i.prototype.toJSON=function(){var t={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};return this.isFulfilled()?(t.fulfillmentValue=this.value(),t.isFulfilled=!0):this.isRejected()&&(t.rejectionReason=this.reason(),t.isRejected=!0),t},i.prototype.all=function(){return arguments.length>0&&this._warn(".all() was passed arguments but it does not take any"),new E(this).promise()},i.prototype.error=function(t){return this.caught(f.originatesFromRejection,t)},i.getNewLibraryCopy=e.exports,i.is=function(t){return t instanceof i},i.fromNode=i.fromCallback=function(t){var e=new i(b);e._captureStackTrace();var n=arguments.length>1?!!Object(arguments[1]).multiArgs:!1,r=O(t)(R(e,n));return r===S&&e._rejectCallback(r.e,!0),e._isFateSealed()||e._setAsyncGuaranteed(),e},i.all=function(t){return new E(t).promise()},i.cast=function(t){var e=j(t);return e instanceof i||(e=new i(b),e._captureStackTrace(),e._setFulfilled(),e._rejectionHandler0=t),e},i.resolve=i.fulfilled=i.cast,i.reject=i.rejected=function(t){var e=new i(b);return e._captureStackTrace(),e._rejectCallback(t,!0),e},i.setScheduler=function(t){if("function"!=typeof t)throw new m("expecting a function but got "+f.classString(t));return v.setScheduler(t)},i.prototype._then=function(t,e,n,r,o){var s=void 0!==o,a=s?o:new i(b),l=this._target(),u=l._bitField;s||(a._propagateFrom(this,3),a._captureStackTrace(),void 0===r&&0!==(2097152&this._bitField)&&(r=0!==(50397184&u)?this._boundValue():l===this?void 0:this._boundTo),this._fireEvent("promiseChained",this,a));var p=c();if(0!==(50397184&u)){var h,_,d=l._settlePromiseCtx;0!==(33554432&u)?(_=l._rejectionHandler0,h=t):0!==(16777216&u)?(_=l._fulfillmentHandler0,h=e,l._unsetRejectionIsUnhandled()):(d=l._settlePromiseLateCancellationObserver,_=new g("late cancellation observer"),l._attachExtraTrace(_),h=e),v.invoke(d,l,{handler:null===p?h:"function"==typeof h&&f.domainBind(p,h),promise:a,receiver:r,value:_})}else l._addCallbacks(t,e,a,r,p);return a},i.prototype._length=function(){return 65535&this._bitField},i.prototype._isFateSealed=function(){return 0!==(117506048&this._bitField)},i.prototype._isFollowing=function(){return 67108864===(67108864&this._bitField)},i.prototype._setLength=function(t){this._bitField=-65536&this._bitField|65535&t},i.prototype._setFulfilled=function(){this._bitField=33554432|this._bitField,this._fireEvent("promiseFulfilled",this)},i.prototype._setRejected=function(){this._bitField=16777216|this._bitField,this._fireEvent("promiseRejected",this)},i.prototype._setFollowing=function(){this._bitField=67108864|this._bitField,this._fireEvent("promiseResolved",this)},i.prototype._setIsFinal=function(){this._bitField=4194304|this._bitField},i.prototype._isFinal=function(){return(4194304&this._bitField)>0},i.prototype._unsetCancelled=function(){this._bitField=-65537&this._bitField},i.prototype._setCancelled=function(){this._bitField=65536|this._bitField,this._fireEvent("promiseCancelled",this)},i.prototype._setWillBeCancelled=function(){this._bitField=8388608|this._bitField},i.prototype._setAsyncGuaranteed=function(){v.hasCustomScheduler()||(this._bitField=134217728|this._bitField)},i.prototype._receiverAt=function(t){var e=0===t?this._receiver0:this[4*t-4+3];return e===h?void 0:void 0===e&&this._isBound()?this._boundValue():e},i.prototype._promiseAt=function(t){return this[4*t-4+2]},i.prototype._fulfillmentHandlerAt=function(t){return this[4*t-4+0]},i.prototype._rejectionHandlerAt=function(t){return this[4*t-4+1]},i.prototype._boundValue=function(){},i.prototype._migrateCallback0=function(t){var e=(t._bitField,t._fulfillmentHandler0),n=t._rejectionHandler0,r=t._promise0,i=t._receiverAt(0);void 0===i&&(i=h),this._addCallbacks(e,n,r,i,null)},i.prototype._migrateCallbackAt=function(t,e){var n=t._fulfillmentHandlerAt(e),r=t._rejectionHandlerAt(e),i=t._promiseAt(e),o=t._receiverAt(e);void 0===o&&(o=h),this._addCallbacks(n,r,i,o,null)},i.prototype._addCallbacks=function(t,e,n,r,i){var o=this._length();if(o>=65531&&(o=0,this._setLength(0)),0===o)this._promise0=n,this._receiver0=r,"function"==typeof t&&(this._fulfillmentHandler0=null===i?t:f.domainBind(i,t)),"function"==typeof e&&(this._rejectionHandler0=null===i?e:f.domainBind(i,e));else{var s=4*o-4;this[s+2]=n,this[s+3]=r,"function"==typeof t&&(this[s+0]=null===i?t:f.domainBind(i,t)),"function"==typeof e&&(this[s+1]=null===i?e:f.domainBind(i,e))}return this._setLength(o+1),o},i.prototype._proxy=function(t,e){this._addCallbacks(void 0,void 0,e,t,null)},i.prototype._resolveCallback=function(t,e){if(0===(117506048&this._bitField)){if(t===this)return this._rejectCallback(l(),!1);var n=j(t,this);if(!(n instanceof i))return this._fulfill(t);e&&this._propagateFrom(n,2);var r=n._target();if(r===this)return void this._reject(l());var o=r._bitField;if(0===(50397184&o)){var s=this._length();s>0&&r._migrateCallback0(this);for(var a=1;s>a;++a)r._migrateCallbackAt(this,a);this._setFollowing(),this._setLength(0),this._setFollowee(r)}else if(0!==(33554432&o))this._fulfill(r._value());else if(0!==(16777216&o))this._reject(r._reason());else{var c=new g("late cancellation observer");r._attachExtraTrace(c),this._reject(c)}}},i.prototype._rejectCallback=function(t,e,n){var r=f.ensureErrorObject(t),i=r===t;if(!i&&!n&&x.warnings()){var o="a promise was rejected with a non-error: "+f.classString(t);this._warn(o,!0)}this._attachExtraTrace(r,e?i:!1),this._reject(t)},i.prototype._resolveFromExecutor=function(t){if(t!==b){var e=this;this._captureStackTrace(),this._pushContext();var n=!0,r=this._execute(t,function(t){e._resolveCallback(t)},function(t){e._rejectCallback(t,n)});n=!1,this._popContext(),void 0!==r&&e._rejectCallback(r,!0)}},i.prototype._settlePromiseFromHandler=function(t,e,n,r){var i=r._bitField;if(0===(65536&i)){r._pushContext();var o;e===w?n&&"number"==typeof n.length?o=O(t).apply(this._boundValue(),n):(o=S,o.e=new m("cannot .spread() a non-array: "+f.classString(n))):o=O(t).call(e,n);var s=r._popContext();i=r._bitField,0===(65536&i)&&(o===C?r._reject(n):o===S?r._rejectCallback(o.e,!1):(x.checkForgottenReturns(o,s,"",r,this),r._resolveCallback(o)))}},i.prototype._target=function(){for(var t=this;t._isFollowing();)t=t._followee();return t},i.prototype._followee=function(){return this._rejectionHandler0},i.prototype._setFollowee=function(t){this._rejectionHandler0=t},i.prototype._settlePromise=function(t,e,r,o){var s=t instanceof i,a=this._bitField,c=0!==(134217728&a);0!==(65536&a)?(s&&t._invokeInternalOnCancel(),r instanceof T&&r.isFinallyHandler()?(r.cancelPromise=t,O(e).call(r,o)===S&&t._reject(S.e)):e===u?t._fulfill(u.call(r)):r instanceof n?r._promiseCancelled(t):s||t instanceof E?t._cancel():r.cancel()):"function"==typeof e?s?(c&&t._setAsyncGuaranteed(),this._settlePromiseFromHandler(e,r,o,t)):e.call(r,o,t):r instanceof n?r._isResolved()||(0!==(33554432&a)?r._promiseFulfilled(o,t):r._promiseRejected(o,t)):s&&(c&&t._setAsyncGuaranteed(),0!==(33554432&a)?t._fulfill(o):t._reject(o))},i.prototype._settlePromiseLateCancellationObserver=function(t){var e=t.handler,n=t.promise,r=t.receiver,o=t.value;"function"==typeof e?n instanceof i?this._settlePromiseFromHandler(e,r,o,n):e.call(r,o,n):n instanceof i&&n._reject(o)},i.prototype._settlePromiseCtx=function(t){this._settlePromise(t.promise,t.handler,t.receiver,t.value)},i.prototype._settlePromise0=function(t,e,n){var r=this._promise0,i=this._receiverAt(0);this._promise0=void 0,this._receiver0=void 0,this._settlePromise(r,t,i,e)},i.prototype._clearCallbackDataAtIndex=function(t){var e=4*t-4;this[e+2]=this[e+3]=this[e+0]=this[e+1]=void 0},i.prototype._fulfill=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(t===this){var n=l();return this._attachExtraTrace(n),this._reject(n)}this._setFulfilled(),this._rejectionHandler0=t,(65535&e)>0&&(0!==(134217728&e)?this._settlePromises():v.settlePromises(this))}},i.prototype._reject=function(t){var e=this._bitField;if(!((117506048&e)>>>16))return this._setRejected(),this._fulfillmentHandler0=t,this._isFinal()?v.fatalError(t,f.isNode):void((65535&e)>0?v.settlePromises(this):this._ensurePossibleRejectionHandled())},i.prototype._fulfillPromises=function(t,e){for(var n=1;t>n;n++){var r=this._fulfillmentHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._rejectPromises=function(t,e){for(var n=1;t>n;n++){var r=this._rejectionHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._settlePromises=function(){var t=this._bitField,e=65535&t;if(e>0){if(0!==(16842752&t)){var n=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,n,t),this._rejectPromises(e,n)}else{var r=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,r,t),this._fulfillPromises(e,r)}this._setLength(0)}this._clearCancellationData()},i.prototype._settledValue=function(){var t=this._bitField;return 0!==(33554432&t)?this._rejectionHandler0:0!==(16777216&t)?this._fulfillmentHandler0:void 0},i.defer=i.pending=function(){x.deprecated("Promise.defer","new Promise");var t=new i(b);return{promise:t,resolve:o,reject:s}},f.notEnumerableProp(i,"_makeSelfResolutionError",l),t("./method")(i,b,j,p,x),t("./bind")(i,b,j,x),t("./cancel")(i,E,p,x),t("./direct_resolve")(i),t("./synchronous_inspection")(i),t("./join")(i,E,j,b,v,c),i.Promise=i,i.version="3.5.0",t("./map.js")(i,E,p,j,b,x),t("./call_get.js")(i),t("./using.js")(i,p,j,F,b,x),t("./timers.js")(i,b,x),t("./generators.js")(i,p,b,j,n,x),t("./nodeify.js")(i),t("./promisify.js")(i,b),t("./props.js")(i,E,j,p),t("./race.js")(i,b,j,p),t("./reduce.js")(i,E,p,j,b,x),t("./settle.js")(i,E,x),t("./some.js")(i,E,p),t("./filter.js")(i,b),t("./each.js")(i,b),t("./any.js")(i),f.toFastProperties(i),f.toFastProperties(i.prototype),a({a:1}),a({b:2}),a({c:3}),a(1),a(function(){}),a(void 0),a(!1),a(new i(b)),x.setBounds(d.firstLineError,f.lastLineError),i}},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){function s(t){switch(t){case-2:return[];case-3:return{};case-6:return new Map}}function a(t){var r=this._promise=new e(n);t instanceof e&&r._propagateFrom(t,3),r._setOnCancel(this),this._values=t,this._length=0,this._totalResolved=0,this._init(void 0,-2)}var c=t("./util");c.isArray;return c.inherits(a,o),a.prototype.length=function(){return this._length},a.prototype.promise=function(){return this._promise},a.prototype._init=function l(t,n){var o=r(this._values,this._promise);if(o instanceof e){o=o._target();var a=o._bitField;if(this._values=o,0===(50397184&a))return this._promise._setAsyncGuaranteed(),o._then(l,this._reject,void 0,this,n);if(0===(33554432&a))return 0!==(16777216&a)?this._reject(o._reason()):this._cancel();o=o._value()}if(o=c.asArray(o),null===o){var u=i("expecting an array or an iterable object but got "+c.classString(o)).reason();return void this._promise._rejectCallback(u,!1)}return 0===o.length?void(-5===n?this._resolveEmptyArray():this._resolve(s(n))):void this._iterate(o)},a.prototype._iterate=function(t){var n=this.getActualLength(t.length);this._length=n,this._values=this.shouldCopyValues()?new Array(n):this._values;for(var i=this._promise,o=!1,s=null,a=0;n>a;++a){var c=r(t[a],i);c instanceof e?(c=c._target(),s=c._bitField):s=null,o?null!==s&&c.suppressUnhandledRejections():null!==s?0===(50397184&s)?(c._proxy(this,a),this._values[a]=c):o=0!==(33554432&s)?this._promiseFulfilled(c._value(),a):0!==(16777216&s)?this._promiseRejected(c._reason(),a):this._promiseCancelled(a):o=this._promiseFulfilled(c,a)}o||i._setAsyncGuaranteed()},a.prototype._isResolved=function(){return null===this._values},a.prototype._resolve=function(t){this._values=null,this._promise._fulfill(t)},a.prototype._cancel=function(){!this._isResolved()&&this._promise._isCancellable()&&(this._values=null,this._promise._cancel())},a.prototype._reject=function(t){this._values=null,this._promise._rejectCallback(t,!1)},a.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;return n>=this._length?(this._resolve(this._values),!0):!1},a.prototype._promiseCancelled=function(){return this._cancel(),!0},a.prototype._promiseRejected=function(t){return this._totalResolved++,this._reject(t),!0},a.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var n=0;n<t.length;++n)t[n]instanceof e&&t[n].cancel()}},a.prototype.shouldCopyValues=function(){return!0},a.prototype.getActualLength=function(t){return t},a}},{"./util":36}],24:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t){return!C.test(t)}function i(t){try{return t.__isPromisified__===!0}catch(e){return!1}}function o(t,e,n){var r=f.getDataPropertyOrDefault(t,e+n,b);return r?i(r):!1}function s(t,e,n){for(var r=0;r<t.length;r+=2){var i=t[r];if(n.test(i))for(var o=i.replace(n,""),s=0;s<t.length;s+=2)if(t[s]===o)throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",e))}}function a(t,e,n,r){for(var a=f.inheritedDataKeys(t),c=[],l=0;l<a.length;++l){var u=a[l],p=t[u],h=r===j?!0:j(u,p,t);"function"!=typeof p||i(p)||o(t,u,e)||!r(u,p,t,h)||c.push(u,p)}return s(c,e,n),c}function c(t,r,i,o,s,a){function c(){var i=r;r===h&&(i=this);var o=new e(n);o._captureStackTrace();var s="string"==typeof u&&this!==l?this[u]:t,c=_(o,a);try{s.apply(i,d(arguments,c))}catch(p){o._rejectCallback(v(p),!0,!0)}return o._isFateSealed()||o._setAsyncGuaranteed(),o}var l=function(){return this}(),u=t;return"string"==typeof u&&(t=o),f.notEnumerableProp(c,"__isPromisified__",!0),c}function l(t,e,n,r,i){for(var o=new RegExp(E(e)+"$"),s=a(t,e,o,n),c=0,l=s.length;l>c;c+=2){var u=s[c],p=s[c+1],_=u+e;if(r===k)t[_]=k(u,h,u,p,e,i);else{var d=r(p,function(){return k(u,h,u,p,e,i)});f.notEnumerableProp(d,"__isPromisified__",!0),t[_]=d}}return f.toFastProperties(t),t}function u(t,e,n){return k(t,e,void 0,t,null,n)}var p,h={},f=t("./util"),_=t("./nodeback"),d=f.withAppended,v=f.maybeWrapAsError,y=f.canEvaluate,m=t("./errors").TypeError,g="Async",b={__isPromisified__:!0},w=["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"],C=new RegExp("^(?:"+w.join("|")+")$"),j=function(t){return f.isIdentifier(t)&&"_"!==t.charAt(0)&&"constructor"!==t},E=function(t){return t.replace(/([$])/,"\\$")},k=y?p:c;e.promisify=function(t,e){if("function"!=typeof t)throw new m("expecting a function but got "+f.classString(t));if(i(t))return t;e=Object(e);var n=void 0===e.context?h:e.context,o=!!e.multiArgs,s=u(t,n,o);return f.copyDescriptors(t,s,r),s},e.promisifyAll=function(t,e){if("function"!=typeof t&&"object"!=typeof t)throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");e=Object(e);var n=!!e.multiArgs,r=e.suffix;"string"!=typeof r&&(r=g);var i=e.filter;"function"!=typeof i&&(i=j);var o=e.promisifier;if("function"!=typeof o&&(o=k),!f.isIdentifier(r))throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for(var s=f.inheritedDataKeys(t),a=0;a<s.length;++a){var c=t[s[a]];"constructor"!==s[a]&&f.isClass(c)&&(l(c.prototype,r,i,o,n),l(c,r,i,o,n))}return l(t,r,i,o,n)}}},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){function o(t){var e,n=!1;if(void 0!==a&&t instanceof a)e=p(t),n=!0;else{var r=u.keys(t),i=r.length;e=new Array(2*i);for(var o=0;i>o;++o){var s=r[o];e[o]=t[s],e[o+i]=s}}this.constructor$(e),this._isMap=n,this._init$(void 0,n?-6:-3)}function s(t){var n,s=r(t);return l(s)?(n=s instanceof e?s._then(e.props,void 0,void 0,void 0,void 0):new o(s).promise(),s instanceof e&&n._propagateFrom(s,2),n):i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")}var a,c=t("./util"),l=c.isObject,u=t("./es5");"function"==typeof Map&&(a=Map);var p=function(){function t(t,r){this[e]=t,this[e+n]=r,e++}var e=0,n=0;return function(r){n=r.size,e=0;var i=new Array(2*r.size);return r.forEach(t,i),i}}(),h=function(t){for(var e=new a,n=t.length/2|0,r=0;n>r;++r){var i=t[n+r],o=t[r];e.set(i,o)}return e};c.inherits(o,n),o.prototype._init=function(){},o.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;if(n>=this._length){var r;if(this._isMap)r=h(this._values);else{r={};for(var i=this.length(),o=0,s=this.length();s>o;++o)r[this._values[o+i]]=this._values[o]}return this._resolve(r),!0}return!1},o.prototype.shouldCopyValues=function(){return!1},o.prototype.getActualLength=function(t){return t>>1},e.prototype.props=function(){return s(this)},e.props=function(t){return s(t)}}},{"./es5":13,"./util":36}],26:[function(t,e,n){"use strict";function r(t,e,n,r,i){for(var o=0;i>o;++o)n[o+r]=t[o+e],t[o+e]=void 0}function i(t){this._capacity=t,this._length=0,this._front=0}i.prototype._willBeOverCapacity=function(t){return this._capacity<t},i.prototype._pushOne=function(t){var e=this.length();this._checkCapacity(e+1);var n=this._front+e&this._capacity-1;this[n]=t,this._length=e+1},i.prototype.push=function(t,e,n){var r=this.length()+3;if(this._willBeOverCapacity(r))return this._pushOne(t),this._pushOne(e),void this._pushOne(n);var i=this._front+r-3;this._checkCapacity(r);var o=this._capacity-1;this[i+0&o]=t,this[i+1&o]=e,this[i+2&o]=n,this._length=r},i.prototype.shift=function(){var t=this._front,e=this[t];return this[t]=void 0,this._front=t+1&this._capacity-1,this._length--,e},i.prototype.length=function(){return this._length},i.prototype._checkCapacity=function(t){this._capacity<t&&this._resizeTo(this._capacity<<1)},i.prototype._resizeTo=function(t){var e=this._capacity;this._capacity=t;var n=this._front,i=this._length,o=n+i&e-1;r(this,0,this,e,o)},e.exports=i},{}],27:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){function o(t,o){var c=r(t);if(c instanceof e)return a(c);if(t=s.asArray(t),null===t)return i("expecting an array or an iterable object but got "+s.classString(t));var l=new e(n);void 0!==o&&l._propagateFrom(o,3);for(var u=l._fulfill,p=l._reject,h=0,f=t.length;f>h;++h){var _=t[h];(void 0!==_||h in t)&&e.cast(_)._then(u,p,void 0,l,null)}return l}var s=t("./util"),a=function(t){return t.then(function(e){return o(e,t)})};e.race=function(t){return o(t,void 0)},e.prototype.race=function(){return o(this,void 0)}}},{"./util":36}],28:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t,n,r,i){this.constructor$(t);var s=h();this._fn=null===s?n:f.domainBind(s,n),void 0!==r&&(r=e.resolve(r),r._attachCancellationCallback(this)),this._initialValue=r,this._currentCancellable=null,i===o?this._eachValues=Array(this._length):0===i?this._eachValues=null:this._eachValues=void 0,this._promise._captureStackTrace(),this._init$(void 0,-5)}function c(t,e){this.isFulfilled()?e._resolve(t):e._reject(t)}function l(t,e,n,i){if("function"!=typeof e)return r("expecting a function but got "+f.classString(e));var o=new a(t,e,n,i);return o.promise()}function u(t){this.accum=t,this.array._gotAccum(t);var n=i(this.value,this.array._promise);return n instanceof e?(this.array._currentCancellable=n,n._then(p,void 0,void 0,this,void 0)):p.call(this,n)}function p(t){var n=this.array,r=n._promise,i=_(n._fn);r._pushContext();var o;o=void 0!==n._eachValues?i.call(r._boundValue(),t,this.index,this.length):i.call(r._boundValue(),this.accum,t,this.index,this.length),o instanceof e&&(n._currentCancellable=o);var a=r._popContext();return s.checkForgottenReturns(o,a,void 0!==n._eachValues?"Promise.each":"Promise.reduce",r),o}var h=e._getDomain,f=t("./util"),_=f.tryCatch;f.inherits(a,n),a.prototype._gotAccum=function(t){void 0!==this._eachValues&&null!==this._eachValues&&t!==o&&this._eachValues.push(t)},a.prototype._eachComplete=function(t){return null!==this._eachValues&&this._eachValues.push(t),this._eachValues},a.prototype._init=function(){},a.prototype._resolveEmptyArray=function(){this._resolve(void 0!==this._eachValues?this._eachValues:this._initialValue)},a.prototype.shouldCopyValues=function(){return!1},a.prototype._resolve=function(t){this._promise._resolveCallback(t),this._values=null},a.prototype._resultCancelled=function(t){return t===this._initialValue?this._cancel():void(this._isResolved()||(this._resultCancelled$(),this._currentCancellable instanceof e&&this._currentCancellable.cancel(),this._initialValue instanceof e&&this._initialValue.cancel()))},a.prototype._iterate=function(t){this._values=t;var n,r,i=t.length;if(void 0!==this._initialValue?(n=this._initialValue,r=0):(n=e.resolve(t[0]),r=1),this._currentCancellable=n,!n.isRejected())for(;i>r;++r){var o={accum:null,value:t[r],index:r,length:i,array:this};n=n._then(u,void 0,void 0,o,void 0)}void 0!==this._eachValues&&(n=n._then(this._eachComplete,void 0,void 0,this,void 0)),n._then(c,c,void 0,n,this)},e.prototype.reduce=function(t,e){return l(this,t,e,null)},e.reduce=function(t,e,n,r){return l(t,e,n,r)}}},{"./util":36}],29:[function(t,e,n){"use strict";var r,i=t("./util"),o=function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")},s=i.getNativePromise();if(i.isNode&&"undefined"==typeof MutationObserver){var a=global.setImmediate,c=process.nextTick;r=i.isRecentNode?function(t){a.call(global,t)}:function(t){c.call(process,t)}}else if("function"==typeof s&&"function"==typeof s.resolve){var l=s.resolve();r=function(t){l.then(t)}}else r="undefined"==typeof MutationObserver||"undefined"!=typeof window&&window.navigator&&(window.navigator.standalone||window.cordova)?"undefined"!=typeof setImmediate?function(t){setImmediate(t)}:"undefined"!=typeof setTimeout?function(t){setTimeout(t,0)}:o:function(){var t=document.createElement("div"),e={attributes:!0},n=!1,r=document.createElement("div"),i=new MutationObserver(function(){t.classList.toggle("foo"),n=!1});i.observe(r,e);var o=function(){n||(n=!0,r.classList.toggle("foo"))};return function(n){var r=new MutationObserver(function(){r.disconnect(),n()});r.observe(t,e),o()}}();e.exports=r},{"./util":36}],30:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t){this.constructor$(t)}var o=e.PromiseInspection,s=t("./util");s.inherits(i,n),i.prototype._promiseResolved=function(t,e){this._values[t]=e;var n=++this._totalResolved;return n>=this._length?(this._resolve(this._values),!0):!1},i.prototype._promiseFulfilled=function(t,e){var n=new o;return n._bitField=33554432,n._settledValueField=t,this._promiseResolved(e,n)},i.prototype._promiseRejected=function(t,e){var n=new o;return n._bitField=16777216,n._settledValueField=t,this._promiseResolved(e,n)},e.settle=function(t){return r.deprecated(".settle()",".reflect()"),new i(t).promise()},e.prototype.settle=function(){return e.settle(this)}}},{"./util":36}],31:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t){this.constructor$(t),
this._howMany=0,this._unwrap=!1,this._initialized=!1}function o(t,e){if((0|e)!==e||0>e)return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");var n=new i(t),o=n.promise();return n.setHowMany(e),n.init(),o}var s=t("./util"),a=t("./errors").RangeError,c=t("./errors").AggregateError,l=s.isArray,u={};s.inherits(i,n),i.prototype._init=function(){if(this._initialized){if(0===this._howMany)return void this._resolve([]);this._init$(void 0,-5);var t=l(this._values);!this._isResolved()&&t&&this._howMany>this._canPossiblyFulfill()&&this._reject(this._getRangeError(this.length()))}},i.prototype.init=function(){this._initialized=!0,this._init()},i.prototype.setUnwrap=function(){this._unwrap=!0},i.prototype.howMany=function(){return this._howMany},i.prototype.setHowMany=function(t){this._howMany=t},i.prototype._promiseFulfilled=function(t){return this._addFulfilled(t),this._fulfilled()===this.howMany()?(this._values.length=this.howMany(),1===this.howMany()&&this._unwrap?this._resolve(this._values[0]):this._resolve(this._values),!0):!1},i.prototype._promiseRejected=function(t){return this._addRejected(t),this._checkOutcome()},i.prototype._promiseCancelled=function(){return this._values instanceof e||null==this._values?this._cancel():(this._addRejected(u),this._checkOutcome())},i.prototype._checkOutcome=function(){if(this.howMany()>this._canPossiblyFulfill()){for(var t=new c,e=this.length();e<this._values.length;++e)this._values[e]!==u&&t.push(this._values[e]);return t.length>0?this._reject(t):this._cancel(),!0}return!1},i.prototype._fulfilled=function(){return this._totalResolved},i.prototype._rejected=function(){return this._values.length-this.length()},i.prototype._addRejected=function(t){this._values.push(t)},i.prototype._addFulfilled=function(t){this._values[this._totalResolved++]=t},i.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected()},i.prototype._getRangeError=function(t){var e="Input array must contain at least "+this._howMany+" items but contains only "+t+" items";return new a(e)},i.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0))},e.some=function(t,e){return o(t,e)},e.prototype.some=function(t){return o(this,t)},e._SomePromiseArray=i}},{"./errors":12,"./util":36}],32:[function(t,e,n){"use strict";e.exports=function(t){function e(t){void 0!==t?(t=t._target(),this._bitField=t._bitField,this._settledValueField=t._isFateSealed()?t._settledValue():void 0):(this._bitField=0,this._settledValueField=void 0)}e.prototype._settledValue=function(){return this._settledValueField};var n=e.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},r=e.prototype.error=e.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},i=e.prototype.isFulfilled=function(){return 0!==(33554432&this._bitField)},o=e.prototype.isRejected=function(){return 0!==(16777216&this._bitField)},s=e.prototype.isPending=function(){return 0===(50397184&this._bitField)},a=e.prototype.isResolved=function(){return 0!==(50331648&this._bitField)};e.prototype.isCancelled=function(){return 0!==(8454144&this._bitField)},t.prototype.__isCancelled=function(){return 65536===(65536&this._bitField)},t.prototype._isCancelled=function(){return this._target().__isCancelled()},t.prototype.isCancelled=function(){return 0!==(8454144&this._target()._bitField)},t.prototype.isPending=function(){return s.call(this._target())},t.prototype.isRejected=function(){return o.call(this._target())},t.prototype.isFulfilled=function(){return i.call(this._target())},t.prototype.isResolved=function(){return a.call(this._target())},t.prototype.value=function(){return n.call(this._target())},t.prototype.reason=function(){var t=this._target();return t._unsetRejectionIsUnhandled(),r.call(t)},t.prototype._value=function(){return this._settledValue()},t.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},t.PromiseInspection=e}},{}],33:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,r){if(u(t)){if(t instanceof e)return t;var i=o(t);if(i===l){r&&r._pushContext();var c=e.reject(i.e);return r&&r._popContext(),c}if("function"==typeof i){if(s(t)){var c=new e(n);return t._then(c._fulfill,c._reject,void 0,c,null),c}return a(t,i,r)}}return t}function i(t){return t.then}function o(t){try{return i(t)}catch(e){return l.e=e,l}}function s(t){try{return p.call(t,"_promise0")}catch(e){return!1}}function a(t,r,i){function o(t){a&&(a._resolveCallback(t),a=null)}function s(t){a&&(a._rejectCallback(t,p,!0),a=null)}var a=new e(n),u=a;i&&i._pushContext(),a._captureStackTrace(),i&&i._popContext();var p=!0,h=c.tryCatch(r).call(t,o,s);return p=!1,a&&h===l&&(a._rejectCallback(h.e,!0,!0),a=null),u}var c=t("./util"),l=c.errorObj,u=c.isObject,p={}.hasOwnProperty;return r}},{"./util":36}],34:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t){this.handle=t}function o(t){return clearTimeout(this.handle),t}function s(t){throw clearTimeout(this.handle),t}var a=t("./util"),c=e.TimeoutError;i.prototype._resultCancelled=function(){clearTimeout(this.handle)};var l=function(t){return u(+this).thenReturn(t)},u=e.delay=function(t,o){var s,a;return void 0!==o?(s=e.resolve(o)._then(l,null,null,t,void 0),r.cancellation()&&o instanceof e&&s._setOnCancel(o)):(s=new e(n),a=setTimeout(function(){s._fulfill()},+t),r.cancellation()&&s._setOnCancel(new i(a)),s._captureStackTrace()),s._setAsyncGuaranteed(),s};e.prototype.delay=function(t){return u(t,this)};var p=function(t,e,n){var r;r="string"!=typeof e?e instanceof Error?e:new c("operation timed out"):new c(e),a.markAsOriginatingFromRejection(r),t._attachExtraTrace(r),t._reject(r),null!=n&&n.cancel()};e.prototype.timeout=function(t,e){t=+t;var n,a,c=new i(setTimeout(function(){n.isPending()&&p(n,e,a)},t));return r.cancellation()?(a=this.then(),n=a._then(o,s,void 0,c,void 0),n._setOnCancel(c)):n=this._then(o,s,void 0,c,void 0),n}}},{"./util":36}],35:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t){setTimeout(function(){throw t},0)}function c(t){var e=r(t);return e!==t&&"function"==typeof t._isDisposable&&"function"==typeof t._getDisposer&&t._isDisposable()&&e._setDisposable(t._getDisposer()),e}function l(t,n){function i(){if(s>=l)return u._fulfill();var o=c(t[s++]);if(o instanceof e&&o._isDisposable()){try{o=r(o._getDisposer().tryDispose(n),t.promise)}catch(p){return a(p)}if(o instanceof e)return o._then(i,a,null,null,null)}i()}var s=0,l=t.length,u=new e(o);return i(),u}function u(t,e,n){this._data=t,this._promise=e,this._context=n}function p(t,e,n){this.constructor$(t,e,n)}function h(t){return u.isDisposer(t)?(this.resources[this.index]._setDisposable(t),t.promise()):t}function f(t){this.length=t,this.promise=null,this[t-1]=null}var _=t("./util"),d=t("./errors").TypeError,v=t("./util").inherits,y=_.errorObj,m=_.tryCatch,g={};u.prototype.data=function(){return this._data},u.prototype.promise=function(){return this._promise},u.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():g},u.prototype.tryDispose=function(t){var e=this.resource(),n=this._context;void 0!==n&&n._pushContext();var r=e!==g?this.doDispose(e,t):null;return void 0!==n&&n._popContext(),this._promise._unsetDisposable(),this._data=null,r},u.isDisposer=function(t){return null!=t&&"function"==typeof t.resource&&"function"==typeof t.tryDispose},v(p,u),p.prototype.doDispose=function(t,e){var n=this.data();return n.call(t,t,e)},f.prototype._resultCancelled=function(){for(var t=this.length,n=0;t>n;++n){var r=this[n];r instanceof e&&r.cancel()}},e.using=function(){var t=arguments.length;if(2>t)return n("you must pass at least 2 arguments to Promise.using");var i=arguments[t-1];if("function"!=typeof i)return n("expecting a function but got "+_.classString(i));var o,a=!0;2===t&&Array.isArray(arguments[0])?(o=arguments[0],t=o.length,a=!1):(o=arguments,t--);for(var c=new f(t),p=0;t>p;++p){var d=o[p];if(u.isDisposer(d)){var v=d;d=d.promise(),d._setDisposable(v)}else{var g=r(d);g instanceof e&&(d=g._then(h,null,null,{resources:c,index:p},void 0))}c[p]=d}for(var b=new Array(c.length),p=0;p<b.length;++p)b[p]=e.resolve(c[p]).reflect();var w=e.all(b).then(function(t){for(var e=0;e<t.length;++e){var n=t[e];if(n.isRejected())return y.e=n.error(),y;if(!n.isFulfilled())return void w.cancel();t[e]=n.value()}C._pushContext(),i=m(i);var r=a?i.apply(void 0,t):i(t),o=C._popContext();return s.checkForgottenReturns(r,o,"Promise.using",C),r}),C=w.lastly(function(){var t=new e.PromiseInspection(w);return l(c,t)});return c.promise=C,C._setOnCancel(c),C},e.prototype._setDisposable=function(t){this._bitField=131072|this._bitField,this._disposer=t},e.prototype._isDisposable=function(){return(131072&this._bitField)>0},e.prototype._getDisposer=function(){return this._disposer},e.prototype._unsetDisposable=function(){this._bitField=-131073&this._bitField,this._disposer=void 0},e.prototype.disposer=function(t){if("function"==typeof t)return new p(t,this,i());throw new d}}},{"./errors":12,"./util":36}],36:[function(t,e,n){"use strict";function r(){try{var t=P;return P=null,t.apply(this,arguments)}catch(e){return T.e=e,T}}function i(t){return P=t,r}function o(t){return null==t||t===!0||t===!1||"string"==typeof t||"number"==typeof t}function s(t){return"function"==typeof t||"object"==typeof t&&null!==t}function a(t){return o(t)?new Error(v(t)):t}function c(t,e){var n,r=t.length,i=new Array(r+1);for(n=0;r>n;++n)i[n]=t[n];return i[n]=e,i}function l(t,e,n){if(!F.isES5)return{}.hasOwnProperty.call(t,e)?t[e]:void 0;var r=Object.getOwnPropertyDescriptor(t,e);return null!=r?null==r.get&&null==r.set?r.value:n:void 0}function u(t,e,n){if(o(t))return t;var r={value:n,configurable:!0,enumerable:!1,writable:!0};return F.defineProperty(t,e,r),t}function p(t){throw t}function h(t){try{if("function"==typeof t){var e=F.names(t.prototype),n=F.isES5&&e.length>1,r=e.length>0&&!(1===e.length&&"constructor"===e[0]),i=A.test(t+"")&&F.names(t).length>0;if(n||r||i)return!0}return!1}catch(o){return!1}}function f(t){function e(){}e.prototype=t;for(var n=8;n--;)new e;return t}function _(t){return D.test(t)}function d(t,e,n){for(var r=new Array(t),i=0;t>i;++i)r[i]=e+i+n;return r}function v(t){try{return t+""}catch(e){return"[no string representation]"}}function y(t){return null!==t&&"object"==typeof t&&"string"==typeof t.message&&"string"==typeof t.name}function m(t){try{u(t,"isOperational",!0)}catch(e){}}function g(t){return null==t?!1:t instanceof Error.__BluebirdErrorTypes__.OperationalError||t.isOperational===!0}function b(t){return y(t)&&F.propertyIsWritable(t,"stack")}function w(t){return{}.toString.call(t)}function C(t,e,n){for(var r=F.names(t),i=0;i<r.length;++i){var o=r[i];if(n(o))try{F.defineProperty(e,o,F.getDescriptor(t,o))}catch(s){}}}function j(t){return N?process.env[t]:void 0}function E(){if("function"==typeof Promise)try{var t=new Promise(function(){});if("[object Promise]"==={}.toString.call(t))return Promise}catch(e){}}function k(t,e){return t.bind(e)}var F=t("./es5"),x="undefined"==typeof navigator,T={e:{}},P,R="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0!==this?this:null,S=function(t,e){function n(){this.constructor=t,this.constructor$=e;for(var n in e.prototype)r.call(e.prototype,n)&&"$"!==n.charAt(n.length-1)&&(this[n+"$"]=e.prototype[n])}var r={}.hasOwnProperty;return n.prototype=e.prototype,t.prototype=new n,t.prototype},O=function(){var t=[Array.prototype,Object.prototype,Function.prototype],e=function(e){for(var n=0;n<t.length;++n)if(t[n]===e)return!0;return!1};if(F.isES5){var n=Object.getOwnPropertyNames;return function(t){for(var r=[],i=Object.create(null);null!=t&&!e(t);){var o;try{o=n(t)}catch(s){return r}for(var a=0;a<o.length;++a){var c=o[a];if(!i[c]){i[c]=!0;var l=Object.getOwnPropertyDescriptor(t,c);null!=l&&null==l.get&&null==l.set&&r.push(c)}}t=F.getPrototypeOf(t)}return r}}var r={}.hasOwnProperty;return function(n){if(e(n))return[];var i=[];t:for(var o in n)if(r.call(n,o))i.push(o);else{for(var s=0;s<t.length;++s)if(r.call(t[s],o))continue t;i.push(o)}return i}}(),A=/this\s*\.\s*\S+\s*=/,D=/^[a-z$_][a-z$_0-9]*$/i,V=function(){return"stack"in new Error?function(t){return b(t)?t:new Error(v(t))}:function(t){if(b(t))return t;try{throw new Error(v(t))}catch(e){return e}}}(),I=function(t){return F.isArray(t)?t:null};if("undefined"!=typeof Symbol&&Symbol.iterator){var L="function"==typeof Array.from?function(t){return Array.from(t)}:function(t){for(var e,n=[],r=t[Symbol.iterator]();!(e=r.next()).done;)n.push(e.value);return n};I=function(t){return F.isArray(t)?t:null!=t&&"function"==typeof t[Symbol.iterator]?L(t):null}}var H="undefined"!=typeof process&&"[object process]"===w(process).toLowerCase(),N="undefined"!=typeof process&&"undefined"!=typeof process.env,B={isClass:h,isIdentifier:_,inheritedDataKeys:O,getDataPropertyOrDefault:l,thrower:p,isArray:F.isArray,asArray:I,notEnumerableProp:u,isPrimitive:o,isObject:s,isError:y,canEvaluate:x,errorObj:T,tryCatch:i,inherits:S,withAppended:c,maybeWrapAsError:a,toFastProperties:f,filledRange:d,toString:v,canAttachTrace:b,ensureErrorObject:V,originatesFromRejection:g,markAsOriginatingFromRejection:m,classString:w,copyDescriptors:C,hasDevTools:"undefined"!=typeof chrome&&chrome&&"function"==typeof chrome.loadTimes,isNode:H,hasEnvVariables:N,env:j,global:R,getNativePromise:E,domainBind:k};B.isRecentNode=B.isNode&&function(){var t=process.versions.node.split(".").map(Number);return 0===t[0]&&t[1]>10||t[0]>0}(),B.isNode&&B.toFastProperties(process);try{throw new Error}catch(U){B.lastLineError=U}e.exports=B},{"./es5":13}]},{},[4])(4)}),"undefined"!=typeof window&&null!==window?window.P=window.Promise:"undefined"!=typeof self&&null!==self&&(self.P=self.Promise);
define('subapp/fork_list/fork_list',['libs/Class', 'jquery', 'libs/bluebird'],function(Class, $, Promise){
    var ForkListApp = Class.extend({
        draw_count_down: function() {
            var $fork_list = $('.fork-item');
            $fork_list.each(this.draw_single_fork_item.bind(this));
        },
        draw_single_fork_item: function(index, element){
            var dead_line = $(element).data("dead_line") -1;
            $(element).data({"dead_line":  dead_line});

            var done = dead_line < 0;
            var days = Math.floor(dead_line / (24 * 60 * 60));
            var hours = Math.floor(dead_line / (60 * 60)) % 24;
            var minutes = Math.floor(dead_line / 60) % 60;
            var seconds = dead_line % 60;

            if(!done){
                $('.days', $(element)).html(days);
                $('.hours', $(element)).html(hours);
                $('.minutes', $(element)).html(minutes);
                $('.seconds', $(element)).html(seconds);
            } else {
                if($(element).attr("data-fork-height") == '0'){
                    //高度未确定
                    $('.clockdiv', $(element)).html('分叉时间未定');
                    $('.fork-state', $(element)).removeClass('fork-incoming')
                        .removeClass('fork-passed').addClass('fork-unknown').html('时间未定');
                    $('.block-height .height-number', $(element)).html('未知');
                } else {
                    //完成分叉
                    $('.clockdiv', $(element)).html('完成分叉');
                    $('.fork-state', $(element)).removeClass('fork-incoming')
                        .addClass('fork-passed').html('完成分叉');
                }
            }


        },
        get_deadline: function(index, el) {
            var current_height = $(el).data('current_block');
            var block_interval = parseFloat($(el).attr('data-block-intervel'))*60;

            $(el).data({'dead_line':(el.dataset.forkHeight - current_height) * block_intervall});
        },
        draw_clocks: function () {
            setInterval(this.draw_count_down.bind(this), 1000);
        },
        get_block_fail: function () {
            console.log('fail getting block height');
        },
        hide_text: function(){
            //desc 文本溢出隐藏
            $('.desc').each(function(){
                var height = 42;  //3倍字体
                while($(this).height() > height) {
                    $(this).text($(this).text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'));
                }
                $(this).height(height);
            });
        },
        get_api_list: function () {
            var _api_list = [];
            $('.fork-item').each(function (index, item) {
                _api_list.push($(item).attr('data-block-height-api'));
            });
            return _.uniq(_api_list);
        },
        init_item_current_block: function () {
            this._api_list = this.get_api_list();
            // get a clean api list;

            return Promise.all(
                _.map(this._api_list, function(api){
                    return new Promise(function (resolve, reject){
                        $.ajax({
                            url: api,
                            method: 'GET'
                        }).done(resolve).fail(reject);
                    });
                })
            );
        },
        handle_error: function(error){
            console.log(error);
        },
        set_item_current_block: function (index, item) {
                var api = $(item).attr('data-block-height-api');
                $(item).data({'current_block': this.current_blocks[api]});
                var dead_line, target_block, block_intervel, current_block;
                block_intervel = parseFloat($(item).attr('data-block-intervel')) * 60;
                target_block = parseInt($(item).attr('data-fork-height'));
                current_block = $(item).data('current_block');
                dead_line = (target_block - current_block) * block_intervel ;
                $(item).data({'dead_line': dead_line});
                $(item).find('.current-block-height .height-number').html(current_block);

                return this;
        },
        set_current_blocks: function (){
            $('.fork-item').each(this.set_item_current_block.bind(this));
            return this;
        },
        handle_api_done: function (results) {
            var _result_list = [].slice.call(arguments);
            var _result_list = _.map(_result_list, function(item){
                if(_.isObject(item)){
                    return parseInt(item['count']);
                }else{
                    return parseInt(item);
                }
            });
            return  this.current_blocks = _.object(this._api_list, _result_list);

        },
        move_undecided_forks: function () {
            var $undecided_list = $("[data-fork-height='0']");
            var $incoming_list = $("[data-fork-status='incoming']");
            if($undecided_list.length<=0 ||$incoming_list.length <=0 ){
                return
            }
            $last_incoming = $incoming_list[$incoming_list.length-1];
            $undecided_list.each(function(index, item){
                $(item).insertAfter($($last_incoming));
            });
            return ;

        },
        init: function () {

            var _container = $('.fork-item');
            if (!_container.length){
                return ;
            }
            this.hide_text();
            this.move_undecided_forks();

            this.init_item_current_block()
             .spread(this.handle_api_done.bind(this))
             .then(this.set_current_blocks.bind(this))
             .then(this.draw_count_down.bind(this))
             .then(this.draw_clocks.bind(this))
             .catch(this.handle_error.bind(this));
        }
    });

    return ForkListApp;
});
/*! rasterizeHTML.js - v1.2.4 - 2016-10-30
* http://www.github.com/cburgmer/rasterizeHTML.js
* Copyright (c) 2016 Christoph Burgmer; Licensed MIT */
/* Integrated dependencies:
 * url (MIT License),
 * css-mediaquery (BSD License),
 * CSSOM.js (MIT License),
 * ayepromise (BSD License & WTFPL),
 * xmlserializer (MIT License),
 * sane-domparser-error (BSD License),
 * css-font-face-src (BSD License),
 * inlineresources (MIT License) */
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define('libs/rasterizehtml',[],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.rasterizeHTML=a()}}(function(){var a;return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(b,c,d){!function(e,f){"function"==typeof a&&a.amd?a(["url","css-mediaquery","xmlserializer","sane-domparser-error","ayepromise","inlineresources"],function(a,b,c,d,g,h){return e.rasterizeHTML=f(a,b,c,d,g,h)}):"object"==typeof d?c.exports=f(b("url"),b("css-mediaquery"),b("xmlserializer"),b("sane-domparser-error"),b("ayepromise"),b("inlineresources")):e.rasterizeHTML=f(e.url,e.cssMediaQuery,e.xmlserializer,e.sanedomparsererror,e.ayepromise,e.inlineresources)}(this,function(a,b,c,d,e,f){var g=function(a){"use strict";var b={},c=[];b.joinUrl=function(b,c){return b?a.resolve(b,c):c},b.getConstantUniqueIdFor=function(a){return c.indexOf(a)<0&&c.push(a),c.indexOf(a)},b.clone=function(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);return c};var d=function(a){return"object"==typeof a&&null!==a},e=function(a){return d(a)&&Object.prototype.toString.apply(a).match(/\[object (Canvas|HTMLCanvasElement)\]/i)};return b.parseOptionalParameters=function(a){var c={canvas:null,options:{}};return null==a[0]||e(a[0])?(c.canvas=a[0]||null,c.options=b.clone(a[1])):c.options=b.clone(a[0]),c},b}(a),h=function(a,b){"use strict";var c={},d=function(a,b,c){var d=a[b];return a[b]=function(){var a=Array.prototype.slice.call(arguments);return c.apply(this,[a,d])},d};return c.baseUrlRespectingXhr=function(b,c){var e=function(){var e=new b;return d(e,"open",function(b,d){var e=b.shift(),f=b.shift(),g=a.joinUrl(c,f);return d.apply(this,[e,g].concat(b))}),e};return e},c.finishNotifyingXhr=function(a){var c=0,e=0,f=!1,g=b.defer(),h=function(){var a=c-e;a<=0&&f&&g.resolve({totalCount:c})},i=function(){var b=new a;return d(b,"send",function(a,b){return c+=1,b.apply(this,arguments)}),b.addEventListener("load",function(){e+=1,h()}),b};return i.waitForRequestsToFinish=function(){return f=!0,h(),g.promise},i},c}(g,e),i=function(){"use strict";var a={},b=function(a){return Array.prototype.slice.call(a)};a.addClassName=function(a,b){a.className+=" "+b},a.addClassNameRecursively=function(b,c){a.addClassName(b,c),b.parentNode!==b.ownerDocument&&a.addClassNameRecursively(b.parentNode,c)};var c=function(a,c){var d=a.parentStyleSheet,e=b(d.cssRules).indexOf(a);d.insertRule(c,e+1),d.deleteRule(e)},d=function(a,b){var d=a.cssText.replace(/^[^\{]+/,""),e=b+" "+d;c(a,e)},e=function(a){return b(a).reduce(function(a,b){return a+b.cssText},"")},f=function(a){a.textContent=e(a.sheet.cssRules)},g=function(a){var b=document.implementation.createHTMLDocument(""),c=document.createElement("style");c.textContent=a.textContent,b.body.appendChild(c),a.sheet=c.sheet},h=function(a){return"((?:^|[^.#:\\w])|(?=\\W))("+a.join("|")+")(?=\\W|$)"},i=function(a,c,e){var i=h(c);b(a.querySelectorAll("style")).forEach(function(a){"undefined"==typeof a.sheet&&g(a);var c=b(a.sheet.cssRules).filter(function(a){return a.selectorText&&new RegExp(i,"i").test(a.selectorText)});c.length&&(c.forEach(function(a){var b=a.selectorText.replace(new RegExp(i,"gi"),function(a,b,c){return b+e(c)});b!==a.selectorText&&d(a,b)}),f(a))})};return a.rewriteCssSelectorWith=function(a,b,c){i(a,[b],function(){return c})},a.lowercaseCssTypeSelectors=function(a,b){i(a,b,function(a){return a.toLowerCase()})},a.findHtmlOnlyNodeNames=function(a){var b,c=a.ownerDocument.createTreeWalker(a,NodeFilter.SHOW_ELEMENT),d={},e={};do b=c.currentNode.tagName.toLowerCase(),"http://www.w3.org/1999/xhtml"===c.currentNode.namespaceURI?d[b]=!0:e[b]=!0;while(c.nextNode());return Object.keys(d).filter(function(a){return!e[a]})},a}(),j=function(a){"use strict";var b={},c=function(a){return Array.prototype.slice.call(a)},d={active:!0,hover:!0,focus:!1,target:!1};return b.fakeUserAction=function(b,c,e){var f=b.querySelector(c),g=":"+e,h="rasterizehtml"+e;f&&(d[e]?a.addClassNameRecursively(f,h):a.addClassName(f,h),a.rewriteCssSelectorWith(b,g,"."+h))},b.persistInputValues=function(a){var b=a.querySelectorAll("input"),d=a.querySelectorAll("textarea"),e=function(a){return"checkbox"===a.type||"radio"===a.type};c(b).filter(e).forEach(function(a){a.checked?a.setAttribute("checked",""):a.removeAttribute("checked")}),c(b).filter(function(a){return!e(a)}).forEach(function(a){a.setAttribute("value",a.value)}),c(d).forEach(function(a){a.textContent=a.value})},b.rewriteTagNameSelectorsToLowerCase=function(b){a.lowercaseCssTypeSelectors(b,a.findHtmlOnlyNodeNames(b))},b}(i),k=function(a){"use strict";var b,c={},d=function(){var a='<svg id="svg" xmlns="http://www.w3.org/2000/svg" width="10" height="10"><style>@media (max-width: 1em) { svg { background: #00f; } }</style></svg>',b="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(a),c=document.createElement("img");return c.src=b,c},f=function(a,b,c,d){var e=document.createElement("canvas");e.width=a.width,e.height=a.height;var f,g=e.getContext("2d");return g.drawImage(a,0,0),f=g.getImageData(0,0,1,1).data,f[0]===b&&f[1]===c&&f[2]===d},g=function(){var a=d(),b=e.defer();return document.querySelector("body").appendChild(a),a.onload=function(){document.querySelector("body").removeChild(a);try{b.resolve(!f(a,0,0,255))}catch(a){b.resolve(!0)}},a.onerror=function(){b.reject()},b.promise};c.needsEmWorkaround=function(){return void 0===b&&(b=g()),b};var h=function(a){return Array.prototype.slice.call(a)},i=function(a){return h(a).map(function(a){return a.cssText}).join("\n")},j=function(a,b){return"@media "+a+"{"+i(b)+"}"},k=function(a,b,c){try{a.insertRule(c,b+1)}catch(a){return}a.deleteRule(b)},l=function(a,b){var c=a.parentStyleSheet,d=h(c.cssRules).indexOf(a);k(c,d,b)},m=function(a){a.textContent=i(a.sheet.cssRules)},n=function(a){var b=a.modifier?a.modifier+"-"+a.feature:a.feature;return a.value?"("+b+": "+a.value+")":"("+b+")"},o=function(a){var b=[];return a.inverse&&b.push("not"),b.push(a.type),a.expressions.length>0&&b.push("and "+a.expressions.map(n).join(" and ")),b.join(" ")};c.serializeQuery=function(a){var b=a.map(o);return b.join(", ")};var p=function(a){return 16*a},q=function(a){var b=/^((?:\d+\.)?\d+)em/.exec(a);return b?p(parseFloat(b[1]))+"px":a},r=function(b){var d=a.parse(b),e=!1;if(d.forEach(function(a){a.expressions.forEach(function(a){var b=q(a.value);e|=b!==a.value,a.value=b})}),e)return c.serializeQuery(d)},s=function(a){var b=!1;return a.forEach(function(a){var c=r(a.media.mediaText);c&&l(a,j(c,a.cssRules)),b|=!!c}),b};return c.workAroundWebKitEmSizeIssue=function(a){var b=a.querySelectorAll("style");h(b).forEach(function(a){var b=h(a.sheet.cssRules).filter(function(a){return a.type===window.CSSRule.MEDIA_RULE}),c=s(b);c&&m(a)})},c}(b),l=function(a,b,c,d,e){"use strict";var f={},g=function(a,b,c,d){var e=a.createElement(b);return e.style.visibility="hidden",e.style.width=c+"px",e.style.height=d+"px",e.style.position="absolute",e.style.top=-1e4-d+"px",e.style.left=-1e4-c+"px",a.getElementsByTagName("body")[0].appendChild(e),e};f.executeJavascript=function(a,d){var f=g(e.document,"iframe",d.width,d.height),h=a.outerHTML,i=[],j=c.defer(),k=d.executeJsTimeout||0,l=function(){var a=f.contentDocument;e.document.getElementsByTagName("body")[0].removeChild(f),j.resolve({document:a,errors:i})},m=function(){var a=c.defer();return k>0?setTimeout(a.resolve,k):a.resolve(),a.promise},n=f.contentWindow.XMLHttpRequest,o=b.finishNotifyingXhr(n),p=b.baseUrlRespectingXhr(o,d.baseUrl);return f.onload=function(){m().then(o.waitForRequestsToFinish).then(l)},f.contentDocument.open(),f.contentWindow.XMLHttpRequest=p,f.contentWindow.onerror=function(a){i.push({resourceType:"scriptExecution",msg:a})},f.contentDocument.write("<!DOCTYPE html>"),f.contentDocument.write(h),f.contentDocument.close(),j.promise};var h=function(a,b,c){var d=a.createElement("iframe");return d.style.width=b+"px",d.style.height=c+"px",d.style.visibility="hidden",d.style.position="absolute",d.style.top=-1e4-c+"px",d.style.left=-1e4-b+"px",d.sandbox="allow-same-origin",d.scrolling="no",d},i=function(a,b,c){var d=Math.floor(a/c),f=Math.floor(b/c);return h(e.document,d,f)},j=function(a,b,c,d){return{width:Math.max(a.width*d,b),height:Math.max(a.height*d,c)}},k=function(a,b){var c=a.querySelector(b);if(c)return c;if(a.ownerDocument.querySelector(b)===a)return a;throw{message:"Clipping selector not found"}},l=function(a,b,c,d,f){var g,h,i,l,m,n,o,p,q=Math.max(a.scrollWidth,a.clientWidth),r=Math.max(a.scrollHeight,a.clientHeight);return b?(n=k(a,b),o=n.getBoundingClientRect(),g=o.top,h=o.left,i=o.width,l=o.height):(g=0,h=0,i=q,l=r),p=j({width:i,height:l},c,d,f),m=e.getComputedStyle(a.ownerDocument.documentElement).fontSize,{left:h,top:g,width:p.width,height:p.height,viewportWidth:q,viewportHeight:r,rootFontSize:m}},m=function(a,b){var c=a.tagName;return b.querySelector(c)},n=function(a){var b=a.tagName.toLowerCase();return"html"===b||"body"===b?a.outerHTML:'<body style="margin: 0;">'+a.outerHTML+"</body>"};f.calculateDocumentContentSize=function(a,b){var d,f=c.defer(),g=b.zoom||1;return d=i(b.width,b.height,g),e.document.getElementsByTagName("body")[0].appendChild(d),d.onload=function(){var c,h=d.contentDocument;try{c=l(m(a,h),b.clip,b.width,b.height,g),f.resolve(c)}catch(a){f.reject(a)}finally{e.document.getElementsByTagName("body")[0].removeChild(d)}},d.contentDocument.open(),d.contentDocument.write("<!DOCTYPE html>"),d.contentDocument.write(n(a)),d.contentDocument.close(),f.promise},f.parseHtmlFragment=function(a){var b=e.document.implementation.createHTMLDocument("");b.documentElement.innerHTML=a;var c=b.querySelector("body").firstChild;if(!c)throw"Invalid source";return c};var o=function(a,b){var c,d,f,g,h=/<html((?:\s+[^>]*)?)>/im.exec(b),i=e.document.implementation.createHTMLDocument("");if(h)for(c="<div"+h[1]+"></div>",i.documentElement.innerHTML=c,f=i.querySelector("div"),d=0;d<f.attributes.length;d++)g=f.attributes[d],a.documentElement.setAttribute(g.name,g.value)};f.parseHTML=function(a){var b=e.document.implementation.createHTMLDocument("");return b.documentElement.innerHTML=a,o(b,a),b};var p=function(a){try{return d.failOnParseError(a)}catch(a){throw{message:"Invalid source",originalError:a}}};f.validateXHTML=function(a){var b=new DOMParser,c=b.parseFromString(a,"application/xml");p(c)};var q=null,r=function(a,b){return"none"===b||"repeated"===b?(null!==q&&"repeated"===b||(q=Date.now()),a+"?_="+q):a},s=function(b,d){var e=new window.XMLHttpRequest,f=a.joinUrl(d.baseUrl,b),g=r(f,d.cache),h=c.defer(),i=function(a){h.reject({message:"Unable to load page",originalError:a})};e.addEventListener("load",function(){200===e.status||0===e.status?h.resolve(e.responseXML):i(e.statusText)},!1),e.addEventListener("error",function(a){i(a)},!1);try{e.open("GET",g,!0),e.responseType="document",e.send(null)}catch(a){i(a)}return h.promise};return f.loadDocument=function(a,b){return s(a,b).then(function(a){return p(a)})},f}(g,h,e,d,window),m=function(a,b){"use strict";var c,d={},e=function(a,b){return b?URL.createObjectURL(new Blob([a],{type:"image/svg+xml"})):"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(a)},f=function(a){a instanceof Blob&&URL.revokeObjectURL(a)},g='<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><foreignObject></foreignObject></svg>',h=function(b){var c=document.createElement("canvas"),d=new Image,e=a.defer();return d.onload=function(){var a=c.getContext("2d");try{a.drawImage(d,0,0),c.toDataURL("image/png"),e.resolve(!0)}catch(a){e.resolve(!1)}},d.onerror=e.reject,d.src=b,e.promise},i=function(){var a=e(g,!0);return h(a).then(function(b){return f(a),!b&&h(e(g,!1)).then(function(a){return a})},function(){return!1})},j=function(){if(b.Blob)try{return new Blob(["<b></b>"],{type:"text/xml"}),!0}catch(a){}return!1},k=function(){var c=a.defer();return j&&b.URL?i().then(function(a){c.resolve(!a)},function(){c.reject()}):c.resolve(!1),c.promise},l=function(){return void 0===c&&(c=k()),c},m=function(a){return l().then(function(b){return e(a,b)})};return d.renderSvg=function(b){var c,d,e=a.defer(),g=function(){d.onload=null,d.onerror=null},h=function(){c&&f(c)};return d=new Image,d.onload=function(){g(),h(),e.resolve(d)},d.onerror=function(){h(),e.reject()},m(b).then(function(a){c=a,d.src=c},e.reject),e.promise},d}(e,window),n=function(a,b,c,d,e){"use strict";var f={},g=function(a,b){var c=b||1,d={width:a.width,height:a.height,"font-size":a.rootFontSize};return 1!==c&&(d.style="transform:scale("+c+"); transform-origin: 0 0;"),d},h=function(a){var b,c,d,e;b=Math.round(a.viewportWidth),c=Math.round(a.viewportHeight),d=-a.left,e=-a.top;var f={x:d,y:e,width:b,height:c};return f},i=function(a){var b=a.style||"";a.style=b+"float: left;"},j=function(a){a.externalResourcesRequired=!0},k=function(){return'<style scoped="">html::-webkit-scrollbar { display: none; }</style>'},l=function(a){var b=Object.keys(a);return b.length?" "+b.map(function(b){return b+'="'+a[b]+'"'}).join(" "):""},m=function(a,c,d){var f=e.serializeToString(a);b.validateXHTML(f);var m=h(c);return i(m),j(m),'<svg xmlns="http://www.w3.org/2000/svg"'+l(g(c,d))+">"+k()+"<foreignObject"+l(m)+">"+f+"</foreignObject></svg>"};return f.getSvgForDocument=function(a,b,e){return c.rewriteTagNameSelectorsToLowerCase(a),d.needsEmWorkaround().then(function(c){return c&&d.workAroundWebKitEmSizeIssue(a),m(a,b,e)})},f.drawDocumentAsSvg=function(a,d){return["hover","active","focus","target"].forEach(function(b){d[b]&&c.fakeUserAction(a,d[b],b)}),b.calculateDocumentContentSize(a,d).then(function(b){return f.getSvgForDocument(a,b,d.zoom)})},f}(g,l,j,k,c),o=function(a,b,c,d,e,f){"use strict";var g={},h=function(a){return{message:"Error rendering page",originalError:a}},i=function(a){return e.renderSvg(a).then(function(b){return{image:b,svg:a}},function(a){throw h(a)})},j=function(a,b){try{b.getContext("2d").drawImage(a,0,0)}catch(a){throw h(a)}},k=function(a,b,c){return d.drawDocumentAsSvg(a,c).then(i).then(function(a){return b&&j(a.image,b),a})},l=function(a,d){return b.executeJavascript(a,d).then(function(a){var b=a.document;return c.persistInputValues(b),{document:b,errors:a.errors}})};return g.rasterize=function(b,c,d){var e;return e=a.clone(d),e.inlineScripts=d.executeJs===!0,f.inlineReferences(b,e).then(function(a){return d.executeJs?l(b,d).then(function(b){return{element:b.document.documentElement,errors:a.concat(b.errors)}}):{element:b,errors:a}}).then(function(a){return k(a.element,c,d).then(function(b){return{image:b.image,svg:b.svg,errors:a.errors}})})},g}(g,l,j,n,m,f),p=function(a,b,c){"use strict";var d={},e=function(a,b){var c=300,d=200,e=a?a.width:c,f=a?a.height:d,g=void 0!==b.width?b.width:e,h=void 0!==b.height?b.height:f;return{width:g,height:h}},f=function(b){var c,d=e(b.canvas,b.options);return c=a.clone(b.options),c.width=d.width,c.height=d.height,c};d.drawDocument=function(){var b=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.parseOptionalParameters(d),g=b.documentElement?b.documentElement:b;return c.rasterize(g,e.canvas,f(e))};var g=function(a,c,e){var f=b.parseHTML(a);return d.drawDocument(f,c,e)};d.drawHTML=function(){var b=arguments[0],c=Array.prototype.slice.call(arguments,1),d=a.parseOptionalParameters(c);return g(b,d.canvas,d.options)};var h=function(b,c,d){var e=document.implementation.createHTMLDocument("");e.replaceChild(b.documentElement,e.documentElement);var f=d?a.clone(d):{};return d.baseUrl||(f.baseUrl=c),{document:e,options:f}},i=function(a,c,e){return b.loadDocument(a,e).then(function(b){var f=h(b,a,e);return d.drawDocument(f.document,c,f.options)})};return d.drawURL=function(){var b=arguments[0],c=Array.prototype.slice.call(arguments,1),d=a.parseOptionalParameters(c);return i(b,d.canvas,d.options)},d}(g,l,o);return p})},{ayepromise:2,"css-mediaquery":8,inlineresources:29,"sane-domparser-error":38,url:3,xmlserializer:39}],2:[function(b,c,d){!function(b,e){"function"==typeof a&&a.amd?a(e):"object"==typeof d?c.exports=e():b.ayepromise=e()}(this,function(){"use strict";var a={},b=function(){var a=!1;return function(b){return function(){a||(a=!0,b.apply(null,arguments))}}},c=function(a){var b=a&&a.then;if("object"==typeof a&&"function"==typeof b)return function(){return b.apply(a,arguments)}},d=function(b,c){var d=a.defer(),e=function(a,b){setTimeout(function(){var c;try{c=a(b)}catch(a){return void d.reject(a)}c===d.promise?d.reject(new TypeError("Cannot resolve promise with itself")):d.resolve(c)},1)},g=function(a){b&&b.call?e(b,a):d.resolve(a)},h=function(a){c&&c.call?e(c,a):d.reject(a)};return{promise:d.promise,handle:function(a,b){a===f?g(b):h(b)}}},e=0,f=1,g=2;return a.defer=function(){var a,h=e,i=[],j=function(b,c){h=b,a=c,i.forEach(function(b){b.handle(h,a)}),i=null},k=function(a){j(f,a)},l=function(a){j(g,a)},m=function(b,c){var f=d(b,c);return h===e?i.push(f):f.handle(h,a),f.promise},n=function(a){var c=b();try{a(c(o),c(l))}catch(a){c(l)(a)}},o=function(a){var b;try{b=c(a)}catch(a){return void l(a)}b?n(b):k(a)},p=b();return{resolve:p(o),reject:p(l),promise:{then:m,fail:function(a){return m(null,a)}}}},a})},{}],3:[function(a,b,c){"use strict";function d(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function e(a,b,c){if(a&&j.isObject(a)&&a instanceof d)return a;var e=new d;return e.parse(a,b,c),e}function f(a){return j.isString(a)&&(a=e(a)),a instanceof d?a.format():d.prototype.format.call(a)}function g(a,b){return e(a,!1,!0).resolve(b)}function h(a,b){return a?e(a,!1,!0).resolveObject(b):b}var i=a("punycode"),j=a("./util");c.parse=e,c.resolve=g,c.resolveObject=h,c.format=f,c.Url=d;var k=/^([a-z0-9.+-]+:)/i,l=/:[0-9]*$/,m=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,n=["<",">",'"',"`"," ","\r","\n","\t"],o=["{","}","|","\\","^","`"].concat(n),p=["'"].concat(o),q=["%","/","?",";","#"].concat(p),r=["/","?","#"],s=255,t=/^[+a-z0-9A-Z_-]{0,63}$/,u=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,v={javascript:!0,"javascript:":!0},w={javascript:!0,"javascript:":!0},x={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},y=a("querystring");d.prototype.parse=function(a,b,c){if(!j.isString(a))throw new TypeError("Parameter 'url' must be a string, not "+typeof a);var d=a.indexOf("?"),e=d!==-1&&d<a.indexOf("#")?"?":"#",f=a.split(e),g=/\\/g;f[0]=f[0].replace(g,"/"),a=f.join(e);var h=a;if(h=h.trim(),!c&&1===a.split("#").length){var l=m.exec(h);if(l)return this.path=h,this.href=h,this.pathname=l[1],l[2]?(this.search=l[2],b?this.query=y.parse(this.search.substr(1)):this.query=this.search.substr(1)):b&&(this.search="",this.query={}),this}var n=k.exec(h);if(n){n=n[0];var o=n.toLowerCase();this.protocol=o,h=h.substr(n.length)}if(c||n||h.match(/^\/\/[^@\/]+@[^@\/]+/)){var z="//"===h.substr(0,2);!z||n&&w[n]||(h=h.substr(2),this.slashes=!0)}if(!w[n]&&(z||n&&!x[n])){for(var A=-1,B=0;B<r.length;B++){var C=h.indexOf(r[B]);C!==-1&&(A===-1||C<A)&&(A=C)}var D,E;E=A===-1?h.lastIndexOf("@"):h.lastIndexOf("@",A),E!==-1&&(D=h.slice(0,E),h=h.slice(E+1),this.auth=decodeURIComponent(D)),A=-1;for(var B=0;B<q.length;B++){var C=h.indexOf(q[B]);C!==-1&&(A===-1||C<A)&&(A=C)}A===-1&&(A=h.length),this.host=h.slice(0,A),h=h.slice(A),this.parseHost(),this.hostname=this.hostname||"";var F="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!F)for(var G=this.hostname.split(/\./),B=0,H=G.length;B<H;B++){var I=G[B];if(I&&!I.match(t)){for(var J="",K=0,L=I.length;K<L;K++)J+=I.charCodeAt(K)>127?"x":I[K];if(!J.match(t)){var M=G.slice(0,B),N=G.slice(B+1),O=I.match(u);O&&(M.push(O[1]),N.unshift(O[2])),N.length&&(h="/"+N.join(".")+h),this.hostname=M.join(".");break}}}this.hostname.length>s?this.hostname="":this.hostname=this.hostname.toLowerCase(),F||(this.hostname=i.toASCII(this.hostname));var P=this.port?":"+this.port:"",Q=this.hostname||"";this.host=Q+P,this.href+=this.host,F&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==h[0]&&(h="/"+h))}if(!v[o])for(var B=0,H=p.length;B<H;B++){var R=p[B];if(h.indexOf(R)!==-1){var S=encodeURIComponent(R);S===R&&(S=escape(R)),h=h.split(R).join(S)}}var T=h.indexOf("#");T!==-1&&(this.hash=h.substr(T),h=h.slice(0,T));var U=h.indexOf("?");if(U!==-1?(this.search=h.substr(U),this.query=h.substr(U+1),b&&(this.query=y.parse(this.query)),h=h.slice(0,U)):b&&(this.search="",this.query={}),h&&(this.pathname=h),x[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var P=this.pathname||"",V=this.search||"";this.path=P+V}return this.href=this.format(),this},d.prototype.format=function(){var a=this.auth||"";a&&(a=encodeURIComponent(a),a=a.replace(/%3A/i,":"),a+="@");var b=this.protocol||"",c=this.pathname||"",d=this.hash||"",e=!1,f="";this.host?e=a+this.host:this.hostname&&(e=a+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(e+=":"+this.port)),this.query&&j.isObject(this.query)&&Object.keys(this.query).length&&(f=y.stringify(this.query));var g=this.search||f&&"?"+f||"";return b&&":"!==b.substr(-1)&&(b+=":"),this.slashes||(!b||x[b])&&e!==!1?(e="//"+(e||""),c&&"/"!==c.charAt(0)&&(c="/"+c)):e||(e=""),d&&"#"!==d.charAt(0)&&(d="#"+d),g&&"?"!==g.charAt(0)&&(g="?"+g),c=c.replace(/[?#]/g,function(a){return encodeURIComponent(a)}),g=g.replace("#","%23"),b+e+c+g+d},d.prototype.resolve=function(a){return this.resolveObject(e(a,!1,!0)).format()},d.prototype.resolveObject=function(a){if(j.isString(a)){var b=new d;b.parse(a,!1,!0),a=b}for(var c=new d,e=Object.keys(this),f=0;f<e.length;f++){var g=e[f];c[g]=this[g]}if(c.hash=a.hash,""===a.href)return c.href=c.format(),c;if(a.slashes&&!a.protocol){for(var h=Object.keys(a),i=0;i<h.length;i++){var k=h[i];"protocol"!==k&&(c[k]=a[k])}return x[c.protocol]&&c.hostname&&!c.pathname&&(c.path=c.pathname="/"),c.href=c.format(),c}if(a.protocol&&a.protocol!==c.protocol){if(!x[a.protocol]){for(var l=Object.keys(a),m=0;m<l.length;m++){var n=l[m];c[n]=a[n]}return c.href=c.format(),c}if(c.protocol=a.protocol,a.host||w[a.protocol])c.pathname=a.pathname;else{for(var o=(a.pathname||"").split("/");o.length&&!(a.host=o.shift()););a.host||(a.host=""),a.hostname||(a.hostname=""),""!==o[0]&&o.unshift(""),o.length<2&&o.unshift(""),c.pathname=o.join("/")}if(c.search=a.search,c.query=a.query,c.host=a.host||"",c.auth=a.auth,c.hostname=a.hostname||a.host,c.port=a.port,c.pathname||c.search){var p=c.pathname||"",q=c.search||"";c.path=p+q}return c.slashes=c.slashes||a.slashes,c.href=c.format(),c}var r=c.pathname&&"/"===c.pathname.charAt(0),s=a.host||a.pathname&&"/"===a.pathname.charAt(0),t=s||r||c.host&&a.pathname,u=t,v=c.pathname&&c.pathname.split("/")||[],o=a.pathname&&a.pathname.split("/")||[],y=c.protocol&&!x[c.protocol];if(y&&(c.hostname="",c.port=null,c.host&&(""===v[0]?v[0]=c.host:v.unshift(c.host)),c.host="",a.protocol&&(a.hostname=null,a.port=null,a.host&&(""===o[0]?o[0]=a.host:o.unshift(a.host)),a.host=null),t=t&&(""===o[0]||""===v[0])),s)c.host=a.host||""===a.host?a.host:c.host,c.hostname=a.hostname||""===a.hostname?a.hostname:c.hostname,c.search=a.search,c.query=a.query,v=o;else if(o.length)v||(v=[]),v.pop(),v=v.concat(o),c.search=a.search,c.query=a.query;else if(!j.isNullOrUndefined(a.search)){if(y){c.hostname=c.host=v.shift();var z=!!(c.host&&c.host.indexOf("@")>0)&&c.host.split("@");z&&(c.auth=z.shift(),c.host=c.hostname=z.shift())}return c.search=a.search,c.query=a.query,j.isNull(c.pathname)&&j.isNull(c.search)||(c.path=(c.pathname?c.pathname:"")+(c.search?c.search:"")),c.href=c.format(),c}if(!v.length)return c.pathname=null,c.search?c.path="/"+c.search:c.path=null,c.href=c.format(),c;for(var A=v.slice(-1)[0],B=(c.host||a.host||v.length>1)&&("."===A||".."===A)||""===A,C=0,D=v.length;D>=0;D--)A=v[D],"."===A?v.splice(D,1):".."===A?(v.splice(D,1),C++):C&&(v.splice(D,1),C--);if(!t&&!u)for(;C--;C)v.unshift("..");!t||""===v[0]||v[0]&&"/"===v[0].charAt(0)||v.unshift(""),B&&"/"!==v.join("/").substr(-1)&&v.push("");var E=""===v[0]||v[0]&&"/"===v[0].charAt(0);if(y){c.hostname=c.host=E?"":v.length?v.shift():"";var z=!!(c.host&&c.host.indexOf("@")>0)&&c.host.split("@");z&&(c.auth=z.shift(),c.host=c.hostname=z.shift())}return t=t||c.host&&v.length,t&&!E&&v.unshift(""),v.length?c.pathname=v.join("/"):(c.pathname=null,c.path=null),j.isNull(c.pathname)&&j.isNull(c.search)||(c.path=(c.pathname?c.pathname:"")+(c.search?c.search:"")),c.auth=a.auth||c.auth,c.slashes=c.slashes||a.slashes,c.href=c.format(),c},d.prototype.parseHost=function(){var a=this.host,b=l.exec(a);b&&(b=b[0],":"!==b&&(this.port=b.substr(1)),a=a.substr(0,a.length-b.length)),a&&(this.hostname=a)}},{"./util":4,punycode:34,querystring:37}],4:[function(a,b,c){"use strict";b.exports={isString:function(a){return"string"==typeof a},isObject:function(a){return"object"==typeof a&&null!==a},isNull:function(a){return null===a},isNullOrUndefined:function(a){return null==a}}},{}],5:[function(a,b,c){b.exports=function(){function b(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c}function c(a,b,c,d,e,f){this.message=a,this.expected=b,this.found=c,this.offset=d,this.line=e,this.column=f,this.name="SyntaxError"}function d(b){function d(a){function c(a,c,d){var e,f;for(e=c;e<d;e++)f=b.charAt(e),"\n"===f?(a.seenCR||a.line++,a.column=1,a.seenCR=!1):"\r"===f||"\u2028"===f||"\u2029"===f?(a.line++,a.column=1,a.seenCR=!0):(a.column++,a.seenCR=!1)}return T!==a&&(T>a&&(T=0,U={line:1,column:1,seenCR:!1}),c(U,T,a),T=a),U}function e(a){R<V||(R>V&&(V=R,W=[]),W.push(a))}function f(a,e,f){function g(a){var b=1;for(a.sort(function(a,b){return a.description<b.description?-1:a.description>b.description?1:0});b<a.length;)a[b-1]===a[b]?a.splice(b,1):b++}function h(a,b){function c(a){function b(a){return a.charCodeAt(0).toString(16).toUpperCase()}return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(a){return"\\x0"+b(a)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(a){return"\\x"+b(a)}).replace(/[\u0180-\u0FFF]/g,function(a){return"\\u0"+b(a)}).replace(/[\u1080-\uFFFF]/g,function(a){return"\\u"+b(a)})}var d,e,f,g=new Array(a.length);for(f=0;f<a.length;f++)g[f]=a[f].description;return d=a.length>1?g.slice(0,-1).join(", ")+" or "+g[a.length-1]:g[0],e=b?'"'+c(b)+'"':"end of input","Expected "+d+" but "+e+" found."}var i=d(f),j=f<b.length?b.charAt(f):null;return null!==e&&g(e),new c(null!==a?a:h(e,j),e,j,f,i.line,i.column)}function g(){var a,b;return a=h(),a===r&&(a=R,b=[],b!==r&&(S=a,b=u()),a=b),a}function h(){var a,c,d,f,g,j;if(a=R,c=i(),c!==r){for(d=[],f=o();f!==r;)d.push(f),f=o();if(d!==r)if(44===b.charCodeAt(R)?(f=w,R++):(f=r,0===X&&e(x)),f!==r){for(g=[],j=o();j!==r;)g.push(j),j=o();g!==r?(j=h(),j!==r?(S=a,c=y(c,j),a=c):(R=a,a=v)):(R=a,a=v)}else R=a,a=v;else R=a,a=v}else R=a,a=v;return a===r&&(a=R,c=i(),c!==r&&(S=a,c=z(c)),a=c),a}function i(){var a;return a=j(),a===r&&(a=m()),a}function j(){var a,b,c,d;if(a=R,b=k(),b!==r){if(c=[],d=o(),d!==r)for(;d!==r;)c.push(d),d=o();else c=v;c!==r?(d=l(),d!==r?(S=a,b=A(b,d),a=b):(R=a,a=v)):(R=a,a=v)}else R=a,a=v;return a===r&&(a=R,b=k(),b!==r&&(S=a,b=B(b)),a=b),a}function k(){var a,c,d,f;return a=R,b.substr(R,4)===C?(c=C,R+=4):(c=r,0===X&&e(D)),c!==r?(d=n(),d!==r?(41===b.charCodeAt(R)?(f=E,R++):(f=r,0===X&&e(F)),f!==r?(S=a,c=G(d),a=c):(R=a,a=v)):(R=a,a=v)):(R=a,a=v),a}function l(){var a,c,d,f;return a=R,b.substr(R,7)===H?(c=H,R+=7):(c=r,0===X&&e(I)),c!==r?(d=n(),d!==r?(41===b.charCodeAt(R)?(f=E,R++):(f=r,0===X&&e(F)),f!==r?(S=a,c=G(d),a=c):(R=a,a=v)):(R=a,a=v)):(R=a,a=v),a}function m(){var a,c,d,f;return a=R,b.substr(R,6)===J?(c=J,R+=6):(c=r,0===X&&e(K)),c!==r?(d=n(),d!==r?(41===b.charCodeAt(R)?(f=E,R++):(f=r,0===X&&e(F)),f!==r?(S=a,c=L(d),a=c):(R=a,a=v)):(R=a,a=v)):(R=a,a=v),a}function n(){var a,c,d;if(a=R,c=[],M.test(b.charAt(R))?(d=b.charAt(R),R++):(d=r,0===X&&e(N)),d!==r)for(;d!==r;)c.push(d),M.test(b.charAt(R))?(d=b.charAt(R),R++):(d=r,0===X&&e(N));else c=v;return c!==r&&(S=a,c=O(c)),a=c}function o(){var a;return P.test(b.charAt(R))?(a=b.charAt(R),R++):(a=r,0===X&&e(Q)),a}var p,q=arguments.length>1?arguments[1]:{},r={},s={start:g},t=g,u=function(){return[]},v=r,w=",",x={type:"literal",value:",",description:'","'},y=function(a,b){return[a].concat(b)},z=function(a){return[a]},A=function(a,b){return{url:a,format:b}},B=function(a){return{url:a}},C="url(",D={type:"literal",value:"url(",description:'"url("'},E=")",F={type:"literal",value:")",description:'")"'},G=function(a){return a},H="format(",I={type:"literal",value:"format(",description:'"format("'},J="local(",K={type:"literal",value:"local(",description:'"local("'},L=function(a){return{local:a}},M=/^[^)]/,N={type:"class",value:"[^)]",description:"[^)]"},O=function(a){return Y.extractValue(a.join(""))},P=/^[ \t\r\n\f]/,Q={type:"class",value:"[ \\t\\r\\n\\f]",description:"[ \\t\\r\\n\\f]"},R=0,S=0,T=0,U={line:1,column:1,seenCR:!1},V=0,W=[],X=0;if("startRule"in q){if(!(q.startRule in s))throw new Error("Can't start parsing from rule \""+q.startRule+'".');t=s[q.startRule]}var Y=a("../util");if(p=t(),p!==r&&R===b.length)return p;throw p!==r&&R<b.length&&e({type:"end",description:"end of input"}),f(null,W,V)}return b(c,Error),{SyntaxError:c,parse:d}}()},{"../util":7}],6:[function(a,b,c){var d=a("./grammar");c.SyntaxError=function(a,b){this.message=a,this.offset=b},c.parse=function(a){try{return d.parse(a)}catch(a){throw new c.SyntaxError(a.message,a.offset)}},c.serialize=function(a){return a.map(function(a){var b;return a.url?(b='url("'+a.url+'")',a.format&&(b+=' format("'+a.format+'")')):b='local("'+a.local+'")',b}).join(", ")}},{"./grammar":5}],7:[function(a,b,c){var d=function(a){var b=/^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/;return a.replace(b,"$1")},e=function(a){var b=/^"(.*)"$/,c=/^'(.*)'$/;return b.test(a)?a.replace(b,"$1"):c.test(a)?a.replace(c,"$1"):a};c.extractValue=function(a){return e(d(a))}},{}],8:[function(a,b,c){"use strict";function d(a,b){return e(a).some(function(a){var c=a.inverse,d="all"===a.type||b.type===a.type;if(d&&c||!d&&!c)return!1;var e=a.expressions.every(function(a){var c=a.feature,d=a.modifier,e=a.value,i=b[c];if(!i)return!1;switch(c){case"orientation":case"scan":return i.toLowerCase()===e.toLowerCase();case"width":case"height":case"device-width":case"device-height":e=h(e),i=h(i);break;case"resolution":e=g(e),i=g(i);break;case"aspect-ratio":case"device-aspect-ratio":case"device-pixel-ratio":e=f(e),i=f(i);break;case"grid":case"color":case"color-index":case"monochrome":e=parseInt(e,10)||1,i=parseInt(i,10)||0}switch(d){case"min":return i>=e;case"max":return i<=e;default:return i===e}});return e&&!c||!e&&c})}function e(a){return a.split(",").map(function(a){a=a.trim();var b=a.match(i),c=b[1],d=b[2],e=b[3]||"",f={};return f.inverse=!!c&&"not"===c.toLowerCase(),f.type=d?d.toLowerCase():"all",e=e.match(/\([^\)]+\)/g)||[],f.expressions=e.map(function(a){var b=a.match(j),c=b[1].toLowerCase().match(k);return{modifier:c[1],feature:c[2],value:b[2]}}),f})}function f(a){var b,c=Number(a);return c||(b=a.match(/^(\d+)\s*\/\s*(\d+)$/),c=b[1]/b[2]),c}function g(a){var b=parseFloat(a),c=String(a).match(m)[1];switch(c){case"dpcm":return b/2.54;case"dppx":return 96*b;default:return b}}function h(a){var b=parseFloat(a),c=String(a).match(l)[1];switch(c){case"em":return 16*b;case"rem":return 16*b;case"cm":return 96*b/2.54;case"mm":return 96*b/2.54/10;case"in":return 96*b;case"pt":return 72*b;case"pc":return 72*b/12;
default:return b}}c.match=d,c.parse=e;var i=/(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,j=/\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,k=/^(?:(min|max)-)?(.+)/,l=/(em|rem|px|cm|mm|in|pt|pc)?$/,m=/(dpi|dpcm|dppx)?$/},{}],9:[function(a,b,c){var d={CSSRule:a("./CSSRule").CSSRule,MatcherList:a("./MatcherList").MatcherList};d.CSSDocumentRule=function(){d.CSSRule.call(this),this.matcher=new d.MatcherList,this.cssRules=[]},d.CSSDocumentRule.prototype=new d.CSSRule,d.CSSDocumentRule.prototype.constructor=d.CSSDocumentRule,d.CSSDocumentRule.prototype.type=10,Object.defineProperty(d.CSSDocumentRule.prototype,"cssText",{get:function(){for(var a=[],b=0,c=this.cssRules.length;b<c;b++)a.push(this.cssRules[b].cssText);return"@-moz-document "+this.matcher.matcherText+" {"+a.join("")+"}"}}),c.CSSDocumentRule=d.CSSDocumentRule},{"./CSSRule":15,"./MatcherList":21}],10:[function(a,b,c){var d={CSSStyleDeclaration:a("./CSSStyleDeclaration").CSSStyleDeclaration,CSSRule:a("./CSSRule").CSSRule};d.CSSFontFaceRule=function(){d.CSSRule.call(this),this.style=new d.CSSStyleDeclaration,this.style.parentRule=this},d.CSSFontFaceRule.prototype=new d.CSSRule,d.CSSFontFaceRule.prototype.constructor=d.CSSFontFaceRule,d.CSSFontFaceRule.prototype.type=5,Object.defineProperty(d.CSSFontFaceRule.prototype,"cssText",{get:function(){return"@font-face {"+this.style.cssText+"}"}}),c.CSSFontFaceRule=d.CSSFontFaceRule},{"./CSSRule":15,"./CSSStyleDeclaration":16}],11:[function(a,b,c){var d={CSSRule:a("./CSSRule").CSSRule,CSSStyleSheet:a("./CSSStyleSheet").CSSStyleSheet,MediaList:a("./MediaList").MediaList};d.CSSImportRule=function(){d.CSSRule.call(this),this.href="",this.media=new d.MediaList,this.styleSheet=new d.CSSStyleSheet},d.CSSImportRule.prototype=new d.CSSRule,d.CSSImportRule.prototype.constructor=d.CSSImportRule,d.CSSImportRule.prototype.type=3,Object.defineProperty(d.CSSImportRule.prototype,"cssText",{get:function(){var a=this.media.mediaText;return"@import url("+this.href+")"+(a?" "+a:"")+";"},set:function(a){for(var b,c,d=0,e="",f="";c=a.charAt(d);d++)switch(c){case" ":case"\t":case"\r":case"\n":case"\f":"after-import"===e?e="url":f+=c;break;case"@":e||a.indexOf("@import",d)!==d||(e="after-import",d+="import".length,f="");break;case"u":if("url"===e&&a.indexOf("url(",d)===d){if(b=a.indexOf(")",d+1),b===-1)throw d+': ")" not found';d+="url(".length;var g=a.slice(d,b);g[0]===g[g.length-1]&&('"'!==g[0]&&"'"!==g[0]||(g=g.slice(1,-1))),this.href=g,d=b,e="media"}break;case'"':if("url"===e){if(b=a.indexOf('"',d+1),!b)throw d+": '\"' not found";this.href=a.slice(d+1,b),d=b,e="media"}break;case"'":if("url"===e){if(b=a.indexOf("'",d+1),!b)throw d+': "\'" not found';this.href=a.slice(d+1,b),d=b,e="media"}break;case";":"media"===e&&f&&(this.media.mediaText=f.trim());break;default:"media"===e&&(f+=c)}}}),c.CSSImportRule=d.CSSImportRule},{"./CSSRule":15,"./CSSStyleSheet":18,"./MediaList":22}],12:[function(a,b,c){var d={CSSRule:a("./CSSRule").CSSRule,CSSStyleDeclaration:a("./CSSStyleDeclaration").CSSStyleDeclaration};d.CSSKeyframeRule=function(){d.CSSRule.call(this),this.keyText="",this.style=new d.CSSStyleDeclaration,this.style.parentRule=this},d.CSSKeyframeRule.prototype=new d.CSSRule,d.CSSKeyframeRule.prototype.constructor=d.CSSKeyframeRule,d.CSSKeyframeRule.prototype.type=9,Object.defineProperty(d.CSSKeyframeRule.prototype,"cssText",{get:function(){return this.keyText+" {"+this.style.cssText+"} "}}),c.CSSKeyframeRule=d.CSSKeyframeRule},{"./CSSRule":15,"./CSSStyleDeclaration":16}],13:[function(a,b,c){var d={CSSRule:a("./CSSRule").CSSRule};d.CSSKeyframesRule=function(){d.CSSRule.call(this),this.name="",this.cssRules=[]},d.CSSKeyframesRule.prototype=new d.CSSRule,d.CSSKeyframesRule.prototype.constructor=d.CSSKeyframesRule,d.CSSKeyframesRule.prototype.type=8,Object.defineProperty(d.CSSKeyframesRule.prototype,"cssText",{get:function(){for(var a=[],b=0,c=this.cssRules.length;b<c;b++)a.push("  "+this.cssRules[b].cssText);return"@"+(this._vendorPrefix||"")+"keyframes "+this.name+" { \n"+a.join("\n")+"\n}"}}),c.CSSKeyframesRule=d.CSSKeyframesRule},{"./CSSRule":15}],14:[function(a,b,c){var d={CSSRule:a("./CSSRule").CSSRule,MediaList:a("./MediaList").MediaList};d.CSSMediaRule=function(){d.CSSRule.call(this),this.media=new d.MediaList,this.cssRules=[]},d.CSSMediaRule.prototype=new d.CSSRule,d.CSSMediaRule.prototype.constructor=d.CSSMediaRule,d.CSSMediaRule.prototype.type=4,Object.defineProperty(d.CSSMediaRule.prototype,"cssText",{get:function(){for(var a=[],b=0,c=this.cssRules.length;b<c;b++)a.push(this.cssRules[b].cssText);return"@media "+this.media.mediaText+" {"+a.join("")+"}"}}),c.CSSMediaRule=d.CSSMediaRule},{"./CSSRule":15,"./MediaList":22}],15:[function(a,b,c){var d={};d.CSSRule=function(){this.parentRule=null,this.parentStyleSheet=null},d.CSSRule.UNKNOWN_RULE=0,d.CSSRule.STYLE_RULE=1,d.CSSRule.CHARSET_RULE=2,d.CSSRule.IMPORT_RULE=3,d.CSSRule.MEDIA_RULE=4,d.CSSRule.FONT_FACE_RULE=5,d.CSSRule.PAGE_RULE=6,d.CSSRule.KEYFRAMES_RULE=7,d.CSSRule.KEYFRAME_RULE=8,d.CSSRule.MARGIN_RULE=9,d.CSSRule.NAMESPACE_RULE=10,d.CSSRule.COUNTER_STYLE_RULE=11,d.CSSRule.SUPPORTS_RULE=12,d.CSSRule.DOCUMENT_RULE=13,d.CSSRule.FONT_FEATURE_VALUES_RULE=14,d.CSSRule.VIEWPORT_RULE=15,d.CSSRule.REGION_STYLE_RULE=16,d.CSSRule.prototype={constructor:d.CSSRule},c.CSSRule=d.CSSRule},{}],16:[function(a,b,c){var d={};d.CSSStyleDeclaration=function(){this.length=0,this.parentRule=null,this._importants={}},d.CSSStyleDeclaration.prototype={constructor:d.CSSStyleDeclaration,getPropertyValue:function(a){return this[a]||""},setProperty:function(a,b,c){if(this[a]){var d=Array.prototype.indexOf.call(this,a);d<0&&(this[this.length]=a,this.length++)}else this[this.length]=a,this.length++;this[a]=b,this._importants[a]=c},removeProperty:function(a){if(!(a in this))return"";var b=Array.prototype.indexOf.call(this,a);if(b<0)return"";var c=this[a];return this[a]="",Array.prototype.splice.call(this,b,1),c},getPropertyCSSValue:function(){},getPropertyPriority:function(a){return this._importants[a]||""},getPropertyShorthand:function(){},isPropertyImplicit:function(){},get cssText(){for(var a=[],b=0,c=this.length;b<c;++b){var d=this[b],e=this.getPropertyValue(d),f=this.getPropertyPriority(d);f&&(f=" !"+f),a[b]=d+": "+e+f+";"}return a.join(" ")},set cssText(a){var b,c;for(b=this.length;b--;)c=this[b],this[c]="";Array.prototype.splice.call(this,0,this.length),this._importants={};var e=d.parse("#bogus{"+a+"}").cssRules[0].style,f=e.length;for(b=0;b<f;++b)c=e[b],this.setProperty(e[b],e.getPropertyValue(c),e.getPropertyPriority(c))}},c.CSSStyleDeclaration=d.CSSStyleDeclaration,d.parse=a("./parse").parse},{"./parse":26}],17:[function(a,b,c){var d={CSSStyleDeclaration:a("./CSSStyleDeclaration").CSSStyleDeclaration,CSSRule:a("./CSSRule").CSSRule};d.CSSStyleRule=function(){d.CSSRule.call(this),this.selectorText="",this.style=new d.CSSStyleDeclaration,this.style.parentRule=this},d.CSSStyleRule.prototype=new d.CSSRule,d.CSSStyleRule.prototype.constructor=d.CSSStyleRule,d.CSSStyleRule.prototype.type=1,Object.defineProperty(d.CSSStyleRule.prototype,"cssText",{get:function(){var a;return a=this.selectorText?this.selectorText+" {"+this.style.cssText+"}":""},set:function(a){var b=d.CSSStyleRule.parse(a);this.style=b.style,this.selectorText=b.selectorText}}),d.CSSStyleRule.parse=function(a){for(var b,c,e,f=0,g="selector",h=f,i="",j={selector:!0,value:!0},k=new d.CSSStyleRule,l="";e=a.charAt(f);f++)switch(e){case" ":case"\t":case"\r":case"\n":case"\f":if(j[g])switch(a.charAt(f-1)){case" ":case"\t":case"\r":case"\n":case"\f":break;default:i+=" "}break;case'"':if(h=f+1,b=a.indexOf('"',h)+1,!b)throw'" is missing';i+=a.slice(f,b),f=b-1;break;case"'":if(h=f+1,b=a.indexOf("'",h)+1,!b)throw"' is missing";i+=a.slice(f,b),f=b-1;break;case"/":if("*"===a.charAt(f+1)){if(f+=2,b=a.indexOf("*/",f),b===-1)throw new SyntaxError("Missing */");f=b+1}else i+=e;break;case"{":"selector"===g&&(k.selectorText=i.trim(),i="",g="name");break;case":":"name"===g?(c=i.trim(),i="",g="value"):i+=e;break;case"!":"value"===g&&a.indexOf("!important",f)===f?(l="important",f+="important".length):i+=e;break;case";":"value"===g?(k.style.setProperty(c,i.trim(),l),l="",i="",g="name"):i+=e;break;case"}":if("value"===g)k.style.setProperty(c,i.trim(),l),l="",i="";else{if("name"===g)break;i+=e}g="selector";break;default:i+=e}return k},c.CSSStyleRule=d.CSSStyleRule},{"./CSSRule":15,"./CSSStyleDeclaration":16}],18:[function(a,b,c){var d={StyleSheet:a("./StyleSheet").StyleSheet,CSSStyleRule:a("./CSSStyleRule").CSSStyleRule};d.CSSStyleSheet=function(){d.StyleSheet.call(this),this.cssRules=[]},d.CSSStyleSheet.prototype=new d.StyleSheet,d.CSSStyleSheet.prototype.constructor=d.CSSStyleSheet,d.CSSStyleSheet.prototype.insertRule=function(a,b){if(b<0||b>this.cssRules.length)throw new RangeError("INDEX_SIZE_ERR");var c=d.parse(a).cssRules[0];return c.parentStyleSheet=this,this.cssRules.splice(b,0,c),b},d.CSSStyleSheet.prototype.deleteRule=function(a){if(a<0||a>=this.cssRules.length)throw new RangeError("INDEX_SIZE_ERR");this.cssRules.splice(a,1)},d.CSSStyleSheet.prototype.toString=function(){for(var a="",b=this.cssRules,c=0;c<b.length;c++)a+=b[c].cssText+"\n";return a},c.CSSStyleSheet=d.CSSStyleSheet,d.parse=a("./parse").parse},{"./CSSStyleRule":17,"./StyleSheet":23,"./parse":26}],19:[function(a,b,c){var d={};d.CSSValue=function(){},d.CSSValue.prototype={constructor:d.CSSValue,set cssText(a){var b=this._getConstructorName();throw new Error('DOMException: property "cssText" of "'+b+'" is readonly and can not be replaced with "'+a+'"!')},get cssText(){var a=this._getConstructorName();throw new Error('getter "cssText" of "'+a+'" is not implemented!')},_getConstructorName:function(){var a=this.constructor.toString(),b=a.match(/function\s([^\(]+)/),c=b[1];return c}},c.CSSValue=d.CSSValue},{}],20:[function(a,b,c){var d={CSSValue:a("./CSSValue").CSSValue};d.CSSValueExpression=function(a,b){this._token=a,this._idx=b},d.CSSValueExpression.prototype=new d.CSSValue,d.CSSValueExpression.prototype.constructor=d.CSSValueExpression,d.CSSValueExpression.prototype.parse=function(){for(var a,b=this._token,c=this._idx,d="",e="",f="",g=[];;++c){if(d=b.charAt(c),""===d){f="css expression error: unfinished expression!";break}switch(d){case"(":g.push(d),e+=d;break;case")":g.pop(d),e+=d;break;case"/":(a=this._parseJSComment(b,c))?a.error?f="css expression error: unfinished comment in expression!":c=a.idx:(a=this._parseJSRexExp(b,c))?(c=a.idx,e+=a.text):e+=d;break;case"'":case'"':a=this._parseJSString(b,c,d),a?(c=a.idx,e+=a.text):e+=d;break;default:e+=d}if(f)break;if(0===g.length)break}var h;return h=f?{error:f}:{idx:c,expression:e}},d.CSSValueExpression.prototype._parseJSComment=function(a,b){var c,d=a.charAt(b+1);if("/"===d||"*"===d){var e,f,g=b;if("/"===d?f="\n":"*"===d&&(f="*/"),e=a.indexOf(f,g+1+1),e!==-1)return e=e+f.length-1,c=a.substring(b,e+1),{idx:e,text:c};var h="css expression error: unfinished comment in expression!";return{error:h}}return!1},d.CSSValueExpression.prototype._parseJSString=function(a,b,c){var d,e=this._findMatchedIdx(a,b,c);return e!==-1&&(d=a.substring(b,e+c.length),{idx:e,text:d})},d.CSSValueExpression.prototype._parseJSRexExp=function(a,b){var c=a.substring(0,b).replace(/\s+$/,""),d=[/^$/,/\($/,/\[$/,/\!$/,/\+$/,/\-$/,/\*$/,/\/\s+/,/\%$/,/\=$/,/\>$/,/<$/,/\&$/,/\|$/,/\^$/,/\~$/,/\?$/,/\,$/,/delete$/,/in$/,/instanceof$/,/new$/,/typeof$/,/void$/],e=d.some(function(a){return a.test(c)});if(e){var f="/";return this._parseJSString(a,b,f)}return!1},d.CSSValueExpression.prototype._findMatchedIdx=function(a,b,c){for(var d,e=b,f=-1;;){if(d=a.indexOf(c,e+1),d===-1){d=f;break}var g=a.substring(b+1,d),h=g.match(/\\+$/);if(!h||h[0]%2===0)break;e=d}var i=a.indexOf("\n",b+1);return i<d&&(d=f),d},c.CSSValueExpression=d.CSSValueExpression},{"./CSSValue":19}],21:[function(a,b,c){var d={};d.MatcherList=function(){this.length=0},d.MatcherList.prototype={constructor:d.MatcherList,get matcherText(){return Array.prototype.join.call(this,", ")},set matcherText(a){for(var b=a.split(","),c=this.length=b.length,d=0;d<c;d++)this[d]=b[d].trim()},appendMatcher:function(a){Array.prototype.indexOf.call(this,a)===-1&&(this[this.length]=a,this.length++)},deleteMatcher:function(a){var b=Array.prototype.indexOf.call(this,a);b!==-1&&Array.prototype.splice.call(this,b,1)}},c.MatcherList=d.MatcherList},{}],22:[function(a,b,c){var d={};d.MediaList=function(){this.length=0},d.MediaList.prototype={constructor:d.MediaList,get mediaText(){return Array.prototype.join.call(this,", ")},set mediaText(a){for(var b=a.split(","),c=this.length=b.length,d=0;d<c;d++)this[d]=b[d].trim()},appendMedium:function(a){Array.prototype.indexOf.call(this,a)===-1&&(this[this.length]=a,this.length++)},deleteMedium:function(a){var b=Array.prototype.indexOf.call(this,a);b!==-1&&Array.prototype.splice.call(this,b,1)}},c.MediaList=d.MediaList},{}],23:[function(a,b,c){var d={};d.StyleSheet=function(){this.parentStyleSheet=null},c.StyleSheet=d.StyleSheet},{}],24:[function(a,b,c){var d={CSSStyleSheet:a("./CSSStyleSheet").CSSStyleSheet,CSSStyleRule:a("./CSSStyleRule").CSSStyleRule,CSSMediaRule:a("./CSSMediaRule").CSSMediaRule,CSSStyleDeclaration:a("./CSSStyleDeclaration").CSSStyleDeclaration,CSSKeyframeRule:a("./CSSKeyframeRule").CSSKeyframeRule,CSSKeyframesRule:a("./CSSKeyframesRule").CSSKeyframesRule};d.clone=function a(b){var c=new d.CSSStyleSheet,e=b.cssRules;if(!e)return c;for(var f={1:d.CSSStyleRule,4:d.CSSMediaRule,8:d.CSSKeyframesRule,9:d.CSSKeyframeRule},g=0,h=e.length;g<h;g++){var i=e[g],j=c.cssRules[g]=new f[i.type],k=i.style;if(k){for(var l=j.style=new d.CSSStyleDeclaration,m=0,n=k.length;m<n;m++){var o=l[m]=k[m];l[o]=k[o],l._importants[o]=k.getPropertyPriority(o)}l.length=k.length}i.hasOwnProperty("keyText")&&(j.keyText=i.keyText),i.hasOwnProperty("selectorText")&&(j.selectorText=i.selectorText),i.hasOwnProperty("mediaText")&&(j.mediaText=i.mediaText),i.hasOwnProperty("cssRules")&&(j.cssRules=a(i).cssRules)}return c},c.clone=d.clone},{"./CSSKeyframeRule":12,"./CSSKeyframesRule":13,"./CSSMediaRule":14,"./CSSStyleDeclaration":16,"./CSSStyleRule":17,"./CSSStyleSheet":18}],25:[function(a,b,c){"use strict";c.CSSStyleDeclaration=a("./CSSStyleDeclaration").CSSStyleDeclaration,c.CSSRule=a("./CSSRule").CSSRule,c.CSSStyleRule=a("./CSSStyleRule").CSSStyleRule,c.MediaList=a("./MediaList").MediaList,c.CSSMediaRule=a("./CSSMediaRule").CSSMediaRule,c.CSSImportRule=a("./CSSImportRule").CSSImportRule,c.CSSFontFaceRule=a("./CSSFontFaceRule").CSSFontFaceRule,c.StyleSheet=a("./StyleSheet").StyleSheet,c.CSSStyleSheet=a("./CSSStyleSheet").CSSStyleSheet,c.CSSKeyframesRule=a("./CSSKeyframesRule").CSSKeyframesRule,c.CSSKeyframeRule=a("./CSSKeyframeRule").CSSKeyframeRule,c.MatcherList=a("./MatcherList").MatcherList,c.CSSDocumentRule=a("./CSSDocumentRule").CSSDocumentRule,c.CSSValue=a("./CSSValue").CSSValue,c.CSSValueExpression=a("./CSSValueExpression").CSSValueExpression,c.parse=a("./parse").parse,c.clone=a("./clone").clone},{"./CSSDocumentRule":9,"./CSSFontFaceRule":10,"./CSSImportRule":11,"./CSSKeyframeRule":12,"./CSSKeyframesRule":13,"./CSSMediaRule":14,"./CSSRule":15,"./CSSStyleDeclaration":16,"./CSSStyleRule":17,"./CSSStyleSheet":18,"./CSSValue":19,"./CSSValueExpression":20,"./MatcherList":21,"./MediaList":22,"./StyleSheet":23,"./clone":24,"./parse":26}],26:[function(a,b,c){var d={};d.parse=function(a){for(var b,c,e,f,g,h,i,j,k,l,m=0,n="before-selector",o="",p={selector:!0,value:!0,atRule:!0,"importRule-begin":!0,importRule:!0,atBlock:!0,"documentRule-begin":!0},q=new d.CSSStyleSheet,r=q,s="",t=/@(-(?:\w+-)+)?keyframes/g,u=function(b){var c=a.substring(0,m).split("\n"),d=c.length,e=c.pop().length+1,f=new Error(b+" (line "+d+", char "+e+")");throw f.line=d,f.char=e,f.styleSheet=q,f};l=a.charAt(m);m++)switch(l){case" ":case"\t":case"\r":case"\n":case"\f":p[n]&&(o+=l);break;case'"':b=m+1;do b=a.indexOf('"',b)+1,b||u('Unmatched "');while("\\"===a[b-2]);switch(o+=a.slice(m,b),m=b-1,n){case"before-value":n="value";break;case"importRule-begin":n="importRule"}break;case"'":b=m+1;do b=a.indexOf("'",b)+1,b||u("Unmatched '");while("\\"===a[b-2]);switch(o+=a.slice(m,b),m=b-1,n){case"before-value":n="value";break;case"importRule-begin":n="importRule"}break;case"/":"*"===a.charAt(m+1)?(m+=2,b=a.indexOf("*/",m),b===-1?u("Missing */"):m=b+1):o+=l,"importRule-begin"===n&&(o+=" ",n="importRule");break;case"@":if(a.indexOf("@-moz-document",m)===m){n="documentRule-begin",k=new d.CSSDocumentRule,k.__starts=m,m+="-moz-document".length,o="";break}if(a.indexOf("@media",m)===m){n="atBlock",g=new d.CSSMediaRule,g.__starts=m,m+="media".length,o="";break}if(a.indexOf("@import",m)===m){n="importRule-begin",m+="import".length,o+="@import";break}if(a.indexOf("@font-face",m)===m){n="fontFaceRule-begin",m+="font-face".length,i=new d.CSSFontFaceRule,i.__starts=m,o="";break}t.lastIndex=m;var v=t.exec(a);if(v&&v.index===m){n="keyframesRule-begin",j=new d.CSSKeyframesRule,j.__starts=m,j._vendorPrefix=v[1],m+=v[0].length-1,o="";break}"selector"===n&&(n="atRule"),o+=l;break;case"{":"selector"===n||"atRule"===n?(f.selectorText=o.trim(),f.style.__starts=m,o="",n="before-name"):"atBlock"===n?(g.media.mediaText=o.trim(),r=c=g,g.parentStyleSheet=q,o="",n="before-selector"):"fontFaceRule-begin"===n?(c&&(i.parentRule=c),i.parentStyleSheet=q,f=i,o="",n="before-name"):"keyframesRule-begin"===n?(j.name=o.trim(),c&&(j.parentRule=c),j.parentStyleSheet=q,r=c=j,o="",n="keyframeRule-begin"):"keyframeRule-begin"===n?(f=new d.CSSKeyframeRule,f.keyText=o.trim(),f.__starts=m,o="",n="before-name"):"documentRule-begin"===n&&(k.matcher.matcherText=o.trim(),c&&(k.parentRule=c),r=c=k,k.parentStyleSheet=q,o="",n="before-selector");break;case":":"name"===n?(e=o.trim(),o="",n="before-value"):o+=l;break;case"(":if("value"===n)if("expression"===o.trim()){var w=new d.CSSValueExpression(a,m).parse();w.error?u(w.error):(o+=w.expression,m=w.idx)}else n="value-parenthesis",o+=l;else o+=l;break;case")":"value-parenthesis"===n&&(n="value"),o+=l;break;case"!":"value"===n&&a.indexOf("!important",m)===m?(s="important",m+="important".length):o+=l;break;case";":switch(n){case"value":f.style.setProperty(e,o.trim(),s),s="",o="",n="before-name";break;case"atRule":o="",n="before-selector";break;case"importRule":h=new d.CSSImportRule,h.parentStyleSheet=h.styleSheet.parentStyleSheet=q,h.cssText=o+l,q.cssRules.push(h),o="",n="before-selector";break;default:o+=l}break;case"}":switch(n){case"value":f.style.setProperty(e,o.trim(),s),s="";case"before-name":case"name":f.__ends=m+1,c&&(f.parentRule=c),f.parentStyleSheet=q,r.cssRules.push(f),o="",n=r.constructor===d.CSSKeyframesRule?"keyframeRule-begin":"before-selector";break;case"keyframeRule-begin":case"before-selector":case"selector":c||u("Unexpected }"),r.__ends=m+1,q.cssRules.push(r),r=q,c=null,o="",n="before-selector"}break;default:switch(n){case"before-selector":n="selector",f=new d.CSSStyleRule,f.__starts=m;break;case"before-name":n="name";break;case"before-value":n="value";break;case"importRule-begin":n="importRule"}o+=l}return q},c.parse=d.parse,d.CSSStyleSheet=a("./CSSStyleSheet").CSSStyleSheet,d.CSSStyleRule=a("./CSSStyleRule").CSSStyleRule,d.CSSImportRule=a("./CSSImportRule").CSSImportRule,d.CSSMediaRule=a("./CSSMediaRule").CSSMediaRule,d.CSSFontFaceRule=a("./CSSFontFaceRule").CSSFontFaceRule,d.CSSStyleDeclaration=a("./CSSStyleDeclaration").CSSStyleDeclaration,d.CSSKeyframeRule=a("./CSSKeyframeRule").CSSKeyframeRule,d.CSSKeyframesRule=a("./CSSKeyframesRule").CSSKeyframesRule,d.CSSValueExpression=a("./CSSValueExpression").CSSValueExpression,d.CSSDocumentRule=a("./CSSDocumentRule").CSSDocumentRule},{"./CSSDocumentRule":9,"./CSSFontFaceRule":10,"./CSSImportRule":11,"./CSSKeyframeRule":12,"./CSSKeyframesRule":13,"./CSSMediaRule":14,"./CSSStyleDeclaration":16,"./CSSStyleRule":17,"./CSSStyleSheet":18,"./CSSValueExpression":20}],27:[function(a,b,c){"use strict";var d=a("./cssSupport"),e=function(a){var b=/^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/;return a.replace(b,"$1")};c.extractCssUrl=function(a){var b,c=/^url\(([^\)]+)\)/;if(!c.test(a))throw new Error("Invalid url");return b=c.exec(a)[1],d.unquoteString(e(b))};var f=function(a){var b,c="\\s*(?:\"[^\"]*\"|'[^']*'|[^\\(]+)\\s*",d="(url\\("+c+"\\)|[^,\\s]+)",e="(?:\\s*"+d+")+",f="^\\s*("+e+")(?:\\s*,\\s*("+e+"))*\\s*$",g=new RegExp(e,"g"),h=[],i=function(a){var b,c=new RegExp(d,"g"),e=[];for(b=c.exec(a);b;)e.push(b[1]),b=c.exec(a);return e};if(a.match(new RegExp(f))){for(b=g.exec(a);b;)h.push(i(b[0])),b=g.exec(a);return h}return[]},g=function(a){var b,d;for(b=0;b<a.length;b++)try{return d=c.extractCssUrl(a[b]),{url:d,idx:b}}catch(a){}};c.parse=function(a){var b=f(a);return b.map(function(a){var b=g(a);return b?{preUrl:a.slice(0,b.idx),url:b.url,postUrl:a.slice(b.idx+1)}:{preUrl:a}})},c.serialize=function(a){var b=a.map(function(a){var b=[].concat(a.preUrl);return a.url&&b.push('url("'+a.url+'")'),a.postUrl&&(b=b.concat(a.postUrl)),b.join(" ")});return b.join(", ")}},{"./cssSupport":28}],28:[function(a,b,c){"use strict";var d;try{d=a("cssom")}catch(a){}c.unquoteString=function(a){var b=/^"(.*)"$/,c=/^'(.*)'$/;return b.test(a)?a.replace(b,"$1"):c.test(a)?a.replace(c,"$1"):a};var e=function(a){var b,c=document.implementation.createHTMLDocument(""),d=document.createElement("style");return d.textContent=a,c.body.appendChild(d),b=d.sheet.cssRules,Array.prototype.slice.call(b)},f=function(){var a=e("a{background:url(i)}");return!a.length||a[0].cssText.indexOf("url()")>=0}(),g=function(){var a=e('@font-face { font-family: "f"; src: url("f"); }');return!a.length||/url\(['"]*\)/.test(a[0].cssText)}(),h=function(){var a=e("a{background:url(old)}");return a[0].style.setProperty("background","url(new)",""),a[0].style.getPropertyValue("background").indexOf("old")>=0}();c.rulesForCssText=function(a){return(f||g||h)&&d&&d.parse?d.parse(a).cssRules:e(a)},c.cssRulesToText=function(a){return a.reduce(function(a,b){return a+b.cssText},"")},c.exchangeRule=function(a,b,d){var e=a.indexOf(b);a[e]=c.rulesForCssText(d)[0]},c.changeFontFaceRuleSrc=function(a,b,d){var e="@font-face { font-family: "+b.style.getPropertyValue("font-family")+"; ";b.style.getPropertyValue("font-style")&&(e+="font-style: "+b.style.getPropertyValue("font-style")+"; "),b.style.getPropertyValue("font-weight")&&(e+="font-weight: "+b.style.getPropertyValue("font-weight")+"; "),e+="src: "+d+"}",c.exchangeRule(a,b,e)}},{cssom:25}],29:[function(a,b,c){"use strict";var d=a("./util"),e=a("./inlineImage"),f=a("./inlineScript"),g=a("./inlineCss"),h=a("./cssSupport"),i=function(a){return d.joinUrl(a,".")},j=function(a){var b=a.map(function(b,c){return c===a.length-1&&(b={baseUrl:i(b.baseUrl)}),JSON.stringify(b)});return b},k=function(a,b){return b.cache!==!1&&"none"!==b.cache&&b.cacheBucket?d.memoize(a,j,b.cacheBucket):a},l=function(a,b,c){var d=h.rulesForCssText(a);return g.loadCSSImportsForRules(d,b,c).then(function(b){return g.loadAndInlineCSSResourcesForRules(d,c).then(function(c){var e=b.errors.concat(c.errors),f=b.hasChanges||c.hasChanges;return f&&(a=h.cssRulesToText(d)),{hasChanges:f,content:a,errors:e}})})},m=function(a,b,c){var e=a.textContent,f=k(l,b);return f(e,c,b).then(function(b){return b.hasChanges&&(a.childNodes[0].nodeValue=b.content),d.cloneArray(b.errors)})},n=function(a){var b=a.getElementsByTagName("style");return Array.prototype.filter.call(b,function(a){return!a.attributes.type||"text/css"===a.attributes.type.value})};c.loadAndInlineStyles=function(a,b){var c,e=n(a),f=[],g=[];return c=d.clone(b),c.baseUrl=c.baseUrl||d.getDocumentBaseUrl(a),d.all(e.map(function(a){return m(a,c,g).then(function(a){f=f.concat(a)})})).then(function(){return f})};var o=function(a,b){var c,d=a.parentNode;b=b.trim(),b&&(c=a.ownerDocument.createElement("style"),c.type="text/css",c.appendChild(a.ownerDocument.createTextNode(b)),d.insertBefore(c,a)),d.removeChild(a)},p=function(a,b){return d.ajax(a,b).then(function(a){var b=h.rulesForCssText(a);return{content:a,cssRules:b}}).then(function(b){var c=g.adjustPathsOfCssResources(a,b.cssRules);return{content:b.content,cssRules:b.cssRules,hasChanges:c}}).then(function(a){return g.loadCSSImportsForRules(a.cssRules,[],b).then(function(b){return{content:a.content,cssRules:a.cssRules,hasChanges:a.hasChanges||b.hasChanges,errors:b.errors}})}).then(function(a){return g.loadAndInlineCSSResourcesForRules(a.cssRules,b).then(function(b){return{content:a.content,cssRules:a.cssRules,hasChanges:a.hasChanges||b.hasChanges,errors:a.errors.concat(b.errors)}})}).then(function(a){var b=a.content;return a.hasChanges&&(b=h.cssRulesToText(a.cssRules)),{content:b,errors:a.errors}})},q=function(a,b){var c=a.attributes.href.value,e=d.getDocumentBaseUrl(a.ownerDocument),f=d.clone(b);!f.baseUrl&&e&&(f.baseUrl=e);var g=k(p,b);return g(c,f).then(function(a){return{content:a.content,errors:d.cloneArray(a.errors)}})},r=function(a){var b=a.getElementsByTagName("link");return Array.prototype.filter.call(b,function(a){return a.attributes.rel&&"stylesheet"===a.attributes.rel.value&&(!a.attributes.type||"text/css"===a.attributes.type.value)})};c.loadAndInlineCssLinks=function(a,b){var c=r(a),e=[];return d.all(c.map(function(a){return q(a,b).then(function(b){o(a,b.content+"\n"),e=e.concat(b.errors)},function(a){e.push({resourceType:"stylesheet",url:a.url,msg:"Unable to load stylesheet "+a.url})})})).then(function(){return e})},c.loadAndInlineImages=e.inline,c.loadAndInlineScript=f.inline,c.inlineReferences=function(a,b){var e=[],f=[c.loadAndInlineImages,c.loadAndInlineStyles,c.loadAndInlineCssLinks];return b.inlineScripts!==!1&&f.push(c.loadAndInlineScript),d.all(f.map(function(c){return c(a,b).then(function(a){e=e.concat(a)})})).then(function(){return e})}},{"./cssSupport":28,"./inlineCss":30,"./inlineImage":31,"./inlineScript":32,"./util":33}],30:[function(a,b,c){"use strict";var d=a("ayepromise"),e=a("./util"),f=a("./cssSupport"),g=a("./backgroundValueParser"),h=a("css-font-face-src"),i=function(a,b,c){a.style.setProperty(b,c,a.style.getPropertyPriority(b))},j=function(a){return a.filter(function(a){return a.type===window.CSSRule.STYLE_RULE&&(a.style.getPropertyValue("background-image")||a.style.getPropertyValue("background"))})},k=function(a){var b=[];return a.forEach(function(a){a.style.getPropertyValue("background-image")?b.push({property:"background-image",value:a.style.getPropertyValue("background-image"),rule:a}):a.style.getPropertyValue("background")&&b.push({property:"background",value:a.style.getPropertyValue("background"),rule:a})}),b},l=function(a){return a.filter(function(a){return a.type===window.CSSRule.FONT_FACE_RULE&&a.style.getPropertyValue("src")})},m=function(a){return a.filter(function(a){return a.type===window.CSSRule.IMPORT_RULE&&a.href})},n=function(a){var b=[];return a.forEach(function(a,c){a.url&&!e.isDataUri(a.url)&&b.push(c)}),b},o=function(a){var b=[];return a.forEach(function(a,c){a.url&&!e.isDataUri(a.url)&&b.push(c)}),b};c.adjustPathsOfCssResources=function(a,b){var c=j(b),d=k(c),p=!1;return d.forEach(function(b){var c,d=g.parse(b.value),f=n(d);f.length>0&&(f.forEach(function(b){var c=d[b].url,f=e.joinUrl(a,c);d[b].url=f}),c=g.serialize(d),i(b.rule,b.property,c),p=!0)}),l(b).forEach(function(c){var d,g,i=c.style.getPropertyValue("src");try{d=h.parse(i)}catch(a){return}g=o(d),g.length>0&&(g.forEach(function(b){var c=d[b].url,f=e.joinUrl(a,c);d[b].url=f}),f.changeFontFaceRuleSrc(b,c,h.serialize(d)),p=!0)}),m(b).forEach(function(c){var d=c.href,g=e.joinUrl(a,d);f.exchangeRule(b,c,"@import url("+g+");"),p=!0}),p};var p=function(a,b,c){var d=a.indexOf(b);a.splice(d,1),c.forEach(function(b,c){a.splice(d+c,0,b)})},q=function(a){var b=d.defer();return b.resolve(a),b.promise},r=function(a,b,d,g){var h,i=b.href;return i=f.unquoteString(i),h=e.joinUrl(g.baseUrl,i),d.indexOf(h)>=0?(p(a,b,[]),q([])):(d.push(h),e.ajax(i,g).then(function(e){var h=f.rulesForCssText(e);return c.loadCSSImportsForRules(h,d,g).then(function(d){return c.adjustPathsOfCssResources(i,h),p(a,b,h),d.errors})},function(a){throw{resourceType:"stylesheet",url:a.url,msg:"Unable to load stylesheet "+a.url}}))};c.loadCSSImportsForRules=function(a,b,c){var d=m(a),f=[],g=!1;return e.all(d.map(function(d){return r(a,d,b,c).then(function(a){f=f.concat(a),g=!0},function(a){f.push(a)})})).then(function(){return{hasChanges:g,errors:f}})};var s=function(a,b){var c=g.parse(a),d=n(c),f=!1;return e.collectAndReportErrors(d.map(function(a){var d=c[a].url;return e.getDataURIForImageURL(d,b).then(function(b){c[a].url=b,f=!0},function(a){throw{resourceType:"backgroundImage",url:a.url,msg:"Unable to load background-image "+a.url}})})).then(function(a){return{backgroundValue:g.serialize(c),hasChanges:f,errors:a}})},t=function(a,b){var c=j(a),d=k(c),f=[],g=!1;return e.all(d.map(function(a){return s(a.value,b).then(function(b){b.hasChanges&&(i(a.rule,a.property,b.backgroundValue),g=!0),f=f.concat(b.errors)})})).then(function(){return{hasChanges:g,errors:f}})},u=function(a,b){var c,d,f=!1;try{c=h.parse(a)}catch(a){c=[]}return d=o(c),e.collectAndReportErrors(d.map(function(a){var d=c[a],g=d.format||"woff";return e.binaryAjax(d.url,b).then(function(a){var b=btoa(a);d.url="data:font/"+g+";base64,"+b,f=!0},function(a){throw{resourceType:"fontFace",url:a.url,msg:"Unable to load font-face "+a.url}})})).then(function(a){return{srcDeclarationValue:h.serialize(c),hasChanges:f,errors:a}})},v=function(a,b){var c=l(a),d=[],g=!1;return e.all(c.map(function(c){var e=c.style.getPropertyValue("src");return u(e,b).then(function(b){b.hasChanges&&(f.changeFontFaceRuleSrc(a,c,b.srcDeclarationValue),g=!0),d=d.concat(b.errors)})})).then(function(){return{hasChanges:g,errors:d}})};c.loadAndInlineCSSResourcesForRules=function(a,b){var c=!1,d=[];return e.all([t,v].map(function(e){return e(a,b).then(function(a){c=c||a.hasChanges,d=d.concat(a.errors)})})).then(function(){return{hasChanges:c,errors:d}})}},{"./backgroundValueParser":27,"./cssSupport":28,"./util":33,ayepromise:2,"css-font-face-src":6}],31:[function(a,b,c){"use strict";var d=a("./util"),e=function(a,b){var c=null;a.hasAttribute("src")?c=a.getAttribute("src"):a.hasAttributeNS("http://www.w3.org/1999/xlink","href")?c=a.getAttributeNS("http://www.w3.org/1999/xlink","href"):a.hasAttribute("href")&&(c=a.getAttribute("href"));var e=d.getDocumentBaseUrl(a.ownerDocument),f=d.clone(b);return!f.baseUrl&&e&&(f.baseUrl=e),d.getDataURIForImageURL(c,f).then(function(a){return a},function(a){throw{resourceType:"image",url:a.url,msg:"Unable to load image "+a.url}})},f=function(a){return a.filter(function(a){var b=null;return a.hasAttribute("src")?b=a.getAttribute("src"):a.hasAttributeNS("http://www.w3.org/1999/xlink","href")?b=a.getAttributeNS("http://www.w3.org/1999/xlink","href"):a.hasAttribute("href")&&(b=a.getAttribute("href")),null!==b&&!d.isDataUri(b)})},g=function(a){return Array.prototype.filter.call(a,function(a){return"image"===a.type})},h=function(a){return Array.prototype.slice.call(a)};c.inline=function(a,b){var c=h(a.getElementsByTagName("img")),i=h(a.getElementsByTagName("image")),j=g(a.getElementsByTagName("input"));c=c.concat(i),c=c.concat(j);var k=f(c);return d.collectAndReportErrors(k.map(function(a){return e(a,b).then(function(b){a.attributes.src?a.attributes.src.value=b:a.attributes["xlink:href"]?a.attributes["xlink:href"].value=b:a.attributes.href&&(a.attributes.href.value=b)})}))}},{"./util":33}],32:[function(a,b,c){"use strict";var d=a("./util"),e=function(a,b){var c=a.attributes.src.value,e=d.getDocumentBaseUrl(a.ownerDocument),f=d.clone(b);return!f.baseUrl&&e&&(f.baseUrl=e),d.ajax(c,f).fail(function(a){throw{resourceType:"script",url:a.url,msg:"Unable to load script "+a.url}})},f=function(a){return a.replace(/<\//g,"<\\/")},g=function(a,b){a.attributes.removeNamedItem("src"),a.textContent=f(b)},h=function(a){var b=a.getElementsByTagName("script");return Array.prototype.filter.call(b,function(a){return!!a.attributes.src})};c.inline=function(a,b){var c=h(a);return d.collectAndReportErrors(c.map(function(a){return e(a,b).then(function(b){g(a,b)})}))}},{"./util":33
}],33:[function(a,b,c){"use strict";var d=a("url"),e=a("ayepromise");c.getDocumentBaseUrl=function(a){return"about:blank"!==a.baseURI?a.baseURI:null},c.clone=function(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);return c},c.cloneArray=function(a){return Array.prototype.slice.apply(a,[0])},c.joinUrl=function(a,b){return a?d.resolve(a,b):b},c.isDataUri=function(a){return/^data:/.test(a)},c.all=function(a){var b=e.defer(),c=a.length,d=[];return 0===a.length?(b.resolve([]),b.promise):(a.forEach(function(a,e){a.then(function(a){c-=1,d[e]=a,0===c&&b.resolve(d)},function(a){b.reject(a)})}),b.promise)},c.collectAndReportErrors=function(a){var b=[];return c.all(a.map(function(a){return a.fail(function(a){b.push(a)})})).then(function(){return b})};var f=null,g=function(a,b){return b===!1||"none"===b||"repeated"===b?(null!==f&&"repeated"===b||(f=Date.now()),a+"?_="+f):a};c.ajax=function(a,b){var d,f=new window.XMLHttpRequest,h=e.defer(),i=c.joinUrl(b.baseUrl,a),j=function(){h.reject({msg:"Unable to load url",url:i})};d=g(i,b.cache),f.addEventListener("load",function(){200===f.status||0===f.status?h.resolve(f.response):j()},!1),f.addEventListener("error",j,!1);try{f.open("GET",d,!0),f.overrideMimeType(b.mimeType),f.send(null)}catch(a){j()}return h.promise},c.binaryAjax=function(a,b){var d=c.clone(b);return d.mimeType="text/plain; charset=x-user-defined",c.ajax(a,d).then(function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(255&a.charCodeAt(c));return b})};var h=function(a){var b=function(a,b){return a.substring(0,b.length)===b};return b(a,"<?xml")||b(a,"<svg")?"image/svg+xml":"image/png"};c.getDataURIForImageURL=function(a,b){return c.binaryAjax(a,b).then(function(a){var b=btoa(a),c=h(a);return"data:"+c+";base64,"+b})};var i=[],j=function(a){return i.indexOf(a)<0&&i.push(a),i.indexOf(a)};c.memoize=function(a,b,c){if("object"!=typeof c)throw new Error("cacheBucket is not an object");return function(){var d,e=Array.prototype.slice.call(arguments),f=b(e),g=j(a);return c[g]&&c[g][f]?c[g][f]:(d=a.apply(null,e),c[g]=c[g]||{},c[g][f]=d,d)}}},{ayepromise:2,url:3}],34:[function(b,c,d){(function(b){!function(e){function f(a){throw RangeError(I[a])}function g(a,b){for(var c=a.length,d=[];c--;)d[c]=b(a[c]);return d}function h(a,b){var c=a.split("@"),d="";c.length>1&&(d=c[0]+"@",a=c[1]),a=a.replace(H,".");var e=a.split("."),f=g(e,b).join(".");return d+f}function i(a){for(var b,c,d=[],e=0,f=a.length;e<f;)b=a.charCodeAt(e++),b>=55296&&b<=56319&&e<f?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function j(a){return g(a,function(a){var b="";return a>65535&&(a-=65536,b+=L(a>>>10&1023|55296),a=56320|1023&a),b+=L(a)}).join("")}function k(a){return a-48<10?a-22:a-65<26?a-65:a-97<26?a-97:x}function l(a,b){return a+22+75*(a<26)-((0!=b)<<5)}function m(a,b,c){var d=0;for(a=c?K(a/B):a>>1,a+=K(a/b);a>J*z>>1;d+=x)a=K(a/J);return K(d+(J+1)*a/(a+A))}function n(a){var b,c,d,e,g,h,i,l,n,o,p=[],q=a.length,r=0,s=D,t=C;for(c=a.lastIndexOf(E),c<0&&(c=0),d=0;d<c;++d)a.charCodeAt(d)>=128&&f("not-basic"),p.push(a.charCodeAt(d));for(e=c>0?c+1:0;e<q;){for(g=r,h=1,i=x;e>=q&&f("invalid-input"),l=k(a.charCodeAt(e++)),(l>=x||l>K((w-r)/h))&&f("overflow"),r+=l*h,n=i<=t?y:i>=t+z?z:i-t,!(l<n);i+=x)o=x-n,h>K(w/o)&&f("overflow"),h*=o;b=p.length+1,t=m(r-g,b,0==g),K(r/b)>w-s&&f("overflow"),s+=K(r/b),r%=b,p.splice(r++,0,s)}return j(p)}function o(a){var b,c,d,e,g,h,j,k,n,o,p,q,r,s,t,u=[];for(a=i(a),q=a.length,b=D,c=0,g=C,h=0;h<q;++h)p=a[h],p<128&&u.push(L(p));for(d=e=u.length,e&&u.push(E);d<q;){for(j=w,h=0;h<q;++h)p=a[h],p>=b&&p<j&&(j=p);for(r=d+1,j-b>K((w-c)/r)&&f("overflow"),c+=(j-b)*r,b=j,h=0;h<q;++h)if(p=a[h],p<b&&++c>w&&f("overflow"),p==b){for(k=c,n=x;o=n<=g?y:n>=g+z?z:n-g,!(k<o);n+=x)t=k-o,s=x-o,u.push(L(l(o+t%s,0))),k=K(t/s);u.push(L(l(k,0))),g=m(c,r,d==e),c=0,++d}++c,++b}return u.join("")}function p(a){return h(a,function(a){return F.test(a)?n(a.slice(4).toLowerCase()):a})}function q(a){return h(a,function(a){return G.test(a)?"xn--"+o(a):a})}var r="object"==typeof d&&d&&!d.nodeType&&d,s="object"==typeof c&&c&&!c.nodeType&&c,t="object"==typeof b&&b;t.global!==t&&t.window!==t&&t.self!==t||(e=t);var u,v,w=2147483647,x=36,y=1,z=26,A=38,B=700,C=72,D=128,E="-",F=/^xn--/,G=/[^\x20-\x7E]/,H=/[\x2E\u3002\uFF0E\uFF61]/g,I={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},J=x-y,K=Math.floor,L=String.fromCharCode;if(u={version:"1.3.2",ucs2:{decode:i,encode:j},decode:n,encode:o,toASCII:q,toUnicode:p},"function"==typeof a&&"object"==typeof a.amd&&a.amd)a("punycode",function(){return u});else if(r&&s)if(c.exports==r)s.exports=u;else for(v in u)u.hasOwnProperty(v)&&(r[v]=u[v]);else e.punycode=u}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],35:[function(a,b,c){"use strict";function d(a,b){return Object.prototype.hasOwnProperty.call(a,b)}b.exports=function(a,b,c,f){b=b||"&",c=c||"=";var g={};if("string"!=typeof a||0===a.length)return g;var h=/\+/g;a=a.split(b);var i=1e3;f&&"number"==typeof f.maxKeys&&(i=f.maxKeys);var j=a.length;i>0&&j>i&&(j=i);for(var k=0;k<j;++k){var l,m,n,o,p=a[k].replace(h,"%20"),q=p.indexOf(c);q>=0?(l=p.substr(0,q),m=p.substr(q+1)):(l=p,m=""),n=decodeURIComponent(l),o=decodeURIComponent(m),d(g,n)?e(g[n])?g[n].push(o):g[n]=[g[n],o]:g[n]=o}return g};var e=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)}},{}],36:[function(a,b,c){"use strict";function d(a,b){if(a.map)return a.map(b);for(var c=[],d=0;d<a.length;d++)c.push(b(a[d],d));return c}var e=function(a){switch(typeof a){case"string":return a;case"boolean":return a?"true":"false";case"number":return isFinite(a)?a:"";default:return""}};b.exports=function(a,b,c,h){return b=b||"&",c=c||"=",null===a&&(a=void 0),"object"==typeof a?d(g(a),function(g){var h=encodeURIComponent(e(g))+c;return f(a[g])?d(a[g],function(a){return h+encodeURIComponent(e(a))}).join(b):h+encodeURIComponent(e(a[g]))}).join(b):h?encodeURIComponent(e(h))+c+encodeURIComponent(e(a)):""};var f=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},g=Object.keys||function(a){var b=[];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}},{}],37:[function(a,b,c){"use strict";c.decode=c.parse=a("./decode"),c.encode=c.stringify=a("./encode")},{"./decode":35,"./encode":36}],38:[function(a,b,c){"use strict";var d=function(a){var b=new XMLSerializer;return Array.prototype.map.call(a.childNodes,function(a){return b.serializeToString(a)}).join("")},e=function(a){return"parsererror"===a.documentElement.tagName&&"http://www.mozilla.org/newlayout/xml/parsererror.xml"===a.documentElement.namespaceURI?a.documentElement:("xml"===a.documentElement.tagName||"html"===a.documentElement.tagName)&&a.documentElement.childNodes&&a.documentElement.childNodes.length>0&&"parsererror"===a.documentElement.childNodes[0].nodeName?a.documentElement.childNodes[0]:"html"===a.documentElement.tagName&&a.documentElement.childNodes&&a.documentElement.childNodes.length>0&&"body"===a.documentElement.childNodes[0].nodeName&&a.documentElement.childNodes[0].childNodes&&a.documentElement.childNodes[0].childNodes.length&&"parsererror"===a.documentElement.childNodes[0].childNodes[0].nodeName?a.documentElement.childNodes[0].childNodes[0]:void 0},f=[new RegExp("^<h3[^>]*>This page contains the following errors:</h3><div[^>]*>(.+?)\n?</div>"),new RegExp("^(.+)\n")],g=function(a){var b,c,e=d(a);for(b=0;b<f.length;b++)if(c=f[b].exec(e))return c[1]},h=function(a){var b;if(null===a)throw new Error("Parse error");var c=e(a);if(void 0!==c)throw b=g(c)||"Parse error",new Error(b)};c.failOnParseError=function(a){return h(a),a}},{}],39:[function(a,b,c){var d=function(a){return a.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,"")},e=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},f=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},g=function(a){var b=a.value;return" "+a.name+'="'+e(b)+'"'},h=function(a){var b=a.tagName;return"http://www.w3.org/1999/xhtml"===a.namespaceURI&&(b=b.toLowerCase()),b},i=function(a,b){var c=Array.prototype.map.call(a.attributes||a.attrs,function(a){return a.name}).indexOf("xmlns")>=0;return c||!b&&a.namespaceURI===a.parentNode.namespaceURI?"":' xmlns="'+a.namespaceURI+'"'},j=function(a){return Array.prototype.map.call(a.childNodes,function(a){return o(a)}).join("")},k=function(a,b){var c="<"+h(a);return c+=i(a,b),Array.prototype.forEach.call(a.attributes||a.attrs,function(a){c+=g(a)}),a.childNodes.length>0?(c+=">",c+=j(a),c+="</"+h(a)+">"):c+="/>",c},l=function(a){var b=a.nodeValue||a.value||"";return f(b)},m=function(a){return"<!--"+a.data.replace(/-/g,"&#45;")+"-->"},n=function(a){return"<![CDATA["+a.nodeValue+"]]>"},o=function(a,b){var c=b&&b.rootNode;return"#document"===a.nodeName||"#document-fragment"===a.nodeName?j(a):a.tagName?k(a,c):"#text"===a.nodeName?l(a):"#comment"===a.nodeName?m(a):"#cdata-section"===a.nodeName?n(a):void 0};c.serializeToString=function(a){return d(o(a,{rootNode:!0}))}},{}]},{},[1])(1)});
define('subapp/news/shareimg',['libs/Class', 'libs/rasterizehtml', 'jquery'], function(Class, rasterizeHTML, $){
    var ShareImg = Class.extend({
        init: function(){
            if(!$('.shareimg').length) return ;
            $('.shareimg').click(function(){
                var tar = $(this).parents('.entry');
                var html = tar.html().replace(/style="display:none"/g, '');
                html += $('#rasterize-style').html();

                tar.find('i.shareimg-loading').css('display', 'inline-block');
                rasterizeHTML.drawHTML(html).then(function(data){

                    svgString2Image(data.image, 'png', downloadPng);

                    function svgString2Image(svgData, format, callback) {
                        format = format ? format : 'png';
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.width = svgData.width;
                        canvas.height = svgData.height;
                        var image = new Image();
                        image.onload = function () {
                            context.clearRect(0, 0, svgData.width, svgData.height);
                            context.drawImage(image, 0, 0, svgData.width, svgData.height);
                            var pngData = canvas.toDataURL('image/' + format, 0.6);
                            callback(pngData);
                        };
                        image.src = svgData.src;
                    }

                    function downloadPng(dataURL){
                        var title = $('.news-title', tar).html().trim();
                        $('<a class="download-img"></a>').attr('href', dataURL).attr('download', title)
                            .appendTo('.news-info', tar);
                        var download = document.querySelector('.download-img');
                        download.click();
                        $(download).remove();
                        tar.find('i.shareimg-loading').css('display', 'none');
                    }

                });
            });
        }
    });
    return ShareImg;
});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

define("bootstrap", ["jquery"], function(){});

/*
 Highstock JS v6.0.2 (2017-10-20)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(Q,L){"object"===typeof module&&module.exports?module.exports=Q.document?L(Q):L:Q.Highcharts=L(Q)})("undefined"!==typeof window?window:this,function(Q){var L=function(){var a=Q.document,E=Q.navigator&&Q.navigator.userAgent||"",D=a&&a.createElementNS&&!!a.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(E)&&!Q.opera,t=/Firefox/.test(E),l=t&&4>parseInt(E.split("Firefox/")[1],10);return Q.Highcharts?Q.Highcharts.error(16,!0):{product:"Highstock",
version:"6.0.2",deg2rad:2*Math.PI/360,doc:a,hasBidiBug:l,hasTouch:a&&void 0!==a.documentElement.ontouchstart,isMS:F,isWebKit:/AppleWebKit/.test(E),isFirefox:t,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(E),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:D,win:Q,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){a.timers=[];var E=a.charts,D=a.doc,F=a.win;a.error=function(t,l){t=a.isNumber(t)?"Highcharts error #"+
t+": www.highcharts.com/errors/"+t:t;if(l)throw Error(t);F.console&&console.log(t)};a.Fx=function(a,l,p){this.options=l;this.elem=a;this.prop=p};a.Fx.prototype={dSetter:function(){var a=this.paths[0],l=this.paths[1],p=[],z=this.now,q=a.length,u;if(1===z)p=this.toD;else if(q===l.length&&1>z)for(;q--;)u=parseFloat(a[q]),p[q]=isNaN(u)?a[q]:z*parseFloat(l[q]-u)+u;else p=l;this.elem.attr("d",p,null,!0)},update:function(){var a=this.elem,l=this.prop,p=this.now,z=this.options.step;if(this[l+"Setter"])this[l+
"Setter"]();else a.attr?a.element&&a.attr(l,p,null,!0):a.style[l]=p+this.unit;z&&z.call(a,p,this)},run:function(t,l,p){var z=this,q=z.options,u=function(a){return u.stopped?!1:z.step(a)},B=F.requestAnimationFrame||function(a){setTimeout(a,13)},e=function(){a.timers=a.grep(a.timers,function(a){return a()});a.timers.length&&B(e)};t===l?(delete q.curAnim[this.prop],q.complete&&0===a.keys(q.curAnim).length&&q.complete()):(this.startTime=+new Date,this.start=t,this.end=l,this.unit=p,this.now=this.start,
this.pos=0,u.elem=this.elem,u.prop=this.prop,u()&&1===a.timers.push(u)&&B(e))},step:function(t){var l=+new Date,p,z=this.options,q=this.elem,u=z.complete,B=z.duration,e=z.curAnim;q.attr&&!q.element?t=!1:t||l>=B+this.startTime?(this.now=this.end,this.pos=1,this.update(),p=e[this.prop]=!0,a.objectEach(e,function(a){!0!==a&&(p=!1)}),p&&u&&u.call(q),t=!1):(this.pos=z.easing((l-this.startTime)/B),this.now=this.start+(this.end-this.start)*this.pos,this.update(),t=!0);return t},initPath:function(t,l,p){function z(a){var b,
c;for(m=a.length;m--;)b="M"===a[m]||"L"===a[m],c=/[a-zA-Z]/.test(a[m+3]),b&&c&&a.splice(m+1,0,a[m+1],a[m+2],a[m+1],a[m+2])}function q(a,w){for(;a.length<b;){a[0]=w[b-a.length];var f=a.slice(0,c);[].splice.apply(a,[0,0].concat(f));r&&(f=a.slice(a.length-c),[].splice.apply(a,[a.length,0].concat(f)),m--)}a[0]="M"}function u(a,m){for(var f=(b-a.length)/c;0<f&&f--;)w=a.slice().splice(a.length/C-c,c*C),w[0]=m[b-c-f*c],g&&(w[c-6]=w[c-2],w[c-5]=w[c-1]),[].splice.apply(a,[a.length/C,0].concat(w)),r&&f--}l=
l||"";var B,e=t.startX,h=t.endX,g=-1<l.indexOf("C"),c=g?7:3,b,w,m;l=l.split(" ");p=p.slice();var r=t.isArea,C=r?2:1,H;g&&(z(l),z(p));if(e&&h){for(m=0;m<e.length;m++)if(e[m]===h[0]){B=m;break}else if(e[0]===h[h.length-e.length+m]){B=m;H=!0;break}void 0===B&&(l=[])}l.length&&a.isNumber(B)&&(b=p.length+B*C*c,H?(q(l,p),u(p,l)):(q(p,l),u(l,p)));return[l,p]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),
null,!0)};a.extend=function(a,l){var p;a||(a={});for(p in l)a[p]=l[p];return a};a.merge=function(){var t,l=arguments,p,z={},q=function(u,p){"object"!==typeof u&&(u={});a.objectEach(p,function(e,h){!a.isObject(e,!0)||a.isClass(e)||a.isDOMElement(e)?u[h]=p[h]:u[h]=q(u[h]||{},e)});return u};!0===l[0]&&(z=l[1],l=Array.prototype.slice.call(l,2));p=l.length;for(t=0;t<p;t++)z=q(z,l[t]);return z};a.pInt=function(a,l){return parseInt(a,l||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=
Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(t,l){return!!t&&"object"===typeof t&&(!l||!a.isArray(t))};a.isDOMElement=function(t){return a.isObject(t)&&"number"===typeof t.nodeType};a.isClass=function(t){var l=t&&t.constructor;return!(!a.isObject(t,!0)||a.isDOMElement(t)||!l||!l.name||"Object"===l.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,l){for(var p=a.length;p--;)if(a[p]===l){a.splice(p,
1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(t,l,p){var z;a.isString(l)?a.defined(p)?t.setAttribute(l,p):t&&t.getAttribute&&(z=t.getAttribute(l)):a.defined(l)&&a.isObject(l)&&a.objectEach(l,function(a,p){t.setAttribute(p,a)});return z};a.splat=function(t){return a.isArray(t)?t:[t]};a.syncTimeout=function(a,l,p){if(l)return setTimeout(a,l,p);a.call(0,p)};a.pick=function(){var a=arguments,l,p,z=a.length;for(l=0;l<z;l++)if(p=a[l],void 0!==p&&null!==p)return p};a.css=
function(t,l){a.isMS&&!a.svg&&l&&void 0!==l.opacity&&(l.filter="alpha(opacity\x3d"+100*l.opacity+")");a.extend(t.style,l)};a.createElement=function(t,l,p,z,q){t=D.createElement(t);var u=a.css;l&&a.extend(t,l);q&&u(t,{padding:0,border:"none",margin:0});p&&u(t,p);z&&z.appendChild(t);return t};a.extendClass=function(t,l){var p=function(){};p.prototype=new t;a.extend(p.prototype,l);return p};a.pad=function(a,l,p){return Array((l||2)+1-String(a).length).join(p||0)+a};a.relativeLength=function(a,l,p){return/%$/.test(a)?
l*parseFloat(a)/100+(p||0):parseFloat(a)};a.wrap=function(a,l,p){var t=a[l];a[l]=function(){var a=Array.prototype.slice.call(arguments),u=arguments,B=this;B.proceed=function(){t.apply(B,arguments.length?arguments:u)};a.unshift(t);a=p.apply(this,a);B.proceed=null;return a}};a.getTZOffset=function(t){var l=a.Date;return 6E4*(l.hcGetTimezoneOffset&&l.hcGetTimezoneOffset(t)||l.hcTimezoneOffset||0)};a.dateFormat=function(t,l,p){if(!a.defined(l)||isNaN(l))return a.defaultOptions.lang.invalidDate||"";t=
a.pick(t,"%Y-%m-%d %H:%M:%S");var z=a.Date,q=new z(l-a.getTZOffset(l)),u=q[z.hcGetHours](),B=q[z.hcGetDay](),e=q[z.hcGetDate](),h=q[z.hcGetMonth](),g=q[z.hcGetFullYear](),c=a.defaultOptions.lang,b=c.weekdays,w=c.shortWeekdays,m=a.pad,z=a.extend({a:w?w[B]:b[B].substr(0,3),A:b[B],d:m(e),e:m(e,2," "),w:B,b:c.shortMonths[h],B:c.months[h],m:m(h+1),y:g.toString().substr(2,2),Y:g,H:m(u),k:u,I:m(u%12||12),l:u%12||12,M:m(q[z.hcGetMinutes]()),p:12>u?"AM":"PM",P:12>u?"am":"pm",S:m(q.getSeconds()),L:m(Math.round(l%
1E3),3)},a.dateFormats);a.objectEach(z,function(a,b){for(;-1!==t.indexOf("%"+b);)t=t.replace("%"+b,"function"===typeof a?a(l):a)});return p?t.substr(0,1).toUpperCase()+t.substr(1):t};a.formatSingle=function(t,l){var p=/\.([0-9])/,z=a.defaultOptions.lang;/f$/.test(t)?(p=(p=t.match(p))?p[1]:-1,null!==l&&(l=a.numberFormat(l,p,z.decimalPoint,-1<t.indexOf(",")?z.thousandsSep:""))):l=a.dateFormat(t,l);return l};a.format=function(t,l){for(var p="{",z=!1,q,u,B,e,h=[],g;t;){p=t.indexOf(p);if(-1===p)break;
q=t.slice(0,p);if(z){q=q.split(":");u=q.shift().split(".");e=u.length;g=l;for(B=0;B<e;B++)g&&(g=g[u[B]]);q.length&&(g=a.formatSingle(q.join(":"),g));h.push(g)}else h.push(q);t=t.slice(p+1);p=(z=!z)?"}":"{"}h.push(t);return h.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(t,l,p,z,q){var u,B=t;p=a.pick(p,1);u=t/p;l||(l=q?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===z&&(1===p?l=a.grep(l,function(a){return 0===a%1}):.1>=
p&&(l=[1/p])));for(z=0;z<l.length&&!(B=l[z],q&&B*p>=t||!q&&u<=(l[z]+(l[z+1]||l[z]))/2);z++);return B=a.correctFloat(B*p,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,l){var p=a.length,t,q;for(q=0;q<p;q++)a[q].safeI=q;a.sort(function(a,q){t=l(a,q);return 0===t?a.safeI-q.safeI:t});for(q=0;q<p;q++)delete a[q].safeI};a.arrayMin=function(a){for(var l=a.length,p=a[0];l--;)a[l]<p&&(p=a[l]);return p};a.arrayMax=function(a){for(var l=a.length,p=a[0];l--;)a[l]>p&&(p=a[l]);return p};a.destroyObjectProperties=
function(t,l){a.objectEach(t,function(a,z){a&&a!==l&&a.destroy&&a.destroy();delete t[z]})};a.discardElement=function(t){var l=a.garbageBin;l||(l=a.createElement("div"));t&&l.appendChild(t);l.innerHTML=""};a.correctFloat=function(a,l){return parseFloat(a.toPrecision(l||14))};a.setAnimation=function(t,l){l.renderer.globalAnimation=a.pick(t,l.options.chart.animation,!0)};a.animObject=function(t){return a.isObject(t)?a.merge(t):{duration:t?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,
day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(t,l,p,z){t=+t||0;l=+l;var q=a.defaultOptions.lang,u=(t.toString().split(".")[1]||"").split("e")[0].length,B,e,h=t.toString().split("e");-1===l?l=Math.min(u,20):a.isNumber(l)||(l=2);e=(Math.abs(h[1]?h[0]:t)+Math.pow(10,-Math.max(l,u)-1)).toFixed(l);u=String(a.pInt(e));B=3<u.length?u.length%3:0;p=a.pick(p,q.decimalPoint);z=a.pick(z,q.thousandsSep);t=(0>t?"-":"")+(B?u.substr(0,B)+z:"");t+=u.substr(B).replace(/(\d{3})(?=\d)/g,
"$1"+z);l&&(t+=p+e.slice(-l));h[1]&&(t+="e"+h[1]);return t};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(t,l,p){if("width"===l)return Math.min(t.offsetWidth,t.scrollWidth)-a.getStyle(t,"padding-left")-a.getStyle(t,"padding-right");if("height"===l)return Math.min(t.offsetHeight,t.scrollHeight)-a.getStyle(t,"padding-top")-a.getStyle(t,"padding-bottom");F.getComputedStyle||a.error(27,!0);if(t=F.getComputedStyle(t,void 0))t=t.getPropertyValue(l),a.pick(p,"opacity"!==
l)&&(t=a.pInt(t));return t};a.inArray=function(t,l){return(a.indexOfPolyfill||Array.prototype.indexOf).call(l,t)};a.grep=function(t,l){return(a.filterPolyfill||Array.prototype.filter).call(t,l)};a.find=Array.prototype.find?function(a,l){return a.find(l)}:function(a,l){var p,z=a.length;for(p=0;p<z;p++)if(l(a[p],p))return a[p]};a.map=function(a,l){for(var p=[],z=0,q=a.length;z<q;z++)p[z]=l.call(a[z],a[z],z,a);return p};a.keys=function(t){return(a.keysPolyfill||Object.keys).call(void 0,t)};a.reduce=
function(t,l,p){return(a.reducePolyfill||Array.prototype.reduce).call(t,l,p)};a.offset=function(a){var l=D.documentElement;a=a.parentElement?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(F.pageYOffset||l.scrollTop)-(l.clientTop||0),left:a.left+(F.pageXOffset||l.scrollLeft)-(l.clientLeft||0)}};a.stop=function(t,l){for(var p=a.timers.length;p--;)a.timers[p].elem!==t||l&&l!==a.timers[p].prop||(a.timers[p].stopped=!0)};a.each=function(t,l,p){return(a.forEachPolyfill||Array.prototype.forEach).call(t,
l,p)};a.objectEach=function(a,l,p){for(var z in a)a.hasOwnProperty(z)&&l.call(p,a[z],z,a)};a.addEvent=function(t,l,p){var z=t.hcEvents=t.hcEvents||{},q=t.addEventListener||a.addEventListenerPolyfill;q&&q.call(t,l,p,!1);z[l]||(z[l]=[]);z[l].push(p);return function(){a.removeEvent(t,l,p)}};a.removeEvent=function(t,l,p){function z(e,g){var c=t.removeEventListener||a.removeEventListenerPolyfill;c&&c.call(t,e,g,!1)}function q(){var e,g;t.nodeName&&(l?(e={},e[l]=!0):e=B,a.objectEach(e,function(a,b){if(B[b])for(g=
B[b].length;g--;)z(b,B[b][g])}))}var u,B=t.hcEvents,e;B&&(l?(u=B[l]||[],p?(e=a.inArray(p,u),-1<e&&(u.splice(e,1),B[l]=u),z(l,p)):(q(),B[l]=[])):(q(),t.hcEvents={}))};a.fireEvent=function(t,l,p,z){var q;q=t.hcEvents;var u,B;p=p||{};if(D.createEvent&&(t.dispatchEvent||t.fireEvent))q=D.createEvent("Events"),q.initEvent(l,!0,!0),a.extend(q,p),t.dispatchEvent?t.dispatchEvent(q):t.fireEvent(l,q);else if(q)for(q=q[l]||[],u=q.length,p.target||a.extend(p,{preventDefault:function(){p.defaultPrevented=!0},target:t,
type:l}),l=0;l<u;l++)(B=q[l])&&!1===B.call(t,p)&&p.preventDefault();z&&!p.defaultPrevented&&z(p)};a.animate=function(t,l,p){var z,q="",u,B,e;a.isObject(p)||(e=arguments,p={duration:e[2],easing:e[3],complete:e[4]});a.isNumber(p.duration)||(p.duration=400);p.easing="function"===typeof p.easing?p.easing:Math[p.easing]||Math.easeInOutSine;p.curAnim=a.merge(l);a.objectEach(l,function(e,g){a.stop(t,g);B=new a.Fx(t,p,g);u=null;"d"===g?(B.paths=B.initPath(t,t.d,l.d),B.toD=l.d,z=0,u=1):t.attr?z=t.attr(g):
(z=parseFloat(a.getStyle(t,g))||0,"opacity"!==g&&(q="px"));u||(u=e);u&&u.match&&u.match("px")&&(u=u.replace(/px/g,""));B.run(z,u,q)})};a.seriesType=function(t,l,p,z,q){var u=a.getOptions(),B=a.seriesTypes;u.plotOptions[t]=a.merge(u.plotOptions[l],p);B[t]=a.extendClass(B[l]||function(){},z);B[t].prototype.type=t;q&&(B[t].prototype.pointClass=a.extendClass(a.Point,q));return B[t]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),l=0;return function(){return"highcharts-"+a+"-"+
l++}}();F.jQuery&&(F.jQuery.fn.highcharts=function(){var t=[].slice.call(arguments);if(this[0])return t[0]?(new (a[a.isString(t[0])?t.shift():"Chart"])(this[0],t[0],t[1]),this):E[a.attr(this[0],"data-highcharts-chart")]})})(L);(function(a){var E=a.each,D=a.isNumber,F=a.map,t=a.merge,l=a.pInt;a.Color=function(p){if(!(this instanceof a.Color))return new a.Color(p);this.init(p)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
parse:function(a){return[l(a[1]),l(a[2]),l(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[l(a[1]),l(a[2]),l(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(p){var l,q,u,B;if((this.input=p=this.names[p&&p.toLowerCase?p.toLowerCase():""]||p)&&p.stops)this.stops=F(p.stops,function(e){return new a.Color(e[1])});else if(p&&p.charAt&&"#"===p.charAt()&&(l=p.length,p=parseInt(p.substr(1),
16),7===l?q=[(p&16711680)>>16,(p&65280)>>8,p&255,1]:4===l&&(q=[(p&3840)>>4|(p&3840)>>8,(p&240)>>4|p&240,(p&15)<<4|p&15,1])),!q)for(u=this.parsers.length;u--&&!q;)B=this.parsers[u],(l=B.regex.exec(p))&&(q=B.parse(l));this.rgba=q||[]},get:function(a){var p=this.input,q=this.rgba,u;this.stops?(u=t(p),u.stops=[].concat(u.stops),E(this.stops,function(q,e){u.stops[e]=[u.stops[e][0],q.get(a)]})):u=q&&D(q[0])?"rgb"===a||!a&&1===q[3]?"rgb("+q[0]+","+q[1]+","+q[2]+")":"a"===a?q[3]:"rgba("+q.join(",")+")":p;
return u},brighten:function(a){var p,q=this.rgba;if(this.stops)E(this.stops,function(q){q.brighten(a)});else if(D(a)&&0!==a)for(p=0;3>p;p++)q[p]+=l(255*a),0>q[p]&&(q[p]=0),255<q[p]&&(q[p]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,l){var q=this.rgba,u=a.rgba;u.length&&q&&q.length?(a=1!==u[3]||1!==q[3],l=(a?"rgba(":"rgb(")+Math.round(u[0]+(q[0]-u[0])*(1-l))+","+Math.round(u[1]+(q[1]-u[1])*(1-l))+","+Math.round(u[2]+(q[2]-u[2])*(1-l))+(a?","+(u[3]+(q[3]-
u[3])*(1-l)):"")+")"):l=a.input||"none";return l}};a.color=function(p){return new a.Color(p)}})(L);(function(a){var E,D,F=a.addEvent,t=a.animate,l=a.attr,p=a.charts,z=a.color,q=a.css,u=a.createElement,B=a.defined,e=a.deg2rad,h=a.destroyObjectProperties,g=a.doc,c=a.each,b=a.extend,w=a.erase,m=a.grep,r=a.hasTouch,C=a.inArray,H=a.isArray,A=a.isFirefox,K=a.isMS,f=a.isObject,x=a.isString,J=a.isWebKit,v=a.merge,d=a.noop,n=a.objectEach,G=a.pick,k=a.pInt,y=a.removeEvent,P=a.stop,M=a.svg,O=a.SVG_NS,N=a.symbolSizes,
R=a.win;E=a.SVGElement=function(){return this};b(E.prototype,{opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,k){this.element="span"===k?u(k):g.createElementNS(this.SVG_NS,k);this.renderer=a},animate:function(I,k,y){k=a.animObject(G(k,this.renderer.globalAnimation,!0));0!==k.duration?(y&&(k.complete=y),t(this,I,k)):(this.attr(I,null,y),k.step&&k.step.call(this));return this},
colorGradient:function(I,k,y){var d=this.renderer,b,f,m,r,M,w,S,g,e,C,G=[],x;I.radialGradient?f="radialGradient":I.linearGradient&&(f="linearGradient");f&&(m=I[f],M=d.gradients,S=I.stops,C=y.radialReference,H(m)&&(I[f]=m={x1:m[0],y1:m[1],x2:m[2],y2:m[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===f&&C&&!B(m.gradientUnits)&&(r=m,m=v(m,d.getRadialAttr(C,r),{gradientUnits:"userSpaceOnUse"})),n(m,function(a,I){"id"!==I&&G.push(I,a)}),n(S,function(a){G.push(a)}),G=G.join(","),M[G]?C=M[G].attr("id"):
(m.id=C=a.uniqueKey(),M[G]=w=d.createElement(f).attr(m).add(d.defs),w.radAttr=r,w.stops=[],c(S,function(I){0===I[1].indexOf("rgba")?(b=a.color(I[1]),g=b.get("rgb"),e=b.get("a")):(g=I[1],e=1);I=d.createElement("stop").attr({offset:I[0],"stop-color":g,"stop-opacity":e}).add(w);w.stops.push(I)})),x="url("+d.url+"#"+C+")",y.setAttribute(k,x),y.gradient=G,I.toString=function(){return x})},applyTextOutline:function(I){var k=this.element,y,d,b,n,f;-1!==I.indexOf("contrast")&&(I=I.replace(/contrast/g,this.renderer.getContrast(k.style.fill)));
I=I.split(" ");d=I[I.length-1];if((b=I[0])&&"none"!==b&&a.svg){this.fakeTS=!0;I=[].slice.call(k.getElementsByTagName("tspan"));this.ySetter=this.xSetter;b=b.replace(/(^[\d\.]+)(.*?)$/g,function(a,I,k){return 2*I+k});for(f=I.length;f--;)y=I[f],"highcharts-text-outline"===y.getAttribute("class")&&w(I,k.removeChild(y));n=k.firstChild;c(I,function(a,I){0===I&&(a.setAttribute("x",k.getAttribute("x")),I=k.getAttribute("y"),a.setAttribute("y",I||0),null===I&&k.setAttribute("y",0));a=a.cloneNode(1);l(a,{"class":"highcharts-text-outline",
fill:d,stroke:d,"stroke-width":b,"stroke-linejoin":"round"});k.insertBefore(a,n)})}},attr:function(a,k,y,d){var I,b=this.element,c,f=this,v,m;"string"===typeof a&&void 0!==k&&(I=a,a={},a[I]=k);"string"===typeof a?f=(this[a+"Getter"]||this._defaultGetter).call(this,a,b):(n(a,function(k,I){v=!1;d||P(this,I);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(I)&&(c||(this.symbolAttr(a),c=!0),v=!0);!this.rotation||"x"!==I&&"y"!==I||(this.doTransform=!0);v||(m=this[I+"Setter"]||
this._defaultSetter,m.call(this,k,I,b),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(I)&&this.updateShadows(I,k,m))},this),this.afterSetters());y&&y();return f},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,k,y){for(var I=this.shadows,d=I.length;d--;)y.call(I[d],"height"===a?Math.max(k-(I[d].cutHeight||0),0):"d"===a?this.d:k,a,I[d])},addClass:function(a,k){var I=this.attr("class")||"";-1===I.indexOf(a)&&
(k||(a=(I+(I?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==C(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var k=this;c("x y r start end width height innerR anchorX anchorY".split(" "),function(I){k[I]=G(a[I],k[I])});k.attr({d:k.renderer.symbols[k.symbolName](k.x,k.y,k.width,k.height,k)})},clip:function(a){return this.attr("clip-path",a?"url("+
this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,k){var I=this,y={},d;k=k||a.strokeWidth||0;d=Math.round(k)%2/2;a.x=Math.floor(a.x||I.x||0)+d;a.y=Math.floor(a.y||I.y||0)+d;a.width=Math.floor((a.width||I.width||0)-2*d);a.height=Math.floor((a.height||I.height||0)-2*d);B(a.strokeWidth)&&(a.strokeWidth=k);n(a,function(a,k){I[k]!==a&&(I[k]=y[k]=a)});return y},css:function(a){var I=this.styles,y={},d=this.element,c,f="",v,m=!I,r=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);
I&&n(a,function(a,k){a!==I[k]&&(y[k]=a,m=!0)});m&&(I&&(a=b(I,y)),c=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===d.nodeName.toLowerCase()&&k(a.width),this.styles=a,c&&!M&&this.renderer.forExport&&delete a.width,K&&!M?q(this.element,a):(v=function(a,k){return"-"+k.toLowerCase()},n(a,function(a,k){-1===C(k,r)&&(f+=k.replace(/([A-Z])/g,v)+":"+a+";")}),f&&l(d,"style",f)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));
return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,k){var I=this,y=I.element;r&&"click"===a?(y.ontouchstart=function(a){I.touchEventFired=Date.now();a.preventDefault();k.call(y,a)},y.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(I.touchEventFired||0))&&k.call(y,a)}):y["on"+a]=k;return this},setRadialReference:function(a){var k=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;k&&k.radAttr&&k.animate(this.renderer.getRadialAttr(a,
k.radAttr));return this},translate:function(a,k){return this.attr({translateX:a,translateY:k})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,k=this.translateY||0,y=this.scaleX,d=this.scaleY,b=this.inverted,c=this.rotation,n=this.matrix,f=this.element;b&&(a+=this.width,k+=this.height);a=["translate("+a+","+k+")"];B(n)&&a.push("matrix("+n.join(",")+")");b?a.push("rotate(90) scale(-1,1)"):c&&a.push("rotate("+c+" "+G(this.rotationOriginX,
f.getAttribute("x"),0)+" "+G(this.rotationOriginY,f.getAttribute("y")||0)+")");(B(y)||B(d))&&a.push("scale("+G(y,1)+" "+G(d,1)+")");a.length&&f.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,k,y){var I,d,b,c,n={};d=this.renderer;b=d.alignedObjects;var f,v;if(a){if(this.alignOptions=a,this.alignByTranslate=k,!y||x(y))this.alignTo=I=y||"renderer",w(b,this),b.push(this),y=null}else a=this.alignOptions,k=this.alignByTranslate,
I=this.alignTo;y=G(y,d[I],d);I=a.align;d=a.verticalAlign;b=(y.x||0)+(a.x||0);c=(y.y||0)+(a.y||0);"right"===I?f=1:"center"===I&&(f=2);f&&(b+=(y.width-(a.width||0))/f);n[k?"translateX":"x"]=Math.round(b);"bottom"===d?v=1:"middle"===d&&(v=2);v&&(c+=(y.height-(a.height||0))/v);n[k?"translateY":"y"]=Math.round(c);this[this.placed?"animate":"attr"](n);this.placed=!0;this.alignAttr=n;return this},getBBox:function(a,k){var y,d=this.renderer,I,n=this.element,f=this.styles,v,m=this.textStr,r,M=d.cache,w=d.cacheKeys,
g;k=G(k,this.rotation);I=k*e;v=f&&f.fontSize;void 0!==m&&(g=m.toString(),-1===g.indexOf("\x3c")&&(g=g.replace(/[0-9]/g,"0")),g+=["",k||0,v,f&&f.width,f&&f.textOverflow].join());g&&!a&&(y=M[g]);if(!y){if(n.namespaceURI===this.SVG_NS||d.forExport){try{(r=this.fakeTS&&function(a){c(n.querySelectorAll(".highcharts-text-outline"),function(k){k.style.display=a})})&&r("none"),y=n.getBBox?b({},n.getBBox()):{width:n.offsetWidth,height:n.offsetHeight},r&&r("")}catch(T){}if(!y||0>y.width)y={width:0,height:0}}else y=
this.htmlGetBBox();d.isSVG&&(a=y.width,d=y.height,f&&"11px"===f.fontSize&&17===Math.round(d)&&(y.height=d=14),k&&(y.width=Math.abs(d*Math.sin(I))+Math.abs(a*Math.cos(I)),y.height=Math.abs(d*Math.cos(I))+Math.abs(a*Math.sin(I))));if(g&&0<y.height){for(;250<w.length;)delete M[w.shift()];M[g]||w.push(g);M[g]=y}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var k=this;k.animate({opacity:0},
{duration:a||150,complete:function(){k.attr({y:-9999})}})},add:function(a){var k=this.renderer,y=this.element,d;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&k.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:k.box).appendChild(y);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var k=a.parentNode;k&&k.removeChild(a)},destroy:function(){var a=this,k=a.element||{},y=a.renderer.isSVG&&"SPAN"===k.nodeName&&
a.parentGroup,d=k.ownerSVGElement;k.onclick=k.onmouseout=k.onmouseover=k.onmousemove=k.point=null;P(a);a.clipPath&&d&&(c(d.querySelectorAll("[clip-path],[CLIP-PATH]"),function(k){k.getAttribute("clip-path").match(RegExp('[("]#'+a.clipPath.element.id+'[)"]'))&&k.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(d=0;d<a.stops.length;d++)a.stops[d]=a.stops[d].destroy();a.stops=null}a.safeRemoveChild(k);for(a.destroyShadows();y&&y.div&&0===y.div.childNodes.length;)k=y.parentGroup,
a.safeRemoveChild(y.div),delete y.div,y=k;a.alignTo&&w(a.renderer.alignedObjects,a);n(a,function(k,y){delete a[y]});return null},shadow:function(a,k,y){var d=[],b,n,f=this.element,c,I,v,m;if(!a)this.destroyShadows();else if(!this.shadows){I=G(a.width,3);v=(a.opacity||.15)/I;m=this.parentInverted?"(-1,-1)":"("+G(a.offsetX,1)+", "+G(a.offsetY,1)+")";for(b=1;b<=I;b++)n=f.cloneNode(0),c=2*I+1-2*b,l(n,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":v*b,"stroke-width":c,transform:"translate"+
m,fill:"none"}),y&&(l(n,"height",Math.max(l(n,"height")-c,0)),n.cutHeight=c),k?k.element.appendChild(n):f.parentNode&&f.parentNode.insertBefore(n,f),d.push(n);this.shadows=d}return this},destroyShadows:function(){c(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=G(this[a],this.element?this.element.getAttribute(a):null,
0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,k,y){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[k]!==a&&(y.setAttribute(k,a),this[k]=a)},dashstyleSetter:function(a){var y,d=this["stroke-width"];"inherit"===d&&(d=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,
"").split(",");for(y=a.length;y--;)a[y]=k(a[y])*d;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,k,y){this[k]=a;y.setAttribute(k,a)},titleSetter:function(a){var k=this.element.getElementsByTagName("title")[0];k||(k=g.createElementNS(this.SVG_NS,"title"),this.element.appendChild(k));k.firstChild&&k.removeChild(k.firstChild);
k.appendChild(g.createTextNode(String(G(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,k,y){"string"===typeof a?y.setAttribute(k,a):a&&this.colorGradient(a,k,y)},visibilitySetter:function(a,k,y){"inherit"===a?y.removeAttribute(k):this[k]!==a&&y.setAttribute(k,a);this[k]=a},zIndexSetter:function(a,y){var d=this.renderer,b=this.parentGroup,n=(b||d).element||d.box,f,c=this.element,
v,m,d=n===d.box;f=this.added;var I;B(a)&&(c.zIndex=a,a=+a,this[y]===a&&(f=!1),this[y]=a);if(f){(a=this.zIndex)&&b&&(b.handleZ=!0);y=n.childNodes;for(I=y.length-1;0<=I&&!v;I--)if(b=y[I],f=b.zIndex,m=!B(f),b!==c)if(0>a&&m&&!d&&!I)n.insertBefore(c,y[I]),v=!0;else if(k(f)<=a||m&&(!B(a)||0<=a))n.insertBefore(c,y[I+1]||null),v=!0;v||(n.insertBefore(c,y[d?3:0]||null),v=!0)}return v},_defaultSetter:function(a,k,y){y.setAttribute(k,a)}});E.prototype.yGetter=E.prototype.xGetter;E.prototype.translateXSetter=
E.prototype.translateYSetter=E.prototype.rotationSetter=E.prototype.verticalAlignSetter=E.prototype.rotationOriginXSetter=E.prototype.rotationOriginYSetter=E.prototype.scaleXSetter=E.prototype.scaleYSetter=E.prototype.matrixSetter=function(a,k){this[k]=a;this.doTransform=!0};E.prototype["stroke-widthSetter"]=E.prototype.strokeSetter=function(a,k,y){this[k]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",y),y.setAttribute("stroke-width",this["stroke-width"]),
this.hasStroke=!0):"stroke-width"===k&&0===a&&this.hasStroke&&(y.removeAttribute("stroke"),this.hasStroke=!1)};D=a.SVGRenderer=function(){this.init.apply(this,arguments)};b(D.prototype,{Element:E,SVG_NS:O,init:function(a,k,y,d,b,n){var f;d=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(d));f=d.element;a.appendChild(f);-1===a.innerHTML.indexOf("xmlns")&&l(f,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=f;this.boxWrapper=d;this.alignedObjects=[];this.url=(A||
J)&&g.getElementsByTagName("base").length?R.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highstock 6.0.2"));this.defs=this.createElement("defs").add();this.allowHTML=n;this.forExport=b;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(k,y,!1);var c;A&&a.getBoundingClientRect&&(k=function(){q(a,{left:0,top:0});c=a.getBoundingClientRect();
q(a,{left:Math.ceil(c.left)-c.left+"px",top:Math.ceil(c.top)-c.top+"px"})},k(),this.unSubPixelFix=F(R,"resize",k))},getStyle:function(a){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();h(this.gradients||{});this.gradients=
null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var k=new this.Element;k.init(this,a);return k},draw:d,getRadialAttr:function(a,k){return{cx:a[0]-a[2]/2+k.cx*a[2],cy:a[1]-a[2]/2+k.cy*a[2],r:k.r*a[2]}},getSpanWidth:function(a,k){var y=a.getBBox(!0).width;!M&&this.forExport&&(y=this.measureSpanWidth(k.firstChild.data,a.styles));return y},applyEllipsis:function(a,k,y,d){var b=a.rotation,n=y,f,c=0,v=y.length,m=function(a){k.removeChild(k.firstChild);
a&&k.appendChild(g.createTextNode(a))},r;a.rotation=0;n=this.getSpanWidth(a,k);if(r=n>d){for(;c<=v;)f=Math.ceil((c+v)/2),n=y.substring(0,f)+"\u2026",m(n),n=this.getSpanWidth(a,k),c===v?c=v+1:n>d?v=f-1:c=f;0===v&&m("")}a.rotation=b;return r},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot"},buildText:function(a){var y=a.element,d=this,b=d.forExport,f=G(a.textStr,"").toString(),v=-1!==f.indexOf("\x3c"),r=y.childNodes,I,w,C,e,x=l(y,"x"),h=a.styles,A=a.textWidth,
N=h&&h.lineHeight,P=h&&h.textOutline,H=h&&"ellipsis"===h.textOverflow,J=h&&"nowrap"===h.whiteSpace,K=h&&h.fontSize,R,u,p=r.length,h=A&&!a.added&&this.box,B=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:K||d.style.fontSize||12;return N?k(N):d.fontMetrics(b,a.getAttribute("style")?a:y).h},t=function(a){n(d.escapes,function(k,y){a=a.replace(new RegExp(k,"g"),y)});return a};R=[f,H,J,N,P,K,A].join();if(R!==a.textCache){for(a.textCache=R;p--;)y.removeChild(r[p]);v||P||H||A||
-1!==f.indexOf(" ")?(I=/<.*class="([^"]+)".*>/,w=/<.*style="([^"]+)".*>/,C=/<.*href="([^"]+)".*>/,h&&h.appendChild(y),f=v?f.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[f],f=m(f,function(a){return""!==a}),c(f,function(k,f){var n,v=0;k=k.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");
n=k.split("|||");c(n,function(k){if(""!==k||1===n.length){var c={},m=g.createElementNS(d.SVG_NS,"tspan"),r,G;I.test(k)&&(r=k.match(I)[1],l(m,"class",r));w.test(k)&&(G=k.match(w)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),l(m,"style",G));C.test(k)&&!b&&(l(m,"onclick",'location.href\x3d"'+k.match(C)[1]+'"'),l(m,"class","highcharts-anchor"),q(m,{cursor:"pointer"}));k=t(k.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==k){m.appendChild(g.createTextNode(k));v?c.dx=0:f&&null!==x&&(c.x=x);l(m,c);y.appendChild(m);
!v&&u&&(!M&&b&&q(m,{display:"block"}),l(m,"dy",B(m)));if(A){c=k.replace(/([^\^])-/g,"$1- ").split(" ");r=1<n.length||f||1<c.length&&!J;var h=[],N,P=B(m),S=a.rotation;for(H&&(e=d.applyEllipsis(a,m,k,A));!H&&r&&(c.length||h.length);)a.rotation=0,N=d.getSpanWidth(a,m),k=N>A,void 0===e&&(e=k),k&&1!==c.length?(m.removeChild(m.firstChild),h.unshift(c.pop())):(c=h,h=[],c.length&&!J&&(m=g.createElementNS(O,"tspan"),l(m,{dy:P,x:x}),G&&l(m,"style",G),y.appendChild(m)),N>A&&(A=N)),c.length&&m.appendChild(g.createTextNode(c.join(" ").replace(/- /g,
"-")));a.rotation=S}v++}}});u=u||y.childNodes.length}),e&&a.attr("title",a.textStr),h&&h.removeChild(y),P&&a.applyTextOutline&&a.applyTextOutline(P)):y.appendChild(g.createTextNode(t(f)))}},getContrast:function(a){a=z(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,k,y,d,f,c,n,m,r){var M=this.label(a,k,y,r,null,null,null,null,"button"),w=0;M.attr(v({padding:8,r:2},f));var I,g,C,e;f=v({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",
fontWeight:"normal"}},f);I=f.style;delete f.style;c=v(f,{fill:"#e6e6e6"},c);g=c.style;delete c.style;n=v(f,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},n);C=n.style;delete n.style;m=v(f,{style:{color:"#cccccc"}},m);e=m.style;delete m.style;F(M.element,K?"mouseover":"mouseenter",function(){3!==w&&M.setState(1)});F(M.element,K?"mouseout":"mouseleave",function(){3!==w&&M.setState(w)});M.setState=function(a){1!==a&&(M.state=w=a);M.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);M.attr([f,c,n,m][a||0]).css([I,g,C,e][a||0])};M.attr(f).css(b({cursor:"default"},I));return M.on("click",function(a){3!==w&&d.call(M,a)})},crispLine:function(a,k){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-k%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+k%2/2);return a},path:function(a){var k={fill:"none"};H(a)?k.d=a:f(a)&&b(k,a);return this.createElement("path").attr(k)},circle:function(a,k,y){a=f(a)?a:{x:a,y:k,r:y};k=this.createElement("circle");k.xSetter=
k.ySetter=function(a,k,y){y.setAttribute("c"+k,a)};return k.attr(a)},arc:function(a,k,y,d,b,c){f(a)?(d=a,k=d.y,y=d.r,a=d.x):d={innerR:d,start:b,end:c};a=this.symbol("arc",a,k,y,y,d);a.r=y;return a},rect:function(a,k,y,d,b,c){b=f(a)?a.r:b;var n=this.createElement("rect");a=f(a)?a:void 0===a?{}:{x:a,y:k,width:Math.max(y,0),height:Math.max(d,0)};void 0!==c&&(a.strokeWidth=c,a=n.crisp(a));a.fill="none";b&&(a.r=b);n.rSetter=function(a,k,y){l(y,{rx:a,ry:a})};return n.attr(a)},setSize:function(a,k,y){var d=
this.alignedObjects,f=d.length;this.width=a;this.height=k;for(this.boxWrapper.animate({width:a,height:k},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:G(y,!0)?void 0:0});f--;)d[f].align()},g:function(a){var k=this.createElement("g");return a?k.attr({"class":"highcharts-"+a}):k},image:function(a,k,y,d,f){var c={preserveAspectRatio:"none"};1<arguments.length&&b(c,{x:k,y:y,width:d,height:f});c=this.createElement("image").attr(c);c.element.setAttributeNS?
c.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):c.element.setAttribute("hc-svg-href",a);return c},symbol:function(a,k,y,d,f,n){var m=this,v,r=/^url\((.*?)\)$/,M=r.test(a),w=!M&&(this.symbols[a]?a:"circle"),C=w&&this.symbols[w],e=B(k)&&C&&C.call(this.symbols,Math.round(k),Math.round(y),d,f,n),h,x;C?(v=this.path(e),v.attr("fill","none"),b(v,{symbolName:w,x:k,y:y,width:d,height:f}),n&&b(v,n)):M&&(h=a.match(r)[1],v=this.image(h),v.imgwidth=G(N[h]&&N[h].width,n&&n.width),v.imgheight=
G(N[h]&&N[h].height,n&&n.height),x=function(){v.attr({width:v.width,height:v.height})},c(["width","height"],function(a){v[a+"Setter"]=function(a,k){var y={},d=this["img"+k],f="width"===k?"translateX":"translateY";this[k]=a;B(d)&&(this.element&&this.element.setAttribute(k,d),this.alignByTranslate||(y[f]=((this[k]||0)-d)/2,this.attr(y)))}}),B(k)&&v.attr({x:k,y:y}),v.isImg=!0,B(v.imgwidth)&&B(v.imgheight)?x():(v.attr({width:0,height:0}),u("img",{onload:function(){var a=p[m.chartIndex];0===this.width&&
(q(this,{position:"absolute",top:"-999em"}),g.body.appendChild(this));N[h]={width:this.width,height:this.height};v.imgwidth=this.width;v.imgheight=this.height;v.element&&x();this.parentNode&&this.parentNode.removeChild(this);m.imgCount--;if(!m.imgCount&&a&&a.onload)a.onload()},src:h}),this.imgCount++));return v},symbols:{circle:function(a,k,y,d){return this.arc(a+y/2,k+d/2,y/2,d/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,k,y,d){return["M",a,k,"L",a+y,k,a+y,k+d,a,k+d,"Z"]},triangle:function(a,
k,y,d){return["M",a+y/2,k,"L",a+y,k+d,a,k+d,"Z"]},"triangle-down":function(a,k,y,d){return["M",a,k,"L",a+y,k,a+y/2,k+d,"Z"]},diamond:function(a,k,y,d){return["M",a+y/2,k,"L",a+y,k+d/2,a+y/2,k+d,a,k+d/2,"Z"]},arc:function(a,k,y,d,f){var c=f.start,n=f.r||y,b=f.r||d||y,v=f.end-.001;y=f.innerR;d=G(f.open,.001>Math.abs(f.end-f.start-2*Math.PI));var m=Math.cos(c),r=Math.sin(c),M=Math.cos(v),v=Math.sin(v);f=.001>f.end-c-Math.PI?0:1;n=["M",a+n*m,k+b*r,"A",n,b,0,f,1,a+n*M,k+b*v];B(y)&&n.push(d?"M":"L",a+y*
M,k+y*v,"A",y,y,0,f,0,a+y*m,k+y*r);n.push(d?"":"Z");return n},callout:function(a,k,y,d,f){var n=Math.min(f&&f.r||0,y,d),c=n+6,b=f&&f.anchorX;f=f&&f.anchorY;var v;v=["M",a+n,k,"L",a+y-n,k,"C",a+y,k,a+y,k,a+y,k+n,"L",a+y,k+d-n,"C",a+y,k+d,a+y,k+d,a+y-n,k+d,"L",a+n,k+d,"C",a,k+d,a,k+d,a,k+d-n,"L",a,k+n,"C",a,k,a,k,a+n,k];b&&b>y?f>k+c&&f<k+d-c?v.splice(13,3,"L",a+y,f-6,a+y+6,f,a+y,f+6,a+y,k+d-n):v.splice(13,3,"L",a+y,d/2,b,f,a+y,d/2,a+y,k+d-n):b&&0>b?f>k+c&&f<k+d-c?v.splice(33,3,"L",a,f+6,a-6,f,a,f-6,
a,k+n):v.splice(33,3,"L",a,d/2,b,f,a,d/2,a,k+n):f&&f>d&&b>a+c&&b<a+y-c?v.splice(23,3,"L",b+6,k+d,b,k+d+6,b-6,k+d,a+n,k+d):f&&0>f&&b>a+c&&b<a+y-c&&v.splice(3,3,"L",b-6,k,b,k-6,b+6,k,y-n,k);return v}},clipRect:function(k,y,d,f){var n=a.uniqueKey(),b=this.createElement("clipPath").attr({id:n}).add(this.defs);k=this.rect(k,y,d,f,0).add(b);k.id=n;k.clipPath=b;k.count=0;return k},text:function(a,k,y,d){var f={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,k,y);f.x=Math.round(k||0);y&&(f.y=
Math.round(y));if(a||0===a)f.text=a;a=this.createElement("text").attr(f);d||(a.xSetter=function(a,k,y){var d=y.getElementsByTagName("tspan"),f,n=y.getAttribute(k),b;for(b=0;b<d.length;b++)f=d[b],f.getAttribute(k)===n&&f.setAttribute(k,a);y.setAttribute(k,a)});return a},fontMetrics:function(a,y){a=a||y&&y.style&&y.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?k(a):/em/.test(a)?parseFloat(a)*(y?this.fontMetrics(null,y.parentNode).f:16):12;y=24>a?a+3:Math.round(1.2*a);return{h:y,b:Math.round(.8*
y),f:a}},rotCorr:function(a,k,y){var d=a;k&&y&&(d=Math.max(d*Math.cos(k*e),4));return{x:-a/3*Math.sin(k*e),y:d}},label:function(k,d,f,n,m,r,M,w,g){var C=this,e=C.g("button"!==g&&"label"),h=e.text=C.text("",0,0,M).attr({zIndex:1}),G,x,A=0,N=3,P=0,H,q,I,J,K,R={},u,O,p=/^url\((.*?)\)$/.test(n),l=p,S,t,z,W;g&&e.addClass("highcharts-"+g);l=p;S=function(){return(u||0)%2/2};t=function(){var a=h.element.style,k={};x=(void 0===H||void 0===q||K)&&B(h.textStr)&&h.getBBox();e.width=(H||x.width||0)+2*N+P;e.height=
(q||x.height||0)+2*N;O=N+C.fontMetrics(a&&a.fontSize,h).b;l&&(G||(e.box=G=C.symbols[n]||p?C.symbol(n):C.rect(),G.addClass(("button"===g?"":"highcharts-label-box")+(g?" highcharts-"+g+"-box":"")),G.add(e),a=S(),k.x=a,k.y=(w?-O:0)+a),k.width=Math.round(e.width),k.height=Math.round(e.height),G.attr(b(k,R)),R={})};z=function(){var a=P+N,k;k=w?0:O;B(H)&&x&&("center"===K||"right"===K)&&(a+={center:.5,right:1}[K]*(H-x.width));if(a!==h.x||k!==h.y)h.attr("x",a),void 0!==k&&h.attr("y",k);h.x=a;h.y=k};W=function(a,
k){G?G.attr(a,k):R[a]=k};e.onAdd=function(){h.add(e);e.attr({text:k||0===k?k:"",x:d,y:f});G&&B(m)&&e.attr({anchorX:m,anchorY:r})};e.widthSetter=function(k){H=a.isNumber(k)?k:null};e.heightSetter=function(a){q=a};e["text-alignSetter"]=function(a){K=a};e.paddingSetter=function(a){B(a)&&a!==N&&(N=e.padding=a,z())};e.paddingLeftSetter=function(a){B(a)&&a!==P&&(P=a,z())};e.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==A&&(A=a,x&&e.attr({x:I}))};e.textSetter=function(a){void 0!==a&&h.textSetter(a);
t();z()};e["stroke-widthSetter"]=function(a,k){a&&(l=!0);u=this["stroke-width"]=a;W(k,a)};e.strokeSetter=e.fillSetter=e.rSetter=function(a,k){"r"!==k&&("fill"===k&&a&&(l=!0),e[k]=a);W(k,a)};e.anchorXSetter=function(a,k){m=e.anchorX=a;W(k,Math.round(a)-S()-I)};e.anchorYSetter=function(a,k){r=e.anchorY=a;W(k,a-J)};e.xSetter=function(a){e.x=a;A&&(a-=A*((H||x.width)+2*N));I=Math.round(a);e.attr("translateX",I)};e.ySetter=function(a){J=e.y=Math.round(a);e.attr("translateY",J)};var aa=e.css;return b(e,
{css:function(a){if(a){var k={};a=v(a);c(e.textProps,function(y){void 0!==a[y]&&(k[y]=a[y],delete a[y])});h.css(k)}return aa.call(e,a)},getBBox:function(){return{width:x.width+2*N,height:x.height+2*N,x:x.x-N,y:x.y-N}},shadow:function(a){a&&(t(),G&&G.shadow(a));return e},destroy:function(){y(e.element,"mouseenter");y(e.element,"mouseleave");h&&(h=h.destroy());G&&(G=G.destroy());E.prototype.destroy.call(e);e=C=t=z=W=null}})}});a.Renderer=D})(L);(function(a){var E=a.attr,D=a.createElement,F=a.css,t=
a.defined,l=a.each,p=a.extend,z=a.isFirefox,q=a.isMS,u=a.isWebKit,B=a.pInt,e=a.SVGRenderer,h=a.win,g=a.wrap;p(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=p(this.styles,a);F(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},
htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,e=this.translateX||0,m=this.translateY||0,r=this.x||0,g=this.y||0,h=this.textAlign||"left",A={left:0,center:.5,right:1}[h],q=this.styles;F(b,{marginLeft:e,marginTop:m});this.shadows&&l(this.shadows,function(a){F(a,{marginLeft:e+1,marginTop:m+1})});this.inverted&&l(b.childNodes,function(d){a.invertChild(d,b)});if("SPAN"===b.tagName){var f=this.rotation,x=B(this.textWidth),J=q&&q.whiteSpace,v=[f,h,b.innerHTML,this.textWidth,
this.textAlign].join();v!==this.cTT&&(q=a.fontMetrics(b.style.fontSize).b,t(f)&&this.setSpanRotation(f,A,q),F(b,{width:"",whiteSpace:J||"nowrap"}),b.offsetWidth>x&&/[ \-]/.test(b.textContent||b.innerText)&&F(b,{width:x+"px",display:"block",whiteSpace:J||"normal"}),this.getSpanCorrection(b.offsetWidth,q,A,f,h));F(b,{left:r+(this.xCorr||0)+"px",top:g+(this.yCorr||0)+"px"});u&&(q=b.offsetHeight);this.cTT=v}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,e){var c={},r=this.renderer.getTransformKey();
c[r]=c.transform="rotate("+a+"deg)";c[r+(z?"Origin":"-origin")]=c.transformOrigin=100*b+"% "+e+"px";F(this.element,c)},getSpanCorrection:function(a,b,e){this.xCorr=-a*e;this.yCorr=-b}});p(e.prototype,{getTransformKey:function(){return q&&!/Edge/.test(h.navigator.userAgent)?"-ms-transform":u?"-webkit-transform":z?"MozTransform":h.opera?"-o-transform":""},html:function(a,b,e){var c=this.createElement("span"),r=c.element,w=c.renderer,h=w.isSVG,A=function(a,f){l(["opacity","visibility"],function(b){g(a,
b+"Setter",function(a,b,d,n){a.call(this,b,d,n);f[d]=b})})};c.textSetter=function(a){a!==r.innerHTML&&delete this.bBox;r.innerHTML=this.textStr=a;c.htmlUpdateTransform()};h&&A(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,f){"align"===f&&(f="textAlign");c[f]=a;c.htmlUpdateTransform()};c.attr({text:a,x:Math.round(b),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});r.style.whiteSpace="nowrap";c.css=c.htmlCss;
h&&(c.add=function(a){var f,b=w.box.parentNode,m=[];if(this.parentGroup=a){if(f=a.div,!f){for(;a;)m.push(a),a=a.parentGroup;l(m.reverse(),function(a){function d(k,y){a[y]=k;q?n[w.getTransformKey()]="translate("+(a.x||a.translateX)+"px,"+(a.y||a.translateY)+"px)":"translateX"===y?n.left=k+"px":n.top=k+"px";a.doTransform=!0}var n,v=E(a.element,"class");v&&(v={className:v});f=a.div=a.div||D("div",v,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,
pointerEvents:a.styles&&a.styles.pointerEvents},f||b);n=f.style;p(a,{classSetter:function(a){this.element.setAttribute("class",a);f.className=a},on:function(){m[0].div&&c.on.apply({element:m[0].div},arguments);return a},translateXSetter:d,translateYSetter:d});A(a,n)})}}else f=b;f.appendChild(r);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})})(L);(function(a){function E(){var q=a.defaultOptions.global,u=z.moment;if(q.timezone){if(u)return function(a){return-u.tz(a,q.timezone).utcOffset()};
a.error(25)}return q.useUTC&&q.getTimezoneOffset}function D(){var q=a.defaultOptions.global,u,l=q.useUTC,e=l?"getUTC":"get",h=l?"setUTC":"set",g="Minutes Hours Day Date Month FullYear".split(" "),c=g.concat(["Milliseconds","Seconds"]);a.Date=u=q.Date||z.Date;u.hcTimezoneOffset=l&&q.timezoneOffset;u.hcGetTimezoneOffset=E();u.hcMakeTime=function(a,c,m,r,e,g){var b;l?(b=u.UTC.apply(0,arguments),b+=t(b)):b=(new u(a,c,p(m,1),p(r,0),p(e,0),p(g,0))).getTime();return b};for(q=0;q<g.length;q++)u["hcGet"+g[q]]=
e+g[q];for(q=0;q<c.length;q++)u["hcSet"+c[q]]=h+c[q]}var F=a.color,t=a.getTZOffset,l=a.merge,p=a.pick,z=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",
widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},
squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",
year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:F("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",
position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(q){a.defaultOptions=l(!0,a.defaultOptions,q);D();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;D()})(L);(function(a){var E=a.correctFloat,D=a.defined,F=a.destroyObjectProperties,t=a.isNumber,l=a.merge,p=a.pick,z=a.deg2rad;a.Tick=function(a,u,p,e){this.axis=a;this.pos=
u;this.type=p||"";this.isNewLabel=this.isNew=!0;p||e||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,u=a.options,B=a.chart,e=a.categories,h=a.names,g=this.pos,c=u.labels,b=a.tickPositions,w=g===b[0],m=g===b[b.length-1],h=e?p(e[g],h[g],g):g,e=this.label,b=b.info,r;a.isDatetimeAxis&&b&&(r=u.dateTimeLabelFormats[b.higherRanks[g]||b.unitName]);this.isFirst=w;this.isLast=m;u=a.labelFormatter.call({axis:a,chart:B,isFirst:w,isLast:m,dateTimeLabelFormat:r,value:a.isLog?E(a.lin2log(h)):
h,pos:g});D(e)?e&&e.attr({text:u}):(this.labelLength=(this.label=e=D(u)&&c.enabled?B.renderer.text(u,0,0,c.useHTML).css(l(c.style)).add(a.labelGroup):null)&&e.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var q=this.axis,l=a.x,e=q.chart.chartWidth,h=q.chart.spacing,g=p(q.labelLeft,Math.min(q.pos,h[3])),h=p(q.labelRight,Math.max(q.pos+q.len,e-h[1])),c=this.label,b=this.rotation,w={left:0,
center:.5,right:1}[q.labelAlign],m=c.getBBox().width,r=q.getSlotWidth(),C=r,H=1,A,K={};if(b)0>b&&l-w*m<g?A=Math.round(l/Math.cos(b*z)-g):0<b&&l+w*m>h&&(A=Math.round((e-l)/Math.cos(b*z)));else if(e=l+(1-w)*m,l-w*m<g?C=a.x+C*(1-w)-g:e>h&&(C=h-a.x+C*w,H=-1),C=Math.min(r,C),C<r&&"center"===q.labelAlign&&(a.x+=H*(r-C-w*(r-Math.min(m,C)))),m>C||q.autoRotation&&(c.styles||{}).width)A=C;A&&(K.width=A,(q.options.labels.style||{}).textOverflow||(K.textOverflow="ellipsis"),c.css(K))},getPosition:function(a,
p,l,e){var h=this.axis,g=h.chart,c=e&&g.oldChartHeight||g.chartHeight;return{x:a?h.translate(p+l,null,null,e)+h.transB:h.left+h.offset+(h.opposite?(e&&g.oldChartWidth||g.chartWidth)-h.right-h.left:0),y:a?c-h.bottom+h.offset-(h.opposite?h.height:0):c-h.translate(p+l,null,null,e)-h.transB}},getLabelPosition:function(a,p,l,e,h,g,c,b){var w=this.axis,m=w.transA,r=w.reversed,C=w.staggerLines,H=w.tickRotCorr||{x:0,y:0},A=h.y;D(A)||(A=0===w.side?l.rotation?-8:-l.getBBox().height:2===w.side?H.y+8:Math.cos(l.rotation*
z)*(H.y-l.getBBox(!1,0).height/2));a=a+h.x+H.x-(g&&e?g*m*(r?-1:1):0);p=p+A-(g&&!e?g*m*(r?1:-1):0);C&&(l=c/(b||1)%C,w.opposite&&(l=C-l-1),p+=w.labelOffset/C*l);return{x:a,y:Math.round(p)}},getMarkPath:function(a,l,p,e,h,g){return g.crispLine(["M",a,l,"L",a+(h?0:-p),l+(h?p:0)],e)},renderGridLine:function(a,l,p){var e=this.axis,h=e.options,g=this.gridLine,c={},b=this.pos,w=this.type,m=e.tickmarkOffset,r=e.chart.renderer,C=w?w+"Grid":"grid",H=h[C+"LineWidth"],A=h[C+"LineColor"],h=h[C+"LineDashStyle"];
g||(c.stroke=A,c["stroke-width"]=H,h&&(c.dashstyle=h),w||(c.zIndex=1),a&&(c.opacity=0),this.gridLine=g=r.path().attr(c).addClass("highcharts-"+(w?w+"-":"")+"grid-line").add(e.gridGroup));if(!a&&g&&(a=e.getPlotLinePath(b+m,g.strokeWidth()*p,a,!0)))g[this.isNew?"attr":"animate"]({d:a,opacity:l})},renderMark:function(a,l,B){var e=this.axis,h=e.options,g=e.chart.renderer,c=this.type,b=c?c+"Tick":"tick",w=e.tickSize(b),m=this.mark,r=!m,C=a.x;a=a.y;var H=p(h[b+"Width"],!c&&e.isXAxis?1:0),h=h[b+"Color"];
w&&(e.opposite&&(w[0]=-w[0]),r&&(this.mark=m=g.path().addClass("highcharts-"+(c?c+"-":"")+"tick").add(e.axisGroup),m.attr({stroke:h,"stroke-width":H})),m[r?"attr":"animate"]({d:this.getMarkPath(C,a,w[0],m.strokeWidth()*B,e.horiz,g),opacity:l}))},renderLabel:function(a,l,B,e){var h=this.axis,g=h.horiz,c=h.options,b=this.label,w=c.labels,m=w.step,r=h.tickmarkOffset,C=!0,H=a.x;a=a.y;b&&t(H)&&(b.xy=a=this.getLabelPosition(H,a,b,g,w,r,e,m),this.isFirst&&!this.isLast&&!p(c.showFirstLabel,1)||this.isLast&&
!this.isFirst&&!p(c.showLastLabel,1)?C=!1:!g||h.isRadial||w.step||w.rotation||l||0===B||this.handleOverflow(a),m&&e%m&&(C=!1),C&&t(a.y)?(a.opacity=B,b[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(b.attr("y",-9999),this.isNewLabel=!0))},render:function(a,l,B){var e=this.axis,h=e.horiz,g=this.getPosition(h,this.pos,e.tickmarkOffset,l),c=g.x,b=g.y,e=h&&c===e.pos+e.len||!h&&b===e.pos?-1:1;B=p(B,1);this.isActive=!0;this.renderGridLine(l,B,e);this.renderMark(g,B,e);this.renderLabel(g,l,B,a);
this.isNew=!1},destroy:function(){F(this,this.axis)}}})(L);var Z=function(a){var E=a.addEvent,D=a.animObject,F=a.arrayMax,t=a.arrayMin,l=a.color,p=a.correctFloat,z=a.defaultOptions,q=a.defined,u=a.deg2rad,B=a.destroyObjectProperties,e=a.each,h=a.extend,g=a.fireEvent,c=a.format,b=a.getMagnitude,w=a.grep,m=a.inArray,r=a.isArray,C=a.isNumber,H=a.isString,A=a.merge,K=a.normalizeTickInterval,f=a.objectEach,x=a.pick,J=a.removeEvent,v=a.splat,d=a.syncTimeout,n=a.Tick,G=function(){this.init.apply(this,arguments)};
a.extend(G.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},
type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},
gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,y){var k=y.isX,d=this;d.chart=a;d.horiz=a.inverted&&!d.isZAxis?!k:k;d.isXAxis=k;d.coll=d.coll||(k?"xAxis":"yAxis");d.opposite=y.opposite;d.side=y.side||(d.horiz?d.opposite?0:2:d.opposite?
1:3);d.setOptions(y);var b=this.options,n=b.type;d.labelFormatter=b.labels.formatter||d.defaultLabelFormatter;d.userOptions=y;d.minPixelPadding=0;d.reversed=b.reversed;d.visible=!1!==b.visible;d.zoomEnabled=!1!==b.zoomEnabled;d.hasNames="category"===n||!0===b.categories;d.categories=b.categories||d.hasNames;d.names=d.names||[];d.plotLinesAndBandsGroups={};d.isLog="logarithmic"===n;d.isDatetimeAxis="datetime"===n;d.positiveValuesOnly=d.isLog&&!d.allowNegativeLog;d.isLinked=q(b.linkedTo);d.ticks={};
d.labelEdge=[];d.minorTicks={};d.plotLinesAndBands=[];d.alternateBands={};d.len=0;d.minRange=d.userMinRange=b.minRange||b.maxZoom;d.range=b.range;d.offset=b.offset||0;d.stacks={};d.oldStacks={};d.stacksTouched=0;d.max=null;d.min=null;d.crosshair=x(b.crosshair,v(a.options.tooltip.crosshairs)[k?0:1],!1);y=d.options.events;-1===m(d,a.axes)&&(k?a.axes.splice(a.xAxis.length,0,d):a.axes.push(d),a[d.coll].push(d));d.series=d.series||[];a.inverted&&!d.isZAxis&&k&&void 0===d.reversed&&(d.reversed=!0);f(y,
function(a,k){E(d,k,a)});d.lin2log=b.linearToLogConverter||d.lin2log;d.isLog&&(d.val2lin=d.log2lin,d.lin2val=d.lin2log)},setOptions:function(a){this.options=A(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],A(z[this.coll],a))},defaultLabelFormatter:function(){var k=this.axis,y=this.value,d=k.categories,f=this.dateTimeLabelFormat,b=z.lang,n=b.numericSymbols,
b=b.numericSymbolMagnitude||1E3,v=n&&n.length,m,r=k.options.labels.format,k=k.isLog?Math.abs(y):k.tickInterval;if(r)m=c(r,this);else if(d)m=y;else if(f)m=a.dateFormat(f,y);else if(v&&1E3<=k)for(;v--&&void 0===m;)d=Math.pow(b,v+1),k>=d&&0===10*y%d&&null!==n[v]&&0!==y&&(m=a.numberFormat(y/d,-1)+n[v]);void 0===m&&(m=1E4<=Math.abs(y)?a.numberFormat(y,-1):a.numberFormat(y,-1,void 0,""));return m},getSeriesExtremes:function(){var a=this,y=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;
a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();e(a.series,function(k){if(k.visible||!y.options.chart.ignoreHiddenSeries){var d=k.options,f=d.threshold,b;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=f&&(f=null);if(a.isXAxis)d=k.xData,d.length&&(k=t(d),C(k)||k instanceof Date||(d=w(d,function(a){return C(a)}),k=t(d)),a.dataMin=Math.min(x(a.dataMin,d[0]),k),a.dataMax=Math.max(x(a.dataMax,d[0]),F(d)));else if(k.getExtremes(),b=k.dataMax,k=k.dataMin,q(k)&&q(b)&&(a.dataMin=Math.min(x(a.dataMin,
k),k),a.dataMax=Math.max(x(a.dataMax,b),b)),q(f)&&(a.threshold=f),!d.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,d,f,b,n,c){var k=this.linkedParent||this,y=1,v=0,m=b?k.oldTransA:k.transA;b=b?k.oldMin:k.min;var r=k.minPixelPadding;n=(k.isOrdinal||k.isBroken||k.isLog&&n)&&k.lin2val;m||(m=k.transA);f&&(y*=-1,v=k.len);k.reversed&&(y*=-1,v-=y*(k.sector||k.len));d?(a=(a*y+v-r)/m+b,n&&(a=k.lin2val(a))):(n&&(a=k.val2lin(a)),a=C(b)?y*(a-b)*m+v+y*r+(C(c)?m*c:0):void 0);return a},
toPixels:function(a,d){return this.translate(a,!1,!this.horiz,null,!0)+(d?0:this.pos)},toValue:function(a,d){return this.translate(a-(d?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,d,b,f,n){var k=this.chart,y=this.left,c=this.top,v,m,r=b&&k.oldChartHeight||k.chartHeight,e=b&&k.oldChartWidth||k.chartWidth,w;v=this.transB;var g=function(a,k,d){if(a<k||a>d)f?a=Math.min(Math.max(k,a),d):w=!0;return a};n=x(n,this.translate(a,null,null,b));a=b=Math.round(n+v);v=m=Math.round(r-n-v);C(n)?
this.horiz?(v=c,m=r-this.bottom,a=b=g(a,y,y+this.width)):(a=y,b=e-this.right,v=m=g(v,c,c+this.height)):(w=!0,f=!1);return w&&!f?null:k.renderer.crispLine(["M",a,v,"L",b,m],d||1)},getLinearTickPositions:function(a,d,b){var k,y=p(Math.floor(d/a)*a);b=p(Math.ceil(b/a)*a);var f=[];if(this.single)return[d];for(d=y;d<=b;){f.push(d);d=p(d+a);if(d===k)break;k=d}return f},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?x(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},
getMinorTickPositions:function(){var a=this,d=a.options,b=a.tickPositions,f=a.minorTickInterval,n=[],c=a.pointRangePadding||0,v=a.min-c,c=a.max+c,m=c-v;if(m&&m/f<a.len/3)if(a.isLog)e(this.paddedTicks,function(k,d,y){d&&n.push.apply(n,a.getLogTickPositions(f,y[d-1],y[d],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())n=n.concat(a.getTimeTicks(a.normalizeTimeTickInterval(f),v,c,d.startOfWeek));else for(d=v+(b[0]-v)%f;d<=c&&d!==n[0];d+=f)n.push(d);0!==n.length&&a.trimTicks(n);return n},
adjustForMinRange:function(){var a=this.options,d=this.min,b=this.max,f,n,c,v,m,r,w,g;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(q(a.min)||q(a.max)?this.minRange=null:(e(this.series,function(a){r=a.xData;for(v=w=a.xIncrement?1:r.length-1;0<v;v--)if(m=r[v]-r[v-1],void 0===c||m<c)c=m}),this.minRange=Math.min(5*c,this.dataMax-this.dataMin)));b-d<this.minRange&&(n=this.dataMax-this.dataMin>=this.minRange,g=this.minRange,f=(g-b+d)/2,f=[d-f,x(a.min,d-f)],n&&(f[2]=this.isLog?this.log2lin(this.dataMin):
this.dataMin),d=F(f),b=[d+g,x(a.max,d+g)],n&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=t(b),b-d<g&&(f[0]=b-g,f[1]=x(a.min,b-g),d=F(f)));this.min=d;this.max=b},getClosest:function(){var a;this.categories?a=1:e(this.series,function(k){var d=k.closestPointRange,y=k.visible||!k.chart.options.chart.ignoreHiddenSeries;!k.noSharedTooltip&&q(d)&&y&&(a=q(a)?Math.min(a,d):d)});return a},nameToX:function(a){var k=r(this.categories),d=k?this.categories:this.names,b=a.options.x,f;a.series.requireSorting=
!1;q(b)||(b=!1===this.options.uniqueNames?a.series.autoIncrement():m(a.name,d));-1===b?k||(f=d.length):f=b;void 0!==f&&(this.names[f]=a.name);return f},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,e(this.series||[],function(k){k.xIncrement=null;if(!k.points||k.isDirtyData)k.processData(),k.generatePoints();e(k.points,function(d,y){var b;d.options&&(b=a.nameToX(d),void 0!==b&&b!==d.x&&(d.x=b,k.xData[y]=b))})}))},setAxisTranslation:function(a){var k=
this,d=k.max-k.min,b=k.axisPointRange||0,f,n=0,c=0,v=k.linkedParent,m=!!k.categories,r=k.transA,g=k.isXAxis;if(g||m||b)f=k.getClosest(),v?(n=v.minPointOffset,c=v.pointRangePadding):e(k.series,function(a){var d=m?1:g?x(a.options.pointRange,f,0):k.axisPointRange||0;a=a.options.pointPlacement;b=Math.max(b,d);k.single||(n=Math.max(n,H(a)?0:d/2),c=Math.max(c,"on"===a?0:d))}),v=k.ordinalSlope&&f?k.ordinalSlope/f:1,k.minPointOffset=n*=v,k.pointRangePadding=c*=v,k.pointRange=Math.min(b,d),g&&(k.closestPointRange=
f);a&&(k.oldTransA=r);k.translationSlope=k.transA=r=k.options.staticScale||k.len/(d+c||1);k.transB=k.horiz?k.left:k.bottom;k.minPixelPadding=r*n},minFromRange:function(){return this.max-this.range},setTickInterval:function(k){var d=this,f=d.chart,n=d.options,c=d.isLog,v=d.log2lin,m=d.isDatetimeAxis,r=d.isXAxis,w=d.isLinked,h=n.maxPadding,G=n.minPadding,A=n.tickInterval,H=n.tickPixelInterval,J=d.categories,l=d.threshold,u=d.softThreshold,B,t,z,D;m||J||w||this.getTickAmount();z=x(d.userMin,n.min);D=
x(d.userMax,n.max);w?(d.linkedParent=f[d.coll][n.linkedTo],f=d.linkedParent.getExtremes(),d.min=x(f.min,f.dataMin),d.max=x(f.max,f.dataMax),n.type!==d.linkedParent.options.type&&a.error(11,1)):(!u&&q(l)&&(d.dataMin>=l?(B=l,G=0):d.dataMax<=l&&(t=l,h=0)),d.min=x(z,B,d.dataMin),d.max=x(D,t,d.dataMax));c&&(d.positiveValuesOnly&&!k&&0>=Math.min(d.min,x(d.dataMin,d.min))&&a.error(10,1),d.min=p(v(d.min),15),d.max=p(v(d.max),15));d.range&&q(d.max)&&(d.userMin=d.min=z=Math.max(d.dataMin,d.minFromRange()),
d.userMax=D=d.max,d.range=null);g(d,"foundExtremes");d.beforePadding&&d.beforePadding();d.adjustForMinRange();!(J||d.axisPointRange||d.usePercentage||w)&&q(d.min)&&q(d.max)&&(v=d.max-d.min)&&(!q(z)&&G&&(d.min-=v*G),!q(D)&&h&&(d.max+=v*h));C(n.softMin)&&(d.min=Math.min(d.min,n.softMin));C(n.softMax)&&(d.max=Math.max(d.max,n.softMax));C(n.floor)&&(d.min=Math.max(d.min,n.floor));C(n.ceiling)&&(d.max=Math.min(d.max,n.ceiling));u&&q(d.dataMin)&&(l=l||0,!q(z)&&d.min<l&&d.dataMin>=l?d.min=l:!q(D)&&d.max>
l&&d.dataMax<=l&&(d.max=l));d.tickInterval=d.min===d.max||void 0===d.min||void 0===d.max?1:w&&!A&&H===d.linkedParent.options.tickPixelInterval?A=d.linkedParent.tickInterval:x(A,this.tickAmount?(d.max-d.min)/Math.max(this.tickAmount-1,1):void 0,J?1:(d.max-d.min)*H/Math.max(d.len,H));r&&!k&&e(d.series,function(a){a.processData(d.min!==d.oldMin||d.max!==d.oldMax)});d.setAxisTranslation(!0);d.beforeSetTickPositions&&d.beforeSetTickPositions();d.postProcessTickInterval&&(d.tickInterval=d.postProcessTickInterval(d.tickInterval));
d.pointRange&&!A&&(d.tickInterval=Math.max(d.pointRange,d.tickInterval));k=x(n.minTickInterval,d.isDatetimeAxis&&d.closestPointRange);!A&&d.tickInterval<k&&(d.tickInterval=k);m||c||A||(d.tickInterval=K(d.tickInterval,null,b(d.tickInterval),x(n.allowDecimals,!(.5<d.tickInterval&&5>d.tickInterval&&1E3<d.max&&9999>d.max)),!!this.tickAmount));this.tickAmount||(d.tickInterval=d.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,d,b=a.tickPositions;d=this.getMinorTickInterval();
var f=a.tickPositioner,n=a.startOnTick,c=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===d&&this.tickInterval?this.tickInterval/5:d;this.single=this.min===this.max&&q(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=d=b&&b.slice();!d&&(d=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,
a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),d.length>this.len&&(d=[d[0],d.pop()]),this.tickPositions=d,f&&(f=f.apply(this,[this.min,this.max])))&&(this.tickPositions=d=f);this.paddedTicks=d.slice(0);this.trimTicks(d,n,c);this.isLinked||(this.single&&2>d.length&&(this.min-=.5,this.max+=.5),b||f||this.adjustTickAmount())},trimTicks:function(a,d,
f){var k=a[0],b=a[a.length-1],n=this.minPointOffset||0;if(!this.isLinked){if(d&&-Infinity!==k)this.min=k;else for(;this.min-n>a[0];)a.shift();if(f)this.max=b;else for(;this.max+n<a[a.length-1];)a.pop();0===a.length&&q(k)&&a.push((b+k)/2)}},alignToOthers:function(){var a={},d,f=this.options;!1===this.chart.options.chart.alignTicks||!1===f.alignTicks||this.isLog||e(this.chart[this.coll],function(k){var f=k.options,f=[k.horiz?f.left:f.top,f.width,f.height,f.pane].join();k.series.length&&(a[f]?d=!0:a[f]=
1)});return d},getTickAmount:function(){var a=this.options,d=a.tickAmount,f=a.tickPixelInterval;!q(a.tickInterval)&&this.len<f&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(d=2);!d&&this.alignToOthers()&&(d=Math.ceil(this.len/f)+1);4>d&&(this.finalTickAmt=d,d=5);this.tickAmount=d},adjustTickAmount:function(){var a=this.tickInterval,d=this.tickPositions,f=this.tickAmount,b=this.finalTickAmt,n=d&&d.length;if(n<f){for(;d.length<f;)d.push(p(d[d.length-1]+a));this.transA*=(n-1)/(f-1);this.max=
d[d.length-1]}else n>f&&(this.tickInterval*=2,this.setTickPositions());if(q(b)){for(a=f=d.length;a--;)(3===b&&1===a%2||2>=b&&0<a&&a<f-1)&&d.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,d;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();d=this.len!==this.oldAxisLength;e(this.series,function(d){if(d.isDirtyData||d.isDirty||d.xAxis.isDirty)a=!0});d||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||
this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=d||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,d,f,b,n){var k=this,c=k.chart;f=x(f,!0);e(k.series,function(a){delete a.kdTree});n=h(n,{min:a,max:d});g(k,"setExtremes",n,function(){k.userMin=a;k.userMax=d;k.eventArgs=n;f&&c.redraw(b)})},
zoom:function(a,d){var k=this.dataMin,f=this.dataMax,b=this.options,n=Math.min(k,x(b.min,k)),b=Math.max(f,x(b.max,f));if(a!==this.min||d!==this.max)this.allowZoomOutside||(q(k)&&(a<n&&(a=n),a>b&&(a=b)),q(f)&&(d<n&&(d=n),d>b&&(d=b))),this.displayBtn=void 0!==a||void 0!==d,this.setExtremes(a,d,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var d=this.chart,f=this.options,b=f.offsets||[0,0,0,0],n=this.horiz,c=this.width=Math.round(a.relativeLength(x(f.width,d.plotWidth-b[3]+b[1]),d.plotWidth)),
v=this.height=Math.round(a.relativeLength(x(f.height,d.plotHeight-b[0]+b[2]),d.plotHeight)),m=this.top=Math.round(a.relativeLength(x(f.top,d.plotTop+b[0]),d.plotHeight,d.plotTop)),f=this.left=Math.round(a.relativeLength(x(f.left,d.plotLeft+b[3]),d.plotWidth,d.plotLeft));this.bottom=d.chartHeight-v-m;this.right=d.chartWidth-c-f;this.len=Math.max(n?c:v,0);this.pos=n?f:m},getExtremes:function(){var a=this.isLog,d=this.lin2log;return{min:a?p(d(this.min)):this.min,max:a?p(d(this.max)):this.max,dataMin:this.dataMin,
dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var d=this.isLog,k=this.lin2log,f=d?k(this.min):this.min,d=d?k(this.max):this.max;null===a?a=f:f>a?a=f:d<a&&(a=d);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(x(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var d=this.options,k=d[a+"Length"],f=x(d[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(f&&k)return"inside"===d[a+"Position"]&&(k=
-k),[k,f]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,d=this.horiz,f=this.tickInterval,b=f,n=this.len/(((this.categories?1:0)+this.max-this.min)/f),c,v=a.rotation,m=this.labelMetrics(),r,g=Number.MAX_VALUE,w,h=function(a){a/=n||1;a=1<a?Math.ceil(a):1;return a*f};d?(w=!a.staggerLines&&
!a.step&&(q(v)?[v]:n<x(a.autoRotationLimit,80)&&a.autoRotation))&&e(w,function(a){var d;if(a===v||a&&-90<=a&&90>=a)r=h(Math.abs(m.h/Math.sin(u*a))),d=r+Math.abs(a/360),d<g&&(g=d,c=a,b=r)}):a.step||(b=h(m.h));this.autoRotation=w;this.labelRotation=x(c,v);return b},getSlotWidth:function(){var a=this.chart,d=this.horiz,f=this.options.labels,b=Math.max(this.tickPositions.length-(this.categories?0:1),1),n=a.margin[3];return d&&2>(f.step||0)&&!f.rotation&&(this.staggerLines||1)*this.len/b||!d&&(f.style&&
parseInt(f.style.width,10)||n&&n-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,d=a.renderer,f=this.tickPositions,b=this.ticks,n=this.options.labels,c=this.horiz,v=this.getSlotWidth(),m=Math.max(1,Math.round(v-2*(n.padding||5))),r={},g=this.labelMetrics(),w=n.style&&n.style.textOverflow,h,C=0,G,x;H(n.rotation)||(r.rotation=n.rotation||0);e(f,function(a){(a=b[a])&&a.labelLength>C&&(C=a.labelLength)});this.maxLabelLength=C;if(this.autoRotation)C>m&&C>g.h?r.rotation=this.labelRotation:
this.labelRotation=0;else if(v&&(h={width:m+"px"},!w))for(h.textOverflow="clip",G=f.length;!c&&G--;)if(x=f[G],m=b[x].label)m.styles&&"ellipsis"===m.styles.textOverflow?m.css({textOverflow:"clip"}):b[x].labelLength>v&&m.css({width:v+"px"}),m.getBBox().height>this.len/f.length-(g.h-g.f)&&(m.specCss={textOverflow:"ellipsis"});r.rotation&&(h={width:(C>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},w||(h.textOverflow="ellipsis"));if(this.labelAlign=n.align||this.autoLabelAlign(this.labelRotation))r.align=
this.labelAlign;e(f,function(a){var d=(a=b[a])&&a.label;d&&(d.attr(r),h&&d.css(A(h,d.specCss)),delete d.specCss,a.rotation=r.rotation)});this.tickRotCorr=d.rotCorr(g.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||q(this.min)&&q(this.max)&&!!this.tickPositions},addTitle:function(a){var d=this.chart.renderer,k=this.horiz,f=this.opposite,b=this.options.title,n;this.axisTitle||((n=b.textAlign)||(n=(k?{low:"left",middle:"center",high:"right"}:{low:f?"right":"left",
middle:"center",high:f?"left":"right"})[b.align]),this.axisTitle=d.text(b.text,0,0,b.useHTML).attr({zIndex:7,rotation:b.rotation||0,align:n}).addClass("highcharts-axis-title").css(b.style).add(this.axisGroup),this.axisTitle.isNew=!0);b.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var d=this.ticks;d[a]?d[a].addLabel():d[a]=new n(this,a)},getOffset:function(){var a=this,d=a.chart,b=d.renderer,n=a.options,c=a.tickPositions,
v=a.ticks,m=a.horiz,r=a.side,g=d.inverted&&!a.isZAxis?[1,0,3,2][r]:r,w,h,C=0,G,A=0,H=n.title,l=n.labels,J=0,p=d.axisOffset,d=d.clipOffset,K=[-1,1,1,-1][r],u=n.className,B=a.axisParent,t=this.tickSize("tick");w=a.hasData();a.showAxis=h=w||x(n.showEmpty,!0);a.staggerLines=a.horiz&&l.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:n.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(u||"")).add(B),a.axisGroup=b.g("axis").attr({zIndex:n.zIndex||2}).addClass("highcharts-"+
this.coll.toLowerCase()+" "+(u||"")).add(B),a.labelGroup=b.g("axis-labels").attr({zIndex:l.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(u||"")).add(B));w||a.isLinked?(e(c,function(d,k){a.generateTick(d,k)}),a.renderUnsquish(),!1===l.reserveSpace||0!==r&&2!==r&&{1:"left",3:"right"}[r]!==a.labelAlign&&"center"!==a.labelAlign||e(c,function(a){J=Math.max(v[a].getLabelSize(),J)}),a.staggerLines&&(J*=a.staggerLines,a.labelOffset=J*(a.opposite?-1:1))):f(v,function(a,d){a.destroy();
delete v[d]});H&&H.text&&!1!==H.enabled&&(a.addTitle(h),h&&!1!==H.reserveSpace&&(a.titleOffset=C=a.axisTitle.getBBox()[m?"height":"width"],G=H.offset,A=q(G)?0:x(H.margin,m?5:10)));a.renderLine();a.offset=K*x(n.offset,p[r]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===r?-a.labelMetrics().h:2===r?a.tickRotCorr.y:0;A=Math.abs(J)+A;J&&(A=A-b+K*(m?x(l.y,a.tickRotCorr.y+8*K):l.x));a.axisTitleMargin=x(G,A);p[r]=Math.max(p[r],a.axisTitleMargin+C+K*a.offset,A,w&&c.length&&t?t[0]+K*a.offset:0);n=n.offset?0:
2*Math.floor(a.axisLine.strokeWidth()/2);d[g]=Math.max(d[g],n)},getLinePath:function(a){var d=this.chart,k=this.opposite,f=this.offset,b=this.horiz,n=this.left+(k?this.width:0)+f,f=d.chartHeight-this.bottom-(k?this.height:0)+f;k&&(a*=-1);return d.renderer.crispLine(["M",b?this.left:n,b?f:this.top,"L",b?d.chartWidth-this.right:n,b?f:d.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,
"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,d=this.left,f=this.top,b=this.len,n=this.options.title,c=a?d:f,v=this.opposite,m=this.offset,r=n.x||0,e=n.y||0,g=this.axisTitle,w=this.chart.renderer.fontMetrics(n.style&&n.style.fontSize,g),g=Math.max(g.getBBox(null,0).height-w.h-1,0),b={low:c+(a?0:b),middle:c+b/2,high:c+(a?b:0)}[n.align],d=(a?f+this.height:d)+(a?1:-1)*(v?-1:1)*this.axisTitleMargin+[-g,g,w.f,-g][this.side];return{x:a?b+r:d+(v?this.width:
0)+m+r,y:a?d+e-(v?this.height:0)+m:b+e}},renderMinorTick:function(a){var d=this.chart.hasRendered&&C(this.oldMin),k=this.minorTicks;k[a]||(k[a]=new n(this,a,"minor"));d&&k[a].isNew&&k[a].render(null,!0);k[a].render(null,!1,1)},renderTick:function(a,d){var k=this.isLinked,f=this.ticks,b=this.chart.hasRendered&&C(this.oldMin);if(!k||a>=this.min&&a<=this.max)f[a]||(f[a]=new n(this,a)),b&&f[a].isNew&&f[a].render(d,!0,.1),f[a].render(d)},render:function(){var k=this,b=k.chart,c=k.options,v=k.isLog,m=k.lin2log,
r=k.isLinked,g=k.tickPositions,w=k.axisTitle,h=k.ticks,G=k.minorTicks,x=k.alternateBands,A=c.stackLabels,H=c.alternateGridColor,J=k.tickmarkOffset,l=k.axisLine,q=k.showAxis,p=D(b.renderer.globalAnimation),K,u;k.labelEdge.length=0;k.overlap=!1;e([h,G,x],function(a){f(a,function(a){a.isActive=!1})});if(k.hasData()||r)k.minorTickInterval&&!k.categories&&e(k.getMinorTickPositions(),function(a){k.renderMinorTick(a)}),g.length&&(e(g,function(a,d){k.renderTick(a,d)}),J&&(0===k.min||k.single)&&(h[-1]||(h[-1]=
new n(k,-1,null,!0)),h[-1].render(-1))),H&&e(g,function(d,f){u=void 0!==g[f+1]?g[f+1]+J:k.max-J;0===f%2&&d<k.max&&u<=k.max+(b.polar?-J:J)&&(x[d]||(x[d]=new a.PlotLineOrBand(k)),K=d+J,x[d].options={from:v?m(K):K,to:v?m(u):u,color:H},x[d].render(),x[d].isActive=!0)}),k._addedPlotLB||(e((c.plotLines||[]).concat(c.plotBands||[]),function(a){k.addPlotBandOrLine(a)}),k._addedPlotLB=!0);e([h,G,x],function(a){var k,n=[],c=p.duration;f(a,function(a,d){a.isActive||(a.render(d,!1,0),a.isActive=!1,n.push(d))});
d(function(){for(k=n.length;k--;)a[n[k]]&&!a[n[k]].isActive&&(a[n[k]].destroy(),delete a[n[k]])},a!==x&&b.hasRendered&&c?c:0)});l&&(l[l.isPlaced?"animate":"attr"]({d:this.getLinePath(l.strokeWidth())}),l.isPlaced=!0,l[q?"show":"hide"](!0));w&&q&&(c=k.getTitlePosition(),C(c.y)?(w[w.isNew?"attr":"animate"](c),w.isNew=!1):(w.attr("y",-9999),w.isNew=!0));A&&A.enabled&&k.renderStackTotals();k.isDirty=!1},redraw:function(){this.visible&&(this.render(),e(this.plotLinesAndBands,function(a){a.render()}));
e(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var d=this,k=d.stacks,b=d.plotLinesAndBands,n;a||J(d);f(k,function(a,d){B(a);k[d]=null});e([d.ticks,d.minorTicks,d.alternateBands],function(a){B(a)});if(b)for(a=b.length;a--;)b[a].destroy();e("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){d[a]&&(d[a]=d[a].destroy())});for(n in d.plotLinesAndBandsGroups)d.plotLinesAndBandsGroups[n]=
d.plotLinesAndBandsGroups[n].destroy();f(d,function(a,k){-1===m(k,d.keepProps)&&delete d[k]})},drawCrosshair:function(a,d){var f,k=this.crosshair,b=x(k.snap,!0),n,c=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(q(d)||!b)?(b?q(d)&&(n=this.isXAxis?d.plotX:this.len-d.plotY):n=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),q(n)&&(f=this.getPlotLinePath(d&&(this.isXAxis?d.x:x(d.stackY,d.y)),null,null,null,n)||null),q(f)?(d=this.categories&&!this.isRadial,c||(this.cross=
c=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(d?"category ":"thin ")+k.className).attr({zIndex:x(k.zIndex,2)}).add(),c.attr({stroke:k.color||(d?l("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":x(k.width,1)}).css({"pointer-events":"none"}),k.dashStyle&&c.attr({dashstyle:k.dashStyle})),c.show().attr({d:f}),d&&!k.width&&c.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&
this.cross.hide()}});return a.Axis=G}(L);(function(a){var E=a.Axis,D=a.Date,F=a.dateFormat,t=a.defaultOptions,l=a.defined,p=a.each,z=a.extend,q=a.getMagnitude,u=a.getTZOffset,B=a.normalizeTickInterval,e=a.pick,h=a.timeUnits;E.prototype.getTimeTicks=function(a,c,b,w){var m=[],r={},g=t.global.useUTC,H,A=new D(c-Math.max(u(c),u(b))),q=D.hcMakeTime,f=a.unitRange,x=a.count,J,v;if(l(c)){A[D.hcSetMilliseconds](f>=h.second?0:x*Math.floor(A.getMilliseconds()/x));if(f>=h.second)A[D.hcSetSeconds](f>=h.minute?
0:x*Math.floor(A.getSeconds()/x));if(f>=h.minute)A[D.hcSetMinutes](f>=h.hour?0:x*Math.floor(A[D.hcGetMinutes]()/x));if(f>=h.hour)A[D.hcSetHours](f>=h.day?0:x*Math.floor(A[D.hcGetHours]()/x));if(f>=h.day)A[D.hcSetDate](f>=h.month?1:x*Math.floor(A[D.hcGetDate]()/x));f>=h.month&&(A[D.hcSetMonth](f>=h.year?0:x*Math.floor(A[D.hcGetMonth]()/x)),H=A[D.hcGetFullYear]());if(f>=h.year)A[D.hcSetFullYear](H-H%x);if(f===h.week)A[D.hcSetDate](A[D.hcGetDate]()-A[D.hcGetDay]()+e(w,1));H=A[D.hcGetFullYear]();w=A[D.hcGetMonth]();
var d=A[D.hcGetDate](),n=A[D.hcGetHours]();if(D.hcTimezoneOffset||D.hcGetTimezoneOffset)v=(!g||!!D.hcGetTimezoneOffset)&&(b-c>4*h.month||u(c)!==u(b)),A=A.getTime(),J=u(A),A=new D(A+J);g=A.getTime();for(c=1;g<b;)m.push(g),g=f===h.year?q(H+c*x,0):f===h.month?q(H,w+c*x):!v||f!==h.day&&f!==h.week?v&&f===h.hour?q(H,w,d,n+c*x,0,0,J)-J:g+f*x:q(H,w,d+c*x*(f===h.day?1:7)),c++;m.push(g);f<=h.hour&&1E4>m.length&&p(m,function(a){0===a%18E5&&"000000000"===F("%H%M%S%L",a)&&(r[a]="day")})}m.info=z(a,{higherRanks:r,
totalRange:f*x});return m};E.prototype.normalizeTimeTickInterval=function(a,c){var b=c||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];c=b[b.length-1];var g=h[c[0]],m=c[1],r;for(r=0;r<b.length&&!(c=b[r],g=h[c[0]],m=c[1],b[r+1]&&a<=(g*m[m.length-1]+h[b[r+1][0]])/2);r++);g===h.year&&a<5*g&&(m=[1,2,5]);a=B(a/g,m,"year"===c[0]?Math.max(q(a/g),1):1);return{unitRange:g,
count:a,unitName:c[0]}}})(L);(function(a){var E=a.Axis,D=a.getMagnitude,F=a.map,t=a.normalizeTickInterval,l=a.pick;E.prototype.getLogTickPositions=function(a,z,q,u){var p=this.options,e=this.len,h=this.lin2log,g=this.log2lin,c=[];u||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),c=this.getLinearTickPositions(a,z,q);else if(.08<=a)for(var e=Math.floor(z),b,w,m,r,C,p=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];e<q+1&&!C;e++)for(w=p.length,b=0;b<w&&!C;b++)m=g(h(e)*p[b]),m>z&&(!u||r<=
q)&&void 0!==r&&c.push(r),r>q&&(C=!0),r=m;else z=h(z),q=h(q),a=u?this.getMinorTickInterval():p.tickInterval,a=l("auto"===a?null:a,this._minorAutoInterval,p.tickPixelInterval/(u?5:1)*(q-z)/((u?e/this.tickPositions.length:e)||1)),a=t(a,null,D(a)),c=F(this.getLinearTickPositions(a,z,q),g),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return c};E.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};E.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a,E){var D=a.arrayMax,
F=a.arrayMin,t=a.defined,l=a.destroyObjectProperties,p=a.each,z=a.erase,q=a.merge,u=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=e,this.id=e.id)};a.PlotLineOrBand.prototype={render:function(){var l=this,e=l.axis,h=e.horiz,g=l.options,c=g.label,b=l.label,w=g.to,m=g.from,r=g.value,C=t(m)&&t(w),H=t(r),A=l.svgElem,K=!A,f=[],x=g.color,J=u(g.zIndex,0),v=g.events,f={"class":"highcharts-plot-"+(C?"band ":"line ")+(g.className||"")},d={},n=e.chart.renderer,G=C?"bands":"lines",k=e.log2lin;
e.isLog&&(m=k(m),w=k(w),r=k(r));H?(f={stroke:x,"stroke-width":g.width},g.dashStyle&&(f.dashstyle=g.dashStyle)):C&&(x&&(f.fill=x),g.borderWidth&&(f.stroke=g.borderColor,f["stroke-width"]=g.borderWidth));d.zIndex=J;G+="-"+J;(x=e.plotLinesAndBandsGroups[G])||(e.plotLinesAndBandsGroups[G]=x=n.g("plot-"+G).attr(d).add());K&&(l.svgElem=A=n.path().attr(f).add(x));if(H)f=e.getPlotLinePath(r,A.strokeWidth());else if(C)f=e.getPlotBandPath(m,w,g);else return;K&&f&&f.length?(A.attr({d:f}),v&&a.objectEach(v,function(a,
d){A.on(d,function(a){v[d].apply(l,[a])})})):A&&(f?(A.show(),A.animate({d:f})):(A.hide(),b&&(l.label=b=b.destroy())));c&&t(c.text)&&f&&f.length&&0<e.width&&0<e.height&&!f.flat?(c=q({align:h&&C&&"center",x:h?!C&&4:10,verticalAlign:!h&&C&&"middle",y:h?C?16:10:C?6:-4,rotation:h&&!C&&90},c),this.renderLabel(c,f,C,J)):b&&b.hide();return l},renderLabel:function(a,e,h,g){var c=this.label,b=this.axis.chart.renderer;c||(c={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(h?"band":
"line")+"-label "+(a.className||"")},c.zIndex=g,this.label=c=b.text(a.text,0,0,a.useHTML).attr(c).add(),c.css(a.style));g=e.xBounds||[e[1],e[4],h?e[6]:e[1]];e=e.yBounds||[e[2],e[5],h?e[7]:e[2]];h=F(g);b=F(e);c.align(a,!1,{x:h,y:b,width:D(g)-h,height:D(e)-b});c.show()},destroy:function(){z(this.axis.plotLinesAndBands,this);delete this.axis;l(this)}};a.extend(E.prototype,{getPlotBandPath:function(a,e){var h=this.getPlotLinePath(e,null,null,!0),g=this.getPlotLinePath(a,null,null,!0),c=[],b=this.horiz,
w=1,m;a=a<this.min&&e<this.min||a>this.max&&e>this.max;if(g&&h)for(a&&(m=g.toString()===h.toString(),w=0),a=0;a<g.length;a+=6)b&&h[a+1]===g[a+1]?(h[a+1]+=w,h[a+4]+=w):b||h[a+2]!==g[a+2]||(h[a+2]+=w,h[a+5]+=w),c.push("M",g[a+1],g[a+2],"L",g[a+4],g[a+5],h[a+4],h[a+5],h[a+1],h[a+2],"z"),c.flat=m;return c},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(l,e){var h=(new a.PlotLineOrBand(this,
l)).render(),g=this.userOptions;h&&(e&&(g[e]=g[e]||[],g[e].push(l)),this.plotLinesAndBands.push(h));return h},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,h=this.options,g=this.userOptions,c=e.length;c--;)e[c].id===a&&e[c].destroy();p([h.plotLines||[],g.plotLines||[],h.plotBands||[],g.plotBands||[]],function(b){for(c=b.length;c--;)b[c].id===a&&z(b,b[c])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(L,Z);
(function(a){var E=a.dateFormat,D=a.each,F=a.extend,t=a.format,l=a.isNumber,p=a.map,z=a.merge,q=a.pick,u=a.splat,B=a.syncTimeout,e=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,g){this.chart=a;this.options=g;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=g.split&&!a.inverted;this.shared=g.shared||this.split},cleanSplit:function(a){D(this.chart.series,function(g){var c=g&&g.tt;c&&(!c.isActive||a?g.tt=c.destroy():c.isActive=
!1)})},getLabel:function(){var a=this.chart.renderer,g=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,g.shape||"callout",null,null,g.useHTML,null,"tooltip").attr({padding:g.padding,r:g.borderRadius}),this.label.attr({fill:g.backgroundColor,"stroke-width":g.borderWidth}).css(g.style).shadow(g.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();z(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,
z(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,g,c,b){var e=this,m=e.now,r=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(a-m.x)||1<Math.abs(g-m.y)),h=e.followPointer||1<e.len;F(m,{x:r?(2*m.x+a)/3:a,y:r?(m.y+g)/2:g,anchorX:h?void 0:r?(2*m.anchorX+c)/3:c,anchorY:h?void 0:r?(m.anchorY+b)/2:b});e.getLabel().attr(m);
r&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,g,c,b)},32))},hide:function(a){var g=this;clearTimeout(this.hideTimer);a=q(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=B(function(){g.getLabel()[a?"fadeOut":"hide"]();g.isHidden=!0},a))},getAnchor:function(a,g){var c,b=this.chart,e=b.inverted,m=b.plotTop,r=b.plotLeft,h=0,H=0,A,l;a=u(a);c=a[0].tooltipPos;this.followPointer&&g&&(void 0===g.chartX&&(g=b.pointer.normalize(g)),c=[g.chartX-b.plotLeft,
g.chartY-m]);c||(D(a,function(a){A=a.series.yAxis;l=a.series.xAxis;h+=a.plotX+(!e&&l?l.left-r:0);H+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&A?A.top-m:0)}),h/=a.length,H/=a.length,c=[e?b.plotWidth-H:h,this.shared&&!e&&1<a.length&&g?g.chartY-m:e?b.plotHeight-h:H]);return p(c,Math.round)},getPosition:function(a,e,c){var b=this.chart,g=this.distance,m={},r=b.inverted&&c.h||0,h,H=["y",b.chartHeight,e,c.plotY+b.plotTop,b.plotTop,b.plotTop+b.plotHeight],A=["x",b.chartWidth,a,c.plotX+b.plotLeft,
b.plotLeft,b.plotLeft+b.plotWidth],l=!this.followPointer&&q(c.ttBelow,!b.inverted===!!c.negative),f=function(a,f,b,k,c,v){var d=b<k-g,n=k+g+b<f,e=k-g-b;k+=g;if(l&&n)m[a]=k;else if(!l&&d)m[a]=e;else if(d)m[a]=Math.min(v-b,0>e-r?e:e-r);else if(n)m[a]=Math.max(c,k+r+b>f?k:k+r);else return!1},x=function(a,f,b,k){var d;k<g||k>f-g?d=!1:m[a]=k<b/2?1:k>f-b/2?f-b-2:k-b/2;return d},J=function(a){var d=H;H=A;A=d;h=a},v=function(){!1!==f.apply(0,H)?!1!==x.apply(0,A)||h||(J(!0),v()):h?m.x=m.y=0:(J(!0),v())};(b.inverted||
1<this.len)&&J();v();return m},defaultFormatter:function(a){var e=this.points||u(this),c;c=[a.tooltipFooterHeaderFormatter(e[0])];c=c.concat(a.bodyFormatter(e));c.push(a.tooltipFooterHeaderFormatter(e[0],!0));return c},refresh:function(a,e){var c,b=this.options,g,m=a,r,h={},H=[];c=b.formatter||this.defaultFormatter;var h=this.shared,A;b.enabled&&(clearTimeout(this.hideTimer),this.followPointer=u(m)[0].series.tooltipOptions.followPointer,r=this.getAnchor(m,e),e=r[0],g=r[1],!h||m.series&&m.series.noSharedTooltip?
h=m.getLabelConfig():(D(m,function(a){a.setState("hover");H.push(a.getLabelConfig())}),h={x:m[0].category,y:m[0].y},h.points=H,m=m[0]),this.len=H.length,h=c.call(h,this),A=m.series,this.distance=q(A.tooltipOptions.distance,16),!1===h?this.hide():(c=this.getLabel(),this.isHidden&&c.attr({opacity:1}).show(),this.split?this.renderSplit(h,u(a)):(b.style.width||c.css({width:this.chart.spacingBox.width}),c.attr({text:h&&h.join?h.join(""):h}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+
q(m.colorIndex,A.colorIndex)),c.attr({stroke:b.borderColor||m.color||A.color||"#666666"}),this.updatePosition({plotX:e,plotY:g,negative:m.negative,ttBelow:m.ttBelow,h:r[2]||0})),this.isHidden=!1))},renderSplit:function(e,g){var c=this,b=[],w=this.chart,m=w.renderer,r=!0,h=this.options,H=0,A=this.getLabel();a.isString(e)&&(e=[!1,e]);D(e.slice(0,g.length+1),function(a,f){if(!1!==a){f=g[f-1]||{isHeader:!0,plotX:g[0].plotX};var e=f.series||c,C=e.tt,v=f.series||{},d="highcharts-color-"+q(f.colorIndex,
v.colorIndex,"none");C||(e.tt=C=m.label(null,null,null,"callout",null,null,h.useHTML).addClass("highcharts-tooltip-box "+d).attr({padding:h.padding,r:h.borderRadius,fill:h.backgroundColor,stroke:h.borderColor||f.color||v.color||"#333333","stroke-width":h.borderWidth}).add(A));C.isActive=!0;C.attr({text:a});C.css(h.style).shadow(h.shadow);a=C.getBBox();v=a.width+C.strokeWidth();f.isHeader?(H=a.height,v=Math.max(0,Math.min(f.plotX+w.plotLeft-v/2,w.chartWidth-v))):v=f.plotX+w.plotLeft-q(h.distance,16)-
v;0>v&&(r=!1);a=(f.series&&f.series.yAxis&&f.series.yAxis.pos)+(f.plotY||0);a-=w.plotTop;b.push({target:f.isHeader?w.plotHeight+H:a,rank:f.isHeader?1:0,size:e.tt.getBBox().height+1,point:f,x:v,tt:C})}});this.cleanSplit();a.distribute(b,w.plotHeight+H);D(b,function(a){var f=a.point,b=f.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:r||f.isHeader?a.x:f.plotX+w.plotLeft+q(h.distance,16),y:a.pos+w.plotTop,anchorX:f.isHeader?f.plotX+w.plotLeft:f.plotX+b.xAxis.pos,anchorY:f.isHeader?a.pos+
w.plotTop-15:f.plotY+b.yAxis.pos})})},updatePosition:function(a){var e=this.chart,c=this.getLabel(),c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(Math.round(c.x),Math.round(c.y||0),a.plotX+e.plotLeft,a.plotY+e.plotTop)},getDateFormat:function(a,g,c,b){var w=E("%m-%d %H:%M:%S.%L",g),m,r,h={millisecond:15,second:12,minute:9,hour:6,day:3},H="millisecond";for(r in e){if(a===e.week&&+E("%w",g)===c&&"00:00:00.000"===w.substr(6)){r="week";break}if(e[r]>a){r=H;break}if(h[r]&&
w.substr(h[r])!=="01-01 00:00:00.000".substr(h[r]))break;"week"!==r&&(H=r)}r&&(m=b[r]);return m},getXDateFormat:function(a,e,c){e=e.dateTimeLabelFormats;var b=c&&c.closestPointRange;return(b?this.getDateFormat(b,a.x,c.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(a,e){e=e?"footer":"header";var c=a.series,b=c.tooltipOptions,g=b.xDateFormat,m=c.xAxis,r=m&&"datetime"===m.options.type&&l(a.key),h=b[e+"Format"];r&&!g&&(g=this.getXDateFormat(a,b,m));r&&g&&D(a.point&&a.point.tooltipDateKeys||
["key"],function(a){h=h.replace("{point."+a+"}","{point."+a+":"+g+"}")});return t(h,{point:a,series:c})},bodyFormatter:function(a){return p(a,function(a){var c=a.series.tooltipOptions;return(c[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,c[(a.point.formatPrefix||"point")+"Format"])})}}})(L);(function(a){var E=a.addEvent,D=a.attr,F=a.charts,t=a.color,l=a.css,p=a.defined,z=a.each,q=a.extend,u=a.find,B=a.fireEvent,e=a.isObject,h=a.offset,g=a.pick,c=a.removeEvent,
b=a.splat,w=a.Tooltip;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};w&&(a.tooltip=new w(a,b.tooltip),this.followTouchMove=g(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,m=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(m=g(c.pinchType,m));this.zoomX=a=/x/.test(m);this.zoomY=
m=/y/.test(m);this.zoomHor=a&&!b||m&&b;this.zoomVert=m&&!b||a&&b;this.hasZoom=a||m},normalize:function(a,b){var c;c=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=h(this.chart.container));return q(a,{chartX:Math.round(c.pageX-b.left),chartY:Math.round(c.pageY-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};z(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,
b,c){var m;z(a,function(a){var r=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(c,r);if((r=e(a,!0))&&!(r=!e(m,!0)))var r=m.distX-a.distX,f=m.dist-a.dist,g=(a.series.group&&a.series.group.zIndex)-(m.series.group&&m.series.group.zIndex),r=0<(0!==r&&b?r:0!==f?f:0!==g?g:m.series.index>a.series.index?-1:1);r&&(m=a)});return m},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var c=
a.series,m=c.xAxis,c=c.yAxis;if(m&&c)return b?{chartX:m.len+m.pos-a.clientX,chartY:c.len+c.pos-a.plotY}:{chartX:a.clientX+m.pos,chartY:a.plotY+c.pos}},getHoverData:function(b,c,w,h,A,l,f){var m,r=[],v=f&&f.isBoosting;h=!(!h||!b);f=c&&!c.stickyTracking?[c]:a.grep(w,function(a){return a.visible&&!(!A&&a.directTouch)&&g(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(m=h?b:this.findNearestKDPoint(f,A,l))&&m.series;m&&(A&&!c.noSharedTooltip?(f=a.grep(w,function(a){return a.visible&&!(!A&&a.directTouch)&&
g(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),z(f,function(a){var d=u(a.points,function(a){return a.x===m.x&&!a.isNull});e(d)&&(v&&(d=a.getPoint(d)),r.push(d))})):r.push(m));return{hoverPoint:m,hoverSeries:c,hoverPoints:r}},runPointActions:function(b,c){var m=this.chart,e=m.tooltip&&m.tooltip.options.enabled?m.tooltip:void 0,r=e?e.shared:!1,w=c||m.hoverPoint,f=w&&w.series||m.hoverSeries,f=this.getHoverData(w,f,m.series,!!c||f&&f.directTouch&&this.isDirectTouch,r,b,{isBoosting:m.isBoosting}),
h,w=f.hoverPoint;h=f.hoverPoints;c=(f=f.hoverSeries)&&f.tooltipOptions.followPointer;r=r&&f&&!f.noSharedTooltip;if(w&&(w!==m.hoverPoint||e&&e.isHidden)){z(m.hoverPoints||[],function(b){-1===a.inArray(b,h)&&b.setState()});z(h||[],function(a){a.setState("hover")});if(m.hoverSeries!==f)f.onMouseOver();m.hoverPoint&&m.hoverPoint.firePointEvent("mouseOut");if(!w.series)return;w.firePointEvent("mouseOver");m.hoverPoints=h;m.hoverPoint=w;e&&e.refresh(r?h:w,b)}else c&&e&&!e.isHidden&&(w=e.getAnchor([{}],
b),e.updatePosition({plotX:w[0],plotY:w[1]}));this.unDocMouseMove||(this.unDocMouseMove=E(m.container.ownerDocument,"mousemove",function(b){var f=F[a.hoverChartIndex];if(f)f.pointer.onDocumentMouseMove(b)}));z(m.axes,function(f){var c=g(f.crosshair.snap,!0),d=c?a.find(h,function(a){return a.series[f.coll]===f}):void 0;d||!c?f.drawCrosshair(b,d):f.hideCrosshair()})},reset:function(a,c){var m=this.chart,e=m.hoverSeries,r=m.hoverPoint,g=m.hoverPoints,f=m.tooltip,w=f&&f.shared?g:r;a&&w&&z(b(w),function(b){b.series.isCartesian&&
void 0===b.plotX&&(a=!1)});if(a)f&&w&&(f.refresh(w),r&&(r.setState(r.state,!0),z(m.axes,function(a){a.crosshair&&a.drawCrosshair(null,r)})));else{if(r)r.onMouseOut();g&&z(g,function(a){a.setState()});if(e)e.onMouseOut();f&&f.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());z(m.axes,function(a){a.hideCrosshair()});this.hoverX=m.hoverPoints=m.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,m;z(c.series,function(e){m=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&
e.group&&(e.group.attr(m),e.markerGroup&&(e.markerGroup.attr(m),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(m))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,m=a.chartX,e=a.chartY,g=this.zoomHor,f=this.zoomVert,w=b.plotLeft,h=b.plotTop,v=b.plotWidth,d=b.plotHeight,n,G=this.selectionMarker,
k=this.mouseDownX,y=this.mouseDownY,l=c.panKey&&a[c.panKey+"Key"];G&&G.touch||(m<w?m=w:m>w+v&&(m=w+v),e<h?e=h:e>h+d&&(e=h+d),this.hasDragged=Math.sqrt(Math.pow(k-m,2)+Math.pow(y-e,2)),10<this.hasDragged&&(n=b.isInsidePlot(k-w,y-h),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&n&&!l&&!G&&(this.selectionMarker=G=b.renderer.rect(w,h,g?1:v,f?1:d,0).attr({fill:c.selectionMarkerFill||t("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),G&&g&&(m-=k,G.attr({width:Math.abs(m),
x:(0<m?0:m)+k})),G&&f&&(m=e-y,G.attr({height:Math.abs(m),y:(0<m?0:m)+y})),n&&!G&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,m=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},g=this.selectionMarker,f=g.attr?g.attr("x"):g.x,w=g.attr?g.attr("y"):g.y,h=g.attr?g.attr("width"):g.width,v=g.attr?g.attr("height"):g.height,d;if(this.hasDragged||m)z(c.axes,function(n){if(n.zoomEnabled&&p(n.min)&&(m||b[{xAxis:"zoomX",yAxis:"zoomY"}[n.coll]])){var c=
n.horiz,k="touchend"===a.type?n.minPixelPadding:0,r=n.toValue((c?f:w)+k),c=n.toValue((c?f+h:w+v)-k);e[n.coll].push({axis:n,min:Math.min(r,c),max:Math.max(r,c)});d=!0}}),d&&B(c,"selection",e,function(a){c.zoom(q(a,m?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();m&&this.scaleGroups()}c&&(l(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);
this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){F[a.hoverChartIndex]&&F[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=F[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=
null)},onContainerMouseMove:function(b){var c=this.chart;p(a.hoverChartIndex)&&F[a.hoverChartIndex]&&F[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var c;a;){if(c=D(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=
a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,m=b.plotLeft,e=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(B(c.series,"click",q(a,{point:c})),
b.hoverPoint&&c.firePointEvent("click",a)):(q(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-m,a.chartY-e)&&B(b,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container,e=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};E(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&E(e,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},
c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&E(e,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b=this,e=this.chart.container.ownerDocument;b.unDocMouseMove&&b.unDocMouseMove();c(b.chart.container,"mouseleave",b.onContainerMouseLeave);a.chartCount||(c(e,"mouseup",b.onDocumentMouseUp),a.hasTouch&&c(e,"touchend",b.onDocumentTouchEnd));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,c){b[c]=null})}}})(L);(function(a){var E=a.charts,D=a.each,F=a.extend,t=
a.map,l=a.noop,p=a.pick;F(a.Pointer.prototype,{pinchTranslate:function(a,l,p,t,e,h){this.zoomHor&&this.pinchTranslateDirection(!0,a,l,p,t,e,h);this.zoomVert&&this.pinchTranslateDirection(!1,a,l,p,t,e,h)},pinchTranslateDirection:function(a,l,p,t,e,h,g,c){var b=this.chart,w=a?"x":"y",m=a?"X":"Y",r="chart"+m,C=a?"width":"height",q=b["plot"+(a?"Left":"Top")],A,u,f=c||1,x=b.inverted,J=b.bounds[a?"h":"v"],v=1===l.length,d=l[0][r],n=p[0][r],G=!v&&l[1][r],k=!v&&p[1][r],y;p=function(){!v&&20<Math.abs(d-G)&&
(f=c||Math.abs(n-k)/Math.abs(d-G));u=(q-n)/f+d;A=b["plot"+(a?"Width":"Height")]/f};p();l=u;l<J.min?(l=J.min,y=!0):l+A>J.max&&(l=J.max-A,y=!0);y?(n-=.8*(n-g[w][0]),v||(k-=.8*(k-g[w][1])),p()):g[w]=[n,k];x||(h[w]=u-q,h[C]=A);h=x?1/f:f;e[C]=A;e[w]=l;t[x?a?"scaleY":"scaleX":"scale"+m]=f;t["translate"+m]=h*q+(n-h*d)},pinch:function(a){var q=this,u=q.chart,z=q.pinchDown,e=a.touches,h=e.length,g=q.lastValidTouch,c=q.hasZoom,b=q.selectionMarker,w={},m=1===h&&(q.inClass(a.target,"highcharts-tracker")&&u.runTrackerClick||
q.runChartClick),r={};1<h&&(q.initiated=!0);c&&q.initiated&&!m&&a.preventDefault();t(e,function(a){return q.normalize(a)});"touchstart"===a.type?(D(e,function(a,b){z[b]={chartX:a.chartX,chartY:a.chartY}}),g.x=[z[0].chartX,z[1]&&z[1].chartX],g.y=[z[0].chartY,z[1]&&z[1].chartY],D(u.axes,function(a){if(a.zoomEnabled){var b=u.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,e=a.toPixels(p(a.options.min,a.dataMin)),f=a.toPixels(p(a.options.max,a.dataMax)),m=Math.max(e,f);b.min=Math.min(a.pos,Math.min(e,f)-
c);b.max=Math.max(a.pos+a.len,m+c)}}),q.res=!0):q.followTouchMove&&1===h?this.runPointActions(q.normalize(a)):z.length&&(b||(q.selectionMarker=b=F({destroy:l,touch:!0},u.plotBox)),q.pinchTranslate(z,e,w,b,r,g),q.hasPinched=c,q.scaleGroups(w,r),q.res&&(q.res=!1,this.reset(!1,0)))},touch:function(l,q){var u=this.chart,t,e;if(u.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=u.index;1===l.touches.length?(l=this.normalize(l),(e=u.isInsidePlot(l.chartX-u.plotLeft,
l.chartY-u.plotTop))&&!u.openMenu?(q&&this.runPointActions(l),"touchmove"===l.type&&(q=this.pinchDown,t=q[0]?4<=Math.sqrt(Math.pow(q[0].chartX-l.chartX,2)+Math.pow(q[0].chartY-l.chartY,2)):!1),p(t,!0)&&this.pinch(l)):q&&this.reset()):2===l.touches.length&&this.pinch(l)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(l){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(l)}})})(L);(function(a){var E=
a.addEvent,D=a.charts,F=a.css,t=a.doc,l=a.extend,p=a.noop,z=a.Pointer,q=a.removeEvent,u=a.win,B=a.wrap;if(!a.hasTouch&&(u.PointerEvent||u.MSPointerEvent)){var e={},h=!!u.PointerEvent,g=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(e,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},c=function(b,c,e,r){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!D[a.hoverChartIndex]||(r(b),r=D[a.hoverChartIndex].pointer,r[c]({type:e,target:b.currentTarget,
preventDefault:p,touches:g()}))};l(z.prototype,{onContainerPointerDown:function(a){c(a,"onContainerTouchStart","touchstart",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){c(a,"onContainerTouchMove","touchmove",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY};e[a.pointerId].target||(e[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){c(a,"onDocumentTouchEnd","touchend",function(a){delete e[a.pointerId]})},
batchMSEvents:function(a){a(this.chart.container,h?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,h?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(t,h?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});B(z.prototype,"init",function(a,c,e){a.call(this,c,e);this.hasZoom&&F(c.container,{"-ms-touch-action":"none","touch-action":"none"})});B(z.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(E)});
B(z.prototype,"destroy",function(a){this.batchMSEvents(q);a.call(this)})}})(L);(function(a){var E=a.addEvent,D=a.css,F=a.discardElement,t=a.defined,l=a.each,p=a.isFirefox,z=a.marginNames,q=a.merge,u=a.pick,B=a.setAnimation,e=a.stableSort,h=a.win,g=a.wrap;a.Legend=function(a,b){this.init(a,b)};a.Legend.prototype={init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),E(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=u(a.padding,
8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=q(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=u(a.symbolWidth,16);this.pages=[]},update:function(a,b){var c=this.chart;this.setOptions(q(!0,this.options,a));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;u(b,!0)&&c.redraw()},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");
var c=this.options,e=a.legendItem,g=a.legendLine,h=a.legendSymbol,l=this.itemHiddenStyle.color,c=b?c.itemStyle.color:l,A=b?a.color||l:l,q=a.options&&a.options.marker,f={fill:A};e&&e.css({fill:c,color:c});g&&g.attr({stroke:A});h&&(q&&h.isMarker&&(f=a.pointAttribs(),b||(f.stroke=f.fill=l)),h.attr(f))},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,e=a._legendItemPos,g=e[0],e=e[1],h=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?g:this.legendWidth-g-2*c-4,e);h&&(h.x=g,
h.y=e)},destroyItem:function(a){var b=a.checkbox;l(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}l(this.getAllItems(),function(b){l(["legendItem","legendGroup"],a,b)});l("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,c,e=this.clipHeight||this.legendHeight,
g=this.titleHeight;b&&(c=b.translateY,l(this.allItems,function(m){var r=m.checkbox,h;r&&(h=c+g+r.y+(a||0)+3,D(r,{left:b.translateX+m.checkboxOffset+r.x-20+"px",top:h+"px",display:h>c-6&&h<c+e-6?"":"none"}))}))},renderTitle:function(){var a=this.options,b=this.padding,e=a.title,m=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,b-3,b-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(e.style).add(this.group)),a=this.title.getBBox(),m=a.height,this.offsetWidth=a.width,
this.contentGroup.attr({translateY:m}));this.titleHeight=m},setText:function(c){var b=this.options;c.legendItem.attr({text:b.labelFormat?a.format(b.labelFormat,c):b.labelFormatter.call(c)})},renderItem:function(a){var b=this.chart,c=b.renderer,e=this.options,g="horizontal"===e.layout,h=this.symbolWidth,l=e.symbolPadding,A=this.itemStyle,p=this.itemHiddenStyle,f=this.padding,x=g?u(e.itemDistance,20):0,J=!e.rtl,v=e.width,d=e.itemMarginBottom||0,n=this.itemMarginTop,G=a.legendItem,k=!a.series,y=!k&&
a.series.drawLegendSymbol?a.series:a,t=y.options,M=this.createCheckboxForItem&&t&&t.showCheckbox,t=h+l+x+(M?20:0),z=e.useHTML,N=a.options.className;G||(a.legendGroup=c.g("legend-item").addClass("highcharts-"+y.type+"-series highcharts-color-"+a.colorIndex+(N?" "+N:"")+(k?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=G=c.text("",J?h+l:-l,this.baseline||0,z).css(q(a.visible?A:p)).attr({align:J?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(h=A.fontSize,
this.fontMetrics=c.fontMetrics(h,G),this.baseline=this.fontMetrics.f+3+n,G.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,y.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,G,z),M&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);A.width||G.css({width:(e.itemWidth||e.width||b.spacingBox.width)-t});this.setText(a);c=G.getBBox();A=a.checkboxOffset=e.itemWidth||a.legendItemWidth||c.width+t;this.itemHeight=c=Math.round(a.legendItemHeight||c.height||
this.symbolHeight);g&&this.itemX-f+A>(v||b.spacingBox.width-2*f-e.x)&&(this.itemX=f,this.itemY+=n+this.lastLineHeight+d,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,A);this.lastItemY=n+this.itemY+d;this.lastLineHeight=Math.max(c,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];g?this.itemX+=A:(this.itemY+=n+c+d,this.lastLineHeight=c);this.offsetWidth=v||Math.max((g?this.itemX-f-(a.checkbox?0:x):A)+f,this.offsetWidth)},getAllItems:function(){var a=[];l(this.chart.series,
function(b){var c=b&&b.options;b&&u(c.showInLegend,t(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});return a},adjustMargins:function(a,b){var c=this.chart,e=this.options,g=e.align.charAt(0)+e.verticalAlign.charAt(0)+e.layout.charAt(0);e.floating||l([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(m,h){m.test(g)&&!t(a[h])&&(c[z[h]]=Math.max(c[z[h]],c.legend[(h+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][h]*e[h%2?"x":"y"]+u(e.margin,
12)+b[h]))})},render:function(){var a=this,b=a.chart,g=b.renderer,m=a.group,h,C,p,A,u=a.box,f=a.options,x=a.padding;a.itemX=x;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;m||(a.group=m=g.g("legend").attr({zIndex:7}).add(),a.contentGroup=g.g().attr({zIndex:1}).add(m),a.scrollGroup=g.g().add(a.contentGroup));a.renderTitle();h=a.getAllItems();e(h,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});f.reversed&&h.reverse();a.allItems=h;a.display=C=
!!h.length;a.lastLineHeight=0;l(h,function(b){a.renderItem(b)});p=(f.width||a.offsetWidth)+x;A=a.lastItemY+a.lastLineHeight+a.titleHeight;A=a.handleOverflow(A);A+=x;u||(a.box=u=g.rect().addClass("highcharts-legend-box").attr({r:f.borderRadius}).add(m),u.isNew=!0);u.attr({stroke:f.borderColor,"stroke-width":f.borderWidth||0,fill:f.backgroundColor||"none"}).shadow(f.shadow);0<p&&0<A&&(u[u.isNew?"attr":"animate"](u.crisp.call({},{x:0,y:0,width:p,height:A},u.strokeWidth())),u.isNew=!1);u[C?"show":"hide"]();
a.legendWidth=p;a.legendHeight=A;l(h,function(b){a.positionItem(b)});C&&m.align(q(f,{width:p,height:A}),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,e=c.renderer,g=this.options,h=g.y,q=this.padding,c=c.spacingBox.height+("top"===g.verticalAlign?-h:h)-q,h=g.maxHeight,A,p=this.clipRect,f=g.navigation,x=u(f.animation,!0),J=f.arrowSize||12,v=this.nav,d=this.pages,n,G=this.allItems,k=function(a){"number"===typeof a?p.attr({height:a}):p&&(b.clipRect=
p.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+q+"px,9999px,"+(q+a)+"px,0)":"auto")};"horizontal"!==g.layout||"middle"===g.verticalAlign||g.floating||(c/=2);h&&(c=Math.min(c,h));d.length=0;a>c&&!1!==f.enabled?(this.clipHeight=A=Math.max(c-20-this.titleHeight-q,0),this.currentPage=u(this.currentPage,1),this.fullHeight=a,l(G,function(a,b){var f=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var k=d.length;if(!k||f-d[k-1]>A&&(n||f)!==
d[k-1])d.push(n||f),k++;b===G.length-1&&f+a-d[k-1]>A&&d.push(f);f!==n&&(n=f)}),p||(p=b.clipRect=e.clipRect(0,q,9999,0),b.contentGroup.clip(p)),k(A),v||(this.nav=v=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,J,J).on("click",function(){b.scroll(-1,x)}).add(v),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").css(f.style).add(v),this.down=e.symbol("triangle-down",0,0,J,J).on("click",function(){b.scroll(1,x)}).add(v)),b.scroll(0),a=c):v&&(k(),this.nav=v.destroy(),
this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,b){var c=this.pages,e=c.length;a=this.currentPage+a;var g=this.clipHeight,h=this.options.navigation,l=this.pager,A=this.padding;a>e&&(a=e);0<a&&(void 0!==b&&B(b,this.chart),this.nav.attr({translateX:A,translateY:g+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),l.attr({text:a+"/"+e}),this.down.attr({x:18+this.pager.getBBox().width,
"class":a===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?h.inactiveColor:h.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===e?h.inactiveColor:h.activeColor}).css({cursor:a===e?"default":"pointer"}),b=-c[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:b}),this.currentPage=a,this.positionCheckboxes(b))}};a.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.symbolHeight,e=a.options.squareSymbol;b.legendSymbol=
this.chart.renderer.rect(e?(a.symbolWidth-c)/2:0,a.baseline-c+1,e?c:a.symbolWidth,c,u(a.options.symbolRadius,c/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,e=a.symbolWidth,g=a.symbolHeight,h=g/2,l=this.chart.renderer,A=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var p;p={"stroke-width":b.lineWidth||0};b.dashStyle&&(p.dashstyle=b.dashStyle);this.legendLine=l.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(p).add(A);
c&&!1!==c.enabled&&(b=Math.min(u(c.radius,h),h),0===this.symbol.indexOf("url")&&(c=q(c,{width:g,height:g}),b=0),this.legendSymbol=c=l.symbol(this.symbol,e/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(A),c.isMarker=!0)}};(/Trident\/7\.0/.test(h.navigator.userAgent)||p)&&g(a.Legend.prototype,"positionItem",function(a,b){var c=this,e=function(){b._legendItemPos&&a.call(c,b)};e();setTimeout(e)})})(L);(function(a){var E=a.addEvent,D=a.animate,F=a.animObject,t=a.attr,l=a.doc,p=a.Axis,z=a.createElement,
q=a.defaultOptions,u=a.discardElement,B=a.charts,e=a.css,h=a.defined,g=a.each,c=a.extend,b=a.find,w=a.fireEvent,m=a.grep,r=a.isNumber,C=a.isObject,H=a.isString,A=a.Legend,K=a.marginNames,f=a.merge,x=a.objectEach,J=a.Pointer,v=a.pick,d=a.pInt,n=a.removeEvent,G=a.seriesTypes,k=a.splat,y=a.svg,P=a.syncTimeout,M=a.win,O=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,d,b){return new O(a,d,b)};c(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(H(a[0])||
a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(d,b){var k,n,c=d.series,e=d.plotOptions||{};d.series=null;k=f(q,d);for(n in k.plotOptions)k.plotOptions[n].tooltip=e[n]&&f(e[n].tooltip)||void 0;k.tooltip.userOptions=d.chart&&d.chart.forExport&&d.tooltip.userOptions||d.tooltip;k.series=d.series=c;this.userOptions=d;d=k.chart;n=d.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=b;this.isResizing=0;this.options=k;this.axes=[];
this.series=[];this.hasCartesianSeries=d.showAxes;var v=this;v.index=B.length;B.push(v);a.chartCount++;n&&x(n,function(a,d){E(v,d,a)});v.xAxis=[];v.yAxis=[];v.pointCount=v.colorCounter=v.symbolCounter=0;v.firstRender()},initSeries:function(d){var b=this.options.chart;(b=G[d.type||b.type||b.defaultSeriesType])||a.error(17,!0);b=new b;b.init(this,d);return b},orderSeries:function(a){var d=this.series;for(a=a||0;a<d.length;a++)d[a]&&(d[a].index=a,d[a].name=d[a].name||"Series "+(d[a].index+1))},isInsidePlot:function(a,
d,b){var k=b?d:a;a=b?a:d;return 0<=k&&k<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(d){var b=this.axes,k=this.series,f=this.pointer,n=this.legend,v=this.isDirtyLegend,e,m,h=this.hasCartesianSeries,y=this.isDirtyBox,r,G=this.renderer,x=G.isHidden(),l=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(d,this);x&&this.temporaryDisplay();this.layOutTitles();for(d=k.length;d--;)if(r=k[d],r.options.stacking&&(e=!0,r.isDirty)){m=!0;break}if(m)for(d=k.length;d--;)r=k[d],r.options.stacking&&
(r.isDirty=!0);g(k,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),v=!0);a.isDirtyData&&w(a,"updatedData")});v&&n.options.enabled&&(n.render(),this.isDirtyLegend=!1);e&&this.getStacks();h&&g(b,function(a){a.updateNames();a.setScale()});this.getMargins();h&&(g(b,function(a){a.isDirty&&(y=!0)}),g(b,function(a){var d=a.min+","+a.max;a.extKey!==d&&(a.extKey=d,l.push(function(){w(a,"afterSetExtremes",c(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(y||e)&&
a.redraw()}));y&&this.drawChartBox();w(this,"predraw");g(k,function(a){(y||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});f&&f.reset(!0);G.draw();w(this,"redraw");w(this,"render");x&&this.temporaryDisplay(!0);g(l,function(a){a.call()})},get:function(a){function d(d){return d.id===a||d.options&&d.options.id===a}var k,f=this.series,n;k=b(this.axes,d)||b(this.series,d);for(n=0;!k&&n<f.length;n++)k=b(f[n].points||[],d);return k},getAxes:function(){var a=this,d=this.options,b=d.xAxis=k(d.xAxis||
{}),d=d.yAxis=k(d.yAxis||{});g(b,function(a,d){a.index=d;a.isX=!0});g(d,function(a,d){a.index=d});b=b.concat(d);g(b,function(d){new p(a,d)})},getSelectedPoints:function(){var a=[];g(this.series,function(d){a=a.concat(m(d.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return m(this.series,function(a){return a.selected})},setTitle:function(a,d,b){var k=this,n=k.options,c;c=n.title=f({style:{color:"#333333",fontSize:n.isStock?"16px":"18px"}},n.title,a);n=n.subtitle=
f({style:{color:"#666666"}},n.subtitle,d);g([["title",a,c],["subtitle",d,n]],function(a,d){var b=a[0],f=k[b],n=a[1];a=a[2];f&&n&&(k[b]=f=f.destroy());a&&!f&&(k[b]=k.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).add(),k[b].update=function(a){k.setTitle(!d&&a,d&&a)},k[b].css(a.style))});k.layOutTitles(b)},layOutTitles:function(a){var d=0,b,k=this.renderer,f=this.spacingBox;g(["title","subtitle"],function(a){var b=this[a],n=this.options[a];a="title"===
a?-3:n.verticalAlign?0:d+2;var v;b&&(v=n.style.fontSize,v=k.fontMetrics(v,b).b,b.css({width:(n.width||f.width+n.widthAdjust)+"px"}).align(c({y:a+v},n),!1,"spacingBox"),n.floating||n.verticalAlign||(d=Math.ceil(d+b.getBBox(n.useHTML).height)))},this);b=this.titleOffset!==d;this.titleOffset=d;!this.isDirtyBox&&b&&(this.isDirtyBox=b,this.hasRendered&&v(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var d=this.options.chart,b=d.width,d=d.height,k=this.renderTo;h(b)||(this.containerWidth=
a.getStyle(k,"width"));h(d)||(this.containerHeight=a.getStyle(k,"height"));this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(d,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(d){var b=this.renderTo;if(d)for(;b&&b.style;)b.hcOrigStyle&&(a.css(b,b.hcOrigStyle),delete b.hcOrigStyle),b.hcOrigDetached&&(l.body.removeChild(b),b.hcOrigDetached=!1),b=b.parentNode;else for(;b&&b.style;){l.body.contains(b)||b.parentNode||
(b.hcOrigDetached=!0,l.body.appendChild(b));if("none"===a.getStyle(b,"display",!1)||b.hcOricDetached)b.hcOrigStyle={display:b.style.display,height:b.style.height,overflow:b.style.overflow},d={display:"block",overflow:"hidden"},b!==this.renderTo&&(d.height=0),a.css(b,d),b.offsetWidth||b.style.setProperty("display","block","important");b=b.parentNode;if(b===l.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,k=this.options,
f=k.chart,n,v;b=this.renderTo;var e=a.uniqueKey(),g;b||(this.renderTo=b=f.renderTo);H(b)&&(this.renderTo=b=l.getElementById(b));b||a.error(13,!0);n=d(t(b,"data-highcharts-chart"));r(n)&&B[n]&&B[n].hasRendered&&B[n].destroy();t(b,"data-highcharts-chart",this.index);b.innerHTML="";f.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();n=this.chartWidth;v=this.chartHeight;g=c({position:"relative",overflow:"hidden",width:n+"px",height:v+"px",textAlign:"left",lineHeight:"normal",zIndex:0,
"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},f.style);this.container=b=z("div",{id:e},g,b);this._cursor=b.style.cursor;this.renderer=new (a[f.renderer]||a.Renderer)(b,n,v,null,f.forExport,k.exporting&&k.exporting.allowHTML);this.setClassName(f.className);this.renderer.setStyle(f.style);this.renderer.chartIndex=this.index},getMargins:function(a){var d=this.spacing,b=this.margin,k=this.titleOffset;this.resetMargins();k&&!h(b[0])&&(this.plotTop=Math.max(this.plotTop,k+this.options.title.margin+d[0]));
this.legend&&this.legend.display&&this.legend.adjustMargins(b,d);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,d=a.axisOffset=[0,0,0,0],b=a.margin;a.hasCartesianSeries&&g(a.axes,function(a){a.visible&&a.getOffset()});g(K,function(k,f){h(b[f])||(a[k]+=d[f])});a.setChartSize()},reflow:function(d){var b=this,k=b.options.chart,f=b.renderTo,
n=h(k.width)&&h(k.height),c=k.width||a.getStyle(f,"width"),k=k.height||a.getStyle(f,"height"),f=d?d.target:M;if(!n&&!b.isPrinting&&c&&k&&(f===M||f===l)){if(c!==b.containerWidth||k!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=P(function(){b.container&&b.setSize(void 0,void 0,!1)},d?100:0);b.containerWidth=c;b.containerHeight=k}},initReflow:function(){var a=this,d;d=E(M,"resize",function(d){a.reflow(d)});E(a,"destroy",d)},setSize:function(d,b,k){var f=this,n=f.renderer;f.isResizing+=
1;a.setAnimation(k,f);f.oldChartHeight=f.chartHeight;f.oldChartWidth=f.chartWidth;void 0!==d&&(f.options.chart.width=d);void 0!==b&&(f.options.chart.height=b);f.getChartSize();d=n.globalAnimation;(d?D:e)(f.container,{width:f.chartWidth+"px",height:f.chartHeight+"px"},d);f.setChartSize(!0);n.setSize(f.chartWidth,f.chartHeight,k);g(f.axes,function(a){a.isDirty=!0;a.setScale()});f.isDirtyLegend=!0;f.isDirtyBox=!0;f.layOutTitles();f.getMargins();f.redraw(k);f.oldChartHeight=null;w(f,"resize");P(function(){f&&
w(f,"endResize",null,function(){--f.isResizing})},F(d).duration)},setChartSize:function(a){var d=this.inverted,b=this.renderer,f=this.chartWidth,k=this.chartHeight,n=this.options.chart,c=this.spacing,v=this.clipOffset,e,m,h,y;this.plotLeft=e=Math.round(this.plotLeft);this.plotTop=m=Math.round(this.plotTop);this.plotWidth=h=Math.max(0,Math.round(f-e-this.marginRight));this.plotHeight=y=Math.max(0,Math.round(k-m-this.marginBottom));this.plotSizeX=d?y:h;this.plotSizeY=d?h:y;this.plotBorderWidth=n.plotBorderWidth||
0;this.spacingBox=b.spacingBox={x:c[3],y:c[0],width:f-c[3]-c[1],height:k-c[0]-c[2]};this.plotBox=b.plotBox={x:e,y:m,width:h,height:y};f=2*Math.floor(this.plotBorderWidth/2);d=Math.ceil(Math.max(f,v[3])/2);b=Math.ceil(Math.max(f,v[0])/2);this.clipBox={x:d,y:b,width:Math.floor(this.plotSizeX-Math.max(f,v[1])/2-d),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(f,v[2])/2-b))};a||g(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,d=a.options.chart;
g(["margin","spacing"],function(b){var f=d[b],k=C(f)?f:[f,f,f,f];g(["Top","Right","Bottom","Left"],function(f,n){a[b][n]=v(d[b+f],k[n])})});g(K,function(d,b){a[d]=v(a.margin[b],a.spacing[b])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,d=this.renderer,b=this.chartWidth,f=this.chartHeight,k=this.chartBackground,n=this.plotBackground,c=this.plotBorder,v,e=this.plotBGImage,g=a.backgroundColor,m=a.plotBackgroundColor,h=a.plotBackgroundImage,y,r=this.plotLeft,
G=this.plotTop,w=this.plotWidth,x=this.plotHeight,l=this.plotBox,A=this.clipRect,q=this.clipBox,p="animate";k||(this.chartBackground=k=d.rect().addClass("highcharts-background").add(),p="attr");v=a.borderWidth||0;y=v+(a.shadow?8:0);g={fill:g||"none"};if(v||k["stroke-width"])g.stroke=a.borderColor,g["stroke-width"]=v;k.attr(g).shadow(a.shadow);k[p]({x:y/2,y:y/2,width:b-y-v%2,height:f-y-v%2,r:a.borderRadius});p="animate";n||(p="attr",this.plotBackground=n=d.rect().addClass("highcharts-plot-background").add());
n[p](l);n.attr({fill:m||"none"}).shadow(a.plotShadow);h&&(e?e.animate(l):this.plotBGImage=d.image(h,r,G,w,x).add());A?A.animate({width:q.width,height:q.height}):this.clipRect=d.clipRect(q);p="animate";c||(p="attr",this.plotBorder=c=d.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());c.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});c[p](c.crisp({x:r,y:G,width:w,height:x},-c.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,d=
a.options.chart,b,f=a.options.series,k,n;g(["inverted","angular","polar"],function(c){b=G[d.type||d.defaultSeriesType];n=d[c]||b&&b.prototype[c];for(k=f&&f.length;!n&&k--;)(b=G[f[k].type])&&b.prototype[c]&&(n=!0);a[c]=n})},linkSeries:function(){var a=this,d=a.series;g(d,function(a){a.linkedSeries.length=0});g(d,function(d){var b=d.options.linkedTo;H(b)&&(b=":previous"===b?a.series[d.index-1]:a.get(b))&&b.linkedParent!==d&&(b.linkedSeries.push(d),d.linkedParent=b,d.visible=v(d.options.visible,b.options.visible,
d.visible))})},renderSeries:function(){g(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&g(b.items,function(f){var k=c(b.style,f.style),n=d(k.left)+a.plotLeft,v=d(k.top)+a.plotTop+12;delete k.left;delete k.top;a.renderer.text(f.html,n,v).attr({zIndex:2}).css(k).add()})},render:function(){var a=this.axes,d=this.renderer,b=this.options,f,k,n;this.setTitle();this.legend=new A(this,b.legend);this.getStacks&&this.getStacks();this.getMargins(!0);
this.setChartSize();b=this.plotWidth;f=this.plotHeight-=21;g(a,function(a){a.setScale()});this.getAxisMargins();k=1.1<b/this.plotWidth;n=1.05<f/this.plotHeight;if(k||n)g(a,function(a){(a.horiz&&k||!a.horiz&&n)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&g(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=d.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();
this.hasRendered=!0},addCredits:function(a){var d=this;a=f(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(M.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){d.credits=d.credits.destroy();d.addCredits(a)})},destroy:function(){var d=this,b=d.axes,f=d.series,k=d.container,c,v=k&&k.parentNode;
w(d,"destroy");d.renderer.forExport?a.erase(B,d):B[d.index]=void 0;a.chartCount--;d.renderTo.removeAttribute("data-highcharts-chart");n(d);for(c=b.length;c--;)b[c]=b[c].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(c=f.length;c--;)f[c]=f[c].destroy();g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var b=d[a];b&&b.destroy&&(d[a]=b.destroy())});
k&&(k.innerHTML="",n(k),v&&u(k));x(d,function(a,b){delete d[b]})},isReadyToRender:function(){var a=this;return y||M!=M.top||"complete"===l.readyState?!0:(l.attachEvent("onreadystatechange",function(){l.detachEvent("onreadystatechange",a.firstRender);"complete"===l.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,d=a.options;if(a.isReadyToRender()){a.getContainer();w(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();g(d.series||[],function(d){a.initSeries(d)});
a.linkSeries();w(a,"beforeRender");J&&(a.pointer=new J(a,d));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){g([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);w(this,"load");w(this,"render");h(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(L);(function(a){var E,D=a.each,F=a.extend,t=a.erase,l=a.fireEvent,p=a.format,z=a.isArray,q=a.isNumber,u=a.pick,B=a.removeEvent;
a.Point=E=function(){};a.Point.prototype={init:function(a,h,g){this.series=a;this.color=a.color;this.applyOptions(h,g);a.options.colorByPoint?(h=a.options.colors||a.chart.options.colors,this.color=this.color||h[a.colorCounter],h=h.length,g=a.colorCounter,a.colorCounter++,a.colorCounter===h&&(a.colorCounter=0)):g=a.colorIndex;this.colorIndex=u(this.colorIndex,g);a.chart.pointCount++;return this},applyOptions:function(a,h){var e=this.series,c=e.options.pointValKey||e.pointValKey;a=E.prototype.optionsToObject.call(this,
a);F(this,a);this.options=this.options?F(this.options,a):a;a.group&&delete this.group;c&&(this.y=this[c]);this.isNull=u(this.isValid&&!this.isValid(),null===this.x||!q(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===h&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===h?e.autoIncrement(this):h);return this},optionsToObject:function(a){var e={},g=this.series,c=g.options.keys,b=c||g.pointArrayMap||["y"],w=b.length,m=0,r=0;if(q(a)||
null===a)e[b[0]]=a;else if(z(a))for(!c&&a.length>w&&(g=typeof a[0],"string"===g?e.name=a[0]:"number"===g&&(e.x=a[0]),m++);r<w;)c&&void 0===a[m]||(e[b[r]]=a[m]),m++,r++;else"object"===typeof a&&(e=a,a.dataLabels&&(g._hasPointLabels=!0),a.marker&&(g._hasPointMarkers=!0));return e},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+
this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,h=a.zones,a=a.zoneAxis||"y",g=0,c;for(c=h[g];this[a]>=c.value;)c=h[++g];c&&c.color&&!this.options.color&&(this.color=c.color);return c},destroy:function(){var a=this.series.chart,h=a.hoverPoints,g;a.pointCount--;h&&(this.setState(),t(h,this),h.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();
if(this.graphic||this.dataLabel)B(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(g in this)this[g]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],h,g=6;g--;)h=a[g],this[h]&&(this[h]=this[h].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||
this.stackTotal}},tooltipFormatter:function(a){var e=this.series,g=e.tooltipOptions,c=u(g.valueDecimals,""),b=g.valuePrefix||"",w=g.valueSuffix||"";D(e.pointArrayMap||["y"],function(e){e="{point."+e;if(b||w)a=a.replace(e+"}",b+e+"}"+w);a=a.replace(e+"}",e+":,."+c+"f}")});return p(a,{point:this,series:this.series})},firePointEvent:function(a,h,g){var c=this,b=this.series.options;(b.point.events[a]||c.options&&c.options.events&&c.options.events[a])&&this.importEvents();"click"===a&&b.allowPointSelect&&
(g=function(a){c.select&&c.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});l(this,a,h,g)},visible:!0}})(L);(function(a){var E=a.addEvent,D=a.animObject,F=a.arrayMax,t=a.arrayMin,l=a.correctFloat,p=a.Date,z=a.defaultOptions,q=a.defaultPlotOptions,u=a.defined,B=a.each,e=a.erase,h=a.extend,g=a.fireEvent,c=a.grep,b=a.isArray,w=a.isNumber,m=a.isString,r=a.merge,C=a.objectEach,H=a.pick,A=a.removeEvent,K=a.splat,f=a.SVGElement,x=a.syncTimeout,J=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,
showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,
pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,d){var b=this,f,k=a.series,c;b.chart=a;b.options=d=b.setOptions(d);b.linkedSeries=[];b.bindAxes();h(b,{name:d.name,state:"",
visible:!1!==d.visible,selected:!0===d.selected});f=d.events;C(f,function(a,d){E(b,d,a)});if(f&&f.click||d.point&&d.point.events&&d.point.events.click||d.allowPointSelect)a.runTrackerClick=!0;b.getColor();b.getSymbol();B(b.parallelArrays,function(a){b[a+"Data"]=[]});b.setData(d.data,!1);b.isCartesian&&(a.hasCartesianSeries=!0);k.length&&(c=k[k.length-1]);b._i=H(c&&c._i,-1)+1;a.orderSeries(this.insert(k))},insert:function(a){var d=this.options.index,b;if(w(d)){for(b=a.length;b--;)if(d>=H(a[b].options.index,
a[b]._i)){a.splice(b+1,0,this);break}-1===b&&a.unshift(this);b+=1}else a.push(this);return H(b,a.length-1)},bindAxes:function(){var b=this,d=b.options,f=b.chart,c;B(b.axisTypes||[],function(k){B(f[k],function(a){c=a.options;if(d[k]===c.index||void 0!==d[k]&&d[k]===c.id||void 0===d[k]&&0===c.index)b.insert(a.series),b[k]=a,a.isDirty=!0});b[k]||b.optionalAxis===k||a.error(18,!0)})},updateParallelArrays:function(a,d){var b=a.series,f=arguments,k=w(d)?function(f){var k="y"===f&&b.toYData?b.toYData(a):
a[f];b[f+"Data"][d]=k}:function(a){Array.prototype[d].apply(b[a+"Data"],Array.prototype.slice.call(f,2))};B(b.parallelArrays,k)},autoIncrement:function(){var a=this.options,d=this.xIncrement,b,f=a.pointIntervalUnit,d=H(d,a.pointStart,0);this.pointInterval=b=H(this.pointInterval,a.pointInterval,1);f&&(a=new p(d),"day"===f?a=+a[p.hcSetDate](a[p.hcGetDate]()+b):"month"===f?a=+a[p.hcSetMonth](a[p.hcGetMonth]()+b):"year"===f&&(a=+a[p.hcSetFullYear](a[p.hcGetFullYear]()+b)),b=a-d);this.xIncrement=d+b;return d},
setOptions:function(a){var d=this.chart,b=d.options,f=b.plotOptions,k=(d.userOptions||{}).plotOptions||{},c=f[this.type];this.userOptions=a;d=r(c,f.series,a);this.tooltipOptions=r(z.tooltip,z.plotOptions.series&&z.plotOptions.series.tooltip,z.plotOptions[this.type].tooltip,b.tooltip.userOptions,f.series&&f.series.tooltip,f[this.type].tooltip,a.tooltip);this.stickyTracking=H(a.stickyTracking,k[this.type]&&k[this.type].stickyTracking,k.series&&k.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?
!0:d.stickyTracking);null===c.marker&&delete d.marker;this.zoneAxis=d.zoneAxis;a=this.zones=(d.zones||[]).slice();!d.negativeColor&&!d.negativeFillColor||d.zones||a.push({value:d[this.zoneAxis+"Threshold"]||d.threshold||0,className:"highcharts-negative",color:d.negativeColor,fillColor:d.negativeFillColor});a.length&&u(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return d},getCyclic:function(a,d,b){var f,k=this.chart,n=this.userOptions,c=a+"Index",e=a+"Counter",v=b?b.length:
H(k.options.chart[a+"Count"],k[a+"Count"]);d||(f=H(n[c],n["_"+c]),u(f)||(k.series.length||(k[e]=0),n["_"+c]=f=k[e]%v,k[e]+=1),b&&(d=b[f]));void 0!==f&&(this[c]=f);this[a]=d},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||q[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(f,
d,n,c){var k=this,e=k.points,v=e&&e.length||0,g,h=k.options,r=k.chart,x=null,G=k.xAxis,l=h.turboThreshold,A=this.xData,p=this.yData,q=(g=k.pointArrayMap)&&g.length;f=f||[];g=f.length;d=H(d,!0);if(!1!==c&&g&&v===g&&!k.cropped&&!k.hasGroupedData&&k.visible)B(f,function(a,d){e[d].update&&a!==h.data[d]&&e[d].update(a,!1,null,!1)});else{k.xIncrement=null;k.colorCounter=0;B(this.parallelArrays,function(a){k[a+"Data"].length=0});if(l&&g>l){for(n=0;null===x&&n<g;)x=f[n],n++;if(w(x))for(n=0;n<g;n++)A[n]=this.autoIncrement(),
p[n]=f[n];else if(b(x))if(q)for(n=0;n<g;n++)x=f[n],A[n]=x[0],p[n]=x.slice(1,q+1);else for(n=0;n<g;n++)x=f[n],A[n]=x[0],p[n]=x[1];else a.error(12)}else for(n=0;n<g;n++)void 0!==f[n]&&(x={series:k},k.pointClass.prototype.applyOptions.apply(x,[f[n]]),k.updateParallelArrays(x,n));p&&m(p[0])&&a.error(14,!0);k.data=[];k.options.data=k.userOptions.data=f;for(n=v;n--;)e[n]&&e[n].destroy&&e[n].destroy();G&&(G.minRange=G.userMinRange);k.isDirty=r.isDirtyBox=!0;k.isDirtyData=!!e;n=!1}"point"===h.legendType&&
(this.processData(),this.generatePoints());d&&r.redraw(n)},processData:function(b){var d=this.xData,f=this.yData,c=d.length,k;k=0;var e,v,g=this.xAxis,m,h=this.options;m=h.cropThreshold;var r=this.getExtremesFromAll||h.getExtremesFromAll,x=this.isCartesian,h=g&&g.val2lin,w=g&&g.isLog,l,A;if(x&&!this.isDirty&&!g.isDirty&&!this.yAxis.isDirty&&!b)return!1;g&&(b=g.getExtremes(),l=b.min,A=b.max);if(x&&this.sorted&&!r&&(!m||c>m||this.forceCrop))if(d[c-1]<l||d[0]>A)d=[],f=[];else if(d[0]<l||d[c-1]>A)k=this.cropData(this.xData,
this.yData,l,A),d=k.xData,f=k.yData,k=k.start,e=!0;for(m=d.length||1;--m;)c=w?h(d[m])-h(d[m-1]):d[m]-d[m-1],0<c&&(void 0===v||c<v)?v=c:0>c&&this.requireSorting&&a.error(15);this.cropped=e;this.cropStart=k;this.processedXData=d;this.processedYData=f;this.closestPointRange=v},cropData:function(a,d,b,f){var k=a.length,c=0,n=k,e=H(this.cropShoulder,1),v;for(v=0;v<k;v++)if(a[v]>=b){c=Math.max(0,v-e);break}for(b=v;b<k;b++)if(a[b]>f){n=b+e;break}return{xData:a.slice(c,n),yData:d.slice(c,n),start:c,end:n}},
generatePoints:function(){var a=this.options,d=a.data,b=this.data,f,k=this.processedXData,c=this.processedYData,e=this.pointClass,g=k.length,m=this.cropStart||0,h,r=this.hasGroupedData,a=a.keys,x,w=[],l;b||r||(b=[],b.length=d.length,b=this.data=b);a&&r&&(this.options.keys=!1);for(l=0;l<g;l++)h=m+l,r?(x=(new e).init(this,[k[l]].concat(K(c[l]))),x.dataGroup=this.groupMap[l]):(x=b[h])||void 0===d[h]||(b[h]=x=(new e).init(this,d[h],k[l])),x&&(x.index=h,w[l]=x);this.options.keys=a;if(b&&(g!==(f=b.length)||
r))for(l=0;l<f;l++)l!==m||r||(l+=g),b[l]&&(b[l].destroyElements(),b[l].plotX=void 0);this.data=b;this.points=w},getExtremes:function(a){var d=this.yAxis,f=this.processedXData,c,k=[],e=0;c=this.xAxis.getExtremes();var v=c.min,g=c.max,m,h,r,x;a=a||this.stackedYData||this.processedYData||[];c=a.length;for(x=0;x<c;x++)if(h=f[x],r=a[x],m=(w(r,!0)||b(r))&&(!d.positiveValuesOnly||r.length||0<r),h=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(f[x+1]||h)>=v&&(f[x-1]||h)<=g,m&&h)if(m=
r.length)for(;m--;)null!==r[m]&&(k[e++]=r[m]);else k[e++]=r;this.dataMin=t(k);this.dataMax=F(k)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,d=a.stacking,b=this.xAxis,f=b.categories,k=this.yAxis,c=this.points,e=c.length,g=!!this.modifyValue,m=a.pointPlacement,h="between"===m||w(m),r=a.threshold,x=a.startFromThreshold?r:0,A,p,q,C,J=Number.MAX_VALUE;"between"===m&&(m=.5);w(m)&&(m*=H(a.pointRange||b.pointRange));for(a=0;a<e;a++){var t=c[a],K=
t.x,z=t.y;p=t.low;var B=d&&k.stacks[(this.negStacks&&z<(x?0:r)?"-":"")+this.stackKey],D;k.positiveValuesOnly&&null!==z&&0>=z&&(t.isNull=!0);t.plotX=A=l(Math.min(Math.max(-1E5,b.translate(K,0,0,0,1,m,"flags"===this.type)),1E5));d&&this.visible&&!t.isNull&&B&&B[K]&&(C=this.getStackIndicator(C,K,this.index),D=B[K],z=D.points[C.key],p=z[0],z=z[1],p===x&&C.key===B[K].base&&(p=H(r,k.min)),k.positiveValuesOnly&&0>=p&&(p=null),t.total=t.stackTotal=D.total,t.percentage=D.total&&t.y/D.total*100,t.stackY=z,
D.setOffset(this.pointXOffset||0,this.barW||0));t.yBottom=u(p)?k.translate(p,0,1,0,1):null;g&&(z=this.modifyValue(z,t));t.plotY=p="number"===typeof z&&Infinity!==z?Math.min(Math.max(-1E5,k.translate(z,0,1,0,1)),1E5):void 0;t.isInside=void 0!==p&&0<=p&&p<=k.len&&0<=A&&A<=b.len;t.clientX=h?l(b.translate(K,0,0,0,1,m)):A;t.negative=t.y<(r||0);t.category=f&&void 0!==f[t.x]?f[t.x]:t.x;t.isNull||(void 0!==q&&(J=Math.min(J,Math.abs(A-q))),q=A);t.zone=this.zones.length&&t.getZone()}this.closestPointRangePx=
J},getValidPoints:function(a,d){var b=this.chart;return c(a||this.points||[],function(a){return d&&!b.isInsidePlot(a.plotX,a.plotY,b.inverted)?!1:!a.isNull})},setClip:function(a){var d=this.chart,b=this.options,f=d.renderer,k=d.inverted,c=this.clipBox,e=c||d.clipBox,v=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,e.height,b.xAxis,b.yAxis].join(),g=d[v],m=d[v+"m"];g||(a&&(e.width=0,k&&(e.x=d.plotSizeX),d[v+"m"]=m=f.clipRect(k?d.plotSizeX+99:-99,k?-d.plotLeft:-d.plotTop,99,k?d.chartWidth:
d.chartHeight)),d[v]=g=f.clipRect(e),g.count={length:0});a&&!g.count[this.index]&&(g.count[this.index]=!0,g.count.length+=1);!1!==b.clip&&(this.group.clip(a||c?g:d.clipRect),this.markerGroup.clip(m),this.sharedClipKey=v);a||(g.count[this.index]&&(delete g.count[this.index],--g.count.length),0===g.count.length&&v&&d[v]&&(c||(d[v]=d[v].destroy()),d[v+"m"]&&(d[v+"m"]=d[v+"m"].destroy())))},animate:function(a){var d=this.chart,b=D(this.options.animation),f;a?this.setClip(b):(f=this.sharedClipKey,(a=d[f])&&
a.animate({width:d.plotSizeX,x:0},b),d[f+"m"]&&d[f+"m"].animate({width:d.plotSizeX+99,x:0},b),this.animate=null)},afterAnimate:function(){this.setClip();g(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,d=this.chart,b,f,k,c,e=this.options.marker,g,m,h,r,x=this[this.specialGroup]||this.markerGroup,l=H(e.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*e.radius);if(!1!==e.enabled||this._hasPointMarkers)for(f=0;f<a.length;f++)k=a[f],b=k.plotY,c=
k.graphic,g=k.marker||{},m=!!k.marker,h=l&&void 0===g.enabled||g.enabled,r=k.isInside,h&&w(b)&&null!==k.y?(b=H(g.symbol,this.symbol),k.hasImage=0===b.indexOf("url"),h=this.markerAttribs(k,k.selected&&"select"),c?c[r?"show":"hide"](!0).animate(h):r&&(0<h.width||k.hasImage)&&(k.graphic=c=d.renderer.symbol(b,h.x,h.y,h.width,h.height,m?g:e).add(x)),c&&c.attr(this.pointAttribs(k,k.selected&&"select")),c&&c.addClass(k.getClassName(),!0)):c&&(k.graphic=c.destroy())},markerAttribs:function(a,d){var b=this.options.marker,
f=a.marker||{},k=H(f.radius,b.radius);d&&(b=b.states[d],d=f.states&&f.states[d],k=H(d&&d.radius,b&&b.radius,k+(b&&b.radiusPlus||0)));a.hasImage&&(k=0);a={x:Math.floor(a.plotX)-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,d){var b=this.options.marker,f=a&&a.options,k=f&&f.marker||{},c=this.color,e=f&&f.color,g=a&&a.color,f=H(k.lineWidth,b.lineWidth);a=a&&a.zone&&a.zone.color;c=e||a||g||c;a=k.fillColor||b.fillColor||c;c=k.lineColor||b.lineColor||c;d&&(b=b.states[d],d=k.states&&
k.states[d]||{},f=H(d.lineWidth,b.lineWidth,f+H(d.lineWidthPlus,b.lineWidthPlus,0)),a=d.fillColor||b.fillColor||a,c=d.lineColor||b.lineColor||c);return{stroke:c,"stroke-width":f,fill:a}},destroy:function(){var a=this,d=a.chart,b=/AppleWebKit\/533/.test(J.navigator.userAgent),c,k,m=a.data||[],h,r;g(a,"destroy");A(a);B(a.axisTypes||[],function(d){(r=a[d])&&r.series&&(e(r.series,a),r.isDirty=r.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(k=m.length;k--;)(h=m[k])&&h.destroy&&h.destroy();
a.points=null;clearTimeout(a.animationTimeout);C(a,function(a,d){a instanceof f&&!a.survive&&(c=b&&"group"===d?"hide":"destroy",a[c]())});d.hoverSeries===a&&(d.hoverSeries=null);e(d.series,a);d.orderSeries();C(a,function(d,b){delete a[b]})},getGraphPath:function(a,d,b){var f=this,k=f.options,c=k.step,n,e=[],g=[],m;a=a||f.points;(n=a.reversed)&&a.reverse();(c={right:1,center:2}[c]||c&&3)&&n&&(c=4-c);!k.connectNulls||d||b||(a=this.getValidPoints(a));B(a,function(n,h){var v=n.plotX,r=n.plotY,x=a[h-1];
(n.leftCliff||x&&x.rightCliff)&&!b&&(m=!0);n.isNull&&!u(d)&&0<h?m=!k.connectNulls:n.isNull&&!d?m=!0:(0===h||m?h=["M",n.plotX,n.plotY]:f.getPointSpline?h=f.getPointSpline(a,n,h):c?(h=1===c?["L",x.plotX,r]:2===c?["L",(x.plotX+v)/2,x.plotY,"L",(x.plotX+v)/2,r]:["L",v,x.plotY],h.push("L",v,r)):h=["L",v,r],g.push(n.x),c&&g.push(n.x),e.push.apply(e,h),m=!1)});e.xMap=g;return f.graphPath=e},drawGraph:function(){var a=this,d=this.options,b=(this.gappedPath||this.getGraphPath).call(this),f=[["graph","highcharts-graph",
d.lineColor||this.color,d.dashStyle]];B(this.zones,function(b,c){f.push(["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||""),b.color||a.color,b.dashStyle||d.dashStyle])});B(f,function(f,c){var k=f[0],n=a[k];n?(n.endX=b.xMap,n.animate({d:b})):b.length&&(a[k]=a.chart.renderer.path(b).addClass(f[1]).attr({zIndex:1}).add(a.group),n={stroke:f[2],"stroke-width":d.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?n.dashstyle=f[3]:"square"!==d.linecap&&(n["stroke-linecap"]=n["stroke-linejoin"]=
"round"),n=a[k].attr(n).shadow(2>c&&d.shadow));n&&(n.startX=b.xMap,n.isArea=b.isArea)})},applyZones:function(){var a=this,d=this.chart,b=d.renderer,f=this.zones,k,c,e=this.clips||[],g,m=this.graph,h=this.area,r=Math.max(d.chartWidth,d.chartHeight),x=this[(this.zoneAxis||"y")+"Axis"],l,w,A=d.inverted,p,q,C,J,u=!1;f.length&&(m||h)&&x&&void 0!==x.min&&(w=x.reversed,p=x.horiz,m&&m.hide(),h&&h.hide(),l=x.getExtremes(),B(f,function(f,n){k=w?p?d.plotWidth:0:p?0:x.toPixels(l.min);k=Math.min(Math.max(H(c,
k),0),r);c=Math.min(Math.max(Math.round(x.toPixels(H(f.value,l.max),!0)),0),r);u&&(k=c=x.toPixels(l.max));q=Math.abs(k-c);C=Math.min(k,c);J=Math.max(k,c);x.isXAxis?(g={x:A?J:C,y:0,width:q,height:r},p||(g.x=d.plotHeight-g.x)):(g={x:0,y:A?J:C,width:r,height:q},p&&(g.y=d.plotWidth-g.y));A&&b.isVML&&(g=x.isXAxis?{x:0,y:w?C:J,height:g.width,width:d.chartWidth}:{x:g.y-d.plotLeft-d.spacingBox.x,y:0,width:g.height,height:d.chartHeight});e[n]?e[n].animate(g):(e[n]=b.clipRect(g),m&&a["zone-graph-"+n].clip(e[n]),
h&&a["zone-area-"+n].clip(e[n]));u=f.value>l.max}),this.clips=e)},invertGroups:function(a){function d(){B(["group","markerGroup"],function(d){b[d]&&(f.renderer.isVML&&b[d].attr({width:b.yAxis.len,height:b.xAxis.len}),b[d].width=b.yAxis.len,b[d].height=b.xAxis.len,b[d].invert(a))})}var b=this,f=b.chart,k;b.xAxis&&(k=E(f,"resize",d),E(b,"destroy",k),d(a),b.invertGroups=d)},plotGroup:function(a,d,b,f,k){var c=this[a],n=!c;n&&(this[a]=c=this.chart.renderer.g().attr({zIndex:f||.1}).add(k));c.addClass("highcharts-"+
d+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(u(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(c.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);c.attr({visibility:b})[n?"attr":"animate"](this.getPlotBox());return c},getPlotBox:function(){var a=this.chart,d=this.xAxis,b=this.yAxis;a.inverted&&(d=b,b=this.xAxis);return{translateX:d?d.left:a.plotLeft,translateY:b?b.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=
this,d=a.chart,b,f=a.options,k=!!a.animate&&d.renderer.isSVG&&D(f.animation).duration,c=a.visible?"inherit":"hidden",e=f.zIndex,g=a.hasRendered,m=d.seriesGroup,h=d.inverted;b=a.plotGroup("group","series",c,e,m);a.markerGroup=a.plotGroup("markerGroup","markers",c,e,m);k&&a.animate(!0);b.inverted=a.isCartesian?h:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(h);
!1===f.clip||a.sharedClipKey||g||b.clip(d.clipRect);k&&a.animate();g||(a.animationTimeout=x(function(){a.afterAnimate()},k));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,d=this.isDirty||this.isDirtyData,b=this.group,f=this.xAxis,k=this.yAxis;b&&(a.inverted&&b.attr({width:a.plotWidth,height:a.plotHeight}),b.animate({translateX:H(f&&f.left,a.plotLeft),translateY:H(k&&k.top,a.plotTop)}));this.translate();this.render();d&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,
d){var b=this.xAxis,f=this.yAxis,k=this.chart.inverted;return this.searchKDTree({clientX:k?b.len-a.chartY+b.pos:a.chartX-b.pos,plotY:k?f.len-a.chartX+f.pos:a.chartY-f.pos},d)},buildKDTree:function(){function a(b,f,c){var k,n;if(n=b&&b.length)return k=d.kdAxisArray[f%c],b.sort(function(a,d){return a[k]-d[k]}),n=Math.floor(n/2),{point:b[n],left:a(b.slice(0,n),f+1,c),right:a(b.slice(n+1),f+1,c)}}this.buildingKdTree=!0;var d=this,b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;delete d.kdTree;x(function(){d.kdTree=
a(d.getValidPoints(null,!d.directTouch),b,b);d.buildingKdTree=!1},d.options.kdNow?0:1)},searchKDTree:function(a,d){function b(a,d,n,g){var m=d.point,h=f.kdAxisArray[n%g],r,v,x=m;v=u(a[k])&&u(m[k])?Math.pow(a[k]-m[k],2):null;r=u(a[c])&&u(m[c])?Math.pow(a[c]-m[c],2):null;r=(v||0)+(r||0);m.dist=u(r)?Math.sqrt(r):Number.MAX_VALUE;m.distX=u(v)?Math.sqrt(v):Number.MAX_VALUE;h=a[h]-m[h];r=0>h?"left":"right";v=0>h?"right":"left";d[r]&&(r=b(a,d[r],n+1,g),x=r[e]<x[e]?r:m);d[v]&&Math.sqrt(h*h)<x[e]&&(a=b(a,
d[v],n+1,g),x=a[e]<x[e]?a:x);return x}var f=this,k=this.kdAxisArray[0],c=this.kdAxisArray[1],e=d?"distX":"dist";d=-1<f.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return b(a,this.kdTree,d,d)}})})(L);(function(a){var E=a.Axis,D=a.Chart,F=a.correctFloat,t=a.defined,l=a.destroyObjectProperties,p=a.each,z=a.format,q=a.objectEach,u=a.pick,B=a.Series;a.StackItem=function(a,h,g,c,b){var e=a.chart.inverted;this.axis=a;this.isNegative=g;this.options=
h;this.x=c;this.total=null;this.points={};this.stack=b;this.rightCliff=this.leftCliff=0;this.alignOptions={align:h.align||(e?g?"left":"right":"center"),verticalAlign:h.verticalAlign||(e?"middle":g?"bottom":"top"),y:u(h.y,e?4:g?14:-6),x:u(h.x,e?g?-6:6:0)};this.textAlign=h.textAlign||(e?g?"right":"left":"center")};a.StackItem.prototype={destroy:function(){l(this,this.axis)},render:function(a){var e=this.options,g=e.format,g=g?z(g,this):e.formatter.call(this);this.label?this.label.attr({text:g,visibility:"hidden"}):
this.label=this.axis.chart.renderer.text(g,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,rotation:e.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,h){var e=this.axis,c=e.chart,b=e.translate(e.usePercentage?100:this.total,0,0,0,1),e=e.translate(0),e=Math.abs(b-e);a=c.xAxis[0].translate(this.x)+a;b=this.getStackBox(c,this,a,b,h,e);if(h=this.label)h.align(this.alignOptions,null,b),b=h.alignAttr,h[!1===this.options.crop||c.isInsidePlot(b.x,b.y)?"show":"hide"](!0)},getStackBox:function(a,
h,g,c,b,l){var e=h.axis.reversed,r=a.inverted;a=a.plotHeight;h=h.isNegative&&!e||!h.isNegative&&e;return{x:r?h?c:c-l:g,y:r?a-g-b:h?a-c-l:a-c,width:r?l:b,height:r?b:l}}};D.prototype.getStacks=function(){var a=this;p(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});p(a.series,function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+u(e.options.stack,""))})};E.prototype.buildStacks=function(){var a=this.series,h=u(this.options.reversedStacks,
!0),g=a.length,c;if(!this.isXAxis){this.usePercentage=!1;for(c=g;c--;)a[h?c:g-c-1].setStackedPoints();for(c=0;c<g;c++)a[c].modifyStacks()}};E.prototype.renderStackTotals=function(){var a=this.chart,h=a.renderer,g=this.stacks,c=this.stackTotalGroup;c||(this.stackTotalGroup=c=h.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());c.translate(a.plotLeft,a.plotTop);q(g,function(a){q(a,function(a){a.render(c)})})};E.prototype.resetStacks=function(){var a=this,h=a.stacks;a.isXAxis||q(h,function(e){q(e,
function(c,b){c.touched<a.stacksTouched?(c.destroy(),delete e[b]):(c.total=null,c.cum=null)})})};E.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),q(a,function(a){q(a,function(a){a.cum=a.total})}))};B.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var e=this.processedXData,h=this.processedYData,g=[],c=h.length,b=this.options,l=b.threshold,m=b.startFromThreshold?
l:0,r=b.stack,b=b.stacking,p=this.stackKey,q="-"+p,A=this.negStacks,K=this.yAxis,f=K.stacks,x=K.oldStacks,J,v,d,n,G,k,y;K.stacksTouched+=1;for(G=0;G<c;G++)k=e[G],y=h[G],J=this.getStackIndicator(J,k,this.index),n=J.key,d=(v=A&&y<(m?0:l))?q:p,f[d]||(f[d]={}),f[d][k]||(x[d]&&x[d][k]?(f[d][k]=x[d][k],f[d][k].total=null):f[d][k]=new a.StackItem(K,K.options.stackLabels,v,k,r)),d=f[d][k],null!==y&&(d.points[n]=d.points[this.index]=[u(d.cum,m)],t(d.cum)||(d.base=n),d.touched=K.stacksTouched,0<J.index&&!1===
this.singleStacks&&(d.points[n][0]=d.points[this.index+","+k+",0"][0])),"percent"===b?(v=v?p:q,A&&f[v]&&f[v][k]?(v=f[v][k],d.total=v.total=Math.max(v.total,d.total)+Math.abs(y)||0):d.total=F(d.total+(Math.abs(y)||0))):d.total=F(d.total+(y||0)),d.cum=u(d.cum,m)+(y||0),null!==y&&(d.points[n].push(d.cum),g[G]=d.cum);"percent"===b&&(K.usePercentage=!0);this.stackedYData=g;K.oldStacks={}}};B.prototype.modifyStacks=function(){var a=this,h=a.stackKey,g=a.yAxis.stacks,c=a.processedXData,b,l=a.options.stacking;
a[l+"Stacker"]&&p([h,"-"+h],function(e){for(var m=c.length,h,w;m--;)if(h=c[m],b=a.getStackIndicator(b,h,a.index,e),w=(h=g[e]&&g[e][h])&&h.points[b.key])a[l+"Stacker"](w,h,m)})};B.prototype.percentStacker=function(a,h,g){h=h.total?100/h.total:0;a[0]=F(a[0]*h);a[1]=F(a[1]*h);this.stackedYData[g]=a[1]};B.prototype.getStackIndicator=function(a,h,g,c){!t(a)||a.x!==h||c&&a.key!==c?a={x:h,index:0,key:c}:a.index++;a.key=[g,h,a.index].join();return a}})(L);(function(a){var E=a.addEvent,D=a.animate,F=a.Axis,
t=a.createElement,l=a.css,p=a.defined,z=a.each,q=a.erase,u=a.extend,B=a.fireEvent,e=a.inArray,h=a.isNumber,g=a.isObject,c=a.isArray,b=a.merge,w=a.objectEach,m=a.pick,r=a.Point,C=a.Series,H=a.seriesTypes,A=a.setAnimation,K=a.splat;u(a.Chart.prototype,{addSeries:function(a,b,c){var f,d=this;a&&(b=m(b,!0),B(d,"addSeries",{options:a},function(){f=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return f},addAxis:function(a,c,e,g){var d=c?"xAxis":"yAxis",f=this.options;a=b(a,{index:this[d].length,
isX:c});c=new F(this,a);f[d]=K(f[d]||{});f[d].push(a);m(e,!0)&&this.redraw(g);return c},showLoading:function(a){var b=this,f=b.options,c=b.loadingDiv,d=f.loading,n=function(){c&&l(c,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};c||(b.loadingDiv=c=t("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=t("span",{className:"highcharts-loading-inner"},null,c),E(b,"redraw",n));c.className="highcharts-loading";b.loadingSpan.innerHTML=
a||f.lang.loading;l(c,u(d.style,{zIndex:10}));l(b.loadingSpan,d.labelStyle);b.loadingShown||(l(c,{opacity:0,display:""}),D(c,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;n()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",D(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){l(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),update:function(a,c,g){var f=this,d={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},n=a.chart,r,k,x=[];if(n){b(!0,f.options.chart,n);"className"in n&&f.setClassName(n.className);if("inverted"in n||"polar"in n)f.propFromSeries(),r=!0;"alignTicks"in n&&(r=!0);w(n,function(a,d){-1!==e("chart."+d,f.propsRequireUpdateSeries)&&(k=!0);-1!==e(d,f.propsRequireDirtyBox)&&
(f.isDirtyBox=!0)});"style"in n&&f.renderer.setStyle(n.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&b(!0,this.options.plotOptions,a.plotOptions);w(a,function(a,b){if(f[b]&&"function"===typeof f[b].update)f[b].update(a,!1);else if("function"===typeof f[d[b]])f[d[b]](a);"chart"!==b&&-1!==e(b,f.propsRequireUpdateSeries)&&(k=!0)});z("xAxis yAxis zAxis series colorAxis pane".split(" "),function(d){a[d]&&(z(K(a[d]),function(a,b){(b=p(a.id)&&f.get(a.id)||f[d][b])&&b.coll===d&&(b.update(a,
!1),g&&(b.touched=!0));if(!b&&g)if("series"===d)f.addSeries(a,!1).touched=!0;else if("xAxis"===d||"yAxis"===d)f.addAxis(a,"xAxis"===d,!1).touched=!0}),g&&z(f[d],function(a){a.touched?delete a.touched:x.push(a)}))});z(x,function(a){a.remove(!1)});r&&z(f.axes,function(a){a.update({},!1)});k&&z(f.series,function(a){a.update({},!1)});a.loading&&b(!0,f.options.loading,a.loading);r=n&&n.width;n=n&&n.height;h(r)&&r!==f.chartWidth||h(n)&&n!==f.chartHeight?f.setSize(r,n):m(c,!0)&&f.redraw()},setSubtitle:function(a){this.setTitle(void 0,
a)}});u(r.prototype,{update:function(a,b,c,e){function d(){f.applyOptions(a);null===f.y&&k&&(f.graphic=k.destroy());g(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=k.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()),f.connector&&(f.connector=f.connector.destroy()));r=f.index;h.updateParallelArrays(f,r);x.data[r]=g(x.data[r],!0)||g(a,!0)?f.options:a;h.isDirty=h.isDirtyData=!0;!h.fixedBox&&h.hasCartesianSeries&&(v.isDirtyBox=!0);"point"===x.legendType&&
(v.isDirtyLegend=!0);b&&v.redraw(c)}var f=this,h=f.series,k=f.graphic,r,v=h.chart,x=h.options;b=m(b,!0);!1===e?d():f.firePointEvent("update",{options:a},d)},remove:function(a,b){this.series.removePoint(e(this,this.series.data),a,b)}});u(C.prototype,{addPoint:function(a,b,c,e){var d=this.options,f=this.data,g=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,h=d.data,r,v,x=this.xData,l,w;b=m(b,!0);r={series:this};this.pointClass.prototype.applyOptions.apply(r,[a]);w=r.x;l=x.length;if(this.requireSorting&&
w<x[l-1])for(v=!0;l&&x[l-1]>w;)l--;this.updateParallelArrays(r,"splice",l,0,0);this.updateParallelArrays(r,l);k&&r.name&&(k[w]=r.name);h.splice(l,0,a);v&&(this.data.splice(l,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(r,"shift"),h.shift()));this.isDirtyData=this.isDirty=!0;b&&g.redraw(e)},removePoint:function(a,b,c){var f=this,d=f.data,n=d[a],e=f.points,k=f.chart,g=function(){e&&e.length===d.length&&
e.splice(a,1);d.splice(a,1);f.options.data.splice(a,1);f.updateParallelArrays(n||{series:f},"splice",a,1);n&&n.destroy();f.isDirty=!0;f.isDirtyData=!0;b&&k.redraw()};A(c,k);b=m(b,!0);n?n.firePointEvent("remove",null,g):g()},remove:function(a,b,c){function f(){d.destroy();n.isDirtyLegend=n.isDirtyBox=!0;n.linkSeries();m(a,!0)&&n.redraw(b)}var d=this,n=d.chart;!1!==c?B(d,"remove",null,f):f()},update:function(a,c){var f=this,e=f.chart,d=f.userOptions,n=f.oldType||f.type,g=a.type||d.type||e.options.chart.type,
k=H[n].prototype,h,r=["group","markerGroup","dataLabelsGroup"],l=["navigatorSeries","baseSeries"],x=f.finishedAnimating&&{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,c);if(g&&g!==n||void 0!==a.zIndex)r.length=0;f.options.isInternal&&(l.length=0);l=r.concat(l);z(l,function(a){l[a]=f[a];delete f[a]});a=b(d,x,{index:f.index,pointStart:f.xData[0]},{data:f.options.data},a);f.remove(!1,null,!1);for(h in k)f[h]=void 0;u(f,H[g||n].prototype);z(l,function(a){f[a]=
l[a]});f.init(e,a);f.oldType=n;e.linkSeries();m(c,!0)&&e.redraw(!1)}});u(F.prototype,{update:function(a,c){var f=this.chart;a=f.options[this.coll][this.options.index]=b(this.userOptions,a);this.destroy(!0);this.init(f,u(a,{events:void 0}));f.isDirtyBox=!0;m(c,!0)&&f.redraw()},remove:function(a){for(var b=this.chart,f=this.coll,e=this.series,d=e.length;d--;)e[d]&&e[d].remove(!1);q(b.axes,this);q(b[f],this);c(b.options[f])?b.options[f].splice(this.options.index,1):delete b.options[f];z(b[f],function(a,
d){a.options.index=d});this.destroy();b.isDirtyBox=!0;m(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(L);(function(a){var E=a.color,D=a.each,F=a.map,t=a.pick,l=a.Series,p=a.seriesType;p("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(l){var p=[],u=[],z=this.xAxis,e=this.yAxis,h=e.stacks[this.stackKey],g={},c=this.index,b=e.series,w=b.length,m,r=t(e.options.reversedStacks,!0)?
1:-1,C;l=l||this.points;if(this.options.stacking){for(C=0;C<l.length;C++)g[l[C].x]=l[C];a.objectEach(h,function(a,b){null!==a.total&&u.push(b)});u.sort(function(a,b){return a-b});m=F(b,function(){return this.visible});D(u,function(a,b){var l=0,f,x;if(g[a]&&!g[a].isNull)p.push(g[a]),D([-1,1],function(e){var l=1===e?"rightNull":"leftNull",d=0,n=h[u[b+e]];if(n)for(C=c;0<=C&&C<w;)f=n.points[C],f||(C===c?g[a][l]=!0:m[C]&&(x=h[a].points[C])&&(d-=x[1]-x[0])),C+=r;g[a][1===e?"rightCliff":"leftCliff"]=d});
else{for(C=c;0<=C&&C<w;){if(f=h[a].points[C]){l=f[1];break}C+=r}l=e.translate(l,0,1,0,1);p.push({isNull:!0,plotX:z.translate(a,0,0,0,1),x:a,plotY:l,yBottom:l})}})}return p},getGraphPath:function(a){var p=l.prototype.getGraphPath,u=this.options,z=u.stacking,e=this.yAxis,h,g,c=[],b=[],w=this.index,m,r=e.stacks[this.stackKey],C=u.threshold,H=e.getThreshold(u.threshold),A,u=u.connectNulls||"percent"===z,K=function(f,g,h){var l=a[f];f=z&&r[l.x].points[w];var d=l[h+"Null"]||0;h=l[h+"Cliff"]||0;var n,x,
l=!0;h||d?(n=(d?f[0]:f[1])+h,x=f[0]+h,l=!!d):!z&&a[g]&&a[g].isNull&&(n=x=C);void 0!==n&&(b.push({plotX:m,plotY:null===n?H:e.getThreshold(n),isNull:l,isCliff:!0}),c.push({plotX:m,plotY:null===x?H:e.getThreshold(x),doCurve:!1}))};a=a||this.points;z&&(a=this.getStackPoints(a));for(h=0;h<a.length;h++)if(g=a[h].isNull,m=t(a[h].rectPlotX,a[h].plotX),A=t(a[h].yBottom,H),!g||u)u||K(h,h-1,"left"),g&&!z&&u||(b.push(a[h]),c.push({x:h,plotX:m,plotY:A})),u||K(h,h+1,"right");h=p.call(this,b,!0,!0);c.reversed=!0;
g=p.call(this,c,!0,!0);g.length&&(g[0]="L");g=h.concat(g);p=p.call(this,b,!1,u);g.xMap=h.xMap;this.areaPath=g;return p},drawGraph:function(){this.areaPath=[];l.prototype.drawGraph.apply(this);var a=this,p=this.areaPath,u=this.options,B=[["area","highcharts-area",this.color,u.fillColor]];D(this.zones,function(e,h){B.push(["zone-area-"+h,"highcharts-area highcharts-zone-area-"+h+" "+e.className,e.color||a.color,e.fillColor||u.fillColor])});D(B,function(e){var h=e[0],g=a[h];g?(g.endX=p.xMap,g.animate({d:p})):
(g=a[h]=a.chart.renderer.path(p).addClass(e[1]).attr({fill:t(e[3],E(e[2]).setOpacity(t(u.fillOpacity,.75)).get()),zIndex:0}).add(a.group),g.isArea=!0);g.startX=p.xMap;g.shiftUnit=u.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var E=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,F,t){var l=F.plotX,p=F.plotY,z=a[t-1];t=a[t+1];var q,u,B,e;if(z&&!z.isNull&&!1!==z.doCurve&&!F.isCliff&&t&&!t.isNull&&!1!==t.doCurve&&!F.isCliff){a=z.plotY;B=t.plotX;
t=t.plotY;var h=0;q=(1.5*l+z.plotX)/2.5;u=(1.5*p+a)/2.5;B=(1.5*l+B)/2.5;e=(1.5*p+t)/2.5;B!==q&&(h=(e-u)*(B-l)/(B-q)+p-e);u+=h;e+=h;u>a&&u>p?(u=Math.max(a,p),e=2*p-u):u<a&&u<p&&(u=Math.min(a,p),e=2*p-u);e>t&&e>p?(e=Math.max(t,p),u=2*p-e):e<t&&e<p&&(e=Math.min(t,p),u=2*p-e);F.rightContX=B;F.rightContY=e}F=["C",E(z.rightContX,z.plotX),E(z.rightContY,z.plotY),E(q,l),E(u,p),l,p];z.rightContX=z.rightContY=null;return F}})})(L);(function(a){var E=a.seriesTypes.area.prototype,D=a.seriesType;D("areaspline",
"spline",a.defaultPlotOptions.area,{getStackPoints:E.getStackPoints,getGraphPath:E.getGraphPath,drawGraph:E.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var E=a.animObject,D=a.color,F=a.each,t=a.extend,l=a.isNumber,p=a.merge,z=a.pick,q=a.Series,u=a.seriesType,B=a.svg;u("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",
borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){q.prototype.init.apply(this,arguments);var a=this,h=a.chart;h.hasRendered&&F(h.series,function(e){e.type===a.type&&(e.isDirty=!0)})},getColumnMetrics:function(){var a=this,h=a.options,g=a.xAxis,c=a.yAxis,
b=g.reversed,l,m={},r=0;!1===h.grouping?r=1:F(a.chart.series,function(b){var f=b.options,e=b.yAxis,g;b.type!==a.type||!b.visible&&a.chart.options.chart.ignoreHiddenSeries||c.len!==e.len||c.pos!==e.pos||(f.stacking?(l=b.stackKey,void 0===m[l]&&(m[l]=r++),g=m[l]):!1!==f.grouping&&(g=r++),b.columnIndex=g)});var p=Math.min(Math.abs(g.transA)*(g.ordinalSlope||h.pointRange||g.closestPointRange||g.tickInterval||1),g.len),q=p*h.groupPadding,A=(p-2*q)/(r||1),h=Math.min(h.maxPointWidth||g.len,z(h.pointWidth,
A*(1-2*h.pointPadding)));a.columnMetrics={width:h,offset:(A-h)/2+(q+((a.columnIndex||0)+(b?1:0))*A-p/2)*(b?-1:1)};return a.columnMetrics},crispCol:function(a,h,g,c){var b=this.chart,e=this.borderWidth,m=-(e%2?.5:0),e=e%2?.5:1;b.inverted&&b.renderer.isVML&&(e+=1);this.options.crisp&&(g=Math.round(a+g)+m,a=Math.round(a)+m,g-=a);c=Math.round(h+c)+e;m=.5>=Math.abs(h)&&.5<c;h=Math.round(h)+e;c-=h;m&&c&&(--h,c+=1);return{x:a,y:h,width:g,height:c}},translate:function(){var a=this,h=a.chart,g=a.options,c=
a.dense=2>a.closestPointRange*a.xAxis.transA,c=a.borderWidth=z(g.borderWidth,c?0:1),b=a.yAxis,l=a.translatedThreshold=b.getThreshold(g.threshold),m=z(g.minPointLength,5),r=a.getColumnMetrics(),p=r.width,u=a.barW=Math.max(p,1+2*c),A=a.pointXOffset=r.offset;h.inverted&&(l-=.5);g.pointPadding&&(u=Math.ceil(u));q.prototype.translate.apply(a);F(a.points,function(c){var f=z(c.yBottom,l),e=999+Math.abs(f),e=Math.min(Math.max(-e,c.plotY),b.len+e),g=c.plotX+A,r=u,d=Math.min(e,f),n,w=Math.max(e,f)-d;m&&Math.abs(w)<
m&&(w=m,n=!b.reversed&&!c.negative||b.reversed&&c.negative,0===c.y&&0>=a.dataMax&&(n=!n),d=Math.abs(d-l)>m?f-m:l-(n?m:0));c.barX=g;c.pointWidth=p;c.tooltipPos=h.inverted?[b.len+b.pos-h.plotLeft-e,a.xAxis.len-g-r/2,w]:[g+r/2,e+b.pos-h.plotTop,w];c.shapeType="rect";c.shapeArgs=a.crispCol.apply(a,c.isNull?[g,l,r,0]:[g,d,r,w])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,
h){var e=this.options,c,b=this.pointAttrToOptions||{};c=b.stroke||"borderColor";var l=b["stroke-width"]||"borderWidth",m=a&&a.color||this.color,r=a&&a[c]||e[c]||this.color||m,q=a&&a[l]||e[l]||this[l]||0,b=e.dashStyle;a&&this.zones.length&&(m=a.getZone(),m=a.options.color||m&&m.color||this.color);h&&(a=p(e.states[h],a.options.states&&a.options.states[h]||{}),h=a.brightness,m=a.color||void 0!==h&&D(m).brighten(a.brightness).get()||m,r=a[c]||r,q=a[l]||q,b=a.dashStyle||b);c={fill:m,stroke:r,"stroke-width":q};
b&&(c.dashstyle=b);return c},drawPoints:function(){var a=this,h=this.chart,g=a.options,c=h.renderer,b=g.animationLimit||250,w;F(a.points,function(e){var m=e.graphic;if(l(e.plotY)&&null!==e.y){w=e.shapeArgs;if(m)m[h.pointCount<b?"animate":"attr"](p(w));else e.graphic=m=c[e.shapeType](w).add(e.group||a.group);g.borderRadius&&m.attr({r:g.borderRadius});m.attr(a.pointAttribs(e,e.selected&&"select")).shadow(g.shadow,null,g.stacking&&!g.borderRadius);m.addClass(e.getClassName(),!0)}else m&&(e.graphic=m.destroy())})},
animate:function(a){var e=this,g=this.yAxis,c=e.options,b=this.chart.inverted,l={},m=b?"translateX":"translateY",r;B&&(a?(l.scaleY=.001,a=Math.min(g.pos+g.len,Math.max(g.pos,g.toPixels(c.threshold))),b?l.translateX=a-g.len:l.translateY=a,e.group.attr(l)):(r=e.group.attr(m),e.group.animate({scaleY:1},t(E(e.options.animation),{step:function(a,b){l[m]=r+b.pos*(g.pos-r);e.group.attr(l)}})),e.animate=null))},remove:function(){var a=this,h=a.chart;h.hasRendered&&F(h.series,function(e){e.type===a.type&&
(e.isDirty=!0)});q.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var E=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},
{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&E.prototype.drawGraph.call(this)}})})(L);(function(a){var E=a.deg2rad,D=a.isNumber,F=a.pick,t=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,p=this.chart,z=2*(a.slicedOffset||0),q=p.plotWidth-2*z,p=p.plotHeight-2*z,u=a.center,u=[F(u[0],"50%"),F(u[1],"50%"),a.size||"100%",a.innerSize||0],B=Math.min(q,
p),e,h;for(e=0;4>e;++e)h=u[e],a=2>e||2===e&&/%$/.test(h),u[e]=t(h,[q,p,B,u[2]][e])+(a?z:0);u[3]>u[2]&&(u[3]=u[2]);return u},getStartAndEndRadians:function(a,p){a=D(a)?a:0;p=D(p)&&p>a&&360>p-a?p:a+360;return{start:E*(a+-90),end:E*(p+-90)}}}})(L);(function(a){var E=a.addEvent,D=a.CenteredSeriesMixin,F=a.defined,t=a.each,l=a.extend,p=D.getStartAndEndRadians,z=a.inArray,q=a.noop,u=a.pick,B=a.Point,e=a.Series,h=a.seriesType,g=a.setAnimation;h("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,
enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=
this,c=b.points,e=b.startAngleRad;a||(t(c,function(a){var c=a.graphic,g=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:e,end:e}),c.animate({r:g.r,start:g.start,end:g.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,b=0,e=this.points,g=e.length,h,l=this.options.ignoreHiddenPoint;for(a=0;a<g;a++)h=e[a],b+=l&&!h.visible?0:h.isNull?0:h.y;this.total=b;for(a=0;a<g;a++)h=e[a],h.percentage=0<b&&(h.visible||!l)?h.y/b*100:0,h.total=b},generatePoints:function(){e.prototype.generatePoints.call(this);
this.updateTotals()},translate:function(a){this.generatePoints();var b=0,c=this.options,e=c.slicedOffset,g=e+(c.borderWidth||0),h,l,A,q=p(c.startAngle,c.endAngle),f=this.startAngleRad=q.start,q=(this.endAngleRad=q.end)-f,x=this.points,t,v=c.dataLabels.distance,c=c.ignoreHiddenPoint,d,n=x.length,G;a||(this.center=a=this.getCenter());this.getX=function(d,b,f){A=Math.asin(Math.min((d-a[1])/(a[2]/2+f.labelDistance),1));return a[0]+(b?-1:1)*Math.cos(A)*(a[2]/2+f.labelDistance)};for(d=0;d<n;d++){G=x[d];
G.labelDistance=u(G.options.dataLabels&&G.options.dataLabels.distance,v);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,G.labelDistance);h=f+b*q;if(!c||G.visible)b+=G.percentage/100;l=f+b*q;G.shapeType="arc";G.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*h)/1E3,end:Math.round(1E3*l)/1E3};A=(l+h)/2;A>1.5*Math.PI?A-=2*Math.PI:A<-Math.PI/2&&(A+=2*Math.PI);G.slicedTranslation={translateX:Math.round(Math.cos(A)*e),translateY:Math.round(Math.sin(A)*e)};l=Math.cos(A)*a[2]/
2;t=Math.sin(A)*a[2]/2;G.tooltipPos=[a[0]+.7*l,a[1]+.7*t];G.half=A<-Math.PI/2||A>Math.PI/2?1:0;G.angle=A;h=Math.min(g,G.labelDistance/5);G.labelPos=[a[0]+l+Math.cos(A)*G.labelDistance,a[1]+t+Math.sin(A)*G.labelDistance,a[0]+l+Math.cos(A)*h,a[1]+t+Math.sin(A)*h,a[0]+l,a[1]+t,0>G.labelDistance?"center":G.half?"right":"left",A]}},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,e,g,h,p,q=a.options.shadow;q&&!a.shadowGroup&&(a.shadowGroup=b.g("shadow").add(a.group));t(a.points,function(c){g=
c.graphic;if(c.isNull)g&&(c.graphic=g.destroy());else{p=c.shapeArgs;e=c.getTranslate();var m=c.shadowGroup;q&&!m&&(m=c.shadowGroup=b.g("shadow").add(a.shadowGroup));m&&m.attr(e);h=a.pointAttribs(c,c.selected&&"select");g?g.setRadialReference(a.center).attr(h).animate(l(p,e)):(c.graphic=g=b[c.shapeType](p).setRadialReference(a.center).attr(e).add(a.group),c.visible||g.attr({visibility:"hidden"}),g.attr(h).attr({"stroke-linejoin":"round"}).shadow(q,m));g.addClass(c.getClassName())}})},searchPoint:q,
sortByAngle:function(a,b){a.sort(function(a,c){return void 0!==a.angle&&(c.angle-a.angle)*b})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:D.getCenter,getSymbol:q},{init:function(){B.prototype.init.apply(this,arguments);var a=this,b;a.name=u(a.name,"Slice");b=function(b){a.slice("select"===b.type)};E(a,"select",b);E(a,"unselect",b);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,b){var c=this,e=c.series,g=e.chart,h=e.options.ignoreHiddenPoint;
b=u(b,h);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,e.options.data[z(c,e.data)]=c.options,t(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)}),c.legendItem&&g.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),h&&(e.isDirty=!0),b&&g.redraw())},slice:function(a,b,e){var c=this.series;g(e,c.chart);u(b,!0);this.sliced=this.options.sliced=F(a)?a:!this.sliced;c.options.data[z(this,c.data)]=this.options;this.graphic.animate(this.getTranslate());
this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}})})(L);(function(a){var E=a.addEvent,D=a.arrayMax,F=a.defined,t=a.each,l=a.extend,p=a.format,z=a.map,q=a.merge,u=a.noop,B=a.pick,e=a.relativeLength,h=a.Series,
g=a.seriesTypes,c=a.stableSort;a.distribute=function(a,e){function b(a,b){return a.target-b.target}var g,h=!0,l=a,p=[],w;w=0;for(g=a.length;g--;)w+=a[g].size;if(w>e){c(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(w=g=0;w<=e;)w+=a[g].size,g++;p=a.splice(g-1,a.length)}c(a,b);for(a=z(a,function(a){return{size:a.size,targets:[a.target]}});h;){for(g=a.length;g--;)h=a[g],w=(Math.min.apply(0,h.targets)+Math.max.apply(0,h.targets))/2,h.pos=Math.min(Math.max(0,w-h.size/2),e-h.size);g=a.length;for(h=
!1;g--;)0<g&&a[g-1].pos+a[g-1].size>a[g].pos&&(a[g-1].size+=a[g].size,a[g-1].targets=a[g-1].targets.concat(a[g].targets),a[g-1].pos+a[g-1].size>e&&(a[g-1].pos=e-a[g-1].size),a.splice(g,1),h=!0)}g=0;t(a,function(a){var b=0;t(a.targets,function(){l[g].pos=a.pos+b;b+=l[g].size;g++})});l.push.apply(l,p);c(l,b)};h.prototype.drawDataLabels=function(){var b=this,c=b.options,e=c.dataLabels,g=b.points,h,l,A=b.hasRendered||0,u,f,x=B(e.defer,!!c.animation),J=b.chart.renderer;if(e.enabled||b._hasPointLabels)b.dlProcessOptions&&
b.dlProcessOptions(e),f=b.plotGroup("dataLabelsGroup","data-labels",x&&!A?"hidden":"visible",e.zIndex||6),x&&(f.attr({opacity:+A}),A||E(b,"afterAnimate",function(){b.visible&&f.show(!0);f[c.animation?"animate":"attr"]({opacity:1},{duration:200})})),l=e,t(g,function(g){var d,n=g.dataLabel,m,k,r=g.connector,v=!n,x;h=g.dlOptions||g.options&&g.options.dataLabels;if(d=B(h&&h.enabled,l.enabled)&&!g.isNull)e=q(l,h),m=g.getLabelConfig(),x=e[g.formatPrefix+"Format"]||e.format,u=F(x)?p(x,m):(e[g.formatPrefix+
"Formatter"]||e.formatter).call(m,e),x=e.style,m=e.rotation,x.color=B(e.color,x.color,b.color,"#000000"),"contrast"===x.color&&(g.contrastColor=J.getContrast(g.color||b.color),x.color=e.inside||0>B(g.labelDistance,e.distance)||c.stacking?g.contrastColor:"#000000"),c.cursor&&(x.cursor=c.cursor),k={fill:e.backgroundColor,stroke:e.borderColor,"stroke-width":e.borderWidth,r:e.borderRadius||0,rotation:m,padding:e.padding,zIndex:1},a.objectEach(k,function(a,d){void 0===a&&delete k[d]});!n||d&&F(u)?d&&F(u)&&
(n?k.text=u:(n=g.dataLabel=J[m?"text":"label"](u,0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),n.addClass("highcharts-data-label-color-"+g.colorIndex+" "+(e.className||"")+(e.useHTML?"highcharts-tracker":""))),n.attr(k),n.css(x).shadow(e.shadow),n.added||n.add(f),b.alignDataLabel(g,n,e,null,v)):(g.dataLabel=n=n.destroy(),r&&(g.connector=r.destroy()))})};h.prototype.alignDataLabel=function(a,c,e,g,h){var b=this.chart,m=b.inverted,r=B(a.plotX,-9999),f=B(a.plotY,-9999),x=c.getBBox(),p,v=e.rotation,
d=e.align,n=this.visible&&(a.series.forceDL||b.isInsidePlot(r,Math.round(f),m)||g&&b.isInsidePlot(r,m?g.x+1:g.y+g.height-1,m)),q="justify"===B(e.overflow,"justify");if(n&&(p=e.style.fontSize,p=b.renderer.fontMetrics(p,c).b,g=l({x:m?this.yAxis.len-f:r,y:Math.round(m?this.xAxis.len-r:f),width:0,height:0},g),l(e,{width:x.width,height:x.height}),v?(q=!1,r=b.renderer.rotCorr(p,v),r={x:g.x+e.x+g.width/2+r.x,y:g.y+e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*g.height},c[h?"attr":"animate"](r).attr({align:d}),
f=(v+720)%360,f=180<f&&360>f,"left"===d?r.y-=f?x.height:0:"center"===d?(r.x-=x.width/2,r.y-=x.height/2):"right"===d&&(r.x-=x.width,r.y-=f?0:x.height)):(c.align(e,null,g),r=c.alignAttr),q?a.isLabelJustified=this.justifyDataLabel(c,e,r,x,g,h):B(e.crop,!0)&&(n=b.isInsidePlot(r.x,r.y)&&b.isInsidePlot(r.x+x.width,r.y+x.height)),e.shape&&!v))c[h?"attr":"animate"]({anchorX:m?b.plotWidth-a.plotY:a.plotX,anchorY:m?b.plotHeight-a.plotX:a.plotY});n||(c.attr({y:-9999}),c.placed=!1)};h.prototype.justifyDataLabel=
function(a,c,e,g,h,l){var b=this.chart,m=c.align,f=c.verticalAlign,r,p,v=a.box?0:a.padding||0;r=e.x+v;0>r&&("right"===m?c.align="left":c.x=-r,p=!0);r=e.x+g.width-v;r>b.plotWidth&&("left"===m?c.align="right":c.x=b.plotWidth-r,p=!0);r=e.y+v;0>r&&("bottom"===f?c.verticalAlign="top":c.y=-r,p=!0);r=e.y+g.height-v;r>b.plotHeight&&("top"===f?c.verticalAlign="bottom":c.y=b.plotHeight-r,p=!0);p&&(a.placed=!l,a.align(c,null,h));return p};g.pie&&(g.pie.prototype.drawDataLabels=function(){var b=this,c=b.data,
e,g=b.chart,l=b.options.dataLabels,p=B(l.connectorPadding,10),A=B(l.connectorWidth,1),q=g.plotWidth,f=g.plotHeight,x,u=b.center,v=u[2]/2,d=u[1],n,G,k,y,z=[[],[]],M,O,N,E,I=[0,0,0,0];b.visible&&(l.enabled||b._hasPointLabels)&&(t(c,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),h.prototype.drawDataLabels.apply(b),t(c,function(a){a.dataLabel&&a.visible&&(z[a.half].push(a),a.dataLabel._pos=
null)}),t(z,function(c,h){var m,r,x=c.length,A=[],w;if(x)for(b.sortByAngle(c,h-.5),0<b.maxLabelDistance&&(m=Math.max(0,d-v-b.maxLabelDistance),r=Math.min(d+v+b.maxLabelDistance,g.plotHeight),t(c,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,d-v-a.labelDistance),a.bottom=Math.min(d+v+a.labelDistance,g.plotHeight),w=a.dataLabel.getBBox().height||21,a.positionsIndex=A.push({target:a.labelPos[1]-a.top+w/2,size:w,rank:a.y})-1)}),a.distribute(A,r+w-m)),E=0;E<x;E++)e=c[E],r=e.positionsIndex,
k=e.labelPos,n=e.dataLabel,N=!1===e.visible?"hidden":"inherit",O=m=k[1],A&&F(A[r])&&(void 0===A[r].pos?N="hidden":(y=A[r].size,O=e.top+A[r].pos)),delete e.positionIndex,M=l.justify?u[0]+(h?-1:1)*(v+e.labelDistance):b.getX(O<e.top+2||O>e.bottom-2?m:O,h,e),n._attr={visibility:N,align:k[6]},n._pos={x:M+l.x+({left:p,right:-p}[k[6]]||0),y:O+l.y-10},k.x=M,k.y=O,B(l.crop,!0)&&(G=n.getBBox().width,m=null,M-G<p?(m=Math.round(G-M+p),I[3]=Math.max(m,I[3])):M+G>q-p&&(m=Math.round(M+G-q+p),I[1]=Math.max(m,I[1])),
0>O-y/2?I[0]=Math.max(Math.round(-O+y/2),I[0]):O+y/2>f&&(I[2]=Math.max(Math.round(O+y/2-f),I[2])),n.sideOverflow=m)}),0===D(I)||this.verifyDataLabelOverflow(I))&&(this.placeDataLabels(),A&&t(this.points,function(a){var d;x=a.connector;if((n=a.dataLabel)&&n._pos&&a.visible&&0<a.labelDistance){N=n._attr.visibility;if(d=!x)a.connector=x=g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup),x.attr({"stroke-width":A,stroke:l.connectorColor||
a.color||"#666666"});x[d?"attr":"animate"]({d:b.connectorPath(a.labelPos)});x.attr("visibility",N)}else x&&(a.connector=x.destroy())}))},g.pie.prototype.connectorPath=function(a){var b=a.x,c=a.y;return B(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},g.pie.prototype.placeDataLabels=function(){t(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?
(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},g.pie.prototype.alignDataLabel=u,g.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,g=c.center,h=c.minSize||80,l,p=null!==c.size;p||(null!==g[0]?l=Math.max(b[2]-Math.max(a[1],a[3]),h):(l=Math.max(b[2]-a[1]-a[3],h),b[0]+=(a[3]-a[1])/2),null!==
g[1]?l=Math.max(Math.min(l,b[2]-Math.max(a[0],a[2])),h):(l=Math.max(Math.min(l,b[2]-a[0]-a[2]),h),b[1]+=(a[0]-a[2])/2),l<b[2]?(b[2]=l,b[3]=Math.min(e(c.innerSize||0,l),l),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):p=!0);return p});g.column&&(g.column.prototype.alignDataLabel=function(a,c,e,g,l){var b=this.chart.inverted,m=a.series,r=a.dlBox||a.shapeArgs,f=B(a.below,a.plotY>B(this.translatedThreshold,m.yAxis.len)),x=B(e.inside,!!this.options.stacking);r&&(g=q(r),0>g.y&&(g.height+=
g.y,g.y=0),r=g.y+g.height-m.yAxis.len,0<r&&(g.height-=r),b&&(g={x:m.yAxis.len-g.y-g.height,y:m.xAxis.len-g.x-g.width,width:g.height,height:g.width}),x||(b?(g.x+=f?0:g.width,g.width=0):(g.y+=f?g.height:0,g.height=0)));e.align=B(e.align,!b||x?"center":f?"right":"left");e.verticalAlign=B(e.verticalAlign,b||x?"middle":f?"top":"bottom");h.prototype.alignDataLabel.call(this,a,c,e,g,l);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(L);(function(a){var E=a.Chart,D=a.each,
F=a.objectEach,t=a.pick,l=a.addEvent;E.prototype.callbacks.push(function(a){l(a,"render",function(){var l=[];D(a.labelCollectors||[],function(a){l=l.concat(a())});D(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&F(a.stacks,function(a){F(a,function(a){l.push(a.label)})})});D(a.series||[],function(a){var p=a.options.dataLabels,q=a.dataLabelCollections||["dataLabel"];(p.enabled||a._hasPointLabels)&&!p.allowOverlap&&a.visible&&D(q,function(e){D(a.points,function(a){a[e]&&
(a[e].labelrank=t(a.labelrank,a.shapeArgs&&a.shapeArgs.height),l.push(a[e]))})})});a.hideOverlappingLabels(l)})});E.prototype.hideOverlappingLabels=function(a){var l=a.length,p,u,t,e,h,g,c,b,w,m=function(a,b,c,e,g,f,h,l){return!(g>a+c||g+h<a||f>b+e||f+l<b)};for(u=0;u<l;u++)if(p=a[u])p.oldOpacity=p.opacity,p.newOpacity=1,p.width||(t=p.getBBox(),p.width=t.width,p.height=t.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(u=0;u<l;u++)for(t=a[u],p=u+1;p<l;++p)if(e=a[p],t&&e&&
t!==e&&t.placed&&e.placed&&0!==t.newOpacity&&0!==e.newOpacity&&(h=t.alignAttr,g=e.alignAttr,c=t.parentGroup,b=e.parentGroup,w=2*(t.box?0:t.padding||0),h=m(h.x+c.translateX,h.y+c.translateY,t.width-w,t.height-w,g.x+b.translateX,g.y+b.translateY,e.width-w,e.height-w)))(t.labelrank<e.labelrank?t:e).newOpacity=0;D(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(L);
(function(a){var E=a.addEvent,D=a.Chart,F=a.createElement,t=a.css,l=a.defaultOptions,p=a.defaultPlotOptions,z=a.each,q=a.extend,u=a.fireEvent,B=a.hasTouch,e=a.inArray,h=a.isObject,g=a.Legend,c=a.merge,b=a.pick,w=a.Point,m=a.Series,r=a.seriesTypes,C=a.svg,H;H=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,f=function(a){var f=b.getPointFromEvent(a);void 0!==f&&(b.isDirectTouch=!0,f.onMouseOver(a))};z(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&
(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(z(a.trackerGroups,function(c){if(a[c]){a[c].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(B)a[c].on("touchstart",f);a.options.cursor&&a[c].css(t).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,f=b.trackByArea,c=[].concat(f?a.areaPath:a.graphPath),e=c.length,g=a.chart,d=g.pointer,n=g.renderer,h=g.options.tooltip.snap,
k=a.tracker,l,m=function(){if(g.hoverSeries!==a)a.onMouseOver()},r="rgba(192,192,192,"+(C?.0001:.002)+")";if(e&&!f)for(l=e+1;l--;)"M"===c[l]&&c.splice(l+1,0,c[l+1]-h,c[l+2],"L"),(l&&"M"===c[l]||l===e)&&c.splice(l,0,"L",c[l-2]+h,c[l-1]);k?k.attr({d:c}):a.graph&&(a.tracker=n.path(c).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:r,fill:f?r:"none","stroke-width":a.graph.strokeWidth()+(f?0:2*h),zIndex:2}).add(a.group),z([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",
m).on("mouseout",function(a){d.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(B)a.on("touchstart",m)}))}};r.column&&(r.column.prototype.drawTracker=H.drawTrackerPoint);r.pie&&(r.pie.prototype.drawTracker=H.drawTrackerPoint);r.scatter&&(r.scatter.prototype.drawTracker=H.drawTrackerPoint);q(g.prototype,{setItemEvents:function(a,b,f){var e=this,g=e.chart.renderer.boxWrapper,h="highcharts-legend-"+(a.series?"point":"series")+"-active";(f?b:a.legendGroup).on("mouseover",function(){a.setState("hover");
g.addClass(h);b.css(e.options.itemHoverStyle)}).on("mouseout",function(){b.css(c(a.visible?e.itemStyle:e.itemHiddenStyle));g.removeClass(h);a.setState()}).on("click",function(d){var b=function(){a.setVisible&&a.setVisible()};d={browserEvent:d};a.firePointEvent?a.firePointEvent("legendItemClick",d,b):u(a,"legendItemClick",d,b)})},createCheckboxForItem:function(a){a.checkbox=F("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);
E(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});l.legend.itemStyle.cursor="pointer";q(D.prototype,{showResetZoom:function(){var a=this,b=l.lang,f=a.options.chart.resetZoomButton,c=f.theme,e=c.states,g="chart"===f.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},c,e&&e.hover).attr({align:f.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(f.position,
!1,g)},zoomOut:function(){var a=this;u(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var c,f=this.pointer,e=!1,g;!a||a.resetSelection?(z(this.axes,function(a){c=a.zoom()}),f.initiated=!1):z(a.xAxis.concat(a.yAxis),function(a){var d=a.axis;f[d.isXAxis?"zoomX":"zoomY"]&&(c=d.zoom(a.min,a.max),d.displayBtn&&(e=!0))});g=this.resetZoomButton;e&&!g?this.showResetZoom():!e&&h(g)&&(this.resetZoomButton=g.destroy());c&&this.redraw(b(this.options.chart.animation,a&&a.animation,100>
this.pointCount))},pan:function(a,b){var f=this,c=f.hoverPoints,e;c&&z(c,function(a){a.setState()});z("xy"===b?[1,0]:[1],function(b){b=f[b?"xAxis":"yAxis"][0];var d=b.horiz,c=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=f[d],k=(b.pointRange||0)/2,h=b.getExtremes(),l=b.toValue(g-c,!0)+k,k=b.toValue(g+b.len-c,!0)-k,m=k<l,g=m?k:l,l=m?l:k,k=Math.min(h.dataMin,b.toValue(b.toPixels(h.min)-b.minPixelPadding)),m=Math.max(h.dataMax,b.toValue(b.toPixels(h.max)+b.minPixelPadding)),r;r=k-g;0<r&&(l+=
r,g=k);r=l-m;0<r&&(l=m,g-=r);b.series.length&&g!==h.min&&l!==h.max&&(b.setExtremes(g,l,!1,!1,{trigger:"pan"}),e=!0);f[d]=c});e&&f.redraw(!1);t(f.container,{cursor:"move"})}});q(w.prototype,{select:function(a,c){var f=this,g=f.series,h=g.chart;a=b(a,!f.selected);f.firePointEvent(a?"select":"unselect",{accumulate:c},function(){f.selected=f.options.selected=a;g.options.data[e(f,g.data)]=f.options;f.setState(a&&"select");c||z(h.getSelectedPoints(),function(a){a.selected&&a!==f&&(a.selected=a.options.selected=
!1,g.options.data[e(a,g.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,f=b.pointer;a=a?f.normalize(a):f.getChartCoordinatesFromPoint(this,b.inverted);f.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");z(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,e=c(b.series.options.point,b.options).events;
b.events=e;a.objectEach(e,function(a,c){E(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,c){var f=Math.floor(this.plotX),e=this.plotY,g=this.series,h=g.options.states[a]||{},d=p[g.type].marker&&g.options.marker,n=d&&!1===d.enabled,l=d&&d.states&&d.states[a]||{},k=!1===l.enabled,m=g.stateMarkerGraphic,r=this.marker||{},w=g.chart,u=g.halo,t,A=d&&g.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===h.enabled||a&&(k||n&&!1===l.enabled)||a&&r.states&&r.states[a]&&
!1===r.states[a].enabled)){A&&(t=g.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(g.pointAttribs(this,a),b(w.options.chart.animation,h.animation)),t&&this.graphic.animate(t,b(w.options.chart.animation,l.animation,d.animation)),m&&m.hide();else{if(a&&l){d=r.symbol||g.symbol;m&&m.currentSymbol!==d&&(m=m.destroy());if(m)m[c?"animate":"attr"]({x:t.x,y:t.y});else d&&(g.stateMarkerGraphic=
m=w.renderer.symbol(d,t.x,t.y,t.width,t.height).add(g.markerGroup),m.currentSymbol=d);m&&m.attr(g.pointAttribs(this,a))}m&&(m[a&&w.isInsidePlot(f,e,w.inverted)?"show":"hide"](),m.element.point=this)}(f=h.halo)&&f.size?(u||(g.halo=u=w.renderer.path().add((this.graphic||m).parentGroup)),u[c?"animate":"attr"]({d:this.haloPath(f.size)}),u.attr({"class":"highcharts-halo highcharts-color-"+b(this.colorIndex,g.colorIndex)}),u.point=this,u.attr(q({fill:this.color||g.color,"fill-opacity":f.opacity,zIndex:-1},
f.attributes))):u&&u.point&&u.point.haloPath&&u.animate({d:u.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});q(m.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,f=b.tooltip,c=b.hoverPoint;b.hoverSeries=
null;if(c)c.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!f||this.stickyTracking||f.shared&&!this.noSharedTooltip||f.hide();this.setState()},setState:function(a){var c=this,f=c.options,g=c.graph,e=f.states,h=f.lineWidth,f=0;a=a||"";if(c.state!==a&&(z([c.group,c.markerGroup,c.dataLabelsGroup],function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!e[a]||!1!==e[a].enabled)&&(a&&(h=e[a].lineWidth||h+(e[a].lineWidthPlus||0)),
g&&!g.dashstyle))for(h={"stroke-width":h},g.animate(h,b(c.chart.options.chart.animation,e[a]&&e[a].animation));c["zone-graph-"+f];)c["zone-graph-"+f].attr(h),f+=1},setVisible:function(a,b){var f=this,c=f.chart,g=f.legendItem,e,d=c.options.chart.ignoreHiddenSeries,n=f.visible;e=(f.visible=a=f.options.visible=f.userOptions.visible=void 0===a?!n:a)?"show":"hide";z(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(f[a])f[a][e]()});if(c.hoverSeries===f||(c.hoverPoint&&c.hoverPoint.series)===
f)f.onMouseOut();g&&c.legend.colorizeItem(f,a);f.isDirty=!0;f.options.stacking&&z(c.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});z(f.linkedSeries,function(b){b.setVisible(a,!1)});d&&(c.isDirtyBox=!0);!1!==b&&c.redraw();u(f,e,{redraw:b})},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect")},drawTracker:H.drawTrackerGraph})})(L);
(function(a){var E=a.Chart,D=a.each,F=a.inArray,t=a.isArray,l=a.isObject,p=a.pick,z=a.splat;E.prototype.setResponsive=function(l){var p=this.options.responsive,q=[],e=this.currentResponsive;p&&p.rules&&D(p.rules,function(g){void 0===g._id&&(g._id=a.uniqueKey());this.matchResponsiveRule(g,q,l)},this);var h=a.merge.apply(0,a.map(q,function(g){return a.find(p.rules,function(a){return a._id===g}).chartOptions})),q=q.toString()||void 0;q!==(e&&e.ruleIds)&&(e&&this.update(e.undoOptions,l),q?(this.currentResponsive=
{ruleIds:q,mergedOptions:h,undoOptions:this.currentOptions(h)},this.update(h,l)):this.currentResponsive=void 0)};E.prototype.matchResponsiveRule=function(a,l){var q=a.condition;(q.callback||function(){return this.chartWidth<=p(q.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=p(q.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=p(q.minWidth,0)&&this.chartHeight>=p(q.minHeight,0)}).call(this)&&l.push(a._id)};E.prototype.currentOptions=function(p){function q(e,h,g,c){var b;a.objectEach(e,function(a,m){if(!c&&
-1<F(m,["series","xAxis","yAxis"]))for(e[m]=z(e[m]),g[m]=[],b=0;b<e[m].length;b++)h[m][b]&&(g[m][b]={},q(a[b],h[m][b],g[m][b],c+1));else l(a)?(g[m]=t(a)?[]:{},q(a,h[m]||{},g[m],c+1)):g[m]=h[m]||null})}var B={};q(p,this.options,B,0);return B}})(L);(function(a){var E=a.addEvent,D=a.Axis,F=a.Chart,t=a.css,l=a.dateFormat,p=a.defined,z=a.each,q=a.extend,u=a.noop,B=a.pick,e=a.timeUnits,h=a.wrap;h(a.Series.prototype,"init",function(a){var c;a.apply(this,Array.prototype.slice.call(arguments,1));(c=this.xAxis)&&
c.options.ordinal&&E(this,"updatedData",function(){delete c.ordinalIndex})});h(D.prototype,"getTimeTicks",function(a,c,b,h,m,r,q,u){var g=0,t,f,x={},w,v,d,n=[],G=-Number.MAX_VALUE,k=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||!r||3>r.length||void 0===b)return a.call(this,c,b,h,m);v=r.length;for(t=0;t<v;t++){d=t&&r[t-1]>h;r[t]<b&&(g=t);if(t===v-1||r[t+1]-r[t]>5*q||d){if(r[t]>G){for(f=a.call(this,c,r[g],r[t],m);f.length&&f[0]<=G;)f.shift();f.length&&(G=f[f.length-
1]);n=n.concat(f)}g=t+1}if(d)break}a=f.info;if(u&&a.unitRange<=e.hour){t=n.length-1;for(g=1;g<t;g++)l("%d",n[g])!==l("%d",n[g-1])&&(x[n[g]]="day",w=!0);w&&(x[n[0]]="day");a.higherRanks=x}n.info=a;if(u&&p(k)){u=a=n.length;t=[];var y;for(w=[];u--;)g=this.translate(n[u]),y&&(w[u]=y-g),t[u]=y=g;w.sort();w=w[Math.floor(w.length/2)];w<.6*k&&(w=null);u=n[a-1]>h?a-1:a;for(y=void 0;u--;)g=t[u],h=Math.abs(y-g),y&&h<.8*k&&(null===w||h<.8*w)?(x[n[u]]&&!x[n[u+1]]?(h=u+1,y=g):h=u,n.splice(h,1)):y=g}return n});
q(D.prototype,{beforeSetTickPositions:function(){var a,c=[],b=!1,e,h=this.getExtremes(),l=h.min,q=h.max,t,u=this.isXAxis&&!!this.options.breaks,h=this.options.ordinal,D=Number.MAX_VALUE,f=this.chart.options.chart.ignoreHiddenSeries;e="highcharts-navigator-xaxis"===this.options.className;!this.options.overscroll||this.max!==this.dataMax||this.chart.mouseIsDown&&!e||this.eventArgs&&(!this.eventArgs||"navigator"===this.eventArgs.trigger)||(this.max+=this.options.overscroll,!e&&p(this.userMin)&&(this.min+=
this.options.overscroll));if(h||u){z(this.series,function(b,e){if(!(f&&!1===b.visible||!1===b.takeOrdinalPosition&&!u)&&(c=c.concat(b.processedXData),a=c.length,c.sort(function(a,b){return a-b}),D=Math.min(D,B(b.closestPointRange,D)),a))for(e=a-1;e--;)c[e]===c[e+1]&&c.splice(e,1)});a=c.length;if(2<a){e=c[1]-c[0];for(t=a-1;t--&&!b;)c[t+1]-c[t]!==e&&(b=!0);!this.options.keepOrdinalPadding&&(c[0]-l>e||q-c[c.length-1]>e)&&(b=!0)}else this.options.overscroll&&(2===a?D=c[1]-c[0]:1===a?(D=this.options.overscroll,
c=[c[0],c[0]+D]):D=this.overscrollPointsRange);b?(this.options.overscroll&&(this.overscrollPointsRange=D,c=c.concat(this.getOverscrollPositions())),this.ordinalPositions=c,e=this.ordinal2lin(Math.max(l,c[0]),!0),t=Math.max(this.ordinal2lin(Math.min(q,c[c.length-1]),!0),1),this.ordinalSlope=q=(q-l)/(t-e),this.ordinalOffset=l-e*q):(this.overscrollPointsRange=B(this.closestPointRange,this.overscrollPointsRange),this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0)}this.isOrdinal=h&&b;this.groupIntervalFactor=
null},val2lin:function(a,c){var b=this.ordinalPositions;if(b){var e=b.length,g,h;for(g=e;g--;)if(b[g]===a){h=g;break}for(g=e-1;g--;)if(a>b[g]||0===g){a=(a-b[g])/(b[g+1]-b[g]);h=g+a;break}c=c?h:this.ordinalSlope*(h||0)+this.ordinalOffset}else c=a;return c},lin2val:function(a,c){var b=this.ordinalPositions;if(b){var e=this.ordinalSlope,g=this.ordinalOffset,h=b.length-1,l;if(c)0>a?a=b[0]:a>h?a=b[h]:(h=Math.floor(a),l=a-h);else for(;h--;)if(c=e*h+g,a>=c){e=e*(h+1)+g;l=(a-c)/(e-c);break}return void 0!==
l&&void 0!==b[h]?b[h]+(l?l*(b[h+1]-b[h]):0):a}return a},getExtendedPositions:function(){var a=this,c=a.chart,b=a.series[0].currentDataGrouping,e=a.ordinalIndex,h=b?b.count+b.unitName:"raw",l=a.options.overscroll,p=a.getExtremes(),q,t;e||(e=a.ordinalIndex={});e[h]||(q={series:[],chart:c,getExtremes:function(){return{min:p.dataMin,max:p.dataMax+l}},options:{ordinal:!0},val2lin:D.prototype.val2lin,ordinal2lin:D.prototype.ordinal2lin},z(a.series,function(e){t={xAxis:q,xData:e.xData.slice(),chart:c,destroyGroupedData:u};
t.xData=t.xData.concat(a.getOverscrollPositions());t.options={dataGrouping:b?{enabled:!0,forced:!0,approximation:"open",units:[[b.unitName,[b.count]]]}:{enabled:!1}};e.processData.apply(t);q.series.push(t)}),a.beforeSetTickPositions.apply(q),e[h]=q.ordinalPositions);return e[h]},getOverscrollPositions:function(){var e=this.options.overscroll,c=this.overscrollPointsRange,b=[],h=this.dataMax;if(a.defined(c))for(b.push(h);h<=this.dataMax+e;)h+=c,b.push(h);return b},getGroupIntervalFactor:function(a,
c,b){var e;b=b.processedXData;var g=b.length,h=[];e=this.groupIntervalFactor;if(!e){for(e=0;e<g-1;e++)h[e]=b[e+1]-b[e];h.sort(function(a,b){return a-b});h=h[Math.floor(g/2)];a=Math.max(a,b[0]);c=Math.min(c,b[g-1]);this.groupIntervalFactor=e=g*h/(c-a)}return e},postProcessTickInterval:function(a){var c=this.ordinalSlope;return c?this.options.breaks?this.closestPointRange:a/(c/this.closestPointRange):a}});D.prototype.ordinal2lin=D.prototype.val2lin;h(F.prototype,"pan",function(a,c){var b=this.xAxis[0],
e=b.options.overscroll,g=c.chartX,h=!1;if(b.options.ordinal&&b.series.length){var l=this.mouseDownX,p=b.getExtremes(),q=p.dataMax,u=p.min,f=p.max,x=this.hoverPoints,J=b.closestPointRange||b.overscrollPointsRange,l=(l-g)/(b.translationSlope*(b.ordinalSlope||J)),v={ordinalPositions:b.getExtendedPositions()},J=b.lin2val,d=b.val2lin,n;v.ordinalPositions?1<Math.abs(l)&&(x&&z(x,function(a){a.setState()}),0>l?(x=v,n=b.ordinalPositions?b:v):(x=b.ordinalPositions?b:v,n=v),v=n.ordinalPositions,q>v[v.length-
1]&&v.push(q),this.fixedRange=f-u,l=b.toFixedRange(null,null,J.apply(x,[d.apply(x,[u,!0])+l,!0]),J.apply(n,[d.apply(n,[f,!0])+l,!0])),l.min>=Math.min(p.dataMin,u)&&l.max<=Math.max(q,f)+e&&b.setExtremes(l.min,l.max,!0,!1,{trigger:"pan"}),this.mouseDownX=g,t(this.container,{cursor:"move"})):h=!0}else h=!0;h&&(e&&(b.max=b.dataMax+e),a.apply(this,Array.prototype.slice.call(arguments,1)))})})(L);(function(a){function E(){return Array.prototype.slice.call(arguments,1)}function D(a){a.apply(this);this.drawBreaks(this.xAxis,
["x"]);this.drawBreaks(this.yAxis,F(this.pointArrayMap,["y"]))}var F=a.pick,t=a.wrap,l=a.each,p=a.extend,z=a.isArray,q=a.fireEvent,u=a.Axis,B=a.Series;p(u.prototype,{isInBreak:function(a,h){var e=a.repeat||Infinity,c=a.from,b=a.to-a.from;h=h>=c?(h-c)%e:e-(c-h)%e;return a.inclusive?h<=b:h<b&&0!==h},isInAnyBreak:function(a,h){var e=this.options.breaks,c=e&&e.length,b,l,m;if(c){for(;c--;)this.isInBreak(e[c],a)&&(b=!0,l||(l=F(e[c].showPoints,this.isXAxis?!1:!0)));m=b&&h?b&&!l:b}return m}});t(u.prototype,
"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var e=this.tickPositions,g=this.tickPositions.info,c=[],b;for(b=0;b<e.length;b++)this.isInAnyBreak(e[b])||c.push(e[b]);this.tickPositions=c;this.tickPositions.info=g}});t(u.prototype,"init",function(a,h,g){var c=this;g.breaks&&g.breaks.length&&(g.ordinal=!1);a.call(this,h,g);a=this.options.breaks;c.isBroken=z(a)&&!!a.length;c.isBroken&&(c.val2lin=function(a){var b=a,e,g;for(g=0;g<c.breakArray.length;g++)if(e=
c.breakArray[g],e.to<=a)b-=e.len;else if(e.from>=a)break;else if(c.isInBreak(e,a)){b-=a-e.from;break}return b},c.lin2val=function(a){var b,e;for(e=0;e<c.breakArray.length&&!(b=c.breakArray[e],b.from>=a);e++)b.to<a?a+=b.len:c.isInBreak(b,a)&&(a+=b.len);return a},c.setExtremes=function(a,c,e,g,h){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(c);)c-=this.closestPointRange;u.prototype.setExtremes.call(this,a,c,e,g,h)},c.setAxisTranslation=function(a){u.prototype.setAxisTranslation.call(this,
a);a=c.options.breaks;var b=[],e=[],g=0,h,p,t=c.userMin||c.min,z=c.userMax||c.max,f=F(c.pointRangePadding,0),x,J;l(a,function(a){p=a.repeat||Infinity;c.isInBreak(a,t)&&(t+=a.to%p-t%p);c.isInBreak(a,z)&&(z-=z%p-a.from%p)});l(a,function(a){x=a.from;for(p=a.repeat||Infinity;x-p>t;)x-=p;for(;x<t;)x+=p;for(J=x;J<z;J+=p)b.push({value:J,move:"in"}),b.push({value:J+(a.to-a.from),move:"out",size:a.breakSize})});b.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});
h=0;x=t;l(b,function(a){h+="in"===a.move?1:-1;1===h&&"in"===a.move&&(x=a.value);0===h&&(e.push({from:x,to:a.value,len:a.value-x-(a.size||0)}),g+=a.value-x-(a.size||0))});c.breakArray=e;c.unitLength=z-t-g+f;q(c,"afterBreaks");c.options.staticScale?c.transA=c.options.staticScale:c.unitLength&&(c.transA*=(z-c.min+f)/c.unitLength);f&&(c.minPixelPadding=c.transA*c.minPointOffset);c.min=t;c.max=z})});t(B.prototype,"generatePoints",function(a){a.apply(this,E(arguments));var e=this.xAxis,g=this.yAxis,c=this.points,
b,l=c.length,m=this.options.connectNulls,r;if(e&&g&&(e.options.breaks||g.options.breaks))for(;l--;)b=c[l],r=null===b.y&&!1===m,r||!e.isInAnyBreak(b.x,!0)&&!g.isInAnyBreak(b.y,!0)||(c.splice(l,1),this.data[l]&&this.data[l].destroyElements())});a.Series.prototype.drawBreaks=function(a,h){var e=this,c=e.points,b,p,m,r;a&&l(h,function(g){b=a.breakArray||[];p=a.isXAxis?a.min:F(e.options.threshold,a.min);l(c,function(c){r=F(c["stack"+g.toUpperCase()],c[g]);l(b,function(b){m=!1;if(p<b.from&&r>b.to||p>b.from&&
r<b.from)m="pointBreak";else if(p<b.from&&r>b.from&&r<b.to||p>b.from&&r>b.to&&r<b.from)m="pointInBreak";m&&q(a,m,{point:c,brk:b})})})})};a.Series.prototype.gappedPath=function(){var e=this.options.gapSize,h=this.points.slice(),g=h.length-1,c=this.yAxis,b;if(e&&0<g)for("value"!==this.options.gapUnit&&(e*=this.closestPointRange);g--;)h[g+1].x-h[g].x>e&&(b=(h[g].x+h[g+1].x)/2,h.splice(g+1,0,{isNull:!0,x:b}),this.options.stacking&&(b=c.stacks[this.stackKey][b]=new a.StackItem(c,c.options.stackLabels,
!1,b,this.stack),b.total=0));return this.getGraphPath(h)};t(a.seriesTypes.column.prototype,"drawPoints",D);t(a.Series.prototype,"drawPoints",D)})(L);(function(a){var E=a.arrayMax,D=a.arrayMin,F=a.Axis,t=a.defaultPlotOptions,l=a.defined,p=a.each,z=a.extend,q=a.format,u=a.isNumber,B=a.merge,e=a.pick,h=a.Point,g=a.Tooltip,c=a.wrap,b=a.Series.prototype,w=b.processData,m=b.generatePoints,r=b.destroy,C={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L",
"%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},H={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},
areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},A=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],K=a.approximations={sum:function(a){var b=a.length,f;if(!b&&a.hasNulls)f=null;else if(b)for(f=
0;b--;)f+=a[b];return f},average:function(a){var b=a.length;a=K.sum(a);u(a)&&b&&(a/=b);return a},averages:function(){var a=[];p(arguments,function(b){a.push(K.average(b))});return a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?E(a):a.hasNulls?null:void 0},low:function(a){return a.length?D(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,c,e){a=K.open(a);b=K.high(b);c=K.low(c);e=K.close(e);
if(u(a)||u(b)||u(c)||u(e))return[a,b,c,e]},range:function(a,b){a=K.low(a);b=K.high(b);if(u(a)||u(b))return[a,b];if(null===a&&null===b)return null}};b.groupData=function(a,b,c,e){var d=this.data,f=this.options.data,g=[],k=[],h=[],l=a.length,m,r,q=!!b,v=[];e="function"===typeof e?e:K[e]||H[this.type]&&K[H[this.type].approximation]||K[C.approximation];var t=this.pointArrayMap,x=t&&t.length,w=0;r=0;var z,A;x?p(t,function(){v.push([])}):v.push([]);z=x||1;for(A=0;A<=l&&!(a[A]>=c[0]);A++);for(A;A<=l;A++){for(;void 0!==
c[w+1]&&a[A]>=c[w+1]||A===l;){m=c[w];this.dataGroupInfo={start:r,length:v[0].length};r=e.apply(this,v);void 0!==r&&(g.push(m),k.push(r),h.push(this.dataGroupInfo));r=A;for(m=0;m<z;m++)v[m].length=0,v[m].hasNulls=!1;w+=1;if(A===l)break}if(A===l)break;if(t){m=this.cropStart+A;var B=d&&d[m]||this.pointClass.prototype.applyOptions.apply({series:this},[f[m]]),J;for(m=0;m<x;m++)J=B[t[m]],u(J)?v[m].push(J):null===J&&(v[m].hasNulls=!0)}else m=q?b[A]:null,u(m)?v[0].push(m):null===m&&(v[0].hasNulls=!0)}return[g,
k,h]};b.processData=function(){var a=this.chart,c=this.options.dataGrouping,g=!1!==this.allowDG&&c&&e(c.enabled,a.options.isStock),h=this.visible||!a.options.chart.ignoreHiddenSeries,d;this.forceCrop=g;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==w.apply(this,arguments)&&g){this.destroyGroupedData();var n=this.processedXData,m=this.processedYData,k=a.plotSizeX,a=this.xAxis,r=a.options.ordinal,p=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(p){this.isDirty=d=!0;this.points=
null;var q=a.getExtremes(),g=q.min,q=q.max,r=r&&a.getGroupIntervalFactor(g,q,this)||1,k=p*(q-g)/k*r,p=a.getTimeTicks(a.normalizeTimeTickInterval(k,c.units||A),Math.min(g,n[0]),Math.max(q,n[n.length-1]),a.options.startOfWeek,n,this.closestPointRange),n=b.groupData.apply(this,[n,m,p,c.approximation]),m=n[0],r=n[1];if(c.smoothed&&m.length){c=m.length-1;for(m[c]=Math.min(m[c],q);c--&&0<c;)m[c]+=k/2;m[0]=Math.max(m[0],g)}this.currentDataGrouping=p.info;this.closestPointRange=p.info.totalRange;this.groupMap=
n[2];l(m[0])&&m[0]<a.dataMin&&h&&(a.min===a.dataMin&&(a.min=m[0]),a.dataMin=m[0]);this.processedXData=m;this.processedYData=r}else this.currentDataGrouping=this.groupMap=null;this.hasGroupedData=d}};b.destroyGroupedData=function(){var a=this.groupedData;p(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};b.generatePoints=function(){m.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};c(h.prototype,"update",function(b){this.dataGroup?
a.error(24):b.apply(this,[].slice.call(arguments,1))});c(g.prototype,"tooltipFooterHeaderFormatter",function(b,c,e){var f=c.series,d=f.tooltipOptions,g=f.options.dataGrouping,h=d.xDateFormat,k,l=f.xAxis,m=a.dateFormat;return l&&"datetime"===l.options.type&&g&&u(c.key)?(b=f.currentDataGrouping,g=g.dateTimeLabelFormats,b?(l=g[b.unitName],1===b.count?h=l[0]:(h=l[1],k=l[2])):!h&&g&&(h=this.getXDateFormat(c,d,l)),h=m(h,c.key),k&&(h+=m(k,c.key+b.totalRange-1)),q(d[(e?"footer":"header")+"Format"],{point:z(c.point,
{key:h}),series:f})):b.call(this,c,e)});b.destroy=function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();r.apply(this)};c(b,"setOptions",function(a,b){a=a.call(this,b);var c=this.type,f=this.chart.options.plotOptions,d=t[c].dataGrouping;H[c]&&(d||(d=B(C,H[c])),a.dataGrouping=B(d,f.series&&f.series.dataGrouping,f[c].dataGrouping,b.dataGrouping));this.chart.options.isStock&&(this.requireSorting=!0);return a});c(F.prototype,"setScale",function(a){a.call(this);p(this.series,function(a){a.hasProcessed=
!1})});F.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,e=0,d=!1,g;for(c=b;c--;)(g=a[c].options.dataGrouping)&&(e=Math.max(e,g.groupPixelWidth));for(c=b;c--;)(g=a[c].options.dataGrouping)&&a[c].hasProcessed&&(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/e||b&&g.forced)&&(d=!0);return d?e:0};F.prototype.setDataGrouping=function(a,b){var c;b=e(b,!0);a||(a={forced:!1,units:null});if(this instanceof F)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},
!1);else p(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()}})(L);(function(a){var E=a.each,D=a.Point,F=a.seriesType,t=a.seriesTypes;F("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},threshold:null,states:{hover:{lineWidth:3}},stickyTracking:!0},
{directTouch:!1,pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"close",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,p){p=t.column.prototype.pointAttribs.call(this,a,p);var l=this.options;delete p.fill;!a.options.color&&l.upColor&&a.open<a.close&&(p.stroke=l.upColor);return p},translate:function(){var a=this,p=a.yAxis,z=!!a.modifyValue,q=["plotOpen","plotHigh","plotLow","plotClose","yBottom"];
t.column.prototype.translate.apply(a);E(a.points,function(l){E([l.open,l.high,l.low,l.close,l.low],function(t,e){null!==t&&(z&&(t=a.modifyValue(t)),l[q[e]]=p.toPixels(t,!0))});l.tooltipPos[1]=l.plotHigh+p.pos-a.chart.plotTop})},drawPoints:function(){var a=this,p=a.chart;E(a.points,function(l){var q,t,z,e,h=l.graphic,g,c=!h;void 0!==l.plotY&&(h||(l.graphic=h=p.renderer.path().add(a.group)),h.attr(a.pointAttribs(l,l.selected&&"select")),t=h.strokeWidth()%2/2,g=Math.round(l.plotX)-t,z=Math.round(l.shapeArgs.width/
2),e=["M",g,Math.round(l.yBottom),"L",g,Math.round(l.plotHigh)],null!==l.open&&(q=Math.round(l.plotOpen)+t,e.push("M",g,q,"L",g-z,q)),null!==l.close&&(q=Math.round(l.plotClose)+t,e.push("M",g,q,"L",g+z,q)),h[c?"attr":"animate"]({d:e}).addClass(l.getClassName(),!0))})},animate:null},{getClassName:function(){return D.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(L);(function(a){var E=a.defaultPlotOptions,D=a.each,F=a.merge,t=a.seriesType,
l=a.seriesTypes;t("candlestick","ohlc",F(E.column,{states:{hover:{lineWidth:2}},tooltip:E.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(a,t){var p=l.column.prototype.pointAttribs.call(this,a,t),u=this.options,z=a.open<a.close,e=u.lineColor||this.color;p["stroke-width"]=u.lineWidth;p.fill=a.options.color||(z?u.upColor||this.color:this.color);p.stroke=a.lineColor||(z?u.upLineColor||e:e);t&&(a=u.states[t],p.fill=a.color||p.fill,
p.stroke=a.lineColor||p.stroke,p["stroke-width"]=a.lineWidth||p["stroke-width"]);return p},drawPoints:function(){var a=this,l=a.chart;D(a.points,function(p){var t=p.graphic,q,e,h,g,c,b,w,m=!t;void 0!==p.plotY&&(t||(p.graphic=t=l.renderer.path().add(a.group)),t.attr(a.pointAttribs(p,p.selected&&"select")).shadow(a.options.shadow),c=t.strokeWidth()%2/2,b=Math.round(p.plotX)-c,q=p.plotOpen,e=p.plotClose,h=Math.min(q,e),q=Math.max(q,e),w=Math.round(p.shapeArgs.width/2),e=Math.round(h)!==Math.round(p.plotHigh),
g=q!==p.yBottom,h=Math.round(h)+c,q=Math.round(q)+c,c=[],c.push("M",b-w,q,"L",b-w,h,"L",b+w,h,"L",b+w,q,"Z","M",b,h,"L",b,e?Math.round(p.plotHigh):h,"M",b,q,"L",b,g?Math.round(p.yBottom):q),t[m?"attr":"animate"]({d:c}).addClass(p.getClassName(),!0))})}})})(L);Z=function(a){var E=a.each,D=a.seriesTypes,F=a.stableSort;return{translate:function(){D.column.prototype.translate.apply(this);var a=this.options,l=this.chart,p=this.points,z=p.length-1,q,u,B=a.onSeries;q=B&&l.get(B);var a=a.onKey||"y",B=q&&
q.options.step,e=q&&q.points,h=e&&e.length,g=this.xAxis,c=this.yAxis,b=g.getExtremes(),w=0,m,r,C;if(q&&q.visible&&h)for(w=(q.pointXOffset||0)+(q.barW||0)/2,q=q.currentDataGrouping,r=e[h-1].x+(q?q.totalRange:0),F(p,function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);h--&&p[z]&&!(q=p[z],m=e[h],m.x<=q.x&&void 0!==m[a]&&(q.x<=r&&(q.plotY=m[a],m.x<q.x&&!B&&(C=e[h+1])&&void 0!==C[a]&&(q.plotY+=(q.x-m.x)/(C.x-m.x)*(C[a]-m[a]))),z--,h++,0>z)););E(p,function(a,e){var h;void 0===a.plotY&&
(a.x>=b.min&&a.x<=b.max?a.plotY=l.chartHeight-g.bottom-(g.opposite?g.height:0)+g.offset-c.top:a.shapeArgs={});a.plotX+=w;(u=p[e-1])&&u.plotX===a.plotX&&(void 0===u.stackIndex&&(u.stackIndex=0),h=u.stackIndex+1);a.stackIndex=h})}}}(L);(function(a,E){var D=a.addEvent,F=a.each,t=a.merge,l=a.noop,p=a.Renderer,z=a.seriesType,q=a.TrackerMixin,u=a.VMLRenderer,B=a.SVGRenderer.prototype.symbols;z("flags","column",{pointRange:0,shape:"flag",stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},
threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,h){var e=this.options,c=a&&a.color||this.color,b=e.lineColor,l=a&&a.lineWidth;a=a&&a.fillColor||e.fillColor;h&&(a=e.states[h].fillColor,b=e.states[h].lineColor,l=e.states[h].lineWidth);return{fill:a||
c,stroke:b||c,"stroke-width":l||e.lineWidth||0}},translate:E.translate,drawPoints:function(){var e=this.points,h=this.chart,g=h.renderer,c,b,l=this.options,m=l.y,r,p,q,u,z,f,x,B=this.yAxis;for(p=e.length;p--;)q=e[p],x=q.plotX>this.xAxis.len,c=q.plotX,u=q.stackIndex,r=q.options.shape||l.shape,b=q.plotY,void 0!==b&&(b=q.plotY+m-(void 0!==u&&u*l.stackDistance)),z=u?void 0:q.plotX,f=u?void 0:q.plotY,u=q.graphic,void 0!==b&&0<=c&&!x?(u||(u=q.graphic=g.label("",null,null,r,null,null,l.useHTML).attr(this.pointAttribs(q)).css(t(l.style,
q.style)).attr({align:"flag"===r?"left":"center",width:l.width,height:l.height,"text-align":l.textAlign}).addClass("highcharts-point").add(this.markerGroup),q.graphic.div&&(q.graphic.div.point=q),u.shadow(l.shadow)),0<c&&(c-=u.strokeWidth()%2),u.attr({text:q.options.title||l.title||"A",x:c,y:b,anchorX:z,anchorY:f}),q.tooltipPos=h.inverted?[B.len+B.pos-h.plotLeft-b,this.xAxis.len-c]:[c,b+B.pos-h.plotTop]):u&&(q.graphic=u.destroy());l.useHTML&&a.wrap(this.markerGroup,"on",function(b){return a.SVGElement.prototype.on.apply(b.apply(this,
[].slice.call(arguments,1)),[].slice.call(arguments,1))})},drawTracker:function(){var a=this.points;q.drawTrackerPoint.apply(this);F(a,function(e){var g=e.graphic;g&&D(g.element,"mouseover",function(){0<e.stackIndex&&!e.raised&&(e._y=g.y,g.attr({y:e._y-8}),e.raised=!0);F(a,function(a){a!==e&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:l,buildKDTree:l,setClip:l});B.flag=function(a,h,g,c,b){return["M",b&&b.anchorX||a,b&&b.anchorY||h,"L",a,h+c,a,h,a+g,h,a+g,h+c,a,h+c,"Z"]};
F(["circle","square"],function(a){B[a+"pin"]=function(e,g,c,b,l){var h=l&&l.anchorX;l=l&&l.anchorY;"circle"===a&&b>c&&(e-=Math.round((b-c)/2),c=b);e=B[a](e,g,c,b);h&&l&&e.push("M",h,g>l?g:g+b,"L",h,l);return e}});p===u&&F(["flag","circlepin","squarepin"],function(a){u.prototype.symbols[a]=B[a]})})(L,Z);(function(a){function E(a,b,c){this.init(a,b,c)}var D=a.addEvent,F=a.Axis,t=a.correctFloat,l=a.defaultOptions,p=a.defined,z=a.destroyObjectProperties,q=a.each,u=a.fireEvent,B=a.hasTouch,e=a.isTouchDevice,
h=a.merge,g=a.pick,c=a.removeEvent,b=a.wrap,w,m={height:e?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!e,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",trackBorderWidth:1};l.scrollbar=h(!0,m,l.scrollbar);a.swapXY=w=function(a,b){var c=
a.length,e;if(b)for(b=0;b<c;b+=3)e=a[b+1],a[b+1]=a[b+2],a[b+2]=e;return a};E.prototype={init:function(a,b,c){this.scrollbarButtons=[];this.renderer=a;this.userOptions=b;this.options=h(m,b);this.chart=c;this.size=g(this.options.size,this.options.height);b.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,c=this.size,e;this.group=e=a.g("scrollbar").attr({zIndex:b.zIndex,translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,
r:b.trackBorderRadius||0,height:c,width:c}).add(e);this.track.attr({fill:b.trackBackgroundColor,stroke:b.trackBorderColor,"stroke-width":b.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(e);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:c,width:c,r:b.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=a.path(w(["M",-3,c/4,"L",-3,2*c/3,"M",0,c/4,"L",0,2*c/3,"M",
3,c/4,"L",3,2*c/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbar.attr({fill:b.barBackgroundColor,stroke:b.barBorderColor,"stroke-width":b.barBorderWidth});this.scrollbarRifles.attr({stroke:b.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(a,b,c,e){var g=
this.options.vertical,f=0,h=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;this.width=c;this.xOffset=this.height=e;this.yOffset=f;g?(this.width=this.yOffset=c=f=this.size,this.xOffset=b=0,this.barWidth=e-2*c,this.x=a+=this.options.margin):(this.height=this.xOffset=e=b=this.size,this.barWidth=c-2*e,this.y+=this.options.margin);this.group[h]({translateX:a,translateY:this.y});this.track[h]({width:c,height:e});this.scrollbarButtons[1][h]({translateX:g?0:c-b,translateY:g?e-f:0})},
drawScrollbarButton:function(a){var b=this.renderer,c=this.scrollbarButtons,e=this.options,g=this.size,f;f=b.g().add(this.group);c.push(f);f=b.rect().addClass("highcharts-scrollbar-button").add(f);f.attr({stroke:e.buttonBorderColor,"stroke-width":e.buttonBorderWidth,fill:e.buttonBackgroundColor});f.attr(f.crisp({x:-.5,y:-.5,width:g+1,height:g+1,r:e.buttonBorderRadius},f.strokeWidth()));f=b.path(w(["M",g/2+(a?-1:1),g/2-3,"L",g/2+(a?-1:1),g/2+3,"L",g/2+(a?2:-2),g/2],e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
f.attr({fill:e.buttonArrowColor})},setRange:function(a,b){var c=this.options,e=c.vertical,g=c.minWidth,f=this.barWidth,h,l,m=this.rendered&&!this.hasDragged?"animate":"attr";p(f)&&(a=Math.max(a,0),h=Math.ceil(f*a),this.calculatedWidth=l=t(f*Math.min(b,1)-h),l<g&&(h=(f-g+l)*a,l=g),g=Math.floor(h+this.xOffset+this.yOffset),f=l/2-.5,this.from=a,this.to=b,e?(this.scrollbarGroup[m]({translateY:g}),this.scrollbar[m]({height:l}),this.scrollbarRifles[m]({translateY:f}),this.scrollbarTop=g,this.scrollbarLeft=
0):(this.scrollbarGroup[m]({translateX:g}),this.scrollbar[m]({width:l}),this.scrollbarRifles[m]({translateX:f}),this.scrollbarLeft=g,this.scrollbarTop=0),12>=l?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===c.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var c=a.chart.pointer.normalize(b),e=a.options.vertical?"chartY":"chartX",g=a.initPositions;!a.grabbedCenter||b.touches&&0===b.touches[0][e]||
(c=a.cursorToScrollbarPosition(c)[e],e=a[e],e=c-e,a.hasDragged=!0,a.updatePosition(g[0]+e,g[1]+e),a.hasDragged&&u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);b=a.cursorToScrollbarPosition(b);a.chartX=b.chartX;a.chartY=b.chartY;
a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(b){var c=t(a.to-a.from)*a.options.step;a.updatePosition(t(a.from-c),t(a.to-c));u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var c=(a.to-a.from)*a.options.step;a.updatePosition(a.from+c,a.to+c);u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var c=a.chart.pointer.normalize(b),e=a.to-a.from,g=a.y+a.scrollbarTop,f=a.x+a.scrollbarLeft;
a.options.vertical&&c.chartY>g||!a.options.vertical&&c.chartX>f?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-e,a.to-e);u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,b){1<b&&(a=t(1-t(b-a)),b=1);0>a&&(b=t(b-a),a=0);
this.from=a;this.to=b},update:function(a){this.destroy();this.init(this.chart.renderer,h(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,c=this.scrollbarGroup.element,e=this.mouseDownHandler,g=this.mouseMoveHandler,f=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[c,"mousedown",e],[c.ownerDocument,"mousemove",g],[c.ownerDocument,
"mouseup",f]];B&&a.push([c,"touchstart",e],[c.ownerDocument,"touchmove",g],[c.ownerDocument,"touchend",f]);q(a,function(a){D.apply(null,a)});this._events=a},removeEvents:function(){q(this._events,function(a){c.apply(null,a)});this._events.length=0},destroy:function(){var a=this.chart.scroller;this.removeEvents();q(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&this===a.scrollbar&&(a.scrollbar=null,z(a.scrollbarButtons))}};
b(F.prototype,"init",function(a){var b=this;a.apply(b,Array.prototype.slice.call(arguments,1));b.options.scrollbar&&b.options.scrollbar.enabled&&(b.options.scrollbar.vertical=!b.horiz,b.options.startOnTick=b.options.endOnTick=!1,b.scrollbar=new E(b.chart.renderer,b.options.scrollbar,b.chart),D(b.scrollbar,"changed",function(a){var c=Math.min(g(b.options.min,b.min),b.min,b.dataMin),e=Math.max(g(b.options.max,b.max),b.max,b.dataMax)-c,f;b.horiz&&!b.reversed||!b.horiz&&b.reversed?(f=c+e*this.to,c+=e*
this.from):(f=c+e*(1-this.from),c+=e*(1-this.to));b.setExtremes(c,f,!0,!1,a)}))});b(F.prototype,"render",function(a){var b=Math.min(g(this.options.min,this.min),this.min,g(this.dataMin,this.min)),c=Math.max(g(this.options.max,this.max),this.max,g(this.dataMax,this.max)),e=this.scrollbar,h=this.titleOffset||0;a.apply(this,Array.prototype.slice.call(arguments,1));if(e){this.horiz?(e.position(this.left,this.top+this.height+2+this.chart.scrollbarsOffsets[1]+(this.opposite?0:h+this.axisTitleMargin+this.offset),
this.width,this.height),h=1):(e.position(this.left+this.width+2+this.chart.scrollbarsOffsets[0]+(this.opposite?h+this.axisTitleMargin+this.offset:0),this.top,this.width,this.height),h=0);if(!this.opposite&&!this.horiz||this.opposite&&this.horiz)this.chart.scrollbarsOffsets[h]+=this.scrollbar.size+this.scrollbar.options.margin;isNaN(b)||isNaN(c)||!p(this.min)||!p(this.max)?e.setRange(0,0):(h=(this.min-b)/(c-b),b=(this.max-b)/(c-b),this.horiz&&!this.reversed||!this.horiz&&this.reversed?e.setRange(h,
b):e.setRange(1-b,1-h))}});b(F.prototype,"getOffset",function(a){var b=this.horiz?2:1,c=this.scrollbar;a.apply(this,Array.prototype.slice.call(arguments,1));c&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[b]+=c.size+c.options.margin)});b(F.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());a.apply(this,Array.prototype.slice.call(arguments,1))});a.Scrollbar=E})(L);(function(a){function E(a){this.init(a)}var D=a.addEvent,F=a.Axis,t=a.Chart,l=a.color,
p=a.defaultOptions,z=a.defined,q=a.destroyObjectProperties,u=a.each,B=a.erase,e=a.error,h=a.extend,g=a.grep,c=a.hasTouch,b=a.isArray,w=a.isNumber,m=a.isObject,r=a.merge,C=a.pick,H=a.removeEvent,A=a.Scrollbar,K=a.Series,f=a.seriesTypes,x=a.wrap,J=[].concat(a.defaultDataGroupingUnits),v=function(a){var b=g(arguments,w);if(b.length)return Math[a].apply(0,b)};J[4]=["day",[1,2,3,4]];J[5]=["week",[1,2,3]];f=void 0===f.areaspline?"line":"areaspline";h(p,{navigator:{height:40,margin:25,maskInside:!0,handles:{width:7,
height:15,symbols:["navigator-handle","navigator-handle"],enabled:!0,lineWidth:1,backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:l("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",outlineWidth:1,series:{type:f,fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:J},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,
threshold:null},xAxis:{overscroll:0,className:"highcharts-navigator-xaxis",tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});a.Renderer.prototype.symbols["navigator-handle"]=function(a,b,c,f,e){a=e.width/
2;b=Math.round(a/3)+.5;e=e.height;return["M",-a-1,.5,"L",a,.5,"L",a,e+.5,"L",-a-1,e+.5,"L",-a-1,.5,"M",-b,4,"L",-b,e-3,"M",b-1,4,"L",b-1,e-3]};E.prototype={drawHandle:function(a,b,c,f){var d=this.navigatorOptions.handles.height;this.handles[b][f](c?{translateX:Math.round(this.left+this.height/2),translateY:Math.round(this.top+parseInt(a,10)+.5-d)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-d/2-1)})},drawOutline:function(a,b,c,f){var d=this.navigatorOptions.maskInside,
e=this.outline.strokeWidth(),k=e/2,e=e%2/2,g=this.outlineHeight,h=this.scrollbarHeight,n=this.size,l=this.left-h,m=this.top;c?(l-=k,c=m+b+e,b=m+a+e,a=["M",l+g,m-h-e,"L",l+g,c,"L",l,c,"L",l,b,"L",l+g,b,"L",l+g,m+n+h].concat(d?["M",l+g,c-k,"L",l+g,b+k]:[])):(a+=l+h-e,b+=l+h-e,m+=k,a=["M",l,m,"L",a,m,"L",a,m+g,"L",b,m+g,"L",b,m,"L",l+n+2*h,m].concat(d?["M",a-k,m,"L",b+k,m]:[]));this.outline[f]({d:a})},drawMasks:function(a,b,c,f){var d=this.left,e=this.top,k=this.height,g,h,n,l;c?(n=[d,d,d],l=[e,e+a,
e+b],h=[k,k,k],g=[a,b-a,this.size-b]):(n=[d,d+a,d+b],l=[e,e,e],h=[a,b-a,this.size-b],g=[k,k,k]);u(this.shades,function(a,b){a[f]({x:n[b],y:l[b],width:h[b],height:g[b]})})},renderElements:function(){var a=this,b=a.navigatorOptions,c=b.maskInside,f=a.chart,e=f.inverted,g=f.renderer,h;a.navigatorGroup=h=g.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();var l={cursor:e?"ns-resize":"ew-resize"};u([!c,c,!c],function(d,c){a.shades[c]=g.rect().addClass("highcharts-navigator-mask"+(1===c?"-inside":
"-outside")).attr({fill:d?b.maskFill:"rgba(0,0,0,0)"}).css(1===c&&l).add(h)});a.outline=g.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor}).add(h);b.handles.enabled&&u([0,1],function(d){b.handles.inverted=f.inverted;a.handles[d]=g.symbol(b.handles.symbols[d],-b.handles.width/2-1,0,b.handles.width,b.handles.height,b.handles);a.handles[d].attr({zIndex:7-d}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][d]).add(h);
var c=b.handles;a.handles[d].attr({fill:c.backgroundColor,stroke:c.borderColor,"stroke-width":c.lineWidth}).css(l)})},update:function(a){u(this.series||[],function(a){a.baseSeries&&delete a.baseSeries.navigatorSeries});this.destroy();r(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(b,c,f,e){var d=this.chart,k,g,h=this.scrollbarHeight,l,n=this.xAxis;k=n.fake?d.xAxis[0]:n;var m=this.navigatorEnabled,p,q=this.rendered;g=d.inverted;var r,t=d.xAxis[0].minRange,v=
d.xAxis[0].options.maxRange;if(!this.hasDragged||z(f)){if(!w(b)||!w(c))if(q)f=0,e=n.width;else return;this.left=C(n.left,d.plotLeft+h+(g?d.plotWidth:0));this.size=p=l=C(n.len,(g?d.plotHeight:d.plotWidth)-2*h);d=g?h:l+2*h;f=C(f,n.toPixels(b,!0));e=C(e,n.toPixels(c,!0));w(f)&&Infinity!==Math.abs(f)||(f=0,e=d);b=n.toValue(f,!0);c=n.toValue(e,!0);r=Math.abs(a.correctFloat(c-b));r<t?this.grabbedLeft?f=n.toPixels(c-t,!0):this.grabbedRight&&(e=n.toPixels(b+t,!0)):z(v)&&r>v&&(this.grabbedLeft?f=n.toPixels(c-
v,!0):this.grabbedRight&&(e=n.toPixels(b+v,!0)));this.zoomedMax=Math.min(Math.max(f,e,0),p);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(f,e),0),p);this.range=this.zoomedMax-this.zoomedMin;p=Math.round(this.zoomedMax);f=Math.round(this.zoomedMin);m&&(this.navigatorGroup.attr({visibility:"visible"}),q=q&&!this.hasDragged?"animate":"attr",this.drawMasks(f,p,g,q),this.drawOutline(f,p,g,q),this.navigatorOptions.handles.enabled&&(this.drawHandle(f,0,g,q),this.drawHandle(p,
1,g,q)));this.scrollbar&&(g?(g=this.top-h,k=this.left-h+(m||!k.opposite?0:(k.titleOffset||0)+k.axisTitleMargin),h=l+2*h):(g=this.top+(m?this.height:-h),k=this.left-h),this.scrollbar.position(k,g,d,h),this.scrollbar.setRange(this.zoomedMin/l,this.zoomedMax/l));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,f=b.container,e=[],g,h;a.mouseMoveHandler=g=function(b){a.onMouseMove(b)};a.mouseUpHandler=h=function(b){a.onMouseUp(b)};e=a.getPartsEvents("mousedown");e.push(D(f,"mousemove",
g),D(f.ownerDocument,"mouseup",h));c&&(e.push(D(f,"touchmove",g),D(f.ownerDocument,"touchend",h)),e.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=e;a.series&&a.series[0]&&e.push(D(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,d=[];u(["shades","handles"],function(c){u(b[c],function(f,e){d.push(D(f.element,a,function(a){b[c+"Mousedown"](a,e)}))})});return d},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);
var d=this.chart,c=this.xAxis,f=this.zoomedMin,e=this.left,g=this.size,h=this.range,l=a.chartX,n;d.inverted&&(l=a.chartY,e=this.top);1===b?(this.grabbedCenter=l,this.fixedWidth=h,this.dragOffset=l-f):(a=l-e-h/2,0===b?a=Math.max(0,a):2===b&&a+h>=g&&(a=g-h,n=this.getUnionExtremes().dataMax),a!==f&&(this.fixedWidth=h,b=c.toFixedRange(a,a+h,null,n),d.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);
a=this.chart;var d=a.xAxis[0],c=a.inverted&&!d.reversed||!a.inverted&&d.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=c?d.min:d.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=c?d.max:d.min);a.fixedRange=null},onMouseMove:function(a){var b=this,d=b.chart,c=b.left,f=b.navigatorSize,e=b.range,g=b.dragOffset,h=d.inverted;a.touches&&0===a.touches[0].pageX||(a=d.pointer.normalize(a),d=a.chartX,h&&(c=b.top,d=a.chartY),b.grabbedLeft?
(b.hasDragged=!0,b.render(0,0,d-c,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=!0,b.render(0,0,b.otherHandlePos,d-c)):b.grabbedCenter&&(b.hasDragged=!0,d<g?d=g:d>f+g-e&&(d=f+g-e),b.render(0,0,d-g,d-g+e)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,d=this.xAxis,c=this.scrollbar,f,e,g=a.DOMEvent||a;(!this.hasDragged||c&&c.hasDragged)&&"scrollbar"!==a.trigger||(this.zoomedMin===this.otherHandlePos?
f=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(e=this.fixedExtreme),this.zoomedMax===this.size&&(e=this.getUnionExtremes().dataMax),d=d.toFixedRange(this.zoomedMin,this.zoomedMax,f,e),z(d.min)&&b.xAxis[0].setExtremes(Math.min(d.min,d.max),Math.max(d.min,d.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:g}));"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=
this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(u(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&(!1!==this.navigatorOptions.adaptToUpdatedData&&u(a,function(a){H(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&H(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,d=b.navigator,c=d.enabled,
f=b.scrollbar,e=f.enabled,b=c?d.height:0,g=e?f.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=g;this.scrollbarEnabled=e;this.navigatorEnabled=c;this.navigatorOptions=d;this.scrollbarOptions=f;this.outlineHeight=b+g;this.opposite=C(d.opposite,!c&&a.inverted);var h=this,f=h.baseSeries,e=a.xAxis.length,l=a.yAxis.length,m=f&&f[0]&&f[0].xAxis||a.xAxis[0];a.extraMargin={type:h.opposite?"plotTop":"marginBottom",value:(c||!a.inverted?h.outlineHeight:
0)+d.margin};a.inverted&&(a.extraMargin.type=h.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;h.navigatorEnabled?(h.xAxis=new F(a,r({breaks:m.options.breaks,ordinal:m.options.ordinal},d.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,type:"datetime",index:e,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[g,0,-g,0],width:b}:{offsets:[0,-g,0,g],height:b})),h.yAxis=new F(a,r(d.yAxis,{id:"navigator-y-axis",alignTicks:!1,
offset:0,index:l,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),f||d.series.data?h.updateNavigatorSeries():0===a.series.length&&x(a,"redraw",function(b,d){0<a.series.length&&!h.series&&(h.setBaseSeries(),a.redraw=b);b.call(a,d)}),h.renderElements(),h.addMouseEvents()):h.xAxis={translate:function(b,d){var c=a.xAxis[0],f=c.getExtremes(),e=c.len-2*g,k=v("min",c.options.min,f.dataMin),c=v("max",c.options.max,f.dataMax)-k;return d?b*c/e+k:e*(b-k)/c},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,
!0)},toFixedRange:F.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=h.scrollbar=new A(a.renderer,r(a.options.scrollbar,{margin:h.navigatorEnabled?0:10,vertical:a.inverted}),a),D(h.scrollbar,"changed",function(b){var d=h.size,c=d*this.to,d=d*this.from;h.hasDragged=h.scrollbar.hasDragged;h.render(0,0,d,c);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType)&&setTimeout(function(){h.onMouseUp(b)})}));h.addBaseSeriesEvents();h.addChartEvents()},getUnionExtremes:function(a){var b=
this.chart.xAxis[0],d=this.xAxis,c=d.options,f=b.options,e;a&&null===b.dataMin||(e={dataMin:C(c&&c.min,v("min",f.min,b.dataMin,d.dataMin,d.min)),dataMax:C(c&&c.max,v("max",f.max,b.dataMax,d.dataMax,d.max))});return e},setBaseSeries:function(a,b){var d=this.chart,c=this.baseSeries=[];a=a||d.options&&d.options.navigator.baseSeries||0;u(d.series||[],function(b,d){b.options.isInternal||!b.options.showInNavigator&&(d!==a&&b.options.id!==a||!1===b.options.showInNavigator)||c.push(b)});this.xAxis&&!this.xAxis.fake&&
this.updateNavigatorSeries(b)},updateNavigatorSeries:function(d){var c=this,f=c.chart,e=c.baseSeries,g,l,m=c.navigatorOptions.series,q,t={enableMouseTracking:!1,index:null,linkedTo:null,group:"nav",padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0},v=c.series=a.grep(c.series||[],function(b){var d=b.baseSeries;return 0>a.inArray(d,e)?(d&&(H(d,"updatedData",c.updatedDataHandler),delete d.navigatorSeries),b.destroy(),!1):!0});e&&e.length&&
u(e,function(a){var k=a.navigatorSeries,n=h({color:a.color},b(m)?p.navigator.series:m);k&&!1===c.navigatorOptions.adaptToUpdatedData||(t.name="Navigator "+e.length,g=a.options||{},q=g.navigatorOptions||{},l=r(g,t,n,q),n=q.data||n.data,c.hasNavigatorData=c.hasNavigatorData||!!n,l.data=n||g.data&&g.data.slice(0),k&&k.options?k.update(l,d):(a.navigatorSeries=f.initSeries(l),a.navigatorSeries.baseSeries=a,v.push(a.navigatorSeries)))});if(m.data&&(!e||!e.length)||b(m))c.hasNavigatorData=!1,m=a.splat(m),
u(m,function(a,b){t.name="Navigator "+(v.length+1);l=r(p.navigator.series,{color:f.series[b]&&!f.series[b].options.isInternal&&f.series[b].color||f.options.colors[b]||f.options.colors[0]},t,a);l.data=a.data;l.data&&(c.hasNavigatorData=!0,v.push(f.initSeries(l)))});this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&D(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);u(b,function(b){D(b,"show",function(a){this.navigatorSeries&&this.navigatorSeries.setVisible(!0,
a.redraw)});D(b,"hide",function(a){this.navigatorSeries&&this.navigatorSeries.setVisible(!1,a.redraw)});!1!==this.navigatorOptions.adaptToUpdatedData&&b.xAxis&&D(b,"updatedData",this.updatedDataHandler);D(b,"remove",function(){this.navigatorSeries&&(B(a.series,this.navigatorSeries),this.navigatorSeries.remove(!1),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=
b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,f=b.dataMax,b=b.max-b.min,e=a.stickToMin,g=a.stickToMax,h=this.options.overscroll,l,m,p=a.series&&a.series[0],q=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(e&&(m=c,l=m+b),g&&(l=f+h,e||(m=Math.max(l-b,p&&p.xData?p.xData[0]:-Number.MAX_VALUE))),q&&(e||g)&&w(m)&&(this.min=this.userMin=m,this.max=this.userMax=l));a.stickToMin=a.stickToMax=null},
updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMax=Math.round(a.zoomedMax)>=Math.round(a.size);a.stickToMin=w(this.xAxis.min)&&this.xAxis.min<=this.xData[0]&&(!this.chart.fixedRange||!a.stickToMax);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){D(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);
b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&(B(this.chart.xAxis,this.xAxis),B(this.chart.axes,this.xAxis));this.yAxis&&(B(this.chart.yAxis,this.yAxis),B(this.chart.axes,this.yAxis));u(this.series||[],function(a){a.destroy&&a.destroy()});u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);u([this.handles],function(a){q(a)},
this)}};a.Navigator=E;x(F.prototype,"zoom",function(a,b,c){var d=this.chart,f=d.options,e=f.chart.zoomType,g=f.navigator,f=f.rangeSelector,h;this.isXAxis&&(g&&g.enabled||f&&f.enabled)&&("x"===e?d.resetZoomButton="blocked":"y"===e?h=!1:"xy"===e&&(d=this.previousZoom,z(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==h?h:a.call(this,b,c)});x(t.prototype,"init",function(a,b,c){D(this,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||
a.scrollbar.enabled)this.scroller=this.navigator=new E(this)});a.call(this,b,c)});x(t.prototype,"setChartSize",function(a){var b=this.legend,d=this.navigator,c,f,e,g;a.apply(this,[].slice.call(arguments,1));d&&(f=b&&b.options,e=d.xAxis,g=d.yAxis,c=d.scrollbarHeight,this.inverted?(d.left=d.opposite?this.chartWidth-c-d.height:this.spacing[3]+c,d.top=this.plotTop+c):(d.left=this.plotLeft+c,d.top=d.navigatorOptions.top||this.chartHeight-d.height-c-this.spacing[2]-(this.rangeSelector&&this.extraBottomMargin?
this.rangeSelector.getHeight():0)-(f&&"bottom"===f.verticalAlign&&f.enabled&&!f.floating?b.legendHeight+C(f.margin,10):0)),e&&g&&(this.inverted?e.options.left=g.options.left=d.left:e.options.top=g.options.top=d.top,e.setAxisSize(),g.setAxisSize()))});x(K.prototype,"addPoint",function(a,b,c,f,g){var d=this.options.turboThreshold;d&&this.xData.length>d&&m(b,!0)&&this.chart.navigator&&e(20,!0);a.call(this,b,c,f,g)});x(t.prototype,"addSeries",function(a,b,c,f){a=a.call(this,b,!1,f);this.navigator&&this.navigator.setBaseSeries(null,
!1);C(c,!0)&&this.redraw();return a});x(K.prototype,"update",function(a,b,c){a.call(this,b,!1);this.chart.navigator&&!this.options.isInternal&&this.chart.navigator.setBaseSeries(null,!1);C(c,!0)&&this.chart.redraw()});t.prototype.callbacks.push(function(a){var b=a.navigator;b&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(L);(function(a){function E(a){this.init(a)}var D=a.addEvent,F=a.Axis,t=a.Chart,l=a.css,p=a.createElement,z=a.dateFormat,q=a.defaultOptions,u=q.global.useUTC,B=a.defined,
e=a.destroyObjectProperties,h=a.discardElement,g=a.each,c=a.extend,b=a.fireEvent,w=a.Date,m=a.isNumber,r=a.merge,C=a.pick,H=a.pInt,A=a.splat,K=a.wrap;c(q,{rangeSelector:{verticalAlign:"top",buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},floating:!1,x:0,y:0,height:void 0,inputPosition:{align:"right",x:0,y:0},buttonPosition:{align:"left",x:0,y:0},labelStyle:{color:"#666666"}}});q.lang=r(q.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});E.prototype=
{clickButton:function(a,b){var c=this,f=c.chart,d=c.buttonOptions[a],e=f.xAxis[0],h=f.scroller&&f.scroller.getUnionExtremes()||e||{},k=h.dataMin,l=h.dataMax,p,q=e&&Math.round(Math.min(e.max,C(l,e.max))),r=d.type,t,h=d._range,x,w,z,B=d.dataGrouping;if(null!==k&&null!==l){f.fixedRange=h;B&&(this.forcedDataGrouping=!0,F.prototype.setDataGrouping.call(e||{chart:this.chart},B,!1));if("month"===r||"year"===r)e?(r={range:d,max:q,dataMin:k,dataMax:l},p=e.minFromRange.call(r),m(r.newMax)&&(q=r.newMax)):h=
d;else if(h)p=Math.max(q-h,k),q=Math.min(p+h,l);else if("ytd"===r)if(e)void 0===l&&(k=Number.MAX_VALUE,l=Number.MIN_VALUE,g(f.series,function(a){a=a.xData;k=Math.min(a[0],k);l=Math.max(a[a.length-1],l)}),b=!1),q=c.getYTDExtremes(l,k,u),p=x=q.min,q=q.max;else{D(f,"beforeRender",function(){c.clickButton(a)});return}else"all"===r&&e&&(p=k,q=l);p+=d._offsetMin;q+=d._offsetMax;c.setSelected(a);e?e.setExtremes(p,q,C(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:d}):(t=A(f.options.xAxis)[0],
z=t.range,t.range=h,w=t.min,t.min=x,D(f,"load",function(){t.range=z;t.min=w}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var c=this,f=a.options.rangeSelector,e=f.buttons||[].concat(c.defaultButtons),d=f.selected,h=function(){var a=c.minInput,d=c.maxInput;a&&a.blur&&
b(a,"blur");d&&d.blur&&b(d,"blur")};c.chart=a;c.options=f;c.buttons=[];a.extraTopMargin=f.height;c.buttonOptions=e;this.unMouseDown=D(a.container,"mousedown",h);this.unResize=D(a,"resize",h);g(e,c.computeButtonRange);void 0!==d&&e[d]&&this.clickButton(d,!1);D(a,"load",function(){a.xAxis&&a.xAxis[0]&&D(a.xAxis[0],"setExtremes",function(b){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==b.trigger&&"updatedData"!==b.trigger&&c.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=
this.chart,b=a.xAxis[0],c=Math.round(b.max-b.min),e=!b.hasVisibleSeries,a=a.scroller&&a.scroller.getUnionExtremes()||b,d=a.dataMin,h=a.dataMax,a=this.getYTDExtremes(h,d,u),l=a.min,k=a.max,p=this.selected,q=m(p),r=this.options.allButtonsEnabled,t=this.buttons;g(this.buttonOptions,function(a,f){var g=a._range,m=a.type,n=a.count||1,v=t[f],u=0;a=a._offsetMax-a._offsetMin;f=f===p;var x=g>h-d,y=g<b.minRange,w=!1,z=!1,g=g===c;("month"===m||"year"===m)&&c>=864E5*{month:28,year:365}[m]*n+a&&c<=864E5*{month:31,
year:366}[m]*n+a?g=!0:"ytd"===m?(g=k-l+a===c,w=!f):"all"===m&&(g=b.max-b.min>=h-d,z=!f&&q&&g);m=!r&&(x||y||z||e);n=f&&g||g&&!q&&!w;m?u=3:n&&(q=!0,u=2);v.state!==u&&v.setState(u)})},computeButtonRange:function(a){var b=a.type,c=a.count||1,f={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(f[b])a._range=f[b]*c;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*c;a._offsetMin=C(a.offsetMin,0);a._offsetMax=C(a.offsetMax,0);a._range+=a._offsetMax-a._offsetMin},
setInputValue:function(a,b){var c=this.chart.options.rangeSelector,f=this[a+"Input"];B(b)&&(f.previousValue=f.HCTime,f.HCTime=b);f.value=z(c.inputEditDateFormat||"%Y-%m-%d",f.HCTime);this[a+"DateBox"].attr({text:z(c.inputDateFormat||"%b %e, %Y",f.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];l(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},hideInput:function(a){l(this[a+"Input"],
{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function b(){var a=w.value,b=(h.inputDateParser||Date.parse)(a),d=e.xAxis[0],c=e.scroller&&e.scroller.xAxis?e.scroller.xAxis:d,g=c.dataMin,c=c.dataMax;b!==w.previousValue&&(w.previousValue=b,m(b)||(b=a.split("-"),b=Date.UTC(H(b[0]),H(b[1])-1,H(b[2]))),m(b)&&(u||(b+=6E4*(new Date).getTimezoneOffset()),t?b>f.maxInput.HCTime?b=void 0:b<g&&(b=g):b<f.minInput.HCTime?b=void 0:b>c&&(b=c),void 0!==b&&d.setExtremes(t?b:d.min,
t?d.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var f=this,e=f.chart,d=e.renderer.style||{},g=e.renderer,h=e.options.rangeSelector,k=f.div,t="min"===a,w,z,A=this.inputGroup;this[a+"Label"]=z=g.label(q.lang[t?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(A);A.offset+=z.width+5;this[a+"DateBox"]=g=g.label("",A.offset).addClass("highcharts-range-input").attr({padding:2,width:h.inputBoxWidth||90,height:h.inputBoxHeight||
17,stroke:h.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){f.showInput(a);f[a+"Input"].focus()}).add(A);A.offset+=g.width+(t?10:0);this[a+"Input"]=w=p("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:e.plotTop+"px"},k);z.css(r(d,h.labelStyle));g.css(r({color:"#333333"},d,h.inputStyle));l(w,c({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:d.fontSize,fontFamily:d.fontFamily,left:"-9em"},
h.inputStyle));w.onfocus=function(){f.showInput(a)};w.onblur=function(){f.hideInput(a)};w.onchange=b;w.onkeypress=function(a){13===a.keyCode&&b()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a="top"===b.verticalAlign?a.plotTop-a.axisOffset[0]:0;return{buttonTop:a+b.buttonPosition.y,inputTop:a+b.inputPosition.y-10}},getYTDExtremes:function(a,b,c){var f=new w(a),d=f[w.hcGetFullYear]();c=c?w.UTC(d,0,1):+new w(d,0,1);b=Math.max(b||0,c);f=f.getTime();return{max:Math.min(a||f,f),
min:b}},render:function(a,b){var c=this,f=c.chart,d=f.renderer,e=f.container,h=f.options,k=h.exporting&&!1!==h.exporting.enabled&&h.navigation&&h.navigation.buttonOptions,l=q.lang,m=c.div,r=h.rangeSelector,h=r.floating,t=c.buttons,m=c.inputGroup,u=r.buttonTheme,x=r.buttonPosition,w=r.inputPosition,z=r.inputEnabled,A=u&&u.states,B=f.plotLeft,D,E=c.buttonGroup,F;F=c.rendered;var H=c.options.verticalAlign,K=f.legend,L=K&&K.options,Y=x.y,X=w.y,Q=F||!1,T=0,U=0,V;if(!1!==r.enabled){F||(c.group=F=d.g("range-selector-group").attr({zIndex:7}).add(),
c.buttonGroup=E=d.g("range-selector-buttons").add(F),c.zoomText=d.text(l.rangeSelectorZoom,C(B+x.x,B),15).css(r.labelStyle).add(E),D=C(B+x.x,B)+c.zoomText.getBBox().width+5,g(c.buttonOptions,function(a,b){t[b]=d.button(a.text,D,0,function(){var d=a.events&&a.events.click,f;d&&(f=d.call(a));!1!==f&&c.clickButton(b);c.isActive=!0},u,A&&A.hover,A&&A.select,A&&A.disabled).attr({"text-align":"center"}).add(E);D+=t[b].width+C(r.buttonSpacing,5)}),!1!==z&&(c.div=m=p("div",null,{position:"relative",height:0,
zIndex:1}),e.parentNode.insertBefore(m,e),c.inputGroup=m=d.g("input-group").add(F),m.offset=0,c.drawInput("min"),c.drawInput("max")));B=f.plotLeft-f.spacing[3];c.updateButtonStates();k&&this.titleCollision(f)&&"top"===H&&"right"===x.align&&x.y+E.getBBox().height-12<(k.y||0)+k.height&&(T=-40);"left"===x.align?V=x.x-f.spacing[3]:"right"===x.align&&(V=x.x+T-f.spacing[1]);E.align({y:x.y,width:E.getBBox().width,align:x.align,x:V},!0,f.spacingBox);c.group.placed=Q;c.buttonGroup.placed=Q;!1!==z&&(T=k&&this.titleCollision(f)&&
"top"===H&&"right"===w.align&&w.y-m.getBBox().height-12<(k.y||0)+k.height+f.spacing[0]?-40:0,"left"===w.align?V=B:"right"===w.align&&(V=-Math.max(f.axisOffset[1],-T)),m.align({y:w.y,width:m.getBBox().width,align:w.align,x:w.x+V-2},!0,f.spacingBox),e=m.alignAttr.translateX+m.alignOptions.x-T+m.getBBox().x+2,k=m.alignOptions.width,l=E.alignAttr.translateX+E.getBBox().x,V=E.getBBox().width+20,(w.align===x.align||l+V>e&&e+k>l&&Y<X+m.getBBox().height)&&m.attr({translateX:m.alignAttr.translateX+(f.axisOffset[1]>=
-T?0:-T),translateY:m.alignAttr.translateY+E.getBBox().height+10}),c.setInputValue("min",a),c.setInputValue("max",b),c.inputGroup.placed=Q);c.group.align({verticalAlign:H},!0,f.spacingBox);a=c.group.getBBox().height+20;b=c.group.alignAttr.translateY;"bottom"===H&&(K=L&&"bottom"===L.verticalAlign&&L.enabled&&!L.floating?K.legendHeight+C(L.margin,10):0,a=a+K-20,U=b-a-(h?0:r.y)-10);if("top"===H)h&&(U=0),f.titleOffset&&(U=f.titleOffset+f.options.title.margin),U+=f.margin[0]-f.spacing[0]||0;else if("middle"===
H)if(X===Y)U=0>X?b+void 0:b;else if(X||Y)U=0>X||0>Y?U-Math.min(X,Y):b-a+NaN;c.group.translate(r.x,r.y+Math.floor(U));!1!==z&&(c.minInput.style.marginTop=c.group.translateY+"px",c.maxInput.style.marginTop=c.group.translateY+"px");c.rendered=!0}},getHeight:function(){var a=this.options,b=this.group,c=a.y,e=a.buttonPosition.y,a=a.inputPosition.y,b=b?b.getBBox(!0).height+13+c:0,c=Math.min(a,e);if(0>a&&0>e||0<a&&0<e)b+=Math.abs(c);return b},titleCollision:function(a){return!(a.options.title.text||a.options.subtitle.text)},
update:function(a){var b=this.chart;r(!0,b.options.rangeSelector,a);this.destroy();this.init(b);b.rangeSelector.render()},destroy:function(){var b=this,c=b.minInput,g=b.maxInput;b.unMouseDown();b.unResize();e(b.buttons);c&&(c.onfocus=c.onblur=c.onchange=null);g&&(g.onfocus=g.onblur=g.onchange=null);a.objectEach(b,function(a,c){a&&"chart"!==c&&(a.destroy?a.destroy():a.nodeType&&h(this[c]));a!==E.prototype[c]&&(b[c]=null)},this)}};F.prototype.toFixedRange=function(a,b,c,e){var d=this.chart&&this.chart.fixedRange;
a=C(c,this.translate(a,!0,!this.horiz));b=C(e,this.translate(b,!0,!this.horiz));c=d&&(b-a)/d;.7<c&&1.3>c&&(e?a=b-d:b=a+d);m(a)||(a=b=void 0);return{min:a,max:b}};F.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],c,e=this.max,d,g,h=function(a,c){var d=new Date(a),e=d["get"+b]();d["set"+b](e+c);e===d["get"+b]()&&d.setDate(0);return d.getTime()-a};m(a)?(c=e-a,g=a):(c=e+h(e,-a.count),this.chart&&(this.chart.fixedRange=e-c));d=C(this.dataMin,Number.MIN_VALUE);
m(c)||(c=d);c<=d&&(c=d,void 0===g&&(g=h(c,a.count)),this.newMax=Math.min(c+g,this.dataMax));m(e)||(c=void 0);return c};K(t.prototype,"init",function(a,b,c){D(this,"init",function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new E(this))});a.call(this,b,c)});K(t.prototype,"render",function(a,b,c){var e=this.axes,d=this.rangeSelector;d&&(g(e,function(a){a.updateNames();a.setScale()}),this.getAxisMargins(),d.render(),e=d.options.verticalAlign,d.options.floating||("bottom"===e?this.extraBottomMargin=
!0:"middle"!==e&&(this.extraTopMargin=!0)));a.call(this,b,c)});K(t.prototype,"update",function(b,c,e,g){var d=this.rangeSelector,f;this.extraTopMargin=this.extraBottomMargin=!1;d&&(d.render(),f=c.rangeSelector&&c.rangeSelector.verticalAlign||d.options&&d.options.verticalAlign,d.options.floating||("bottom"===f?this.extraBottomMargin=!0:"middle"!==f&&(this.extraTopMargin=!0)));b.call(this,a.merge(!0,c,{chart:{marginBottom:C(c.chart&&c.chart.marginBottom,this.margin.bottom),spacingBottom:C(c.chart&&
c.chart.spacingBottom,this.spacing.bottom)}}),e,g)});K(t.prototype,"redraw",function(a,b,c){var e=this.rangeSelector;e&&!e.options.floating&&(e.render(),e=e.options.verticalAlign,"bottom"===e?this.extraBottomMargin=!0:"middle"!==e&&(this.extraTopMargin=!0));a.call(this,b,c)});t.prototype.adjustPlotArea=function(){var a=this.rangeSelector;this.rangeSelector&&(a=a.getHeight(),this.extraTopMargin&&(this.plotTop+=a),this.extraBottomMargin&&(this.marginBottom+=a))};t.prototype.callbacks.push(function(a){function b(){c=
a.xAxis[0].getExtremes();m(c.min)&&e.render(c.min,c.max)}var c,e=a.rangeSelector,d,f;e&&(f=D(a.xAxis[0],"afterSetExtremes",function(a){e.render(a.min,a.max)}),d=D(a,"redraw",b),b());D(a,"destroy",function(){e&&(d(),f())})});a.RangeSelector=E})(L);(function(a){var E=a.arrayMax,D=a.arrayMin,F=a.Axis,t=a.Chart,l=a.defined,p=a.each,z=a.extend,q=a.format,u=a.grep,B=a.inArray,e=a.isNumber,h=a.isString,g=a.map,c=a.merge,b=a.pick,w=a.Point,m=a.Renderer,r=a.Series,C=a.splat,H=a.SVGRenderer,A=a.VMLRenderer,
K=a.wrap,f=r.prototype,x=f.init,J=f.processData,v=w.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(d,e,f){var k=h(d)||d.nodeName,l=arguments[k?1:0],m=l.series,n=a.getOptions(),p,q=b(l.navigator&&l.navigator.enabled,n.navigator.enabled,!0),r=q?{startOnTick:!1,endOnTick:!1}:null,u={marker:{enabled:!1,radius:2}},v={shadow:!1,borderWidth:0};l.xAxis=g(C(l.xAxis||{}),function(a){return c({minPadding:0,maxPadding:0,overscroll:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},
n.xAxis,a,{type:"datetime",categories:null},r)});l.yAxis=g(C(l.yAxis||{}),function(a){p=b(a.opposite,!0);return c({labels:{y:-2},opposite:p,showLastLabel:!1,title:{text:null}},n.yAxis,a)});l.series=null;l=c({chart:{panning:!0,pinchType:"x"},navigator:{enabled:q},scrollbar:{enabled:b(n.scrollbar.enabled,!0)},rangeSelector:{enabled:b(n.rangeSelector.enabled,!0)},title:{text:null},tooltip:{split:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:u,spline:u,area:u,areaspline:u,arearange:u,areasplinerange:u,
column:v,columnrange:v,candlestick:v,ohlc:v}},l,{isStock:!0});l.series=m;return k?new t(d,l,f):new t(l,e)};K(F.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&(d.x=0),void 0===d.align&&(d.align="right"),b[c]=this,"right"):a.apply(this,[].slice.call(arguments,1))});K(F.prototype,"destroy",function(a){var b=this.chart,
c=this.options&&this.options.top+","+this.options.height;c&&b._labelPanes&&b._labelPanes[c]===this&&delete b._labelPanes[c];return a.apply(this,Array.prototype.slice.call(arguments,1))});K(F.prototype,"getPlotLinePath",function(c,f,m,k,q,r){var d=this,n=this.isLinked&&!this.series?this.linkedParent.series:this.series,t=d.chart,u=t.renderer,v=d.left,w=d.top,y,x,z,A,C=[],D=[],G,E;if("xAxis"!==d.coll&&"yAxis"!==d.coll)return c.apply(this,[].slice.call(arguments,1));D=function(a){var b="xAxis"===a?"yAxis":
"xAxis";a=d.options[b];return e(a)?[t[b][a]]:h(a)?[t.get(a)]:g(n,function(a){return a[b]})}(d.coll);p(d.isXAxis?t.yAxis:t.xAxis,function(a){if(l(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",b=l(a.options[b])?t[b][a.options[b]]:t[b][0];d===b&&D.push(a)}});G=D.length?[]:[d.isXAxis?t.yAxis[0]:t.xAxis[0]];p(D,function(b){-1!==B(b,G)||a.find(G,function(a){return a.pos===b.pos&&a.len&&b.len})||G.push(b)});E=b(r,d.translate(f,null,null,k));e(E)&&(d.horiz?p(G,function(a){var b;
x=a.pos;A=x+a.len;y=z=Math.round(E+d.transB);if(y<v||y>v+d.width)q?y=z=Math.min(Math.max(v,y),v+d.width):b=!0;b||C.push("M",y,x,"L",z,A)}):p(G,function(a){var b;y=a.pos;z=y+a.len;x=A=Math.round(w+d.height-E);if(x<w||x>w+d.height)q?x=A=Math.min(Math.max(w,x),d.top+d.height):b=!0;b||C.push("M",y,x,"L",z,A)}));return 0<C.length?u.crispPolyLine(C,m||1):null});H.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&
(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};m===A&&(A.prototype.crispPolyLine=H.prototype.crispPolyLine);K(F.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});K(F.prototype,"drawCrosshair",function(a,c,e){var d,f;a.call(this,c,e);if(l(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){a=this.chart;var g=this.options.crosshair.label,h=this.horiz;d=this.opposite;f=this.left;var m=this.top,n=this.crossLabel,p,r=g.format,
t="",u="inside"===this.options.tickPosition,v=!1!==this.crosshair.snap,w=0;c||(c=this.cross&&this.cross.e);p=h?"center":d?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";n||(n=this.crossLabel=a.renderer.label(null,null,null,g.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:g.align||p,padding:b(g.padding,8),r:b(g.borderRadius,3),zIndex:2}).add(this.labelGroup),n.attr({fill:g.backgroundColor||
this.series[0]&&this.series[0].color||"#666666",stroke:g.borderColor||"","stroke-width":g.borderWidth||0}).css(z({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},g.style)));h?(p=v?e.plotX+f:c.chartX,m+=d?0:this.height):(p=d?this.width+f:0,m=v?e.plotY+m:c.chartY);r||g.formatter||(this.isDatetimeAxis&&(t="%b %d, %Y"),r="{value"+(t?":"+t:"")+"}");c=v?e[this.isXAxis?"x":"y"]:this.toValue(h?c.chartX:c.chartY);n.attr({text:r?q(r,{value:c}):g.formatter.call(this,c),x:p,y:m,visibility:"visible"});
c=n.getBBox();if(h){if(u&&!d||!u&&d)m=n.y-c.height}else m=n.y-c.height/2;h?(d=f-c.x,f=f+this.width-c.x):(d="left"===this.labelAlign?f:0,f="right"===this.labelAlign?f+this.width:a.chartWidth);n.translateX<d&&(w=d-n.translateX);n.translateX+c.width>=f&&(w=-(n.translateX+c.width-f));n.attr({x:p+w,y:m,anchorX:h?p:this.opposite?0:a.chartWidth,anchorY:h?this.opposite?a.chartHeight:0:m+c.height/2})}});f.init=function(){x.apply(this,arguments);this.setCompare(this.options.compare)};f.setCompare=function(a){this.modifyValue=
"value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=!0)};f.processData=function(){var a,b=-1,c,f,g=!0===this.options.compareStart?0:1,h,l;J.apply(this,arguments);if(this.xAxis&&this.processedYData)for(c=this.processedXData,f=this.processedYData,h=f.length,this.pointArrayMap&&(b=B("close",this.pointArrayMap),
-1===b&&(b=B(this.pointValKey||"y",this.pointArrayMap))),a=0;a<h-g;a++)if(l=f[a]&&-1<b?f[a][b]:f[a],e(l)&&c[a+g]>=this.xAxis.min&&0!==l){this.compareValue=l;break}};K(f,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=D(b),this.dataMax=E(b))});F.prototype.setCompare=function(a,c){this.isXAxis||(p(this.series,function(b){b.setCompare(a)}),b(c,!0)&&this.chart.redraw())};w.prototype.tooltipFormatter=
function(c){c=c.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,b(this.series.tooltipOptions.changeDecimals,2)));return v.apply(this,[c])};K(r.prototype,"render",function(a){this.chart.is3d&&this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=c(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,
height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)});K(t.prototype,"getSelectedPoints",function(a){var b=a.call(this);p(this.series,function(a){a.hasGroupedData&&(b=b.concat(u(a.points||[],function(a){return a.selected})))});return b});K(t.prototype,"update",function(a,b){"scrollbar"in b&&this.navigator&&(c(!0,this.options.scrollbar,b.scrollbar),this.navigator.update({},!1),delete b.scrollbar);return a.apply(this,Array.prototype.slice.call(arguments,
1))})})(L);return L});

define("highstock", ["jquery"], function(){});

(function(H){var protocol=window.location.protocol;var defaultOptionsZhCn={lang:{contextButtonTitle:"图表导出菜单",decimalPoint:".",downloadJPEG:"下载JPEG图片",downloadPDF:"下载PDF文件",downloadPNG:"下载PNG文件",downloadSVG:"下载SVG文件",drillUpText:"返回 {series.name}",invalidDate:"无效的时间",loading:"加载中...",months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],noData:"没有数据",numericSymbols:null,printChart:"打印图表",resetZoom:"重置缩放比例",resetZoomTitle:"重置为原始大小",shortMonths:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],thousandsSep:",",weekdays:["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],rangeSelectorFrom:"开始时间",rangeSelectorTo:"结束时间",rangeSelectorZoom:"范围",zoomIn:"缩小",zoomOut:"放大"},global:{canvasToolsURL:protocol+"//cdn.hcharts.cn/highcharts/modules/canvas-tools.js",VMLRadialGradientURL:protocol+ +"//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png"},title:{text:"图表标题"},tooltip:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%Y-%m-%d",month:"%Y-%m",year:"%Y"},split:false},exporting:{url:protocol+"//export.highcharts.com.cn"},credits:{text:"Highcharts.com.cn",href:"https://www.highcharts.com.cn"},xAxis:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%Y-%m",month:"%Y-%m",year:"%Y"}},rangeSelector:{inputDateFormat:"%Y-%m-%d",buttonTheme:{width:"auto",style:{fontSize:"12px",padding:"4px"}},buttons:[{type:"month",count:1,text:"月"},{type:"month",count:3,text:"季度"},{type:"month",count:6,text:"半年"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"年"},{type:"all",text:"所有"}]},plotOptions:{series:{dataGrouping:{dateTimeLabelFormats:{millisecond:["%Y-%m-%d %H:%M:%S.%L","%Y-%m-%d %H:%M:%S.%L"," ~ %H:%M:%S.%L"],second:["%Y-%m-%d %H:%M:%S","%Y-%m-%d %H:%M:%S"," ~ %H:%M:%S"],minute:["%Y-%m-%d %H:%M","%Y-%m-%d %H:%M"," ~ %H:%M"],hour:["%Y-%m-%d %H:%M","%Y-%m-%d %H:%M"," ~ %H:%M"],day:["%Y-%m-%d","%Y-%m-%d"," ~ %Y-%m-%d"],week:["%Y-%m-%d","%Y-%m-%d"," ~ %Y-%m-%d"],month:["%Y-%m","%Y-%m"," ~ %Y-%m"],year:["%Y","%Y"," ~ %Y"]}}},ohlc:{tooltip:{split:false,pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>'+"开盘：{point.open}<br/>"+"最高：{point.high}<br/>"+"最低：{point.low}<br/>"+"收盘：{point.close}<br/>"}},candlestick:{tooltip:{split:false,pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>'+"开盘：{point.open}<br/>"+"最高：{point.high}<br/>"+"最低：{point.low}<br/>"+"收盘：{point.close}<br/>"}}}};H.setOptions(defaultOptionsZhCn)})(Highcharts);
define("highcharts_lang", ["highstock"], function(){});

define('subapp/tools/create_chart',['libs/Class','jquery','highstock','highcharts_lang'],function(Class,$,highstock,highcharts_lang){
    var Chart = Class.extend({
        init:function(){
            if($('.crypto-index').length <= 0){
                return ;
            }

            this.get_chart();
        },
        get_chart:function() {
                var data = [];
                for (var i = 0; i < crypto_index.length; i++) {
                    var arr = [];
                    var time = new Date(crypto_index[i].date);
                    arr.push(time.getTime());
                    arr.push(crypto_index[i].price);
                    data.push(arr);
                }
                $('#chart_container').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 1,
                        enabled: true
                    },
                    navigator: {
                        enabled: false
                    },
                    scrollbar: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'BTC'
                    },
                    series: [{
                        name: 'BTC Price',
                        data: data,
                        type: 'spline',
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
             }
        });
    return Chart;
});
require([
        'libs/polyfills',
        'jquery',
        'subapp/header/header',
        'subapp/data/feed',
        'subapp/tracker',
        'subapp/sidebar/sidebar',
        'subapp/newsline',
        'subapp/gotop',
        'libs/salvattore',
        'subapp/tools/bookmark',
        'subapp/news/tagtrigger',
        'subapp/captcha/captcha',
        'subapp/submit/getsitedata',
        'subapp/header/search_news',
        'subapp/header/search_site',
        'subapp/search/search_news_ajax',
        'subapp/countdown/btc_countdown',
        'subapp/fork_list/fork_list',
        'subapp/news/shareimg',
        'bootstrap',
        'subapp/tools/create_chart'
    ],
    function (polyfill,
              $,
              Header,
              Feed,
              Tracker,
              SideBar,
              NewsLine,
              GoTop,
              Layout,
              BookMark,
              TagTrigger,
              Captcha,
              GetSiteData,
              SearchNews,
              SearchSite,
              SearchNewsAjax,
              BtcCountdown,
              ForkListApp,
              ShareImgApp,
              bootstrap,
              Chart
              ) {

        jQuery = $;
        // require('bootstrap');
        window.app = {};
        var all_price_feed = window.app.price_feed = new Feed({
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=40&convert=CNY',
            method: 'GET',
            interval: 15000
        });

        new Header();
        new SideBar();
        new Tracker();
        new NewsLine();
        new GoTop();
        new Captcha();

        new GetSiteData();

        new SearchNews();
        new SearchSite();
        new SearchNewsAjax();

        // for news tag trigger ;
        new TagTrigger();
        new BtcCountdown();

        // fork list page

        new ForkListApp();
        new ShareImgApp();


        if($('#chart_container').length){
            new Chart();
        }


        all_price_feed.run();
        console.log('finish');

    });

define("index_page_app", function(){});

