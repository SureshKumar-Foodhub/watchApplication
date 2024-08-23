import React from "react";

export const navigationReference = React.createRef();

export function navigate(name, params) {
  navigationReference.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationReference.current?.reset({
    index: 0,
    routes: [{ name, params }],
  });
}

const Deferred = () => {
  let d = {};
  d.promise = new Promise(function (resolve, reject) {
    d.resolve = resolve;
    d.reject = reject;
  });
  return d;
};

export const navigationDeferred = Deferred();
