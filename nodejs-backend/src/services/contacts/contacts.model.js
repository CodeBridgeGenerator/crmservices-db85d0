module.exports = function (app) {
  const modelName = "contacts";
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
      firstName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        index: true,
        trim: true,
        comment:
          "First Name, p, false, true, true, true, true, true, true, , , , ,",
      },
      lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        index: true,
        trim: true,
        comment:
          "Last Name, p, false, true, true, true, true, true, true, , , , ,",
      },
      jobTitle: {
        type: String,
        maxLength: 150,
        trim: true,
        comment:
          "Job Title, p, false, true, true, true, true, true, true, , , , ,",
      },
      email: {
        type: String,
        lowercase: true,
        maxLength: 150,
        index: true,
        trim: true,
        comment: "Email, p, false, true, true, true, true, true, true, , , , ,",
      },
      phone: {
        type: String,
        maxLength: 50,
        trim: true,
        comment: "Phone, p, false, true, true, true, true, true, true, , , , ,",
      },
      status: {
        type: String,
        enum: ["Active", "Inactive"],
        comment:
          "Status, dropdownArray, false, true, true, true, true, true, true, , , , ,",
      },
      notes: {
        type: String,
        maxLength: 2000,
        trim: true,
        comment:
          "Notes, inputTextarea, false, true, true, true, true, true, false, , , , ,",
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
