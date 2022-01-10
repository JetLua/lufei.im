"use strict";
exports.id = 828;
exports.ids = [828];
exports.modules = {

/***/ 828:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "wv": () => (/* reexport */ createPromise),
  "pJ": () => (/* binding */ readFile),
  "b6": () => (/* binding */ useMount),
  "_Y": () => (/* binding */ useReducer)
});

;// CONCATENATED MODULE: ./src/util/createPromise.ts
/* harmony default export */ function createPromise() {
    let reject;
    let resolve;
    const promise = new Promise((_resolve, _reject)=>{
        reject = _reject;
        resolve = _resolve;
    });
    return [
        promise,
        resolve,
        reject
    ];
};

// EXTERNAL MODULE: external "deepmerge"
var external_deepmerge_ = __webpack_require__(330);
var external_deepmerge_default = /*#__PURE__*/__webpack_require__.n(external_deepmerge_);
;// CONCATENATED MODULE: ./src/util/merge.ts

/* harmony default export */ function merge(dest, source1, opts) {
    if (source1 == null) return dest;
    return external_deepmerge_default()(dest, source1, opts ?? {
        arrayMerge: (_, source)=>source
    });
};

;// CONCATENATED MODULE: ./src/util/index.ts
/* provided dependency */ var React = __webpack_require__(689);



function useMount(cb) {
    const ref = React.useRef();
    ref.current = cb;
    React.useEffect(()=>{
        return ref.current();
    }, []);
}
function useReducer(state1, opts) {
    return React.useReducer((state, data)=>{
        if (data instanceof Function) return merge(state, data(state), opts);
        return merge(state, data, opts);
    }, state1);
}
function readFile(file) {
    const [promise, resolve] = createPromise();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>resolve(reader.result)
    ;
    return promise;
}


/***/ })

};
;