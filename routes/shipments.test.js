"use strict";

const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");



describe("POST /", function () {
  test("valid", async function () {

    shipItApi.shipProduct.mockReturnValue(5001)

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 5001 });

  });

  test("invalid", async function () {

    shipItApi.shipProduct.mockReturnValue("10001")

    const resp = await request(app).post("/shipments").send({
      productId: "1001",
      name: 123,
      addr: 503,
      zip: 342904,
    });

    expect(resp.status).toEqual(400);

    expect(resp.body.error).toBeTruthy();
    
  });
});
