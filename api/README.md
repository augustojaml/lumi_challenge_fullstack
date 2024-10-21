# Documentação do Modelo Prisma

## Visão Geral

Este modelo Prisma define quatro entidades principais: `Client` (Cliente), `Invoice` (Fatura), `BilledItem` (Item Faturado) e `ConsumptionHistory` (Histórico de Consumo). Ele é projetado para armazenar dados de faturas emitidas para clientes, incluindo detalhes sobre os itens faturados e o histórico de consumo. Cada `Invoice` está associada a um `Client` e pode ter múltiplos `BilledItems` e registros de `ConsumptionHistory`.

## Modelos

### 1. **Client (Cliente)**

O modelo `Client` representa um cliente que recebe faturas. Inclui detalhes pessoais e informações de endereço. Cada cliente pode ter várias faturas.

- **Campos:**
  - `id` (String): Identificador único para cada cliente, gerado automaticamente como um UUID.
  - `fullName` (String): Nome completo do cliente.
  - `street` (String): Rua do endereço do cliente.
  - `number` (String): Número do endereço.
  - `complement` (String?): Complemento do endereço (opcional).
  - `neighborhood` (String): Bairro.
  - `zipCode` (String): Código postal (CEP).
  - `city` (String): Cidade.
  - `state` (String): Estado.
  - `taxId` (String): CPF ou CNPJ do cliente.
  - `stateRegistration` (String?): Inscrição estadual (opcional).
  - `invoices` (Invoice[]): Lista de faturas associadas ao cliente.

### 2. **Invoice (Fatura)**

O modelo `Invoice` representa uma fatura emitida para um cliente, contendo informações sobre valores faturados e histórico de consumo.

- **Campos:**
  - `id` (String): Identificador único para cada fatura, gerado automaticamente como um UUID.
  - `fileName` (String): Nome do arquivo PDF associado à fatura.
  - `clientId` (String): Referência ao cliente que recebeu a fatura.
  - `client` (Client): Relacionamento com o cliente.
  - `clientNumber` (String): Número de identificação do cliente.
  - `referenceMonth` (String): Mês de referência da fatura.
  - `dueDate` (DateTime): Data de vencimento da fatura.
  - `installationNumber` (String): Número de instalação.
  - `amountDue` (Float): Valor total a ser pago.
  - `billedItems` (BilledItem[]): Lista de itens faturados associados à fatura.
  - `consumptionHistory` (ConsumptionHistory[]): Histórico de consumo associado à fatura.

### 3. **BilledItem (Item Faturado)**

O modelo `BilledItem` representa os itens que compõem os valores de uma fatura, como consumo de energia e taxas adicionais.

- **Campos:**
  - `id` (String): Identificador único para cada item faturado, gerado automaticamente como um UUID.
  - `invoiceId` (String): Referência à fatura associada.
  - `itemName` (String): Nome do item faturado.
  - `unit` (String?): Unidade de medida do item (opcional).
  - `quantity` (Float?): Quantidade consumida (opcional).
  - `unitPrice` (Float?): Preço unitário do item (opcional).
  - `amount` (Float): Valor total do item.
  - `unitRate` (Float?): Tarifa unitária aplicada (opcional).
  - `invoice` (Invoice): Relacionamento com a fatura.

### 4. **ConsumptionHistory (Histórico de Consumo)**

O modelo `ConsumptionHistory` armazena o histórico de consumo de energia, mês a mês, de uma instalação específica.

- **Campos:**
  - `id` (String): Identificador único para cada registro de histórico de consumo, gerado automaticamente como um UUID.
  - `invoiceId` (String): Referência à fatura associada.
  - `monthYear` (String): Mês e ano do consumo.
  - `consumptionKWh` (Float): Consumo de energia em kWh.
  - `averageKWhPerDay` (Float): Média de consumo diário em kWh.
  - `days` (Int): Número de dias considerado para o cálculo do consumo.
  - `invoice` (Invoice): Relacionamento com a fatura.

## Relacionamentos

- Cada `Client` pode ter múltiplas `Invoices`, criando um relacionamento um-para-muitos.
- Cada `Invoice` está associada a um `Client`, criando um relacionamento muitos-para-um.
- Cada `Invoice` pode ter múltiplos `BilledItems` e `ConsumptionHistory`, criando um relacionamento um-para-muitos com cada um desses modelos.

---


{
  "client": {
    "id": "54dc6ee3-1baa-4521-88a9-4373eb3c49f8",
    "client_number": 1001,
    "full_name": "Maria da Silva",
    "hash_password": "$2a$06$y5tvWDkOzWSUgIMSVxahROCqnU26cOLEsPAu6aRE3U.gj7uN2kqu.",
    "email": "maria.silva@example.com",
    "role": "USER",
    "street": "Quadra 203",
    "number": "10",
    "complement": "Bloco A",
    "neighborhood": "Águas Claras",
    "zip_code": "71909-000",
    "city": "Águas Claras",
    "state": "DF",
    "tax_id": "123.456.789-00",
    "state_registration": "1234567890",
    "invoices": [
      {
        "id": "75998926-ee1f-4bff-8fcf-2edbaabfc8a4",
        "file_name": "invoice_october_2024.pdf",
        "client_id": "54dc6ee3-1baa-4521-88a9-4373eb3c49f8",
        "client_number": 1001,
        "reference_month": "October 2024",
        "due_date": "2024-10-31T00:00:00.000Z",
        "installation_number": "INST-5678",
        "amount_due": 1500.75,
        "billed_items": [
          {
            "id": "3ba765b5-86f7-4dcc-9020-e499097170ac",
            "invoice_id": "75998926-ee1f-4bff-8fcf-2edbaabfc8a4",
            "item_name": "Electricity Usage",
            "unit": "kWh",
            "quantity": 500,
            "unit_price": 0.15,
            "amount": 75,
            "unit_rate": 0.15
          },
          {
            "id": "f3121c30-62ab-4dcc-a731-1d3f8430bb4b",
            "invoice_id": "75998926-ee1f-4bff-8fcf-2edbaabfc8a4",
            "item_name": "Service Fee",
            "unit": null,
            "quantity": null,
            "unit_price": null,
            "amount": 30,
            "unit_rate": null
          }
        ],
        "consumption_history": [
          {
            "id": "eb6e2ffe-e15d-411f-88c4-04744b705724",
            "invoice_id": "75998926-ee1f-4bff-8fcf-2edbaabfc8a4",
            "month_year": "September 2024",
            "consumption_kwh": 450,
            "average_kwh_per_day": 15,
            "days": 30
          },
          {
            "id": "2eb8e9e1-5a06-4682-a525-0587641e5ce2",
            "invoice_id": "75998926-ee1f-4bff-8fcf-2edbaabfc8a4",
            "month_year": "October 2024",
            "consumption_kwh": 500,
            "average_kwh_per_day": 16.67,
            "days": 30
          }
        ]
      }
    ]
  }
}
