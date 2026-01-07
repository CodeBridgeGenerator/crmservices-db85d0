const assert = require("assert");
const app = require("../../src/app");

describe("accounts service", () => {
  let thisService;
  let accountCreated;

  beforeEach(async () => {
    thisService = await app.service("accounts");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (accounts)");
  });

  describe("#create", () => {
    const options = {"name":"new value","industry":"new value","website":"new value","email":"new value","phone":"new value","address":"new value","status":["new value"],"notes":"new value"};

    beforeEach(async () => {
      accountCreated = await thisService.create(options);
    });

    it("should create a new account", () => {
      assert.strictEqual(accountCreated.name, options.name);
assert.strictEqual(accountCreated.industry, options.industry);
assert.strictEqual(accountCreated.website, options.website);
assert.strictEqual(accountCreated.email, options.email);
assert.strictEqual(accountCreated.phone, options.phone);
assert.strictEqual(accountCreated.address, options.address);
assert.strictEqual(accountCreated.status, options.status);
assert.strictEqual(accountCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a account by ID", async () => {
      const retrieved = await thisService.get(accountCreated._id);
      assert.strictEqual(retrieved._id, accountCreated._id);
    });
  });

  describe("#update", () => {
    let accountUpdated;
    const options = {"name":"updated value","industry":"updated value","website":"updated value","email":"updated value","phone":"updated value","address":"updated value","status":["updated value"],"notes":"updated value"};

    beforeEach(async () => {
      accountUpdated = await thisService.update(accountCreated._id, options);
    });

    it("should update an existing account ", async () => {
      assert.strictEqual(accountUpdated.name, options.name);
assert.strictEqual(accountUpdated.industry, options.industry);
assert.strictEqual(accountUpdated.website, options.website);
assert.strictEqual(accountUpdated.email, options.email);
assert.strictEqual(accountUpdated.phone, options.phone);
assert.strictEqual(accountUpdated.address, options.address);
assert.strictEqual(accountUpdated.status, options.status);
assert.strictEqual(accountUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
  let accountDeleted;
    beforeEach(async () => {
      accountDeleted = await thisService.remove(accountCreated._id);
    });

    it("should delete a account", async () => {
      assert.strictEqual(accountDeleted._id, accountCreated._id);
    });
  });
});