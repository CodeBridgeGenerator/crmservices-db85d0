module.exports = function (app) {
  const modelName = "opportunities";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      accountId: {
        type: Schema.Types.ObjectId,
        ref: "accounts",
        comment:
          "Account, dropdown, true, true, true, true, true, true, true, accounts, accounts, one-to-one, name,",
      },
      primaryContactId: {
        type: Schema.Types.ObjectId,
        ref: "contacts",
        comment:
          "Primary Contact, dropdown, true, true, true, true, true, true, true, contacts, contacts, one-to-one, firstName:lastName,",
      },
      name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 200,
        index: true,
        trim: true,
        comment:
          "Opportunity Name, p, false, true, true, true, true, true, true, , , , ,",
      },
      stage: {
        type: String,
        enum: [
          "Prospecting",
          "Qualification",
          "Proposal",
          "Negotiation",
          "Closed Won",
          "Closed Lost",
        ],
        comment:
          "Stage, dropdownArray, false, true, true, true, true, true, true, , , , ,",
      },
      probability: {
        type: Number,
        max: 100,
        comment:
          "Probability (%), p_number, false, true, true, true, true, true, true, , , , ,",
      },
      amount: {
        type: Number,
        max: 1000000000,
        comment:
          "Amount, p_number, false, true, true, true, true, true, true, , , , ,",
      },
      expectedCloseDate: {
        type: Date,
        comment:
          "Expected Close Date, p_calendar, false, true, true, true, true, true, true, , , , ,",
      },
      leadSource: {
        type: String,
        maxLength: 150,
        trim: true,
        comment:
          "Lead Source, p, false, true, true, true, true, true, true, , , , ,",
      },
      description: {
        type: String,
        maxLength: 3000,
        trim: true,
        comment:
          "Description, inputTextarea, false, true, true, true, true, true, false, , , , ,",
      },
      closedDate: {
        type: Date,
        comment:
          "Closed Date, p_calendar, false, true, true, true, true, true, true, , , , ,",
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
