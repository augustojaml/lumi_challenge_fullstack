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

// src/shared/http/controllers/create-client-controller.ts
var create_client_controller_exports = {};
__export(create_client_controller_exports, {
  createClientController: () => createClientController
});
module.exports = __toCommonJS(create_client_controller_exports);

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

// src/shared/core/errors/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/core/errors/client-already-exists-error.ts
var ClientAlreadyExistsError = class extends AppError {
  constructor() {
    super("Client already exists", 409);
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
var import_zod2 = require("zod");
var createClientSchema = import_zod2.z.object({
  client_number: import_zod2.z.string(),
  full_name: import_zod2.z.string(),
  hash_password: import_zod2.z.string().min(6, { message: "Password must be at least 6 characters long" }).max(8, { message: "Password must be at most 8 characters long" }),
  email: import_zod2.z.string().email(),
  role: import_zod2.z.enum(["USER", "ADMIN"]),
  street: import_zod2.z.string(),
  number: import_zod2.z.string(),
  complement: import_zod2.z.string().optional(),
  neighborhood: import_zod2.z.string(),
  zip_code: import_zod2.z.string().regex(/^\d{5}-\d{3}$/),
  city: import_zod2.z.string(),
  state: import_zod2.z.string().length(2),
  tax_id: import_zod2.z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
  state_registration: import_zod2.z.string(),
  invoices: import_zod2.z.array(import_zod2.z.any()).optional().nullable()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createClientController
});
