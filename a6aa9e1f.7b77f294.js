(window.webpackJsonp=window.webpackJsonp||[]).push([[44,12],{134:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(22),o=a(144),i=a(164),l=a(141);var s=function(e){var t=e.metadata,a=t.previousPage,n=t.nextPage;return c.a.createElement("nav",{className:"pagination-nav","aria-label":"Blog list page navigation"},c.a.createElement("div",{className:"pagination-nav__item"},a&&c.a.createElement(l.a,{className:"pagination-nav__link",to:a},c.a.createElement("div",{className:"pagination-nav__label"},"\xab Newer Entries"))),c.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},n&&c.a.createElement(l.a,{className:"pagination-nav__link",to:n},c.a.createElement("div",{className:"pagination-nav__label"},"Older Entries \xbb"))))},m=a(165);t.default=function(e){var t=e.metadata,a=e.items,n=e.sidebar,l=Object(r.default)().siteConfig.title,u=t.blogDescription,d=t.blogTitle,p="/"===t.permalink?l:d;return c.a.createElement(o.a,{title:p,description:u,wrapperClassName:"blog-wrapper"},c.a.createElement("div",{className:"container margin-vert--lg"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col col--2"},c.a.createElement(m.a,{sidebar:n})),c.a.createElement("main",{className:"col col--8"},a.map((function(e){var t=e.content;return c.a.createElement(i.a,{key:t.metadata.permalink,frontMatter:t.frontMatter,metadata:t.metadata,truncated:t.metadata.truncated},c.a.createElement(t,null))})),c.a.createElement(s,{metadata:t})))))}},146:function(e,t,a){"use strict";var n=a(0),c=a.n(n),r=a(22),o=a(137);t.a=function(){var e=Object(r.default)().siteConfig,t=void 0===e?{}:e,a=t.themeConfig,i=(void 0===a?{}:a).footer,l=i||{},s=l.copyright,m=(l.links,l.logo),u=void 0===m?{}:m,d=Object(o.a)(u.src);return Object(n.useEffect)((function(){var e=document.createElement("script");e.src="https://sidecar.gitter.im/dist/sidecar.v1.js",e.async=!0;var t=document.createElement("script");t.src="https://buttons.github.io/buttons.js",t.async=!0,document.body.appendChild(e),document.body.appendChild(t)}),[]),i?c.a.createElement("footer",{className:"nav-footer",id:"footer"},c.a.createElement("section",{className:"sitemap"},c.a.createElement("a",{href:Object(o.a)("/"),className:"nav-home"},c.a.createElement("img",{src:d,alt:t.title,width:"125",height:"28.47"})),c.a.createElement("div",null,c.a.createElement("h5",null,"Docs"),c.a.createElement("a",{href:Object(o.a)("docs/system_overview/introduction")},"System overview"),c.a.createElement("a",{href:Object(o.a)("#")},"User types"),c.a.createElement("a",{href:Object(o.a)("docs/core_functions/notifyAVitalEvent")},"Core functions"),c.a.createElement("a",{href:Object(o.a)("docs/support_functions/login")},"Support functions"),c.a.createElement("a",{href:Object(o.a)("docs/system_admin/userTeam")},"System admin functions"),c.a.createElement("a",{href:Object(o.a)("docs/technology/technologyIntroduction")},"Technology")),c.a.createElement("div",null,c.a.createElement("h5",null,"Community"),c.a.createElement("a",{href:Object(o.a)("docs/community/introduction")},"Community"),c.a.createElement("a",{href:Object(o.a)("docs/community/contributing")},"Contributing"),c.a.createElement("a",{href:Object(o.a)("docs/community/implementations")},"Implementations"),c.a.createElement("a",{href:Object(o.a)("docs/community/team")},"Team")),c.a.createElement("div",null,c.a.createElement("h5",null,"Legal"),c.a.createElement("a",{href:"https://www.plan.org.au/contact/privacy",target:"_blank"},"Privacy"),c.a.createElement("a",{href:"https://www.opencrvs.org/license",target:"_blank"},"License")),c.a.createElement("div",null,c.a.createElement("h5",null,"Social"),c.a.createElement("a",{className:"gitter"},"Gitter"),c.a.createElement("a",{href:"https://github.com/opencrvs/opencrvs-core",target:"_blank"},"GitHub"),c.a.createElement("a",{className:"github-button",href:"https://github.com/opencrvs/opencrvs-core/subscription","data-icon":"octicon-eye","aria-label":"Watch opencrvs/opencrvs-core on GitHub"},"Watch"),c.a.createElement("br",null),c.a.createElement("a",{className:"github-button",href:"https://github.com/opencrvs/opencrvs-core","data-icon":"octicon-star","data-count-href":"/opencrvs/opencrvs-core/stargazers","data-show-count":"true","data-count-aria-label":"# stargazers on GitHub","aria-label":"Star this project on GitHub"},"Star"))),c.a.createElement("section",{className:"copyright"},s)):null}}}]);