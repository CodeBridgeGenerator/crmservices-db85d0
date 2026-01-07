const assert = require("assert");
const app = require("../../src/app");

describe("negotiations service", () => {
  let thisService;
  let negotiationCreated;

  beforeEach(async () => {
    thisService = await app.service("negotiations");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (negotiations)");
  });

  describe("#create", () => {
    const options = {"opportunityId":"aasdfasdfasdfadsfadfa","negotiationDate":1767760404629,"status":["new value"],"offeredAmount":23,"counterAmount":23,"notes":"new value"};

    beforeEach(async () => {
      negotiationCreated = await thisService.create(options);
    });

    it("should create a new negotiation", () => {
      assert.strictEqual(negotiationCreated.opportunityId, options.opportunityId);
assert.strictEqual(negotiationCreated.negotiationDate, options.negotiationDate);
assert.strictEqual(negotiationCreated.status, options.status);
assert.strictEqual(negotiationCreated.offeredAmount, options.offeredAmount);
assert.strictEqual(negotiationCreated.counterAmount, options.counterAmount);
assert.strictEqual(negotiationCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a negotiation by ID", async () => {
      const retrieved = await thisService.get(negotiationCreated._id);
      assert.strictEqual(retrieved._id, negotiationCreated._id);
    });
  });

  describe("#update", () => {
    let negotiationUpdated;
    const options = {"opportunityId":"345345345345345345345","negotiationDate":null,"status":["updated value"],"offeredAmount":100,"counterAmount":100,"notes":"updated value"};

    beforeEach(async () => {
      negotiationUpdated = await thisService.update(negotiationCreated._id, options);
    });

    it("should update an existing negotiation ", async () => {
      assert.strictEqual(negotiationUpdated.opportunityId, options.opportunityId);
assert.strictEqual(negotiationUpdated.negotiationDate, options.negotiationDate);
assert.strictEqual(negotiationUpdated.status, options.status);
assert.strictEqual(negotiationUpdated.offeredAmount, options.offeredAmount);
assert.strictEqual(negotiationUpdated.counterAmount, options.counterAmount);
assert.strictEqual(negotiationUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
  let negotiationDeleted;
    beforeEach(async () => {
      negotiationDeleted = await thisService.remove(negotiationCreated._id);
    });

    it("should delete a negotiation", async () => {
      assert.strictEqual(negotiationDeleted._id, negotiationCreated._id);
    });
  });
});