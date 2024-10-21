-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "client_number" TEXT,
    "full_name" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "tax_id" TEXT NOT NULL,
    "state_registration" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "client_number" INTEGER NOT NULL,
    "reference_month" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "installation_number" INTEGER NOT NULL,
    "amount_due" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billed_items" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "unit" TEXT,
    "quantity" DOUBLE PRECISION,
    "unit_price" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit_rate" DOUBLE PRECISION,

    CONSTRAINT "billed_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consumption_history" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "month_year" TEXT NOT NULL,
    "consumption_kwh" DOUBLE PRECISION NOT NULL,
    "average_kwh_per_day" DOUBLE PRECISION NOT NULL,
    "days" INTEGER NOT NULL,

    CONSTRAINT "consumption_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_client_number_key" ON "clients"("client_number");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billed_items" ADD CONSTRAINT "billed_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumption_history" ADD CONSTRAINT "consumption_history_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
