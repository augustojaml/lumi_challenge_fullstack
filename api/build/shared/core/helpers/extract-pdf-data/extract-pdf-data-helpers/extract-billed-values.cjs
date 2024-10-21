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

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-billed-values.ts
var extract_billed_values_exports = {};
__export(extract_billed_values_exports, {
  extractBilledValues: () => extractBilledValues
});
module.exports = __toCommonJS(extract_billed_values_exports);
function parseNumber(str) {
  const cleanedStr = str.replace(/\./g, "").replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(cleanedStr);
  return isNaN(num) ? 0 : num;
}
var extractBilledValues = (text) => {
  const lines = text.split("\n");
  const startIndex = lines.findIndex(
    (line) => line.includes("Valores Faturados")
  );
  const endIndex = lines.findIndex(
    (line, index) => index > startIndex && (line.includes("Hist\xF3rico de Consumo") || line.includes("TOTAL"))
  );
  if (startIndex === -1 || endIndex === -1) {
    return [];
  }
  const billedValuesLines = lines.slice(startIndex + 1, endIndex);
  const dataLines = billedValuesLines.slice(2);
  const items = [];
  for (const line of dataLines) {
    const item = parseLine(line);
    if (item) {
      items.push(item);
    }
  }
  return items;
};
var parseLine = (line) => {
  const regex = /^(.*?)(-?\d[\d\s,.-]*)$/;
  const match = line.trim().match(regex);
  if (match) {
    let itemName = match[1].trim();
    const numbersPart = match[2].trim();
    const numbers = numbersPart.split(/\s+/);
    let unit = "";
    const unitMatch = itemName.match(/(kWh|m³|kg|Unid)$/i);
    if (unitMatch) {
      unit = unitMatch[0];
      itemName = itemName.substring(0, itemName.length - unit.length).trim();
    }
    const item = {
      item_name: itemName,
      unit: unit || "",
      quantity: 0,
      unit_price: 0,
      amount: 0,
      unit_rate: 0
    };
    if (numbers.length >= 4) {
      item.quantity = parseNumber(numbers[0]);
      item.unit_price = parseNumber(numbers[1]);
      item.amount = parseNumber(numbers[2]);
      item.unit_rate = parseNumber(numbers[3]);
    } else if (numbers.length === 1) {
      item.amount = parseNumber(numbers[0]);
    }
    return item;
  }
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractBilledValues
});
