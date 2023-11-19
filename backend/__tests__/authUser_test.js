const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { authUser } = require("../services/basicAuth"); // Replace with the correct path to your auth file

const app = express();
app.use(express.json());

// Mock middleware that uses authUser
app.get("/api/protected", authUser, (req, res) => {
  res.json({ message: "Protected route accessed successfully." });
});

describe("authUser Middleware", () => {
  it("should allow access with a valid token", async () => {
    // Create a valid token for testing
    const token = jwt.sign(
      {
        /* your payload here */
      },
      "secretkey",
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .get("/api/protected")
      .set("token", token);

    // Expect a 200 OK response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Protected route accessed successfully.",
    });
  });

  it("should return 401 unauthorized with an invalid token", async () => {
    // Create an invalid token (e.g., an expired token)
    const invalidToken = jwt.sign(
      {
        /* your payload here */
      },
      "wrongsecretkey",
      { expiresIn: "-1h" }
    );

    const response = await request(app)
      .get("/api/protected")
      .set("token", invalidToken);

    // Expect a 401 unauthorized response
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ title: "unauthorized" });
  });

  it("should return 401 unauthorized without a token", async () => {
    const response = await request(app).get("/api/protected");

    // Expect a 401 unauthorized response
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ title: "unauthorized" });
  });
});
