// src/shared/core/fakes/fake-invoices.json
var fake_invoices_default = [
  {
    file_name: "invoice_october_2024.pdf",
    reference_month: "2024-10",
    due_date: "2024-10-30",
    installation_number: "123456789",
    amount_due: 1500.75,
    billed_items: [
      {
        item_name: "Electricity Usage",
        unit: "kWh",
        quantity: 250,
        unit_price: 0.2,
        amount: 50,
        unit_rate: 0.2
      },
      {
        item_name: "Service Fee",
        unit: "month",
        quantity: 1,
        unit_price: 20,
        amount: 20,
        unit_rate: 20
      }
    ],
    consumption_history: [
      {
        month_year: "2024-09",
        consumption_kwh: 300,
        average_kwh_per_day: 10,
        days: 30
      },
      {
        month_year: "2024-08",
        consumption_kwh: 280,
        average_kwh_per_day: 9.33,
        days: 30
      }
    ]
  },
  {
    file_name: "invoice_november_2024.pdf",
    reference_month: "2024-11",
    due_date: "2024-11-30",
    installation_number: "987654321",
    amount_due: 1600.5,
    billed_items: [
      {
        item_name: "Electricity Usage",
        unit: "kWh",
        quantity: 300,
        unit_price: 0.18,
        amount: 54,
        unit_rate: 0.18
      },
      {
        item_name: "Service Fee",
        unit: "month",
        quantity: 1,
        unit_price: 20,
        amount: 20,
        unit_rate: 20
      }
    ],
    consumption_history: [
      {
        month_year: "2024-10",
        consumption_kwh: 350,
        average_kwh_per_day: 11.67,
        days: 30
      },
      {
        month_year: "2024-09",
        consumption_kwh: 320,
        average_kwh_per_day: 10.67,
        days: 30
      }
    ]
  },
  {
    file_name: "invoice_december_2024.pdf",
    reference_month: "2024-12",
    due_date: "2024-12-31",
    installation_number: "112233445",
    amount_due: 1700.25,
    billed_items: [
      {
        item_name: "Electricity Usage",
        unit: "kWh",
        quantity: 350,
        unit_price: 0.19,
        amount: 66.5,
        unit_rate: 0.19
      },
      {
        item_name: "Service Fee",
        unit: "month",
        quantity: 1,
        unit_price: 20,
        amount: 20,
        unit_rate: 20
      }
    ],
    consumption_history: [
      {
        month_year: "2024-11",
        consumption_kwh: 370,
        average_kwh_per_day: 12.33,
        days: 30
      },
      {
        month_year: "2024-10",
        consumption_kwh: 340,
        average_kwh_per_day: 11.33,
        days: 30
      }
    ]
  },
  {
    file_name: "invoice_january_2025.pdf",
    reference_month: "2025-01",
    due_date: "2025-01-31",
    installation_number: "556677889",
    amount_due: 1800,
    billed_items: [
      {
        item_name: "Electricity Usage",
        unit: "kWh",
        quantity: 400,
        unit_price: 0.22,
        amount: 88,
        unit_rate: 0.22
      },
      {
        item_name: "Service Fee",
        unit: "month",
        quantity: 1,
        unit_price: 20,
        amount: 20,
        unit_rate: 20
      }
    ],
    consumption_history: [
      {
        month_year: "2024-12",
        consumption_kwh: 400,
        average_kwh_per_day: 13.33,
        days: 30
      },
      {
        month_year: "2024-11",
        consumption_kwh: 390,
        average_kwh_per_day: 13,
        days: 30
      }
    ]
  },
  {
    file_name: "invoice_february_2025.pdf",
    reference_month: "2025-02",
    due_date: "2025-02-28",
    installation_number: "667788990",
    amount_due: 1900.5,
    billed_items: [
      {
        item_name: "Electricity Usage",
        unit: "kWh",
        quantity: 450,
        unit_price: 0.21,
        amount: 94.5,
        unit_rate: 0.21
      },
      {
        item_name: "Service Fee",
        unit: "month",
        quantity: 1,
        unit_price: 20,
        amount: 20,
        unit_rate: 20
      }
    ],
    consumption_history: [
      {
        month_year: "2025-01",
        consumption_kwh: 420,
        average_kwh_per_day: 14,
        days: 30
      },
      {
        month_year: "2024-12",
        consumption_kwh: 410,
        average_kwh_per_day: 13.67,
        days: 30
      }
    ]
  }
];
