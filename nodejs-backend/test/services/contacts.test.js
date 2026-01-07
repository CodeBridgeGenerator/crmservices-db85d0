const assert = require("assert");
const app = require("../../src/app");

describe("contacts service", () => {
  let thisService;
  let contactCreated;

  beforeEach(async () => {
    thisService = await app.service("contacts");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (contacts)");
  });

  describe("#create", () => {
    const options = {"accountId":"aasdfasdfasdfadsfadfa","firstName":"new value","lastName":"new value","jobTitle":"new value","email":"new value","phone":"new value","status":["new value"],"notes":"new value"};

    beforeEach(async () => {
      contactCreated = await thisService.create(options);
    });

    it("should create a new contact", () => {
      assert.strictEqual(contactCreated.accountId, options.accountId);
assert.strictEqual(contactCreated.firstName, options.firstName);
assert.strictEqual(contactCreated.lastName, options.lastName);
assert.strictEqual(contactCreated.jobTitle, options.jobTitle);
assert.strictEqual(contactCreated.email, options.email);
assert.strictEqual(contactCreated.phone, options.phone);
assert.strictEqual(contactCreated.status, options.status);
assert.strictEqual(contactCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a contact by ID", async () => {
      const retrieved = await thisService.get(contactCreated._id);
      assert.strictEqual(retrieved._id, contactCreated._id);
    });
  });

  describe("#update", () => {
    let contactUpdated;
    const options = {"accountId":"345345345345345345345","firstName":"updated value","lastName":"updated value","jobTitle":"updated value","email":"updated value","phone":"updated value","status":["updated value"],"notes":"updated value"};

    beforeEach(async () => {
      contactUpdated = await thisService.update(contactCreated._id, options);
    });

    it("should update an existing contact ", async () => {
      assert.strictEqual(contactUpdated.accountId, options.accountId);
assert.strictEqual(contactUpdated.firstName, options.firstName);
assert.strictEqual(contactUpdated.lastName, options.lastName);
assert.strictEqual(contactUpdated.jobTitle, options.jobTitle);
assert.strictEqual(contactUpdated.email, options.email);
assert.strictEqual(contactUpdated.phone, options.phone);
assert.strictEqual(contactUpdated.status, options.status);
assert.strictEqual(contactUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
  let contactDeleted;
    beforeEach(async () => {
      contactDeleted = await thisService.remove(contactCreated._id);
    });

    it("should delete a contact", async () => {
      assert.strictEqual(contactDeleted._id, contactCreated._id);
    });
  });
});