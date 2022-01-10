exports.id = 357;
exports.ids = [357];
exports.modules = {

/***/ 484:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "style_root__CIopf",
	"label": "style_label__QdX_M",
	"input": "style_input__J7_6y"
};


/***/ }),

/***/ 357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(484);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var React = __webpack_require__(689);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (React.memo(function({ className , cropped , onCrop , onExtrude , onPad , padding , extruded , ...props }) {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        ...props,
        className: [
            (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().root),
            className
        ].join(' ').trim(),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().label),
                children: "文件名(File name)"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Input, {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
                type: "text"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().label),
                children: "前缀(Prefix)"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Input, {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
                type: "text"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().label),
                children: "挤压(Extrude)"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Input, {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
                type: "number",
                inputProps: {
                    min: 0,
                    step: 1
                },
                onChange: (e)=>onExtrude(+e.target.value)
                ,
                defaultValue: extruded
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().label),
                children: "边距(Padding)"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Input, {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
                type: "number",
                inputProps: {
                    min: 0,
                    step: 1
                },
                defaultValue: padding,
                onChange: (e)=>onPad(+e.target.value)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().label),
                children: "裁剪(Crop)"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                    sx: {
                        margin: 0,
                        padding: 0
                    },
                    checked: cropped,
                    onChange: (_, ok)=>onCrop(ok)
                })
            })
        ]
    }));
}));


/***/ })

};
;