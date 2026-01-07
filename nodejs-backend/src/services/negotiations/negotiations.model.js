
    module.exports = function (app) {
        const modelName = "negotiations";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            opportunityId: { type: Schema.Types.ObjectId, ref: "opportunities", comment: "Opportunity, dropdown, true, true, true, true, true, true, true, opportunities, opportunities, one-to-one, name," },
negotiationDate: { type: Date, comment: "Negotiation Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
status: { type: String , enum: ["Open","Agreed","Rejected"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
offeredAmount: { type: Number, max: 1000000000, comment: "Offered Amount, p_number, false, true, true, true, true, true, true, , , , ," },
counterAmount: { type: Number, max: 1000000000, comment: "Counter Amount, p_number, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , maxLength: 3000, trim: true, comment: "Notes, inputTextarea, false, true, true, true, true, true, false, , , , ," },

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