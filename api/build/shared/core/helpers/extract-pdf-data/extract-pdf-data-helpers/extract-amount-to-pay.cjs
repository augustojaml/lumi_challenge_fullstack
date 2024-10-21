"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-amount-to-pay.ts
var extract_amount_to_pay_exports = {};
__export(extract_amount_to_pay_exports, {
  extractAmountToPay: () => extractAmountToPay
});
module.exports = __toCommonJS(extract_amount_to_pay_exports);
var extractAmountToPay = (text) => {
  const lines = text.split("\n");
  const index = lines.findIndex((line) => line.includes("Valor a pagar (R$)"));
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1];
    const parts = nextLine.trim().split(/\s+/);
    let amountToPay = parts[parts.length - 1];
    amountToPay = amountToPay.replace(",", ".");
    return amountToPay || null;
  }
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractAmountToPay
});
