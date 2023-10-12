const request = require("supertest");
const app = require("../index"); // Adjust the relative path as needed
const jwt = require("jsonwebtoken");
const users = require("../data/usersData");

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

  it("returns 404 for a valid token with an unknown user ID", async () => {
    // Create a valid token with a non-existent user ID
    const token = jwt.sign({ userId: 777 }, "secretkey");

    const response = await request(app)
      .get("/api/users/id")
      .set("token", token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });

  it("returns 200 for a valid token with an unknown user ID", async () => {
    // Create a valid token with a non-existent user ID
    const token = jwt.sign({ userId: 300 }, "secretkey");

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

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User added successfully" });

    // You can add additional assertions to check the user creation logic here.
  });

  it("returns a 400 status for an existing username", async () => {
    // Add a user with an existing username to the 'users' array for testing
    const existingUser = {
      username: "existingUser",
      password: "existingPassword",
      email: "existinguser@example.com",
    };
    users.push(existingUser);

    const newUserWithDuplicateUsername = {
      username: "existingUser",
      password: "newPassword",
      email: "newuser@example.com",
    };

    const response = await request(app)
      .post("/api/users")
      .send(newUserWithDuplicateUsername);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "User already exists" });

    // Remove the test user added to 'users' array to keep the data clean
    users.pop();
  });
});
