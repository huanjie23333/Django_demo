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
BTC : "比特幣BTC",
ETH : "以太坊ETH",
LTC : "萊特幣LTC",
XRP : "瑞波幣XRP",
XMR : "門羅幣XMR",
LSK : "Lisk LSK",
BCH : "BCC BCH",
ETC : "以太經典ETC",
DGB : "極特幣DGB",
BTS : "比特股BTS",
DASH : "達世幣DASH",
ZEC : "Zcash ZEC",
SC : "細亞幣SC",
XLM : "恒星幣XLM",
ZRX : "0x ZRX",
NAV : "NAVCoin NAV",
DOGE : "狗狗幣DOGE",
SYS : "系統幣SYS",
NXT : "未來幣NXT",
BURST : "爆裂幣BURST",
GAME : "遊戲點GAME",
PINK : "Pinkcoin PINK",
VRC : "維理幣VRC",
LBC : "LBRY Credits LBC",
ARDR : "阿朵ARDR",
RADS : "Radium RADS",
EXP : "Expanse EXP",
VTC : "綠幣VTC",
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
EMC2 : "鎄幣EMC2",
NMC : "域名幣NMC",
NOTE : "DNotes NOTE",
OMNI : "奧妙幣OMNI",
BTM : "Bitmark BTM",
NAUT : "Nautiluscoin NAUT",
GRC : "格雷德幣GRC",
BCY : "BitCrystals BCY",
XVC : "Vcash XVC",
HUC : "獵手幣HUC",
BLK : "黑幣BLK",
PPC : "點點幣PPC",
BBT : "Brickblock BBT",
XCP : "合約幣XCP",
IOTA : "埃歐塔IOTA",
XEM : "新經幣XEM",
EMC : "掘起幣EMC",
PUT : "普京幣PUT",
EAC : "地球幣EAC",
XCN : "氪石幣XCN",
MGC : "眾合幣MGC",
ZCC : "招財幣ZCC",
XPM : "質數幣XPM",
NCS : "資產股NCS",
YBC : "元寶幣YBC",
MEC : "美卡幣MEC",
NEO : "小蟻股NEO",
MCC : "行雲幣MCC",
FZ : "冰河幣FZ",
TFC : "傳送幣TFC",
YTC : "壹號幣YTC",
ZET : "澤塔幣ZET",
GOOC : "谷殼幣GOOC",
MTC : "猴寶幣MTC",
WDC : "世界幣WDC",
PLC : "保羅幣PLC",
SKT : "鯊之信SKT",
MRYC : "美人魚幣MRYC",
LKC : "幸運幣LKC",
DNC : "安網幣DNC",
IFC : "無限幣IFC",
PEB : "普銀PEB",
XZC : "零幣XZC",
DACRS : "智能坊DACRS",
INF : "訊鏈幣INF",
ICS : "小企股ICS",
HLB : "活力幣HLB",
VASH : "薇幣VASH",
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
BTC : "比特幣BTC",
ETH : "以太坊ETH",
LTC : "萊特幣LTC",
BCH : "比特現金BCC",
XRP : "瑞波幣XRP"
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
                                $.ajax('http://www.chainscoop.com/api/news/autocomplete/', {
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
define('subapp/header/header',['libs/Class',
        'subapp/header/header_price',
        'subapp/adapters/HeaderCoinmarketcapAdapter',
        'subapp/header/search',

    ],
    function(
        Class,
        HeaderPrice,
        HeaderCoinmarketAdapter,
        Search
    ){

    var HeaderApp = Class.extend({
        init:function(option){
            // for header price display;
            this.header_price = new HeaderPrice({
                feed: window.app.price_feed,
                adapter : new HeaderCoinmarketAdapter()
            });

            this.search = new Search();

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
/*! DataTables 1.10.16
 * ©2008-2017 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.16
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2017 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'datatable',['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};


		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};


		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};


		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );

			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );

			if ( redraw === undefined || redraw ) {
				api.draw();
			}

			return rows.flatten().toArray();
		};


		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;

			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};


		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();

			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};


		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};


		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];

			rows.remove();

			if ( callback ) {
				callback.call( this, settings, data );
			}

			if ( redraw === undefined || redraw ) {
				api.draw();
			}

			return data;
		};


		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};


		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};


		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );

			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}

			api.draw();
		};


		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );

			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';

				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}

			return api.data().toArray();
		};


		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );

			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};


		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();

			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();

				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};


		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};


		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};


		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );

			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};


		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );

			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};


		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};


		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};


		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};


		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );

			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}

			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}

			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};


		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;


		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);


			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}

			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );

			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );

			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ) );



			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];

				/* Base check on table node */
				if ( s.nTable == this || s.nTHead.parentNode == this || (s.nTFoot && s.nTFoot.parentNode == this) )
				{
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;

					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}

				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}

			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}

			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;

			allSettings.push( oSettings );

			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();

			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );

			if ( oInit.oLanguage )
			{
				_fnLanguageCompat( oInit.oLanguage );
			}

			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}

			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );


			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );

			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );

			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );

			/* Browser support detection */
			_fnBrowserDetect( oSettings );

			var oClasses = oSettings.oClasses;

			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );


			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}

			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}

			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );

			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}

			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}

			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}

			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}

			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}

			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}

			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );

			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};

				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];

					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );

						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};

							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}

			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */

				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}

				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );

				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};

							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );

							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}

				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );


				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */

				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );

				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];

				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];

				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}

				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}

				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}

				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;

				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};

			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}

		} );
		_that = null;
		return this;
	};


	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */


	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes

	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural

	var _re_dic = {};
	var _re_new_lines = /[\r\n]/g;
	var _re_html = /<.*?>/g;

	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;

	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );

	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	//   standards as thousands separators.
	var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi;


	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};


	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};

	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};


	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';

		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}

		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}

		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}

		return !isNaN( parseFloat(d) ) && isFinite( d );
	};


	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};


	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}

		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};


	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;

		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}

		return out;
	};


	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;

		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}

		return out;
	};


	var _range = function ( len, start )
	{
		var out = [];
		var end;

		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}

		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}

		return out;
	};


	var _removeEmpty = function ( a )
	{
		var out = [];

		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}

		return out;
	};


	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};


	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}

		var sorted = src.slice().sort();
		var last = sorted[0];

		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}

			last = sorted[i];
		}

		return true;
	};


	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}

		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;

		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];

			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}

			out.push( val );
			k++;
		}

		return out;
	};


	/**
	 * DataTables utility methods
	 *
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;

			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;

				if ( last && now < last + frequency ) {
					clearTimeout( timer );

					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},


		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};



	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};

		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);

			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;

				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );

		o._hungarianMap = map;
	}


	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}

		var hungarianKey;

		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];

			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );

					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}


	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		var defaults = DataTable.defaults.oLanguage;
		var zeroRecords = lang.sZeroRecords;

		/* Backwards compatibility - if there is no sEmptyTable given, then use the same as
		 * sZeroRecords - assuming that is given.
		 */
		if ( ! lang.sEmptyTable && zeroRecords &&
			defaults.sEmptyTable === "No data available in table" )
		{
			_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
		}

		/* Likewise with loading records */
		if ( ! lang.sLoadingRecords && zeroRecords &&
			defaults.sLoadingRecords === "Loading..." )
		{
			_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
		}

		// Old parameter name of the thousands separator mapped onto the new
		if ( lang.sInfoThousands ) {
			lang.sThousands = lang.sInfoThousands;
		}

		var decimal = lang.sDecimal;
		if ( decimal ) {
			_addNumericSort( decimal );
		}
	}


	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};


	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );

		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}

		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;

		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}


	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );

		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! $.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}


	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;

			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );

			var outer = n.children();
			var inner = outer.children();

			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100

			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;

			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;

			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;

			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;

			n.remove();
		}

		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}


	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;

		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}

		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}

			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];

			isSet = true;
			i += inc;
		}

		return value;
	}

	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );

		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );

		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}


	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);

		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;

			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}

		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );

			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions );

			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}

			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}

			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}

			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );

			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}

		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;

		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;

		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );

			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};

		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}

		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}

		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}


	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;

			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}

		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}

		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}


	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );

		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}


	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );

		return iPos !== -1 ? iPos : null;
	}


	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;

		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );

		return vis;
	}


	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];

		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );

		return a;
	}


	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;

		// For each column, spin over the
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];

			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}

						detectedType = types[j]( cache[k], settings );

						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}

						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}

					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}

				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}


	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;

		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];

				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;

				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}

				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}

						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}

		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}

	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );

		oData._aData = aDataIn;
		oSettings.aoData.push( oData );

		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;

		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}

		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );

		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}

		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}

		return iRow;
	}


	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;

		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}

		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}


	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}


	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}


	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );

		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}

		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}

		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}


	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;

		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}


	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;

	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}


	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );

			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;

				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );

					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);

						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');

							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];

							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');

							// Traverse each entry in the array getting the properties requested
							if ( $.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}

							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);

							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}

						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}

				return data;
			};

			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}


	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;

				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);

					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];

						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');

						// Traverse each entry in the array setting the properties requested
						if ( $.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}

						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}

					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}

				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};

			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}


	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}


	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}


	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;

		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}

		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}


	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}

			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};

		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;

			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}

		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;

		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}

			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}


	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;

		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];

		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');

				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};

		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);

				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );

					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}

			i++;
		};

		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();

				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}

				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;

			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}

		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;

		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );

			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}

		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen;

		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');

			row.nTr = nTr;
			row.anCells = cells;

			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;

			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );

			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];

				nTd = nTrIn ? anTds[i] : document.createElement( oCol.sCellType );
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};

				cells.push( nTd );

				// Need to create the HTML if new, or if a rendering function is defined
				if ( (!nTrIn || oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}

				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}

				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}

				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}

			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow] );
		}

		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}


	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;

		if ( tr ) {
			var id = settings.rowIdFn( data );

			if ( id ) {
				tr.id = id;
			}

			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;

				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}

			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}

			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}


	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;

		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}

		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );

			if ( createHeader ) {
				cell.appendTo( row );
			}

			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );

				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );

					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}

			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}

			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}

		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}

		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');

		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );

		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];

			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;

				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}


	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;

		if ( ! aoSource )
		{
			return;
		}

		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}

		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;

			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}

			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}

		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;

			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}

			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;

				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;

					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}

					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}

					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}


	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}

		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;

		oSettings.bDrawing = true;

		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;

			oSettings.iInitDisplayStart = -1;
		}

		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();

		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}

		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;

			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}

				var nRow = aoData.nTr;

				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}

				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j] );

				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}

			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}

		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );

		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );

		var body = $(oSettings.nTBody);

		body.children().detach();
		body.append( $(anRows) );

		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );

		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}


	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;

		if ( sort ) {
			_fnSort( settings );
		}

		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}

		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}

		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;

		_fnDraw( settings );

		settings._drawHold = false;
	}


	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;

		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );

		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;

		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];

			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];

				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}

					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}

					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}

					i += j; /* Move along the position array */
				}

				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}

			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;

				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}

				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}

		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}


	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};

		aLayout.splice( 0, aLayout.length );

		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}

		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;

			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;

					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );

					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;

					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}


	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}

		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}

		return aReturn;
	}

	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );

		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;

			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);

				if ( match ) {
					// Support for arrays
					var name = match[0];

					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}

		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};

		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;

			var newData = $.isFunction( ajaxData ) ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge

			// If the function returned something, use that alone
			data = $.isFunction( ajaxData ) && newData ?
				newData :
				$.extend( true, data, newData );

			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}

		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}

				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );

				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}

				_fnProcessingDisplay( oSettings, false );
			}
		};

		// Store the data submitted for the API
		oSettings.oAjaxData = data;

		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );

		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( $.isFunction( ajax ) )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );

			// Restore for next time around
			ajax.data = ajaxData;
		}
	}


	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );

			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);

			return false;
		}
		return true;
	}


	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;

		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};

		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );

		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};

		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;

			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );

			param( "mDataProp_"+i, dataProp );

			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}

			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}

		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}

		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );

				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );

			param( 'iSortingCols', sort.length );
		}

		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}

		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}


	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};

		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );

		if ( draw ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}

		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);

		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();

		settings.bAjaxDataGet = false;
		_fnDraw( settings );

		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}

		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}


	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.

		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}

		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}

	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';

		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;

		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );

		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(

			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );

				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};

		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;

		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);

		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );

		return filter[0];
	}


	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};

		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );

		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );

			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}

			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}

		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}


	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;

		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];

			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];

				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}

			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}


	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}

		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );

		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];

			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}

		settings.aiDisplay = out;
	}


	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];

		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}

		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );

		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}

			// Search the display array
			display = settings.aiDisplay;

			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}

			settings.aiDisplay = filtered;
		}
	}


	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );

		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 *
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}

				return word.replace('"', '');
			} );

			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}

		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}


	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;

	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;

	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;

		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];

			if ( ! row._aFilterData ) {
				filterData = [];

				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];

					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );

						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}

						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}

						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}

					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}

					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n]/g, '');
					}

					filterData.push( cellData );
				}

				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}

		return wasInvalidated;
	}


	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}



	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}

	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );

		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );

			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );

			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}

		return n[0];
	}


	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}

		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;

		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}

		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );

		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}

		$(nodes).html( out );
	}


	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;

		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}



	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw

		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}

		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );

		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );

		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );

		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}

		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];

			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}

		_fnCallbackFire( settings, null, 'preInit', [settings] );

		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );

		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );

					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}

					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;

					_fnReDraw( settings );

					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}


	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;

		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}

		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}


	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;

		_fnLengthOverflow( settings );

		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}


	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;

		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );

		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}

		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}

		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);

		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );

		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );

		return div[0];
	}



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */

	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;

		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}

		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';

			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;

						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}

		return node;
	}


	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();

		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;

			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;

			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}

		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;

		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );

			if ( redraw ) {
				_fnDraw( settings );
			}
		}

		return changed;
	}



	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}


	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}

		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}

	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);

		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );

		// Scrolling from here on in
		var scroll = settings.oScroll;

		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}

		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};

		if ( ! footer.length ) {
			footer = null;
		}

		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);

		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}

		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;

		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;

				scrollHead.scrollLeft = scrollLeft;

				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}

		$(scrollBody).css(
			scrollY && scroll.bCollapse ? 'max-height' : 'height',
			scrollY
		);

		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;

		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );

		return scroller[0];
	}



	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};

		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;

		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}

		/*
		 * 1. Re-create the table inside the scrolling div
		 */

		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();

		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}

		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');


		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */

		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}

		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );

		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}

		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";

			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}

			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);

			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}

		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers

		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );

		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );

		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );

		$(headerSrcEls).height(0);

		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );

			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );

			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );

			$(footerSrcEls).height(0);
		}


		/*
		 * 3. Apply the measurements
		 */

		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+headerContent[i]+'</div>';
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );

		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+footerContent[i]+'</div>';
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}

		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;

			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}

			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}

		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );

		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}


		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}

		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );

		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";

		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}

		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );

		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.scroll();

		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}



	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;

		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;

			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}

					index++;
				}

				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}

			i++;
		}
	}



	var __re_html_remove = /<.*?>/g;


	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;

		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}

		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];

			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );

				userInputs = true;
			}
		}

		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );

				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );

			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );

			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );

			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');

			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );

			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];

				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';

				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}

			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];

					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}

			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');

			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );

			// When scrolling (X or Y) we want to set the width of the table as
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');

				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}

			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();

				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();

				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;

				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}

			table.style.width = _fnStringToCss( total );

			// Finished with the table - ditch it
			holder.remove();
		}

		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}

		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};

			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}

			oSettings._reszEvt = true;
		}
	}


	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;


	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}

		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );

		var val = n[0].offsetWidth;
		n.remove();

		return val;
	}


	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}

		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}


	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;

		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );

			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}

		return maxIdx;
	}


	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}

		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}

		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}



	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};

		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}

		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}

		add( settings.aaSorting );

		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}

		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;

			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';

				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}

				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}

		return aSort;
	}

	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;

		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );

		aSort = _fnSortFlatten( oSettings );

		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];

			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}

			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}

		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}

			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;

					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];

						x = dataA[ sort.col ];
						y = dataB[ sort.col ];

						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}

					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;

					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];

						x = dataA[ sort.col ];
						y = dataB[ sort.col ];

						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}

					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}

		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}


	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;

		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;

			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');

			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}

				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}

			th.setAttribute('aria-label', label);
		}
	}


	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}

			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};

		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}

		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );

			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );

				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}

				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );

			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}

		// Run the sort by calling a full redraw
		_fnReDraw( settings );

		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}


	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];

		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}

			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );

				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );

					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}


	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;

		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;

				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}

			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;

				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}

		settings.aLastSort = sort;
	}


	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;

		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}

		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];

		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];

			if ( ! row._aSortData ) {
				row._aSortData = [];
			}

			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );

				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}



	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}

		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};

		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );

		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}


	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}

			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}

			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}

			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}

			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );

			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}

			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}

			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}

			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];

					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}

					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}

			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		}

		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}

		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );

		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}


	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );

		return idx !== -1 ?
			settings[ idx ] :
			null;
	}


	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;

		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}

		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;

			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}

			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}


	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );

			return;
		}

		if ( mappedName === undefined ) {
			mappedName = name;
		}

		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}


	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;

		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];

				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}

		return out;
	}


	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					n.blur(); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}


	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}


	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];

		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}

		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );

			$(settings.nTable).trigger( e, args );

			ret.push( e.result );
		}

		return ret;
	}


	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;

		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}

		// Keep the start record on the current page
		start -= (start % len);

		if ( len === -1 || start < 0 )
		{
			start = 0;
		}

		settings._iDisplayStart = start;
	}


	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];

		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}

		// Use the default
		return host._;
	}


	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}




	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];


	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;


	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );

		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}

		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};


	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}

		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings = settings.concat( a );
			}
		};

		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}

		// Remove duplicates
		this.context = _unique( settings );

		// Initial data
		if ( data ) {
			$.merge( this, data );
		}

		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};

		_Api.extend( this, this, __apiStruct );
	};

	DataTable.Api = _Api;

	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},


		concat:  __arrayProto.concat,


		context: [], // array of table settings objects


		count: function ()
		{
			return this.flatten().length;
		},


		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}

			return this;
		},


		eq: function ( idx )
		{
			var ctx = this.context;

			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},


		filter: function ( fn )
		{
			var a = [];

			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}

			return new _Api( this.context, a );
		},


		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},


		join:    __arrayProto.join,


		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},

		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;

			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}

			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );

				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );

					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );

					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];

					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}

					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];

						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}

						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}

			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},


		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},


		length:  0,


		map: function ( fn )
		{
			var a = [];

			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}

			return new _Api( this.context, a );
		},


		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},

		pop:     __arrayProto.pop,


		push:    __arrayProto.push,


		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},


		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},


		reverse: __arrayProto.reverse,


		// Object with rows, columns and opts
		selector: null,


		shift:   __arrayProto.shift,


		slice: function () {
			return new _Api( this.context, this );
		},


		sort:    __arrayProto.sort, // ? name - order?


		splice:  __arrayProto.splice,


		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},


		to$: function ()
		{
			return $( this );
		},


		toJQuery: function ()
		{
			return $( this );
		},


		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},


		unshift: __arrayProto.unshift
	} );


	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}

		var
			i, ien,
			j, jen,
			struct, inner,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );

					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};

		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];

			// Value
			obj[ struct.name ] = typeof struct.val === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				$.isPlainObject( struct.val ) ?
					{} :
					struct.val;

			obj[ struct.name ].__dt_wrapper = true;

			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};


	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');

	// 	_Api.extend( inst, obj );
	// };


	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]

	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}

		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;

		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};

		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];

			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   []
				};
				struct.push( src );
			}

			if ( i === ien-1 ) {
				src.val = val;
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};


	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );

		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );

			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}

			// Non-API return - just fire it back
			return ret;
		} );
	};


	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}

		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );

		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};



	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );


	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;

		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );


	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );


	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );


	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );


	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );


	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );



	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}

				_fnReDraw( settings, paging===false );
			}
		} );
	} );



	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}

		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );


	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}

		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;

		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );


	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}

		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );



	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );

			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}

		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );

			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}

			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );

				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}

				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};


	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;

		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}

		// else return undefined;
	} );


	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;

		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}

		// else return undefined;
	} );


	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );


	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;

		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];

			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}

		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );


	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );




	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;

		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}

		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];

			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );

				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}

		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}

		return _unique( out );
	};


	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}

		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}

		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};


	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];

				return inst;
			}
		}

		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};


	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;

		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current

		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			a = search == 'none' ?
				displayMaster.slice() :                      // no search
				search == 'applied' ?
					displayFiltered.slice() :                // applied search
					$.map( displayMaster, function (el, i) { // removed search
						return $.inArray( el, displayFiltered ) === -1 ? el : null;
					} );
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );

					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}

		return a;
	};


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */


	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;

			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}

			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}

			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}

			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = settings.aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}

			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);

			// Selector - node
			if ( sel.nodeName ) {
				if ( sel._DT_RowIndex !== undefined ) {
					return [ sel._DT_RowIndex ]; // Property added by DT for fast lookup
				}
				else if ( sel._DT_CellIndex ) {
					return [ sel._DT_CellIndex.row ];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}

			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}

				// need to fall through to jQuery in case there is DOM id that
				// matches
			}

			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};

		return _selector_run( 'row', selector, run, settings, opts );
	};


	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}

		opts = _selector_opts( opts );

		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );

		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;

		return inst;
	} );

	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );

	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );

	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );

	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );

	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );

	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;

		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}

		return new _Api( context, a );
	} );

	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;

		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;

			data.splice( row, 1 );

			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;

				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}

				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}

			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes

			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}

			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );

			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );

		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );

		return this;
	} );


	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];

				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];

					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}

				return out;
			}, 1 );

		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );

		return modRows;
	} );





	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );


	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;

		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}

		// Set
		ctx[0].aoData[ this[0] ]._aData = data;

		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );

		return this;
	} );


	_api_register( 'row().node()', function () {
		var ctx = this.context;

		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );


	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}

		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );

		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );



	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( $.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}

			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );

				rows.push( created[0] );
			}
		};

		addRow( data, klass );

		if ( row._details ) {
			row._details.detach();
		}

		row._details = $(rows);

		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};


	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;

		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];

			if ( row && row._details ) {
				row._details.remove();

				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};


	var __details_display = function ( api, show ) {
		var ctx = api.context;

		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];

			if ( row._details ) {
				row._detailsShow = show;

				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}

				__details_events( ctx[0] );
			}
		}
	};


	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;

		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );

		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}

				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];

					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );

			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}

				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );

				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];

					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );

			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}

				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};

	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';

	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;

		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}

		return this;
	} );


	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );


	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );


	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );


	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;

		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */

	// can be an array of these items, comma separated list, or an array of comma
	// separated lists

	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;


	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};


	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );

		var run = function ( s ) {
			var selInt = _intVal( s );

			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}

			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}

			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );

				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}

			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';

			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];

					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );

					default:
						return [];
				}
			}

			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}

			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();

			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}

			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};

		return _selector_run( 'column', selector, run, settings, opts );
	};


	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;

		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}

		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}

		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );

			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;

				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}

		// Common actions
		col.bVisible = vis;
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );

		_fnSaveState( settings );
	};


	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}

		opts = _selector_opts( opts );

		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );

		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;

		return inst;
	} );

	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );

	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );

	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );

	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );

	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );

	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );

	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );

		// Group the column visibility changes
		if ( vis !== undefined ) {
			// Second loop once the first is done for events
			this.iterator( 'column', function ( settings, column ) {
				_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
			} );

			if ( calc === undefined || calc ) {
				this.columns.adjust();
			}
		}

		return ret;
	} );

	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );

	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );

	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];

			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );

	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );



	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;

		var run = function ( s ) {
			var fnSelector = typeof s === 'function';

			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];

				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];

					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};

						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];

							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}

				return a;
			}

			// Selector - index
			if ( $.isPlainObject( s ) ) {
				return [s];
			}

			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();

			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}

			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};

		return _selector_run( 'cell', selector, run, settings, opts );
	};




	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}

		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}

		// Row + column selector
		var columns = this.columns( columnSelector, opts );
		var rows = this.rows( rowSelector, opts );
		var a, i, ien, j, jen;

		var cells = this.iterator( 'table', function ( settings, idx ) {
			a = [];

			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}

			return a;
		}, 1 );

		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );

		return cells;
	} );


	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];

			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );


	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );


	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';

		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );


	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );


	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );


	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );



	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );


	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];

		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}

		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );

		return this;
	} );



	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;

		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}

		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in

		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );


	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );


	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;

			return $.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}

		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );


	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;

		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];

			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );

			settings.aaSorting = sort;
		} );
	} );



	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;

		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}

		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}

			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );


	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;

				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}

				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}

				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );

				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);

	/*
	 * State API methods
	 */

	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );


	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );


	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );


	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );



	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;

		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;

			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}

			// Parts are different, return immediately
			return iThis > iThat;
		}

		return true;
	};


	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;

		if ( table instanceof DataTable.Api ) {
			return true;
		}

		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;

			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );

		return is;
	};


	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;

		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}

		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );

		return api ?
			new _Api( a ) :
			a;
	};


	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;



	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);

		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );


	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);

			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );

			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );


	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );


	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );


	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );


	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );


	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;

		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;

			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;

			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );

			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}

			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);

			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}

			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}

			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );

			$( rows ).removeClass( settings.asStripeClasses.join(' ') );

			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);

			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );

			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();

			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );

				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );

				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;

				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}

			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );


	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;

			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );


	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );

		if ( resolved === undefined ) {
			resolved = def;
		}

		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}

		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );

	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.16";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};



	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,

		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",

		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,

		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};




	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,

		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,

		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],

		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,

		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,

		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,

		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",

		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,

		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};


	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,

		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,

		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,

		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,

		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,

		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,

		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,

		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,

		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,

		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,

		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,

		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,

		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,

		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,

		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,

		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,

		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,

		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,

		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,

		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',

		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,

		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,

		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,

		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,

		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,

		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};


	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */

	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,


		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],


		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],


		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,


		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],


		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,

		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,


		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],


		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,


		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,


		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,


		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,


		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,


		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,


		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,


		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,


		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,


		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,


		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,


		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,


		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,


		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,


		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,


		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,


		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,


		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,


		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,


		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,


		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},


		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,


		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,


		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,


		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,


		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,


		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {}
		},


		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,


		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,


		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},


		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,


		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,


		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,


		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,


		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,


		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,


		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},


		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",

				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},

			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",


				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",


				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",


				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},

			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",


			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",


			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",


			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",


			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",


			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",


			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",


			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",


			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",


			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",


			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",


			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",


			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",


			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},


		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,


		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",


		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,


		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",


		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",


		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",


		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",


		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,


		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};

	_fnHungarianMap( DataTable.defaults );



	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */

	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,


		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],


		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,


		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,


		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,


		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,


		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */


		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "platform.details.0" },
		 *          { "data": "platform.details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,


		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,


		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",


		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",

		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",


		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,


		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",


		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",


		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,


		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,


		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};

	_fnHungarianMap( DataTable.defaults.column );



	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {

			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,

			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,

			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,

			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,

			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,

			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,

			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,

			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,

			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,

			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,

			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,

			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},


		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,

			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,

			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,

			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,

			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},

		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},

		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,

			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,

			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,

			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},


		"ajax": null,


		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],

		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],

		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],

		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],

		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},

		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],

		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],

		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],

		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},

		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],

		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,

		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],

		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,

		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],

		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,

		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],

		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],

		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],

		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],

		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],

		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],

		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],


		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],

		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],

		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],

		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",

		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,

		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,

		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,

		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,

		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,

		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,

		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,

		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],

		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,

		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,

		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",

		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,

		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],

		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],

		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,

		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,

		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,

		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,

		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,

		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,

		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,

		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,

		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,

		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],

		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,

		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,

		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,

		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,

		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,

		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,

		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,

		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,

		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,

		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,

		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},

		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,

		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,

		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,

		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,

		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],


		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},

		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},

		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;

			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},

		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,

		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,

		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,

		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,

		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,

		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],

		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},

		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,

		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */


	/**
	 * DataTables extensions
	 *
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},


		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},


		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		builder: "-source-",


		/**
		 * Error reporting.
		 *
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",


		/**
		 * Feature plug-ins.
		 *
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 *
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 *
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 *
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],


		/**
		 * Row searching.
		 *
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],


		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},


		/**
		 * Internal functions, exposed for used in plug-ins.
		 *
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},


		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},


		/**
		 * Pagination plug-in methods.
		 *
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},


		renderer: {
			pageButton: {},
			header: {}
		},


		/**
		 * Ordering plug-ins - custom data source
		 *
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 *
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 *
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},


		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! $.isNumeric( data.substring(1) ) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],


			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 *
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},


			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},

		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,


		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//

		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,


		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,


		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},


		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};


	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );


	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",

		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",

		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",

		/* Empty row */
		"sRowEmpty": "dataTables_empty",

		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",

		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */

		/* Filtering */
		"sFilterInput": "",

		/* Page length */
		"sLengthSelect": "",

		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",

		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",

		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );


	var extPagination = DataTable.ext.pager;

	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;

		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}

		numbers.DT_el = 'span';
		return numbers;
	}


	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},

		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},

		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},

		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},

		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},

		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},

		// For testing and plug-ins to use
		_numbers: _numbers,

		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );


	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;

				var attach = function( container, buttons ) {
					var i, ien, node, button;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};

					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];

						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = '';

							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;

								case 'first':
									btnDisplay = lang.sFirst;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								case 'previous':
									btnDisplay = lang.sPrevious;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								case 'next':
									btnDisplay = lang.sNext;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								case 'last':
									btnDisplay = lang.sLast;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}

							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': settings.iTabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );

								_fnBindAction(
									node, {action: button}, clickHandler
								);

								counter++;
							}
						}
					}
				};

				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;

				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}

				attach( $(host).empty(), buttons );

				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
				}
			}
		}
	} );



	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},

		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},

		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},

		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},

		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},

		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );



	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	//
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is


	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},

		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );



	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}

		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}

		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}

			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}

		return d * 1;
	};


	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},

				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},

				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},

				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;

				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}


	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			return Date.parse( d ) || -Infinity;
		},

		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},

		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},

		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},

		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );


	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );


	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}

					var colIdx = column.idx;

					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},

			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );

				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}

					var colIdx = column.idx;

					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);

					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );

	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */

	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') :
			d;
	};

	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}

					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );

					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}

					flo = flo.toFixed( precision );
					d = Math.abs( flo );

					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';

					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},

		text: function () {
			return {
				display: __htmlEscapeEntities
			};
		}
	};


	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */


	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}


	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );


	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, searcg or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));
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

define('subapp/stockchart',['jquery', 'highstock', 'libs/Class'], function($, HighStock, Class){

    var ChartApp = Class.extend({
        clear_data: function (data) {
            return data;
        },
        render_chart: function () {
            Highcharts.chart('chart_container')
        },
        dataload_sucess: function (data) {

            this.data = this.clear_data(data);
            this.render_chart();
        },
        dataload_fail:function () {

        },
        init: function () {
            this.element_id = 'chart_container'
            this.$el = $('#'+this.element_id);
            if (!this.$el.length) return ;

            $.when($.ajax(this.get_data_url)).
            then(
                this.dataload_sucess.bind(this),
                this.dataload_fail.bind(this)
            );

        }
    });
    return ChartApp;

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

require([
        'libs/polyfills',
        'jquery',
        'subapp/header/header',
        'subapp/data/feed',
        'subapp/tracker',
        'subapp/gotop',
        'subapp/tools/bookmark',
        'datatable',
        'subapp/stockchart',
        'bootstrap'
    ],
    function (polyfill,
              $,
              Header,
              Feed,
              Tracker,
              GoTop,
              DataTable,
              BookMark
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
        new Tracker();
        new GoTop();
        // header price fetch
        all_price_feed.run();

        if($('#coin_table').length){
            window.app.table = $('#coin_table').DataTable({
                 // stateSave: true,
                 "pageLength": 100,
                 "lengthChange":true,
                 "paging": false,
                 "searching": false,
                 "info":false,
                 "language": {
                     "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Chinese.json"
                 },
                 "order": [[ 2, "desc" ]]
            });
        }

        console.log('finish');

    });


define("tools_page_app", function(){});

