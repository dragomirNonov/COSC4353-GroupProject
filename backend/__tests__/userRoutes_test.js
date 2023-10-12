const request = require("supertest");
const app = require("../index"); // Adjust the relative path as needed

describe("POST /api/login", () => {
  it("returns 401 for an unknown user", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "unknownUser", password: "password" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "User not found" });
  });

  it("returns 200 for a valid login", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "asd", password: "asd" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("isProfileComplate");
  });

  // Add more test cases for edge cases and error conditions
});
