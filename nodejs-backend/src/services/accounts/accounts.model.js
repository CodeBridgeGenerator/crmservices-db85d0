
    module.exports = function (app) {
        const modelName = "accounts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, minLength: 2, maxLength: 200, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
industry: { type:  String , maxLength: 200, index: true, trim: true, comment: "Industry, p, false, true, true, true, true, true, true, , , , ," },
website: { type:  String , lowercase: true, maxLength: 300, trim: true, comment: "Website, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , lowercase: true, maxLength: 150, index: true, trim: true, comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
phone: { type:  String , maxLength: 50, trim: true, comment: "Phone, p, false, true, true, true, true, true, true, , , , ," },
address: { type:  String , maxLength: 500, trim: true, comment: "Address, inputTextarea, false, true, true, true, true, true, true, , , , ," },
status: { type: String , enum: ["Active","Inactive"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , maxLength: 2000, trim: true, comment: "Notes, inputTextarea, false, true, true, true, true, true, false, , , , ," },

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