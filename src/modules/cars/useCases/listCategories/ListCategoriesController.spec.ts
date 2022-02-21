import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license )
     values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("shoul be able to list  all categories", async () => {
    const {
      body: { token },
    } = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const res = await request(app).get("/categories");

    expect(res.body.length).toBe(1);
    expect(res.status).toBe(200);
  });
});
