const request = require("supertest");
const app = require("../server");

describe("Product API", () => {

  let token;
  let productId;

beforeAll(async () => {
  // register admin
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "admin",
      email: "admin@gmail.com",
      password: "123456"
    });

  // manually update role in DB (important)
  const User = require("../models/User");
  await User.updateOne(
    { email: "admin@gmail.com" },
    { role: "admin" }
  );

  // login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@gmail.com",
      password: "123456"
    });

  token = res.body.token;
});

 it("should create product", async () => {
  const res = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      category: "For Men",
      brand: "Louis Vuitton",
      name: "A-Line Shirt",
      description: "Cotton Fabric",
      price: 500,
      sale: 30,
      sizes: ["SM", "LG"],
      reviews: 3,
      stock: 20,
      image: "https://example.com/shirt.png"
    });

  expect(res.statusCode).toBe(200);

  expect(res.body.name)
    .toBe("A-Line Shirt");

  productId = res.body._id;
});
  it("should get products", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

 it("should update product", async () => {

  const res = await request(app)
    .put(`/api/products/${productId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      price: 600
    });

  console.log(res.body);

  expect(res.statusCode).toBe(200);

  expect(res.body.price).toBe(600);

});

  it("should delete product", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});