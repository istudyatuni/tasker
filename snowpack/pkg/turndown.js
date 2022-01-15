function B(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}return e}function m(e,r){return Array(r+1).join(e)}function P(e){return e.replace(/^\n*/,"")}function L(e){for(var r=e.length;r>0&&e[r-1]===`
`;)r--;return e.substring(0,r)}var x=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function d(e){return g(e,x)}var y=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function E(e){return g(e,y)}function M(e){return k(e,y)}var T=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function I(e){return g(e,T)}function H(e){return k(e,T)}function g(e,r){return r.indexOf(e.nodeName)>=0}function k(e,r){return e.getElementsByTagName&&r.some(function(t){return e.getElementsByTagName(t).length})}var s={};s.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}},s.lineBreak={filter:"br",replacement:function(e,r,t){return t.br+`
`}},s.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,r,t){var n=Number(r.nodeName.charAt(1));if(t.headingStyle==="setext"&&n<3){var i=m(n===1?"=":"-",e.length);return`

`+e+`
`+i+`

`}else return`

`+m("#",n)+" "+e+`

`}},s.blockquote={filter:"blockquote",replacement:function(e){return e=e.replace(/^\n+|\n+$/g,""),e=e.replace(/^/gm,"> "),`

`+e+`

`}},s.list={filter:["ul","ol"],replacement:function(e,r){var t=r.parentNode;return t.nodeName==="LI"&&t.lastElementChild===r?`
`+e:`

`+e+`

`}},s.listItem={filter:"li",replacement:function(e,r,t){e=e.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var n=t.bulletListMarker+"   ",i=r.parentNode;if(i.nodeName==="OL"){var a=i.getAttribute("start"),f=Array.prototype.indexOf.call(i.children,r);n=(a?Number(a)+f:f+1)+".  "}return n+e+(r.nextSibling&&!/\n$/.test(e)?`
`:"")}},s.indentedCodeBlock={filter:function(e,r){return r.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,r,t){return`

    `+r.firstChild.textContent.replace(/\n/g,`
    `)+`

`}},s.fencedCodeBlock={filter:function(e,r){return r.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,r,t){for(var n=r.firstChild.getAttribute("class")||"",i=(n.match(/language-(\S+)/)||[null,""])[1],a=r.firstChild.textContent,f=t.fence.charAt(0),u=3,l=new RegExp("^"+f+"{3,}","gm"),o;o=l.exec(a);)o[0].length>=u&&(u=o[0].length+1);var c=m(f,u);return`

`+c+i+`
`+a.replace(/\n$/,"")+`
`+c+`

`}},s.horizontalRule={filter:"hr",replacement:function(e,r,t){return`

`+t.hr+`

`}},s.inlineLink={filter:function(e,r){return r.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,r){var t=r.getAttribute("href"),n=h(r.getAttribute("title"));return n&&(n=' "'+n+'"'),"["+e+"]("+t+n+")"}},s.referenceLink={filter:function(e,r){return r.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,r,t){var n=r.getAttribute("href"),i=h(r.getAttribute("title"));i&&(i=' "'+i+'"');var a,f;switch(t.linkReferenceStyle){case"collapsed":a="["+e+"][]",f="["+e+"]: "+n+i;break;case"shortcut":a="["+e+"]",f="["+e+"]: "+n+i;break;default:var u=this.references.length+1;a="["+e+"]["+u+"]",f="["+u+"]: "+n+i}return this.references.push(f),a},references:[],append:function(e){var r="";return this.references.length&&(r=`

`+this.references.join(`
`)+`

`,this.references=[]),r}},s.emphasis={filter:["em","i"],replacement:function(e,r,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}},s.strong={filter:["strong","b"],replacement:function(e,r,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}},s.code={filter:function(e){var r=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!r;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var r=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",n=e.match(/`+/gm)||[];n.indexOf(t)!==-1;)t=t+"`";return t+r+e+r+t}},s.image={filter:"img",replacement:function(e,r){var t=h(r.getAttribute("alt")),n=r.getAttribute("src")||"",i=h(r.getAttribute("title")),a=i?' "'+i+'"':"";return n?"!["+t+"]("+n+a+")":""}};function h(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function C(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var r in e.rules)this.array.push(e.rules[r])}C.prototype={add:function(e,r){this.array.unshift(r)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var r;return(r=v(this.array,e,this.options))||(r=v(this._keep,e,this.options))||(r=v(this._remove,e,this.options))?r:this.defaultRule},forEach:function(e){for(var r=0;r<this.array.length;r++)e(this.array[r],r)}};function v(e,r,t){for(var n=0;n<e.length;n++){var i=e[n];if(F(i,r,t))return i}}function F(e,r,t){var n=e.filter;if(typeof n=="string"){if(n===r.nodeName.toLowerCase())return!0}else if(Array.isArray(n)){if(n.indexOf(r.nodeName.toLowerCase())>-1)return!0}else if(typeof n=="function"){if(n.call(e,r,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function $(e){var r=e.element,t=e.isBlock,n=e.isVoid,i=e.isPre||function(D){return D.nodeName==="PRE"};if(!(!r.firstChild||i(r))){for(var a=null,f=!1,u=null,l=R(u,r,i);l!==r;){if(l.nodeType===3||l.nodeType===4){var o=l.data.replace(/[ \r\n\t]+/g," ");if((!a||/ $/.test(a.data))&&!f&&o[0]===" "&&(o=o.substr(1)),!o){l=A(l);continue}l.data=o,a=l}else if(l.nodeType===1)t(l)||l.nodeName==="BR"?(a&&(a.data=a.data.replace(/ $/,"")),a=null,f=!1):n(l)||i(l)?(a=null,f=!0):a&&(f=!1);else{l=A(l);continue}var c=R(u,l,i);u=l,l=c}a&&(a.data=a.data.replace(/ $/,""),a.data||A(a))}}function A(e){var r=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),r}function R(e,r,t){return e&&e.parentNode===r||t(r)?r.nextSibling||r.parentNode:r.firstChild||r.nextSibling||r.parentNode}var b=typeof window!="undefined"?window:{};function V(){var e=b.DOMParser,r=!1;try{new e().parseFromString("","text/html")&&(r=!0)}catch(t){}return r}function U(){var e=function(){};return W()?e.prototype.parseFromString=function(r){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(r),t.close(),t}:e.prototype.parseFromString=function(r){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(r),t.close(),t},e}function W(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch(r){window.ActiveXObject&&(e=!0)}return e}var _=V()?b.DOMParser:U();function j(e,r){var t;if(typeof e=="string"){var n=G().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=n.getElementById("turndown-root")}else t=e.cloneNode(!0);return $({element:t,isBlock:d,isVoid:E,isPre:r.preformattedCode?X:null}),t}var N;function G(){return N=N||new _,N}function X(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function K(e,r){return e.isBlock=d(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=Y(e),e.flankingWhitespace=q(e,r),e}function Y(e){return!E(e)&&!I(e)&&/^\s*$/i.test(e.textContent)&&!M(e)&&!H(e)}function q(e,r){if(e.isBlock||r.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=z(e.textContent);return t.leadingAscii&&O("left",e,r)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&O("right",e,r)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function z(e){var r=e.match(/^(([ \t\r\n]*)(\s*))[\s\S]*?((\s*?)([ \t\r\n]*))$/);return{leading:r[1],leadingAscii:r[2],leadingNonAscii:r[3],trailing:r[4],trailingNonAscii:r[5],trailingAscii:r[6]}}function O(e,r,t){var n,i,a;return e==="left"?(n=r.previousSibling,i=/ $/):(n=r.nextSibling,i=/^ /),n&&(n.nodeType===3?a=i.test(n.nodeValue):t.preformattedCode&&n.nodeName==="CODE"?a=!1:n.nodeType===1&&!d(n)&&(a=i.test(n.textContent))),a}var Q=Array.prototype.reduce,J=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function p(e){if(!(this instanceof p))return new p(e);var r={rules:s,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,n){return n.isBlock?`

`:""},keepReplacement:function(t,n){return n.isBlock?`

`+n.outerHTML+`

`:n.outerHTML},defaultReplacement:function(t,n){return n.isBlock?`

`+t+`

`:t}};this.options=B({},r,e),this.rules=new C(this.options)}p.prototype={turndown:function(e){if(!re(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var r=w.call(this,new j(e,this.options));return Z.call(this,r)},use:function(e){if(Array.isArray(e))for(var r=0;r<e.length;r++)this.use(e[r]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,r){return this.rules.add(e,r),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return J.reduce(function(r,t){return r.replace(t[0],t[1])},e)}};function w(e){var r=this;return Q.call(e.childNodes,function(t,n){n=new K(n,r.options);var i="";return n.nodeType===3?i=n.isCode?n.nodeValue:r.escape(n.nodeValue):n.nodeType===1&&(i=ee.call(r,n)),S(t,i)},"")}function Z(e){var r=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=S(e,t.append(r.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function ee(e){var r=this.rules.forNode(e),t=w.call(this,e),n=e.flankingWhitespace;return(n.leading||n.trailing)&&(t=t.trim()),n.leading+r.replacement(t,e,this.options)+n.trailing}function S(e,r){var t=L(e),n=P(r),i=Math.max(e.length-t.length,r.length-n.length),a=`

`.substring(0,i);return t+a+n}function re(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}export default p;
