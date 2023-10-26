const request = require("supertest");
const app = require("../index"); // Adjust the relative path as needed
const jwt = require("jsonwebtoken");

describe("POST /api/login", () => {
  it("returns 401 for an unknown user", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "unknownUser", password: "password" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      title: "User not found.",
      message: "Invalid credentials.",
    });
  });

  it("returns 200 for a valid login", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "asd", password: "asd" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("isProfileComplete");
  });

  it("returns 404 for a valid token with an unknown user ID", async () => {
    // Create a valid token with a non-existent user ID
    const token = jwt.sign({ userId: 777 }, "secretkey");

    const response = await request(app)
      .get("/api/users/id")
      .set("token", token);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });

  it("returns 200 for a valid token with an unknown user ID", async () => {
    // Create a valid token with a non-existent user ID
    const token = jwt.sign(
      { userId: "874d15e0-6bb6-11ee-87d1-472fcbd17fc7" },
      "secretkey"
    );

    const response = await request(app)
      .get("/api/users/id")
      .set("token", token);

    expect(response.status).toBe(200);
  });

  it("creates a new user and returns a 201 status for valid input", async () => {
    const newUser = {
      username: "newUser",
      password: "password123",
      email: "newuser@example.com",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User added successfully." });

    // You can add additional assertions to check the user creation logic here.
  });

  it("returns a 400 status for an existing username", async () => {
    // Add a user with an existing username to the 'users' array for testing
    const existingUser = {
      username: "asd",
      password: "asd",
      email: "nonov.dragomir@gmail.com",
    };

    const response = await request(app).post("/api/users").send(existingUser);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      title: "Existing Email",
      message: "User already exists.",
    });
  });
});
