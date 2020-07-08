(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{178:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return l})),a.d(t,"rightToc",(function(){return p})),a.d(t,"default",(function(){return b}));var n=a(2),r=a(11),i=(a(0),a(217)),c=a(219),o={id:"technologyIntroduction",title:"Introduction"},l={id:"technology/technologyIntroduction",isDocsHomePage:!1,title:"Introduction",description:"This section provides an in-depth background of:",source:"@site/docs/technology/Technology_3e6dabd017a0439492c1c65b43d5e4b4.mdx",permalink:"/opencrvs-core/docs/technology/technologyIntroduction",sidebar:"docs",previous:{title:"Configuration management",permalink:"/opencrvs-core/docs/system_admin/configManagement"},next:{title:"Installation",permalink:"/opencrvs-core/docs/technology/installation"}},p=[{value:"Architecture",id:"architecture",children:[]},{value:"Interoperability via OpenHIM and FHIR",id:"interoperability-via-openhim-and-fhir",children:[]},{value:"Scalability",id:"scalability",children:[]},{value:"Configuration",id:"configuration",children:[]},{value:"Security &amp; Backup",id:"security--backup",children:[]}],s={rightToc:p};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This section provides an in-depth background of:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"The technical architecture of OpenCRVS."),Object(i.b)("li",{parentName:"ul"},"The ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./installation"}),"installation process")," required to set up a development environment."),Object(i.b)("li",{parentName:"ul"},"The ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./technicalConfiguration"}),"technical configuration process")," required to set up OpenCRVS for your country."),Object(i.b)("li",{parentName:"ul"},"Information on how to make OpenCRVS ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./technicalInteroperability"}),"interoperate")," with external systems such as National ID, Health etc."),Object(i.b)("li",{parentName:"ul"},"The process and methodologies required to ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./deployment"}),"deploy")," OpenCRVS in production.")),Object(i.b)("h2",{id:"architecture"},"Architecture"),Object(i.b)("p",null,"The technical architecture of OpenCRVS was designed to conform to the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://ohie.org/"}),"OpenHIE")," architectural standard and ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://hl7.org/FHIR/"}),"FHIR"),"."),Object(i.b)("img",{alt:"ArchDiagram2x",src:Object(c.a)("assets/technology/ArchDiagram2x.png")}),Object(i.b)("p",null,"The Open Health Information Exchange (OpenHIE) initiative is a global, mission-driven community of practice. Dedicated to improving the health of the underserved through open and collaborative development & interoperable data standards."),Object(i.b)("p",null,"The OpenHIE framework supports interoperability by creating a reusable architectural framework that introduces a service oriented approach, maximally leveraging health information standards, enabling flexible implementation by country partners, and supporting interchangeability of individual components."),Object(i.b)("p",null,"OpenCRVS architecture follows the OpenHIE framework by:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Utilising the OpenHIE reference interoperability middleware: ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"http://openhim.org/"}),"OpenHIM"),"."),Object(i.b)("li",{parentName:"ul"},"Being constructed using modular, interchangeable, event-driven microservices for business functions and by utilising ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://hl7.org/FHIR/"}),"FHIR")," in a NoSQL MongoDB datastore: ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/jembi/hearth"}),"Hearth"),"."),Object(i.b)("li",{parentName:"ul"},"Providing scalablility via a ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://cloud.google.com/solutions/best-practices-for-building-containers"}),"one Docker container per microservice")," model and ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://docs.docker.com/engine/swarm/"}),"Docker Swarm"),"."),Object(i.b)("li",{parentName:"ul"},"Being fully ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"./technicalConfiguration"}),"configurable")," using simple text files.")),Object(i.b)("p",null,"OpenCRVS builds on these sound principles by additionally providing:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"A market-leading, powerful search and de-duplication engine powered by ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.elastic.co/"}),"ElasticSearch"),"."),Object(i.b)("li",{parentName:"ul"},"Real time performance analytics powered by the time-series database: ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.influxdata.com"}),"Influx"),"."),Object(i.b)("li",{parentName:"ul"},"Increased performance via vastly reduced HTTP requests between client and server through the use of ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://graphql.org/"}),"GraphQL")),Object(i.b)("li",{parentName:"ul"},"A ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://travis-ci.org/"}),"Travis")," continuous integration and delivery suite containing 80%+ coverage of ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://jestjs.io/"}),"Jest")," unit tests, ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.cypress.io/"}),"Cypress")," end-to-end tests and integration tests."),Object(i.b)("li",{parentName:"ul"},'A full-stack designed for the lowest possible TCO, "total cost of ownership" - built in ',Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/microsoft/TypeScript"}),"TypeScript")," / JavaScript (NodeJS - ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/hapijs/hapi"}),"HapiJS")," & ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://reactjs.org/"}),"React"),") - using ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://developers.google.com/web/progressive-web-apps"}),"Progressive Web Application")," technology for offline and low-connectivity access via mobile."),Object(i.b)("li",{parentName:"ul"},"External server and application health monitoring with ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.netdata.cloud/"}),"Netdata"),", ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.papertrail.com/"}),"Papertrail"),", ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://www.pingdom.com/"}),"Pingdom"),", ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://logrocket.com/"}),"LogRocket")," and ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://sentry.io"}),"Sentry")," configurations."),Object(i.b)("li",{parentName:"ul"},"Automatic ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://letsencrypt.org/"}),"LetsEncrypt")," SSL configuration and microservice cloud router using ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://containo.us/traefik/"}),"Traefik")),Object(i.b)("li",{parentName:"ul"},"Peace of mind, with the understanding that both the OpenCRVS application and OpenCRVS infrastructure has been security tested by an independent 3rd party to UK government standards.")),Object(i.b)("h2",{id:"interoperability-via-openhim-and-fhir"},"Interoperability via OpenHIM and FHIR"),Object(i.b)("p",null,"You can read more about the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../system_overview/interoperability"}),"functional interoperability requirements")," and the technical interoperability process ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./technicalInteroperability"}),"here"),"."),Object(i.b)("h2",{id:"scalability"},"Scalability"),Object(i.b)("p",null,"OpenCRVS is vertically scalable from the smallest to the largest nation. Our pilot is live in Bangladesh a country with a huge population. It can be deployed on public or private cloud servers across multiple nodes, or installed in a small data centre on a single node and easily managed and maintained by a very small team."),Object(i.b)("p",null,"Read more about the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./deployment"}),"deployment process"),"."),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"It is easy to configure and localise using a number of config text files in a ",Object(i.b)("strong",{parentName:"p"},"resources")," package. A companion example configuration; the OpenCRVS ",Object(i.b)("strong",{parentName:"p"},"resources")," package for Zambia, can be found on ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/opencrvs/opencrvs-zambia"}),"GitHub"),"."),Object(i.b)("p",null,"You can read more about the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../system_overview/configuration"}),"functional configuration requirements")," and the technical configuration process ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"./technicalConfiguration"}),"here"),"."),Object(i.b)("h2",{id:"security--backup"},"Security & Backup"),Object(i.b)("p",null,"Our mobile application and microservices are secure, protected by ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Multi-factor_authentication"}),"2-Factor Authentication")," utilising ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html"}),"OAuth JWT best practices"),".\nYou can read about this process ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../support_functions/login"}),"here")),Object(i.b)("p",null,Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../system_overview/user_types/overviewUserTypes"}),"User types")," and access controls are managed in order to segregate personally identifiable data to only to the users who need it. These configurations can be managed in the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"../system_admin/userTeam"}),"admin")," system, thus protecting citizen rights."),Object(i.b)("p",null,"All OpenCRVS data is encrypted in transit and at rest. OpenCRVS includes daily, automated, external back up as a configurable option in our ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.ansible.com/"}),"Ansible")," script. Our system has been security tested to UK government standards by an independent, ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.crest-approved.org/"}),"CREST")," and ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.ncsc.gov.uk/cyberessentials/overview"}),"CyberEssentials")," certified organisation."))}b.isMDXComponent=!0},217:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return d}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},b=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},h=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),b=s(a),h=n,d=b["".concat(c,".").concat(h)]||b[h]||u[h]||i;return a?r.a.createElement(d,o(o({ref:t},p),{},{components:a})):r.a.createElement(d,o({ref:t},p))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,c=new Array(i);c[0]=h;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,c[1]=o;for(var p=2;p<i;p++)c[p]=a[p];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}h.displayName="MDXCreateElement"},218:function(e,t,a){"use strict";var n=a(0),r=a(56);t.a=function(){return Object(n.useContext)(r.a)}},219:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a(81);var n=a(218),r=a(220);function i(e,t){var a=void 0===t?{}:t,i=a.forcePrependBaseUrl,c=void 0!==i&&i,o=a.absolute,l=void 0!==o&&o,p=Object(n.a)().siteConfig,s=(p=void 0===p?{}:p).baseUrl,b=void 0===s?"/":s,u=p.url;if(!e)return e;if(c)return b+e;if(!Object(r.a)(e))return e;var h=b+e.replace(/^\//,"");return l?u+h:h}},220:function(e,t,a){"use strict";function n(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}a.d(t,"a",(function(){return n}))}}]);