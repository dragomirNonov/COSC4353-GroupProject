const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");
const users = require("../data/usersData");
let { user, profile } = require("../models/userSchemas");

describe("GET api/profile", () => {
  beforeEach(async () => {
    // Create a fake user.
    const fakeUser = new user({
      _id: 123,
      username: "tester",
      email: "tester@mail.com",
      password: "$2b$10$0ho6JpXfypLJH6rBavUQu.8mNUsFlycs12qIZbUjeWeWFR.RBG8nu",
      profileComplete: true,
    });

    await fakeUser.save();

    // Create a fake profile associated with the fake user.
    const fakeProfile = new profile({
      _id: 123,
      firstName: "Test",
      lastName: "Account",
      address1: "123 Test St",
      address2: "Apt 1",
      city: "Test",
      state: "CA",
      zipCode: "11111",
    });

    await fakeProfile.save();
  });

  /* * * * * * * * * * *
   *     GET PROFILE    *
   * * * * * * * * * * */

  it("GET /api/profile should return user profile", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");
    const response = await request(app).get("/api/profile").set("token", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Profile get success");
  });

  it("GET /api/profile should return 404 with unknown user ID", async () => {
    // Create a valid token for non-existent user
    const token = jwt.sign({ userId: 345 }, "secretkey");
    const response = await request(app).get("/api/profile").set("token", token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("GET /api/profile should return 500 with bad token", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey", {
      expiresIn: "1ms",
    });

    const response = await request(app).get("/api/profile").set("token", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error");
  });

  it("GET /api/profile should return 404 with incomplete profile", async () => {
    const fakeUser2 = new user({
      _id: 345,
      username: "tester2",
      email: "tester2@mail.com",
      password: "$2b$10$0ho6JpXfypLJH6rBavUQu.8mNUsFlycs12qIZbUjeWeWFR.RBG8nu",
      profileComplete: false,
    });
    await fakeUser2.save();

    // Create a valid token for new user
    const token = jwt.sign({ userId: 345 }, "secretkey");
    const response = await request(app).get("/api/profile").set("token", token);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User has not created profile");

    await user.deleteOne({ _id: 345 });
  });

  /* * * * * * * * * * *
   *   UPDATE PROFILE   *
   * * * * * * * * * * */

  it("PUT /api/users/updateProfile should update user profile", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "newUserFirst",
      lastName: "newUserLast",
      address1: "111 newMain St",
      address2: "newApt 111",
      city: "newOnetown",
      state: "CA",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Profile updated successfully");
  });

  it("PUT /api/users/updateProfile should return 404 with unknown user ID", async () => {
    // Create a valid token for non-existent user
    const token = jwt.sign({ userId: 345 }, "secretkey");

    const userUpdateData = {
      firstName: "newUser",
      lastName: "newUser",
      address1: "111 newMain St",
      address2: "",
      city: "newOnetown",
      state: "CA",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("PUT /api/users/updateProfile should return 500 with bad token", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey", {
      expiresIn: "1ms",
    });

    const response = await request(app).get("/api/profile").set("token", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error");
  });

  it("PUT /api/users/updateProfile should return 401 with bad first name input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "???",
      lastName: "newUser",
      address1: "111 NewMain St",
      address2: "",
      city: "NewOnetown",
      state: "CA",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid first name input.");
  });

  it("PUT /api/users/updateProfile should return 401 with bad address1 input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "newUser",
      lastName: "newUser",
      address1: "Bad Address",
      address2: "",
      city: "NewOnetown",
      state: "CA",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid address 1 input.");
  });

  it("PUT /api/users/updateProfile should return 401 with bad address2 input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "newUser",
      lastName: "newUser",
      address1: "111 NewMain St",
      address2: "? No apt",
      city: "NewOnetown",
      state: "CA",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid address 2 input.");
  });

  it("PUT /api/users/updateProfile should return 401 with bad city input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "newUser",
      lastName: "newUser",
      address1: "111 NewMain St",
      address2: "",
      city: "",
      state: "CA",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid city input.");
  });

  it("PUT /api/users/updateProfile should return 400 with bad state input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "newUser",
      lastName: "newUser",
      address1: "111 NewMain St",
      address2: "",
      city: "NewOnetown",
      state: "ZZ",
      zipCode: "11111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Error updating profile: invalid input."
    );
  });

  it("PUT /api/users/updateProfile should return 401 with bad zipCode input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const userUpdateData = {
      firstName: "newUser",
      lastName: "newUser",
      address1: "111 NewMain St",
      address2: "",
      city: "NewOnetown",
      state: "CA",
      zipCode: "1111",
    };

    const response = await request(app)
      .put("/api/users/updateProfile")
      .set("token", token)
      .send(userUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid zip code input.");
  });

  /* * * * * * * * * * *
   *   UPDATE ACCOUNT   *
   * * * * * * * * * * */

  it("PUT /api/users/updateAccount should update user account", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const accountUpdateData = {
      email: "newuser1@mail.com",
      password: "newPass1",
    };

    const response = await request(app)
      .put("/api/users/updateAccount")
      .set("token", token)
      .send(accountUpdateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Account updated successfully. ");
  });

  it("PUT /api/users/updateAccount should return 404 with unknown user ID", async () => {
    // Create a valid token for non-existent user
    const token = jwt.sign({ userId: 345 }, "secretkey");

    const accountUpdateData = {
      email: "newuser1@mail.com",
      password: "newPass1",
    };

    const response = await request(app)
      .put("/api/users/updateAccount")
      .set("token", token)
      .send(accountUpdateData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("PUT /api/users/updateAccount should return 500 with bad token", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey", {
      expiresIn: "1ms",
    });

    const response = await request(app).get("/api/profile").set("token", token);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error");
  });

  it("PUT /api/users/updateAccount should return 400 with no email or password input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const accountUpdateData = {
      email: "",
      password: "",
    };

    const response = await request(app)
      .put("/api/users/updateAccount")
      .set("token", token)
      .send(accountUpdateData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Please enter a new email or password to update your account. "
    );
  });

  it("PUT /api/users/updateAccount should return 401 with bad email input", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const accountUpdateData = {
      email: "oogabooga",
      password: "",
    };

    const response = await request(app)
      .put("/api/users/updateAccount")
      .set("token", token)
      .send(accountUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email input.");
  });

  it("PUT /api/users/updateAccount should return 401 with same email as current email", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");
    const currentEmail = "tester@mail.com";

    const accountUpdateData = {
      email: currentEmail,
      password: "",
    };

    const response = await request(app)
      .put("/api/users/updateAccount")
      .set("token", token)
      .send(accountUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "New email cannot be the same as old email."
    );
  });

  it("PUT /api/users/updateAccount should return 401 with same password as current password", async () => {
    // Create a valid token for existing user
    const token = jwt.sign({ userId: 123 }, "secretkey");

    const accountUpdateData = {
      email: "",
      password: "123",
    };

    const response = await request(app)
      .put("/api/users/updateAccount")
      .set("token", token)
      .send(accountUpdateData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "New password cannot be the same as old password."
    );
  });

  afterEach(async () => {
    // Delete the mock user and profile data
    await user.deleteOne({ _id: 123 });
    await profile.deleteOne({ _id: 123 });
  });
});
