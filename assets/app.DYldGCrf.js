import{t as i}from"./chunks/theme.SaeY295p.js";import{R as o,ae as u,af as l,ag as c,d as f,u as d,v as m,s as h,ah as g,ai as A,aj as v,ak as P,al as y,am as C,an as w,ao as R,ap as b,aq as E,ar as S}from"./chunks/framework.BmeS9IBN.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(i),T=f({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=d();return m(()=>{h(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&g(),A(),v(),s.setup&&s.setup(),()=>P(s.Layout)}});async function j(){globalThis.__VITEPRESS__=!0;const e=_(),a=D();a.provide(y,e);const t=C(e.route);return a.provide(w,t),a.component("Content",R),a.component("ClientOnly",b),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:E}),{app:a,router:e,data:t}}function D(){return c(T)}function _(){let e=o,a;return u(t=>{let n=l(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&j().then(({app:e,router:a,data:t})=>{a.go().then(()=>{S(a.route,t.site),e.mount("#app")})});export{j as createApp};
