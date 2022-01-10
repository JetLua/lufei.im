exports.id = 810;
exports.ids = [810];
exports.modules = {

/***/ 984:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "style_root__fhTWa",
	"head": "style_head__4DB8I",
	"tip": "style_tip__AFS4i",
	"text": "style_text__cKaP3",
	"list": "style_list__mY0vc",
	"item": "style_item__eICeK",
	"button": "style_button__pv0WL",
	"name": "style_name__3R0sB",
	"icon": "style_icon__xSR5H"
};


/***/ }),

/***/ 810:
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
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(915);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(828);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(984);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* provided dependency */ var React = __webpack_require__(689);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (React.memo(function({ className , onFiles , ...props }) {
    const [state, dispatch] = (0,_util__WEBPACK_IMPORTED_MODULE_3__/* .useReducer */ ._Y)({
        buttons: [
            {
                name: '添加图片',
                id: 'btn:add:image'
            },
            {
                name: '添加文件夹',
                id: 'btn:add:folder'
            },
            {
                name: '清除',
                id: 'btn:clear'
            }
        ],
        files: []
    });
    React.useEffect(()=>{
        onFiles(state.files);
    }, [
        state.files
    ]);
    const tap = (e)=>{
        const target = e.currentTarget;
        switch(target.dataset.name){
            case 'btn:add:image':
                {
                    getFiles().then(filter).then((files)=>{
                        if (!files.length) return;
                        dispatch({
                            files: [
                                ...state.files,
                                ...files
                            ]
                        });
                    });
                    break;
                }
        }
    };
    /**
   * 弹窗选择文件
   */ const getFiles = ()=>{
        const [promise, resolve] = (0,_util__WEBPACK_IMPORTED_MODULE_3__/* .createPromise */ .wv)();
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*';
        input.click();
        input.onchange = ()=>{
            const files = [];
            for(let i = 0; i < input.files.length; i++){
                files.push(input.files.item(i));
            }
            resolve(files);
        };
        return promise;
    };
    /**
   * 过滤重复文件
   */ const filter = (files)=>{
        return files.filter((f)=>!state.files.find((old)=>old.type === f.type && old.lastModified === f.lastModified
            )
        );
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        ...props,
        className: [
            (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().root),
            className
        ].join(' ').trim(),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().head),
                children: state.buttons.map((item, i)=>{
                    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        variant: "contained",
                        size: "small",
                        onClick: tap,
                        "data-name": item.id,
                        children: item.name
                    }, i));
                })
            }),
            state.files.length < 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().tip),
                onClick: tap,
                "data-name": "btn:add:image",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__.FileUpload, {
                        color: "action",
                        fontSize: "large"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().text),
                        children: "拖拽文件到此处"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.List, {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().list),
                children: state.files.map((file, i)=>{
                    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.ListItem, {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().item),
                        disablePadding: true,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.ListItemButton, {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().button),
                            disableGutters: true,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Icon, {
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().icon),
                                    file: file
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.ListItemText, {
                                    primary: file.name,
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().name),
                                    disableTypography: true
                                })
                            ]
                        })
                    }, i));
                })
            })
        ]
    }));
}));
const Icon = React.memo(function({ style , file , ...props }) {
    const [state, dispatch] = (0,_util__WEBPACK_IMPORTED_MODULE_3__/* .useReducer */ ._Y)({
        url: ''
    });
    React.useEffect(()=>{
        URL.revokeObjectURL(state.url);
        dispatch({
            url: URL.createObjectURL(file)
        });
    }, [
        file
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
        ...props,
        style: {
            ...style,
            backgroundImage: `url(${state.url})`
        }
    }));
});


/***/ })

};
;