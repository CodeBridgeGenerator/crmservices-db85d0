const assert = require("assert");
const app = require("../../src/app");

describe("opportunities service", () => {
  let thisService;
  let opportunityCreated;

  beforeEach(async () => {
    thisService = await app.service("opportunities");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (opportunities)");
  });

  describe("#create", () => {
    const options = {"accountId":"aasdfasdfasdfadsfadfa","primaryContactId":"aasdfasdfasdfadsfadfa","name":"new value","stage":["new value"],"probability":23,"amount":23,"expectedCloseDate":1767760404613,"leadSource":"new value","description":"new value","closedDate":1767760404613};

    beforeEach(async () => {
      opportunityCreated = await thisService.create(options);
    });

    it("should create a new opportunity", () => {
      assert.strictEqual(opportunityCreated.accountId, options.accountId);
assert.strictEqual(opportunityCreated.primaryContactId, options.primaryContactId);
assert.strictEqual(opportunityCreated.name, options.name);
assert.strictEqual(opportunityCreated.stage, options.stage);
assert.strictEqual(opportunityCreated.probability, options.probability);
assert.strictEqual(opportunityCreated.amount, options.amount);
assert.strictEqual(opportunityCreated.expectedCloseDate, options.expectedCloseDate);
assert.strictEqual(opportunityCreated.leadSource, options.leadSource);
assert.strictEqual(opportunityCreated.description, options.description);
assert.strictEqual(opportunityCreated.closedDate, options.closedDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a opportunity by ID", async () => {
      const retrieved = await thisService.get(opportunityCreated._id);
      assert.strictEqual(retrieved._id, opportunityCreated._id);
    });
  });

  describe("#update", () => {
    let opportunityUpdated;
    const options = {"accountId":"345345345345345345345","primaryContactId":"345345345345345345345","name":"updated value","stage":["updated value"],"probability":100,"amount":100,"expectedCloseDate":null,"leadSource":"updated value","description":"updated value","closedDate":null};

    beforeEach(async () => {
      opportunityUpdated = await thisService.update(opportunityCreated._id, options);
    });

    it("should update an existing opportunity ", async () => {
      assert.strictEqual(opportunityUpdated.accountId, options.accountId);
assert.strictEqual(opportunityUpdated.primaryContactId, options.primaryContactId);
assert.strictEqual(opportunityUpdated.name, options.name);
assert.strictEqual(opportunityUpdated.stage, options.stage);
assert.strictEqual(opportunityUpdated.probability, options.probability);
assert.strictEqual(opportunityUpdated.amount, options.amount);
assert.strictEqual(opportunityUpdated.expectedCloseDate, options.expectedCloseDate);
assert.strictEqual(opportunityUpdated.leadSource, options.leadSource);
assert.strictEqual(opportunityUpdated.description, options.description);
assert.strictEqual(opportunityUpdated.closedDate, options.closedDate);
    });
  });

  describe("#delete", () => {
  let opportunityDeleted;
    beforeEach(async () => {
      opportunityDeleted = await thisService.remove(opportunityCreated._id);
    });

    it("should delete a opportunity", async () => {
      assert.strictEqual(opportunityDeleted._id, opportunityCreated._id);
    });
  });
});