"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/shared/http/app.ts
var import_cors = __toESM(require("@fastify/cors"), 1);
var import_jwt = __toESM(require("@fastify/jwt"), 1);
var import_fastify = __toESM(require("fastify"), 1);

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

// src/shared/core/errors/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/http/middleware/erros-handler.ts
var import_process = require("process");
var import_zod2 = require("zod");
var errosHandlers = async (app) => {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof import_zod2.ZodError) {
      return reply.status(400).send({
        message: "Validation error.",
        issues: error.format()
      });
    }
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message
      });
    }
    if (import_process.env.NODE_ENV !== "production") {
      console.error(`\u274C ${error}`);
    } else {
    }
    return reply.status(500).send({
      message: "Internal server error."
    });
  });
};

// src/shared/core/libs/prisma/index.ts
var import_client = require("@prisma/client");
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

// src/shared/core/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends AppError {
  constructor() {
    super("Invalid credentials");
  }
};

// src/shared/core/helpers/password-helper.ts
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

// src/app/use-cases/authenticate-client-use-case.ts
var AuthenticateClientUseCase = class {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute(data) {
    const client = await this.clientsRepository.findByEmail(data.email);
    if (!client) {
      throw new InvalidCredentialsError();
    }
    const comparePassword = await passwordHelper.compare(
      data.hash_password,
      client.hash_password
    );
    if (!comparePassword) {
      throw new InvalidCredentialsError();
    }
    return { client };
  }
};

// src/shared/core/factories/authenticate-client-factory.ts
var authenticateClientFactory = () => {
  const repo = new PrismaClientsRepository();
  const useCase = new AuthenticateClientUseCase(repo);
  return useCase;
};

// src/shared/core/schemas/sessions-schema.ts
var import_zod3 = require("zod");
var sessionsSchema = import_zod3.z.object({
  email: import_zod3.z.string().email(),
  hash_password: import_zod3.z.string().min(6, { message: "Password must be at least 6 characters long" }).max(8, { message: "Password must be at most 8 characters long" })
});

// src/shared/http/controllers/authenticate-client-controller.ts
var authenticateClientController = async (request, reply) => {
  const sessionsRequest = sessionsSchema.parse(request.body);
  const authenticateClient = authenticateClientFactory();
  const { client } = await authenticateClient.execute(sessionsRequest);
  const token = await reply.jwtSign(
    {
      role: client.role
    },
    {
      sign: {
        sub: client.id
      }
    }
  );
  return reply.status(201).send({ client, token });
};

// src/shared/core/errors/client-already-exists-error.ts
var ClientAlreadyExistsError = class extends AppError {
  constructor() {
    super("Client already exists", 409);
  }
};

// src/app/use-cases/create-client-use-case.ts
var CreateClientUseCase = class {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute(data) {
    const findClient = await this.clientsRepository.findByEmail(data.email);
    if (findClient) {
      throw new ClientAlreadyExistsError();
    }
    const hashPassword = await passwordHelper.hash(data.hash_password);
    const client = await this.clientsRepository.create({
      ...data,
      hash_password: hashPassword
    });
    return { client };
  }
};

// src/shared/core/factories/create-client-factory.ts
var createClientFactory = () => {
  const repo = new PrismaClientsRepository();
  const useCase = new CreateClientUseCase(repo);
  return useCase;
};

// src/shared/core/schemas/create-client-schema.ts
var import_zod4 = require("zod");
var createClientSchema = import_zod4.z.object({
  client_number: import_zod4.z.string(),
  full_name: import_zod4.z.string(),
  hash_password: import_zod4.z.string().min(6, { message: "Password must be at least 6 characters long" }).max(8, { message: "Password must be at most 8 characters long" }),
  email: import_zod4.z.string().email(),
  role: import_zod4.z.enum(["USER", "ADMIN"]),
  street: import_zod4.z.string(),
  number: import_zod4.z.string(),
  complement: import_zod4.z.string().optional(),
  neighborhood: import_zod4.z.string(),
  zip_code: import_zod4.z.string().regex(/^\d{5}-\d{3}$/),
  city: import_zod4.z.string(),
  state: import_zod4.z.string().length(2),
  tax_id: import_zod4.z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
  state_registration: import_zod4.z.string(),
  invoices: import_zod4.z.array(import_zod4.z.any()).optional().nullable()
});

// src/shared/http/controllers/create-client-controller.ts
var createClientController = async (request, reply) => {
  const clientRequest = createClientSchema.parse(request.body);
  const createClient = createClientFactory();
  const { client } = await createClient.execute({
    ...clientRequest,
    invoices: void 0
  });
  return reply.status(201).send({ client });
};

// src/app/use-cases/find-all-clients-use-case.ts
var FindAllClientsUseCase = class {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute() {
    const clients = await this.clientsRepository.findAll();
    return { clients };
  }
};

// src/shared/core/factories/find-all-clients-factory.ts
var findAllClientsFactory = () => {
  const repo = new PrismaClientsRepository();
  const useCase = new FindAllClientsUseCase(repo);
  return useCase;
};

// src/shared/http/controllers/find-all-clients-controller.ts
var findAllClientsController = async (_, reply) => {
  const findAllClients = findAllClientsFactory();
  const { clients } = await findAllClients.execute();
  return reply.status(201).send({ clients });
};

// src/shared/core/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends AppError {
  constructor() {
    super("Resource not found", 404);
  }
};

// src/app/use-cases/get-user-profile-use-case.ts
var GetUserProfileUseCase = class {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute(data) {
    const client = await this.clientsRepository.findById(data.id);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    return { client };
  }
};

// src/shared/core/factories/get-user-profile-factory.ts
var getUserProfileFactory = () => {
  const repo = new PrismaClientsRepository();
  const useCase = new GetUserProfileUseCase(repo);
  return useCase;
};

// src/shared/http/controllers/get-user-profile-controller.ts
var getUserProfileController = async (request, reply) => {
  const { sub: id } = request.user;
  const getUserProfile = getUserProfileFactory();
  const { client } = await getUserProfile.execute({
    id
  });
  return reply.status(201).send({ client });
};

// src/shared/http/middleware/authorize-jwt.ts
var authorizeJwt = async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
};

// src/shared/http/routes/_clients-route.ts
async function clientsRoutes(app) {
  app.post("/clients", createClientController);
  app.post("/sessions", authenticateClientController);
  app.get("/me", { onRequest: [authorizeJwt] }, getUserProfileController);
  app.get("/clients", findAllClientsController);
}

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

// src/app/use-cases/create-invoices-use-case.ts
var CreateInvoicesUseCase = class {
  constructor(clientsRepository, invoicesRepository) {
    this.clientsRepository = clientsRepository;
    this.invoicesRepository = invoicesRepository;
  }
  async execute(data) {
    const client = await this.clientsRepository.findById(data.client_id);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    const createdInvoice = {
      ...data.invoice,
      client_id: data.client_id,
      client_number: client.client_number ?? 0
    };
    const invoice = await this.invoicesRepository.create(createdInvoice);
    return { invoice };
  }
};

// src/shared/core/factories/create-invoice-factory.ts
var createInvoiceFactory = () => {
  const clientRepo = new PrismaClientsRepository();
  const invoiceRepo = new PrismaInvoicesRepository();
  const useCase = new CreateInvoicesUseCase(clientRepo, invoiceRepo);
  return useCase;
};

// src/shared/core/schemas/create-invoce-schema.ts
var import_zod5 = require("zod");
var billedItemSchema = import_zod5.z.object({
  item_name: import_zod5.z.string(),
  unit: import_zod5.z.string(),
  quantity: import_zod5.z.number(),
  unit_price: import_zod5.z.number(),
  amount: import_zod5.z.number(),
  unit_rate: import_zod5.z.number()
});
var consumptionHistorySchema = import_zod5.z.object({
  month_year: import_zod5.z.string(),
  consumption_kwh: import_zod5.z.number(),
  average_kwh_per_day: import_zod5.z.number(),
  days: import_zod5.z.number()
});
var createInvoiceSchema = import_zod5.z.object({
  file_name: import_zod5.z.string(),
  reference_month: import_zod5.z.string(),
  due_date: import_zod5.z.string().transform((date) => new Date(date)),
  installation_number: import_zod5.z.string(),
  amount_due: import_zod5.z.number(),
  billed_items: import_zod5.z.array(billedItemSchema),
  consumption_history: import_zod5.z.array(consumptionHistorySchema)
});

// src/shared/http/controllers/create-invoice-controller.ts
var createInvoiceController = async (request, reply) => {
  const { sub: id } = request.user;
  const invoiceRequest = createInvoiceSchema.parse(request.body);
  const createInvoice = createInvoiceFactory();
  const { invoice } = await createInvoice.execute({
    client_id: id,
    invoice: invoiceRequest
  });
  return reply.status(201).send({ invoice });
};

// src/app/use-cases/find-all-invoice-use-case.ts
var FindAllInvoiceUseCase = class {
  constructor(invoicesRepository) {
    this.invoicesRepository = invoicesRepository;
  }
  async execute() {
    const invoices = await this.invoicesRepository.findAll();
    return { invoices };
  }
};

// src/shared/core/factories/find-all-invoice-factory.ts
var findAllInvoiceFactory = () => {
  const repo = new PrismaInvoicesRepository();
  const useCase = new FindAllInvoiceUseCase(repo);
  return useCase;
};

// src/shared/http/controllers/find-all-invoice-controller.ts
var FindAllInvoiceController = async (_, reply) => {
  const findAllInvoice = findAllInvoiceFactory();
  const { invoices } = await findAllInvoice.execute();
  return reply.status(201).send({ invoices });
};

// src/app/use-cases/get-invoice-by-id-use-case.ts
var GetInvoiceByIdUseCase = class {
  constructor(invoicesRepository) {
    this.invoicesRepository = invoicesRepository;
  }
  async execute(data) {
    const invoice = await this.invoicesRepository.findById(data.id);
    if (!invoice) {
      throw new ResourceNotFoundError();
    }
    return { invoice };
  }
};

// src/shared/core/schemas/invoice-id-schema.ts
var import_zod6 = require("zod");
var invoiceIdSchema = import_zod6.z.object({
  id: import_zod6.z.string().uuid()
});

// src/shared/http/controllers/get-invoice-by-id-controller.ts
var getInvoiceByIdController = async (request, reply) => {
  const getInvoiceParams = invoiceIdSchema.parse(request.params);
  const repo = new PrismaInvoicesRepository();
  const useCase = new GetInvoiceByIdUseCase(repo);
  const { invoice } = await useCase.execute({
    id: getInvoiceParams.id
  });
  return reply.status(201).send({ invoice });
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
var import_zod7 = require("zod");
var billedItemSchema2 = import_zod7.z.object({
  item_name: import_zod7.z.string(),
  unit: import_zod7.z.string(),
  quantity: import_zod7.z.number(),
  unit_price: import_zod7.z.number(),
  amount: import_zod7.z.number(),
  unit_rate: import_zod7.z.number()
});
var consumptionHistorySchema2 = import_zod7.z.object({
  month_year: import_zod7.z.string(),
  consumption_kwh: import_zod7.z.number(),
  average_kwh_per_day: import_zod7.z.number(),
  days: import_zod7.z.number()
});
var uploadFileSchema = import_zod7.z.array(
  import_zod7.z.object({
    file_name: import_zod7.z.string(),
    client_number: import_zod7.z.string(),
    reference_month: import_zod7.z.string(),
    due_date: import_zod7.z.string().transform((date) => new Date(date)),
    installation_number: import_zod7.z.string(),
    amount_due: import_zod7.z.preprocess((val) => parseFloat(val), import_zod7.z.number()),
    billed_items: import_zod7.z.array(billedItemSchema2),
    consumption_history: import_zod7.z.array(consumptionHistorySchema2)
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

// src/shared/http/routes/_invoices-route.ts
async function invoicesRoutes(app) {
  app.post("/invoices", { onRequest: [authorizeJwt] }, createInvoiceController);
  app.post(
    "/invoices/upload",
    { onRequest: [authorizeJwt] },
    uploadPdfInvoicesController
  );
  app.get("/invoices/:id", getInvoiceByIdController);
  app.get("/invoices", FindAllInvoiceController);
}

// src/shared/http/routes/index.ts
var appRoutes = async (app) => {
  app.register(clientsRoutes, { prefix: "/api" });
  app.register(invoicesRoutes, { prefix: "/api" });
};

// src/shared/http/app.ts
var import_multipart = __toESM(require("@fastify/multipart"), 1);
var fastifyApp = (0, import_fastify.default)();
fastifyApp.register(import_cors.default, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
});
fastifyApp.register(import_multipart.default);
fastifyApp.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "24h"
    // 1 day
  }
});
appRoutes(fastifyApp);
errosHandlers(fastifyApp);

// src/shared/http/server.ts
fastifyApp.listen({ host: "0.0.0.0", port: env.PORT }).then(() => {
  console.log(`#######################################
# \u{1F4BB} Server listening on port ${env.PORT} \u{1F4BB} #
#######################################`);
});
