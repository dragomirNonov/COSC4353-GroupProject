const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchemas").user;

describe("POST /api/login", () => {
  afterAll(async () => {
    // Close or clean up resources if server is defined
    if (app && app.close) {
      await app.close();
    }
    // No need for 'else' since 'await' will ensure it finishes before moving on
  });
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

  it("returns 401 for an unknown user", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "asd", password: "password" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      title: "Login Failed.",
      message: "Invalid Password.",
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

  it("returns 500 for a server error", async () => {
    // Mocking the findOne method to throw an error
    jest.spyOn(userModel, "findOne").mockImplementation(() => {
      throw new Error("Simulated server error");
    });

    const response = await request(app)
      .post("/api/login")
      .send({ username: "existingUser", password: "password" });

    // Expecting a 500 status code and the error response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      title: "server error",
      error: "Simulated server error",
    });

    // Restoring the original implementation of findOne after the test
    jest.spyOn(userModel, "findOne").mockRestore();
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

  it("should handle server error", async () => {
    // Mocking findOne to simulate a server error
    jest.spyOn(userModel, "findOne").mockImplementation(() => {
      throw new Error("Simulated server error");
    });

    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    };

    const response = await request(app).post("/api/users").send(userData);

    // Expect a 500 server error response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      title: "server error",
      error: "Simulated server error",
    });

    // Restore the original implementation of findOne
    userModel.findOne.mockRestore();
  });

  // it("should register a new user", async () => {
  //   // Mocking findOne to simulate that the user does not exist
  //   jest.spyOn(userModel, "findOne").mockResolvedValue(null);

  //   // Mocking the save method to simulate a successful user creation
  //   jest.spyOn(userModel.prototype, "save").mockResolvedValue({
  //     _id: "someuserid",
  //     username: "testuser",
  //     email: "test@example.com",
  //     password: "hashedpassword",
  //     profileComplete: false,
  //   });

  //   const userData = {
  //     username: "testuser",
  //     email: "test@example.com",
  //     password: "testpassword",
  //   };

  //   const response = await request(app).post("/api/users").send(userData);

  //   // Expect a 200 OK response
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({ message: "User added successfully." });

  //   // Restore the original implementations
  //   userModel.findOne.mockRestore();
  //   userModel.prototype.save.mockRestore();
  // });
});
