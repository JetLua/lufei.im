exports.id = 38;
exports.ids = [38];
exports.modules = {

/***/ 590:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "style_root__clrEB",
	"card": "style_card__Eu8X5",
	"head": "style_head__U7Wy6",
	"cover": "style_cover__tWl7K",
	"right": "style_right__r6wW1",
	"control": "style_control__1tYEB",
	"slider": "style_slider__g5KOi"
};


/***/ }),

/***/ 38:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(386);
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(howler__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(915);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(828);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(590);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var React = __webpack_require__(689);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (React.memo(function() {
    const [state, dispatch] = (0,_util__WEBPACK_IMPORTED_MODULE_4__/* .useReducer */ ._Y)({
        cursor: 0,
        playing: false,
        progress: 0,
        list: [
            {
                name: '等一分钟',
                singer: '徐誉滕',
                album: '《滕\xb7爱》',
                src: 'https://static.safish.org/music/%E7%AD%89%E4%B8%80%E5%88%86%E9%92%9F.mp3',
                cover: 'https://static.safish.org/music/%E7%AD%89%E4%B8%80%E5%88%86%E9%92%9F.cover.webp'
            }
        ]
    });
    const { current: mut  } = React.useRef({
        id: undefined,
        sound: null
    });
    (0,_util__WEBPACK_IMPORTED_MODULE_4__/* .useMount */ .b6)(()=>{
        mut.sound = new howler__WEBPACK_IMPORTED_MODULE_1__.Howl({
            preload: true,
            src: state.list[state.cursor].src
        });
        tick();
    });
    const tick = ()=>{
        setTimeout(tick, 500);
        if (!mut.sound) return;
        const progress = mut.sound.seek() / mut.sound.duration() * 100;
        dispatch({
            playing: mut.sound.playing(),
            progress: isNaN(progress) ? 0 : progress
        });
    };
    const toggle = ()=>{
        if (mut.sound.playing()) {
            mut.sound.pause();
        } else {
            mut.sound.play();
        }
    };
    const change = (_, v)=>{
        mut.sound.seek(mut.sound.duration() * v / 100);
    };
    const item = state.list[state.cursor];
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().root),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().card),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().head),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().cover),
                            style: {
                                backgroundImage: `url(${item.cover})`
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().right),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    children: item.name
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    children: [
                                        item.singer && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            children: item.singer
                                        }),
                                        item.album && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            children: item.album
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Slider, {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().slider),
                    size: "small",
                    value: state.progress,
                    onChange: change
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_5___default().control),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                            disabled: state.cursor < 1,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__.FastRewindRounded, {
                                fontSize: "large"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                            onClick: toggle,
                            children: state.playing ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__.PauseRounded, {
                                fontSize: "large"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__.PlayArrowRounded, {
                                fontSize: "large"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                            disabled: state.cursor === state.list.length - 1,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__.FastForwardRounded, {
                                fontSize: "large"
                            })
                        })
                    ]
                })
            ]
        })
    }));
}));


/***/ })

};
;