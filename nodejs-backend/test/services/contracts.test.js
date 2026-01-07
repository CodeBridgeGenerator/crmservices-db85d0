const assert = require("assert");
const app = require("../../src/app");

describe("contracts service", () => {
  let thisService;
  let contractCreated;

  beforeEach(async () => {
    thisService = await app.service("contracts");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (contracts)");
  });

  describe("#create", () => {
    const options = {"opportunityId":"aasdfasdfasdfadsfadfa","accountId":"aasdfasdfasdfadsfadfa","contractNumber":"new value","status":["new value"],"startDate":1767760404640,"endDate":1767760404640,"contractValue":23,"signedDate":1767760404640,"terms":"new value","fileUrl":"new value"};

    beforeEach(async () => {
      contractCreated = await thisService.create(options);
    });

    it("should create a new contract", () => {
      assert.strictEqual(contractCreated.opportunityId, options.opportunityId);
assert.strictEqual(contractCreated.accountId, options.accountId);
assert.strictEqual(contractCreated.contractNumber, options.contractNumber);
assert.strictEqual(contractCreated.status, options.status);
assert.strictEqual(contractCreated.startDate, options.startDate);
assert.strictEqual(contractCreated.endDate, options.endDate);
assert.strictEqual(contractCreated.contractValue, options.contractValue);
assert.strictEqual(contractCreated.signedDate, options.signedDate);
assert.strictEqual(contractCreated.terms, options.terms);
assert.strictEqual(contractCreated.fileUrl, options.fileUrl);
    });
  });

  describe("#get", () => {
    it("should retrieve a contract by ID", async () => {
      const retrieved = await thisService.get(contractCreated._id);
      assert.strictEqual(retrieved._id, contractCreated._id);
    });
  });

  describe("#update", () => {
    let contractUpdated;
    const options = {"opportunityId":"345345345345345345345","accountId":"345345345345345345345","contractNumber":"updated value","status":["updated value"],"startDate":null,"endDate":null,"contractValue":100,"signedDate":null,"terms":"updated value","fileUrl":"updated value"};

    beforeEach(async () => {
      contractUpdated = await thisService.update(contractCreated._id, options);
    });

    it("should update an existing contract ", async () => {
      assert.strictEqual(contractUpdated.opportunityId, options.opportunityId);
assert.strictEqual(contractUpdated.accountId, options.accountId);
assert.strictEqual(contractUpdated.contractNumber, options.contractNumber);
assert.strictEqual(contractUpdated.status, options.status);
assert.strictEqual(contractUpdated.startDate, options.startDate);
assert.strictEqual(contractUpdated.endDate, options.endDate);
assert.strictEqual(contractUpdated.contractValue, options.contractValue);
assert.strictEqual(contractUpdated.signedDate, options.signedDate);
assert.strictEqual(contractUpdated.terms, options.terms);
assert.strictEqual(contractUpdated.fileUrl, options.fileUrl);
    });
  });

  describe("#delete", () => {
  let contractDeleted;
    beforeEach(async () => {
      contractDeleted = await thisService.remove(contractCreated._id);
    });

    it("should delete a contract", async () => {
      assert.strictEqual(contractDeleted._id, contractCreated._id);
    });
  });
});