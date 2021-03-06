import React from "react"
const clone = require("shallow-clone")
const typeOf = require("kind-of")
const isPlainObject = require("is-plain-object")

export function cloneDeep(val, instanceClone) {
  if (React.isValidElement(val)) {
    return React.cloneElement(val)
  } else {
    const valueType = typeOf(val)
    switch (valueType) {
      case "object":
        return cloneObjectDeep(val, instanceClone)
      case "array":
        return cloneArrayDeep(val, instanceClone)
      default: {
        return clone(val)
      }
    }
  }
}

function cloneObjectDeep(val, instanceClone) {
  if (typeof instanceClone === "function") {
    return instanceClone(val)
  }
  if (instanceClone || isPlainObject(val)) {
    const res = new val.constructor()
    for (let key in val) {
      res[key] = cloneDeep(val[key], instanceClone)
    }
    return res
  }
  return val
}

function cloneArrayDeep(val, instanceClone) {
  const res = new val.constructor(val.length)
  for (let i = 0; i < val.length; i++) {
    res[i] = cloneDeep(val[i], instanceClone)
  }
  return res
}
