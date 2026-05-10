const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {

  const email =
    `test${Date.now()}@gmail.com`;

  it("should register user", async () => {

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "test",
        email,
        password: "123456"
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.email)
      .toBe(email);

  });

  it("should login user", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "123456"
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.token)
      .toBeDefined();

  });

});