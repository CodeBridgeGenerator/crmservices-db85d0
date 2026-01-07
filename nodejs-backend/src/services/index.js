const accounts = require("./accounts/accounts.service.js");
const contacts = require("./contacts/contacts.service.js");
const opportunities = require("./opportunities/opportunities.service.js");
const negotiations = require("./negotiations/negotiations.service.js");
const contracts = require("./contracts/contracts.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(accounts);
  app.configure(contacts);
  app.configure(opportunities);
  app.configure(negotiations);
  app.configure(contracts);
    // ~cb-add-configure-service-name~
};
