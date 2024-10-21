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

// src/shared/http/controllers/upload-pdf-invoice-controller.ts
var upload_pdf_invoice_controller_exports = {};
__export(upload_pdf_invoice_controller_exports, {
  uploadPdfInvoicesController: () => uploadPdfInvoicesController
});
module.exports = __toCommonJS(upload_pdf_invoice_controller_exports);

// src/shared/core/libs/prisma/index.ts
var import_client = require("@prisma/client");

// src/shared/core/config/env.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/shared/core/libs/prisma/index.ts
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/app/repositories/implements/prisma-clients-repository.ts
var PrismaClientsRepository = class {
  async create(data) {
    const client = await prisma.client.create({ data });
    return client;
  }
  async findById(id) {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        invoices: {
          include: {
            billed_items: true,
            consumption_history: true
          }
        }
      }
    });
    return client || null;
  }
  async findByEmail(email) {
    const client = prisma.client.findUnique({ where: { email } });
    return client || null;
  }
  async findByClient(client_number) {
    const client = prisma.client.findUnique({ where: { client_number } });
    return client || null;
  }
  async findAll() {
    const clients = await prisma.client.findMany({
      where: {
        role: {
          not: "ADMIN"
        }
      },
      include: {
        invoices: {
          include: {
            billed_items: true,
            consumption_history: true
          }
        }
      }
    });
    return clients;
  }
};

// src/app/repositories/implements/prisma-invoices-repository.ts
var PrismaInvoicesRepository = class {
  async create(data) {
    const invoice = await prisma.invoice.create({
      data: {
        file_name: data.file_name,
        client: {
          connect: {
            id: data.client_id
          }
        },
        client_number: data.client_number,
        reference_month: data.reference_month,
        due_date: new Date(data.due_date),
        installation_number: data.installation_number,
        amount_due: data.amount_due,
        billed_items: {
          create: data.billed_items
        },
        consumption_history: {
          create: data.consumption_history
        }
      }
    });
    return invoice;
  }
  async findById(id) {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        billed_items: true,
        consumption_history: true
      }
    });
    return invoice || null;
  }
  async findAll() {
    const invoices = await prisma.invoice.findMany({
      include: {
        billed_items: true,
        consumption_history: true
      }
    });
    return invoices;
  }
};

// src/app/use-cases/upload-pdf-invoice-use-case.ts
var UploadPdfInvoicesUseCase = class {
  constructor(clientsRepository, invoicesRepository) {
    this.clientsRepository = clientsRepository;
    this.invoicesRepository = invoicesRepository;
  }
  async execute({ invoices }) {
    const createdInvoices = [];
    const invoicesWithoutClient = [];
    for (const invoice of invoices) {
      const client = await this.clientsRepository.findByClient(
        invoice.client_number
      );
      if (client) {
        const createdInvoice = await this.invoicesRepository.create({
          ...invoice,
          client_number: client.client_number ?? "",
          client_id: client.id
        });
        createdInvoices.push(createdInvoice);
      } else {
        invoicesWithoutClient.push(invoice);
      }
    }
    return { createdInvoices, invoicesWithoutClient };
  }
};

// src/shared/core/factories/upload-files-factory.ts
var uploadFilesFactory = () => {
  const clientRepo = new PrismaClientsRepository();
  const invoiceRepo = new PrismaInvoicesRepository();
  const useCase = new UploadPdfInvoicesUseCase(clientRepo, invoiceRepo);
  return useCase;
};

// src/shared/core/helpers/extract-pdf-data/index.ts
var import_pdf_parse = __toESM(require("pdf-parse"), 1);

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-amount-to-pay.ts
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

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-billed-values.ts
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

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-client-number.ts
var extractClientNumber = (texto) => {
  const lines = texto.split("\n");
  const index = lines.findIndex((line) => line.includes("N\xBA DO CLIENTE"));
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1];
    const clientNumber = nextLine.trim().split(/\s+/)[0];
    return clientNumber || null;
  }
  return null;
};

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-consumption_history.ts
var extractConsumptionHistory = (text) => {
  const lines = text.split("\n");
  const startIndex = lines.findIndex(
    (line) => line.includes("Hist\xF3rico de Consumo")
  );
  if (startIndex === -1) {
    return [];
  }
  const headerIndex = startIndex + 1;
  const dataLines = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || line.includes("Reservado ao Fisco") || line.includes("SEM VALOR FISCAL")) {
      break;
    }
    dataLines.push(line);
  }
  const items = [];
  for (const line of dataLines) {
    const item = parseLine2(line);
    if (item) {
      items.push(item);
    }
  }
  return items;
};
var parseLine2 = (line) => {
  const cleanedLine = line.trim().replace(/\s+/g, " ");
  const parts = cleanedLine.split(" ");
  if (parts.length >= 4) {
    const item = {
      month_year: parts[0],
      consumption_kwh: parseNumber2(parts[1]),
      average_kwh_per_day: parseNumber2(parts[2]),
      days: parseInt(parts[3], 10)
    };
    return item;
  }
  return null;
};
var parseNumber2 = (str) => {
  const cleanedStr = str.replace(/\./g, "").replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(cleanedStr);
  return isNaN(num) ? 0 : num;
};

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-due-date.ts
var extractDueDate = (text) => {
  const lines = text.split("\n");
  const index = lines.findIndex((line) => line.includes("Referente a"));
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1];
    const parts = nextLine.trim().split(/\s+/);
    const dueDate = parts[1];
    return dueDate || null;
  }
  return null;
};

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-installation-number.ts
var extractInstallationNumber = (text) => {
  const lines = text.split("\n");
  const index = lines.findIndex((line) => line.includes("N\xBA DA INSTALA\xC7\xC3O"));
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1];
    const parts = nextLine.trim().split(/\s+/);
    const installationNumber = parts[parts.length - 1];
    return installationNumber || null;
  }
  return null;
};

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-referece-month.ts
var extractReferenceMonth = (text) => {
  const lines = text.split("\n");
  const index = lines.findIndex((line) => line.includes("Referente a"));
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1];
    const parts = nextLine.trim().split(/\s+/);
    const referenceMonth = parts[0];
    return referenceMonth || null;
  }
  return null;
};

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/stream-to-buffer.ts
var streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};

// src/shared/core/helpers/extract-pdf-data/index.ts
var extractPdfData = async (parts) => {
  const results = [];
  for await (const part of parts) {
    if (part.type === "file") {
      const buffer = await streamToBuffer(part.file);
      const pdfData = await (0, import_pdf_parse.default)(buffer);
      const client_number = extractClientNumber(pdfData.text);
      const reference_month = extractReferenceMonth(pdfData.text);
      const due_date = extractDueDate(pdfData.text);
      const installation_number = extractInstallationNumber(pdfData.text);
      const amount_due = extractAmountToPay(pdfData.text);
      const billed_items = extractBilledValues(pdfData.text);
      const consumption_history = extractConsumptionHistory(pdfData.text);
      results.push({
        client_number,
        file_name: part.filename,
        reference_month,
        due_date,
        installation_number,
        amount_due,
        billed_items,
        consumption_history
      });
    } else {
      continue;
    }
  }
  return results;
};

// src/shared/core/schemas/upload-file-schema.ts
var import_zod2 = require("zod");
var billedItemSchema = import_zod2.z.object({
  item_name: import_zod2.z.string(),
  unit: import_zod2.z.string(),
  quantity: import_zod2.z.number(),
  unit_price: import_zod2.z.number(),
  amount: import_zod2.z.number(),
  unit_rate: import_zod2.z.number()
});
var consumptionHistorySchema = import_zod2.z.object({
  month_year: import_zod2.z.string(),
  consumption_kwh: import_zod2.z.number(),
  average_kwh_per_day: import_zod2.z.number(),
  days: import_zod2.z.number()
});
var uploadFileSchema = import_zod2.z.array(
  import_zod2.z.object({
    file_name: import_zod2.z.string(),
    client_number: import_zod2.z.string(),
    reference_month: import_zod2.z.string(),
    due_date: import_zod2.z.string().transform((date) => new Date(date)),
    installation_number: import_zod2.z.string(),
    amount_due: import_zod2.z.preprocess((val) => parseFloat(val), import_zod2.z.number()),
    billed_items: import_zod2.z.array(billedItemSchema),
    consumption_history: import_zod2.z.array(consumptionHistorySchema)
  })
);

// src/shared/http/controllers/upload-pdf-invoice-controller.ts
var uploadPdfInvoicesController = async (request, reply) => {
  const parts = request.parts();
  const filesParts = await extractPdfData(parts);
  const uploadFile = uploadFilesFactory();
  const invoiceParts = uploadFileSchema.parse(filesParts);
  const { createdInvoices, invoicesWithoutClient } = await uploadFile.execute({
    invoices: invoiceParts
  });
  return reply.status(201).send({ invoices: createdInvoices, invoicesWithoutClient });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadPdfInvoicesController
});
