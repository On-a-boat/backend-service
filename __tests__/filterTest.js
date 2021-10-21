const request = require("supertest");
const express = require("express");

const app = express();

describe("Test Filtering Users", function () {
  it("Working Scenario", function (done) {
    request(app).get("/filter").send().expect(200);
  });
});
