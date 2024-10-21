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

// src/shared/http/controllers/create-invoice-controller.ts
var create_invoice_controller_exports = {};
__export(create_invoice_controller_exports, {
  createInvoiceController: () => createInvoiceController
});
module.exports = __toCommonJS(create_invoice_controller_exports);

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

// src/shared/core/errors/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/core/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends AppError {
  constructor() {
    super("Resource not found", 404);
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
var createInvoiceSchema = import_zod2.z.object({
  file_name: import_zod2.z.string(),
  reference_month: import_zod2.z.string(),
  due_date: import_zod2.z.string().transform((date) => new Date(date)),
  installation_number: import_zod2.z.string(),
  amount_due: import_zod2.z.number(),
  billed_items: import_zod2.z.array(billedItemSchema),
  consumption_history: import_zod2.z.array(consumptionHistorySchema)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createInvoiceController
});
