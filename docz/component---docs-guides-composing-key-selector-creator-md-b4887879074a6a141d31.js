(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{X7Xb:function(e,t,r){"use strict";r.r(t),r.d(t,"_frontmatter",(function(){return p})),r.d(t,"default",(function(){return l}));var n=r("Fcif"),o=r("+I+c"),c=(r("mXGw"),r("/FXl")),s=r("TjRS"),p=(r("aD51"),{});void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/guides/composing-key-selector-creator.md"}});var a={_frontmatter:p},i=s.a;function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(c.b)(i,Object(n.a)({},a,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"composing-key-selector-creator"},"Composing Key Selector Creator"),Object(c.b)("h2",{id:"main-purpose"},"Main Purpose"),Object(c.b)("p",null,"There is a concept of ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/toomuchdesign/re-reselect#keyselector"}),"Key Selector")," in ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/toomuchdesign/re-reselect"}),"re-reselect"),". It is working approach, but there are some limitations in straight forward using of this solution. Look at this example:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-typescript"}),"const state = {\n  persons: {\n    1: {\n      id: 1,\n      firstName: 'Marry',\n      secondName: 'Poppins',\n    },\n    2: {\n      id: 2,\n      firstName: 'Harry',\n      secondName: 'Potter',\n    },\n  },\n};\n\nimport createCachedSelector from 're-reselect';\nimport { prop } from 'reselect-utils';\n\nconst personsSelector = (state: State) => state.persons;\n\nconst personSelector = createCachedSelector(\n  [personsSelector, prop<{ personId: number }>().personId()],\n  (persons, personId) => persons[personId],\n)({\n  keySelector: prop<{ personId: number }>().personId(),\n});\n\nconst fullNameSelector = createCachedSelector(\n  [personSelector],\n  ({ firstName, secondName }) => `${firstName} ${secondName}`,\n)({\n  keySelector: prop<{ personId: number }>().personId(),\n});\n")),Object(c.b)("p",null,"As you can see, every time, when we want use ",Object(c.b)("inlineCode",{parentName:"p"},"personSelector"),", we should declare ",Object(c.b)("inlineCode",{parentName:"p"},"keySelector"),". Since ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/toomuchdesign/re-reselect/blob/master/CHANGELOG.md#330"}),"3.3.0 version")," ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/toomuchdesign/re-reselect"}),"re-reselect")," introduces special ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/toomuchdesign/re-reselect#keyselectorcreator"}),"Key Selector Creator")," option. This option can help you reduce ",Object(c.b)("inlineCode",{parentName:"p"},"keySelector")," boiler plate. Reselect Utils offer implementation of ",Object(c.b)("inlineCode",{parentName:"p"},"Key Selector Creator"),": ",Object(c.b)("inlineCode",{parentName:"p"},"Composing Key Selector Creator"),". This implementation just merges all ",Object(c.b)("inlineCode",{parentName:"p"},"Key Selecters")," from selector dependencies and splits them by ",Object(c.b)("inlineCode",{parentName:"p"},":")," sign. So, previous example can be rewritten next way:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-typescript"}),"import { prop, composingKeySelectorCreator } from 'reselect-utils';\n\nconst personSelector = createCachedSelector(\n  [personsSelector, prop<{ personId: number }>().personId()],\n  (persons, personId) => persons[personId],\n)({\n  keySelector: prop<{ personId: number }>().personId(),\n});\n\nconst fullNameSelector = createCachedSelector(\n  [personSelector],\n  ({ firstName, secondName }) => `${firstName} ${secondName}`,\n)({\n  keySelectorCreator: composingKeySelectorCreator,\n});\n")),Object(c.b)("p",null,"But ",Object(c.b)("inlineCode",{parentName:"p"},"Composing Key Selector Creator")," don't detect props automatically, so every time, when you use some property in selector dependencies, you should declare it in ",Object(c.b)("inlineCode",{parentName:"p"},"Key Selector"),". See next example:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-typescript"}),"import { prop, composingKeySelectorCreator } from 'reselect-utils';\n\nconst fullNameSelector = createCachedSelector(\n  [personSelector, prop<{ prefix: string }>().prefix()],\n  ({ firstName, secondName }, prefix) => `${prefix} ${firstName} ${secondName}`,\n)({\n  keySelector: prop<{ prefix: number }>().prefix(),\n  keySelectorCreator: composingKeySelectorCreator,\n});\n")),Object(c.b)("p",null,"Now ",Object(c.b)("inlineCode",{parentName:"p"},"fullNameSelector")," receives two properties: ",Object(c.b)("inlineCode",{parentName:"p"},"personId")," and ",Object(c.b)("inlineCode",{parentName:"p"},"prefix"),". It will work next way:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-typescript"}),"fullNameSelector.keySelector(state, {\n  personId: 1,\n  prefix: 'Mr.',\n}); // => 'Mr.:1'\n\nfullNameSelector.keySelector(state, {\n  personId: 2,\n  prefix: 'Ms.',\n}); // => 'Ms.:2'\n")),Object(c.b)("h2",{id:"key-selectors-composition"},"Key Selectors Composition"),Object(c.b)("p",null,"If you want use few props in selector dependencies, you can use ",Object(c.b)("inlineCode",{parentName:"p"},"composeKeySelectors")," helper:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-typescript"}),"import {\n  prop,\n  composeKeySelectors,\n  composingKeySelectorCreator,\n} from 'reselect-utils';\n\nconst fullNameSelector = createCachedSelector(\n  [\n    personSelector,\n    prop<{ prefix: string }>().prefix(),\n    prop<{ postfix: string }>().postfix(),\n  ],\n  ({ firstName, secondName }, prefix, postfix) =>\n    `${prefix} ${firstName} ${secondName} (${postfix})`,\n)({\n  keySelector: composeKeySelectors(\n    prop<{ prefix: number }>().prefix(),\n    prop<{ postfix: string }>().postfix(),\n  ),\n  keySelectorCreator: composingKeySelectorCreator,\n});\n\nfullNameSelector.keySelector(state, {\n  personId: 1,\n  prefix: 'Mr.',\n  postfix: 'father',\n}); // => 'Mr.:father:1'\n\nfullNameSelector.keySelector(state, {\n  personId: 2,\n  prefix: 'Ms.',\n  postfix: 'sister',\n}); // => 'Ms.:sister:2'\n")))}void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/guides/composing-key-selector-creator.md"}}),l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-guides-composing-key-selector-creator-md-b4887879074a6a141d31.js.map