import{a as m,r as T}from"./index-2cb4bb29.js";import{r as $}from"./index-7c942418.js";function N(e,a){for(var r=0;r<a.length;r++){const t=a[r];if(typeof t!="string"&&!Array.isArray(t)){for(const l in t)if(l!=="default"&&!(l in e)){const i=Object.getOwnPropertyDescriptor(t,l);i&&Object.defineProperty(e,l,i.get?i:{enumerable:!0,get:()=>t[l]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var S={},y={},P={};Object.defineProperty(P,"__esModule",{value:!0});P.InitializePluralRules=void 0;var d=m,M=$;function z(e,a,r,t){var l=t.availableLocales,i=t.relevantExtensionKeys,n=t.localeData,o=t.getDefaultLocale,u=t.getInternalSlots,s=(0,d.CanonicalizeLocaleList)(a),c=Object.create(null),h=(0,d.CoerceOptionsToObject)(r),g=u(e);g.initializedPluralRules=!0;var w=(0,d.GetOption)(h,"localeMatcher","string",["best fit","lookup"],"best fit");c.localeMatcher=w,g.type=(0,d.GetOption)(h,"type","string",["cardinal","ordinal"],"cardinal"),(0,d.SetNumberFormatDigitOptions)(g,h,0,3,"standard");var F=(0,M.ResolveLocale)(l,s,c,i,n,o);return g.locale=F.locale,e}P.InitializePluralRules=z;var _={},O={};Object.defineProperty(O,"__esModule",{value:!0});O.GetOperands=void 0;var f=m;function G(e){(0,f.invariant)(typeof e=="string","GetOperands should have been called with a string");var a=(0,f.ToNumber)(e);(0,f.invariant)(isFinite(a),"n should be finite");var r=e.indexOf("."),t,l,i,n="";r===-1?(t=a,l=0,i=0):(t=e.slice(0,r),n=e.slice(r,e.length),l=(0,f.ToNumber)(n),i=n.length);var o=Math.abs((0,f.ToNumber)(t)),u,s;if(l!==0){var c=n.replace(/0+$/,"");u=c.length,s=(0,f.ToNumber)(c)}else u=0,s=0;return{Number:a,IntegerDigits:o,NumberOfFractionDigits:i,NumberOfFractionDigitsWithoutTrailing:u,FractionDigits:l,FractionDigitsWithoutTrailing:s}}O.GetOperands=G;Object.defineProperty(_,"__esModule",{value:!0});_.ResolvePlural=void 0;var p=m,x=O;function E(e,a,r){var t=r.getInternalSlots,l=r.PluralRuleSelect,i=t(e);if((0,p.invariant)((0,p.Type)(i)==="Object","pl has to be an object"),(0,p.invariant)("initializedPluralRules"in i,"pluralrules must be initialized"),(0,p.invariant)((0,p.Type)(a)==="Number","n must be a number"),!isFinite(a))return"other";var n=i.locale,o=i.type,u=(0,p.FormatNumericToString)(i,a),s=u.formattedString,c=(0,x.GetOperands)(s);return l(n,o,a,c)}_.ResolvePlural=E;var b={},L;function q(){if(L)return b;L=1,Object.defineProperty(b,"__esModule",{value:!0});var e=new WeakMap;function a(r){var t=e.get(r);return t||(t=Object.create(null),e.set(r,t)),t}return b.default=a,b}Object.defineProperty(y,"__esModule",{value:!0});y.PluralRules=void 0;var j=T,D=m,K=P,C=_,R=j.__importDefault(q());function I(e,a){if(!(e instanceof v))throw new TypeError("Method Intl.PluralRules.prototype.".concat(a," called on incompatible receiver ").concat(String(e)))}function k(e,a,r,t){var l=t.IntegerDigits,i=t.NumberOfFractionDigits,n=t.FractionDigits;return v.localeData[e].fn(i?"".concat(l,".").concat(n):l,a==="ordinal")}var v=function(){function e(a,r){var t=this&&this instanceof e?this.constructor:void 0;if(!t)throw new TypeError("Intl.PluralRules must be called with 'new'");return(0,K.InitializePluralRules)(this,a,r,{availableLocales:e.availableLocales,relevantExtensionKeys:e.relevantExtensionKeys,localeData:e.localeData,getDefaultLocale:e.getDefaultLocale,getInternalSlots:R.default})}return e.prototype.resolvedOptions=function(){I(this,"resolvedOptions");var a=Object.create(null),r=(0,R.default)(this);return a.locale=r.locale,a.type=r.type,["minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits"].forEach(function(t){var l=r[t];l!==void 0&&(a[t]=l)}),a.pluralCategories=j.__spreadArray([],e.localeData[a.locale].categories[a.type],!0),a},e.prototype.select=function(a){var r=this;I(r,"select");var t=(0,D.ToNumber)(a);return(0,C.ResolvePlural)(r,t,{getInternalSlots:R.default,PluralRuleSelect:k})},e.prototype.toString=function(){return"[object Intl.PluralRules]"},e.supportedLocalesOf=function(a,r){return(0,D.SupportedLocales)(e.availableLocales,(0,D.CanonicalizeLocaleList)(a),r)},e.__addLocaleData=function(){for(var a=[],r=0;r<arguments.length;r++)a[r]=arguments[r];for(var t=0,l=a;t<l.length;t++){var i=l[t],n=i.data,o=i.locale;e.localeData[o]=n,e.availableLocales.add(o),e.__defaultLocale||(e.__defaultLocale=o)}},e.getDefaultLocale=function(){return e.__defaultLocale},e.localeData={},e.availableLocales=new Set,e.__defaultLocale="",e.relevantExtensionKeys=[],e.polyfilled=!0,e}();y.PluralRules=v;try{typeof Symbol<"u"&&Object.defineProperty(v.prototype,Symbol.toStringTag,{value:"Intl.PluralRules",writable:!1,enumerable:!1,configurable:!0});try{Object.defineProperty(v,"length",{value:0,writable:!1,enumerable:!1,configurable:!0})}catch{}Object.defineProperty(v.prototype.constructor,"length",{value:0,writable:!1,enumerable:!1,configurable:!0}),Object.defineProperty(v.supportedLocalesOf,"length",{value:1,writable:!1,enumerable:!1,configurable:!0})}catch{}Object.defineProperty(S,"__esModule",{value:!0});var A=y;Object.defineProperty(Intl,"PluralRules",{value:A.PluralRules,writable:!0,enumerable:!1,configurable:!0});const H=N({__proto__:null,default:S},[S]);export{H as p};
