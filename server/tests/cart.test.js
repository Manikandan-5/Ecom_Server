const request = require("supertest");
const app = require("../server");

describe("Cart API", () => {

  let token;
  let productId;

  beforeAll(async () => {

    // register user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "test",
        email: "test@gmail.com",
        password: "123456"
      });

    // login user
    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      });

    console.log(login.body);

    token = login.body.token;

    // get products
    const product = await request(app)
      .get("/api/products");

    console.log(product.body);

    productId =
      product.body.docs?.[0]?._id
      || product.body[0]?._id;

  });

  it("should add to cart", async () => {

    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        quantity: 1
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

  it("should get cart", async () => {

    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

});