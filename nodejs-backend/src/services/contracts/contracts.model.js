
    module.exports = function (app) {
        const modelName = "contracts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            opportunityId: { type: Schema.Types.ObjectId, ref: "opportunities", comment: "Opportunity, dropdown, true, true, true, true, true, true, true, opportunities, opportunities, one-to-one, name," },
accountId: { type: Schema.Types.ObjectId, ref: "accounts", comment: "Account, dropdown, true, true, true, true, true, true, true, accounts, accounts, one-to-one, name," },
contractNumber: { type:  String , required: true, unique: true, minLength: 2, maxLength: 80, index: true, trim: true, comment: "Contract Number, p, false, true, true, true, true, true, true, , , , ," },
status: { type: String , enum: ["Draft","Sent","Signed","Active","Expired","Terminated"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "Start Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
endDate: { type: Date, comment: "End Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
contractValue: { type: Number, max: 1000000000, comment: "Contract Value, p_number, false, true, true, true, true, true, true, , , , ," },
signedDate: { type: Date, comment: "Signed Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
terms: { type:  String , maxLength: 10000, trim: true, comment: "Terms, inputTextarea, false, true, true, true, true, true, false, , , , ," },
fileUrl: { type:  String , lowercase: true, maxLength: 500, trim: true, comment: "File URL, p, false, true, true, true, true, true, false, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };