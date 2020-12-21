(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{136:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return g}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,g=p["".concat(i,".").concat(b)]||p[b]||m[b]||o;return n?a.a.createElement(g,c(c({ref:t},l),{},{components:n})):a.a.createElement(g,c({ref:t},l))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(3),a=n(7),o=(n(0),n(136)),i={id:"contentManagement",title:"Content management"},c={unversionedId:"system_admin/contentManagement",id:"system_admin/contentManagement",isDocsHomePage:!1,title:"Content management",description:"This functionality allows you to easily manage the content (copy) of the application, including managing multiple languages.",source:"@site/docs/system_admin/Content_management_f7cca630a2624d2ab6c43e518f56e591.md",slug:"/system_admin/contentManagement",permalink:"/opencrvs-core/docs/system_admin/contentManagement",version:"current",sidebar:"docs",previous:{title:"User & team management",permalink:"/opencrvs-core/docs/system_admin/userTeam"},next:{title:"Communications management",permalink:"/opencrvs-core/docs/system_admin/commsManagement"}},s=[{value:"Configuration",id:"configuration",children:[]},{value:"User Stories",id:"user-stories",children:[]},{value:"Functionality",id:"functionality",children:[]}],l={toc:s};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This functionality allows you to easily manage the content (copy) of the application, including managing multiple languages."),Object(o.b)("h2",{id:"configuration"},"Configuration"),Object(o.b)("p",null,"All product copy can be edited as per country requirements."),Object(o.b)("h2",{id:"user-stories"},"User Stories"),Object(o.b)("p",null,"As a ",Object(o.b)("strong",{parentName:"p"},"System Administrator,")," I want to be able to easily manage the content of the OpenCRVS application, so that I can focus on value add activities"),Object(o.b)("h2",{id:"functionality"},"Functionality"),Object(o.b)("p",null,"Currently, all content management is completed in the code by creating it in the country's resources package: ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/opencrvs/opencrvs-zambia#languages---how-do-i-internationalise-or-update-the-opencrvs-client-text"}),"https://github.com/opencrvs/opencrvs-zambia#languages---how-do-i-internationalise-or-update-the-opencrvs-client-text")),Object(o.b)("p",null,"You can edit content by editing the following text file: ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/opencrvs/opencrvs-zambia/blob/master/src/zmb/features/languages/generated/register.json"}),"https://github.com/opencrvs/opencrvs-zambia/blob/master/src/zmb/features/languages/generated/register.json")),Object(o.b)("p",null,"#",Object(o.b)("strong",{parentName:"p"},"Coming Soon")),Object(o.b)("p",null,"If OpenCRVS requires central management in the future, we will use an existing content management system (CMS) e.g. Contentful or Transifex"))}u.isMDXComponent=!0}}]);