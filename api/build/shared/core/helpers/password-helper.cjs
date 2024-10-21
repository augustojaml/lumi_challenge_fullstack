"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared/core/helpers/password-helper.ts
var password_helper_exports = {};
__export(password_helper_exports, {
  passwordHelper: () => passwordHelper
});
module.exports = __toCommonJS(password_helper_exports);
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var passwordHelper = {
  hash: async (password, salt = 6) => {
    const hashPassword = await import_bcryptjs.default.hash(password, salt);
    return hashPassword;
  },
  compare: async (password, hash) => {
    const comparePassword = await import_bcryptjs.default.compare(password, hash);
    return comparePassword;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  passwordHelper
});
