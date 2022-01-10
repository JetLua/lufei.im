"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 708:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/_app.tsx
/* provided dependency */ var React = __webpack_require__(689);



/* harmony default export */ const _app = (React.memo(function({ Component , pageProps  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(React.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Zero"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "从未停止对美好事物的探索"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        httpEquiv: "X-UA-Compatible",
                        content: "ie=edge"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "manifest",
                        href: "manifest.json"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/img/favicon.svg"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("script", {
                        src: "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.2.1/browser/pixi.min.js"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        ]
    }));
}));
if ( true && typeof navigator !== 'undefined' && navigator.serviceWorker) {
    navigator.serviceWorker.register('/js/sw.js', {
        scope: '/'
    }).then(()=>console.log('sw.js: done')
    ).catch(()=>console.log('sw.js: failed')
    );
}


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(708));
module.exports = __webpack_exports__;

})();