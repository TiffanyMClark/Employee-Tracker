const db = require("../db"); // PostgreSQL client connection

const seedData = async () => {
  await db.query("INSERT INTO departments (name) VALUES ($1)", ["Sales"]);
  await db.query("INSERT INTO departments (name) VALUES ($1)", ["Legal"]);

  await db.query(
    "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
    ["Sales Manager", 75000, 1]
  );
  await db.query(
    "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
    ["Legal", 90000, 2]
  );

  await db.query(
    "INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)",
    ["John", "Doe", 1]
  );
  await db.query(
    "INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)",
    ["Jane", "Smith", 2]
  );

  console.log("Database seeded!");
};

seedData().catch((err) => console.error("Error seeding database:", err));
