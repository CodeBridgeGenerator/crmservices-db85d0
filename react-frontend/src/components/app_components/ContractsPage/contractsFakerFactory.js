
import { faker } from "@faker-js/faker";
export default (user,count,opportunityIdIds,accountIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
opportunityId: opportunityIdIds[i % opportunityIdIds.length],
accountId: accountIdIds[i % accountIdIds.length],
contractNumber: faker.string.alphanumeric(""),
status: "Signed",
startDate: faker.date.recent(""),
endDate: faker.date.future(""),
contractValue: faker.finance.amount(""),
signedDate: faker.date.recent(""),
terms: faker.lorem.paragraphs(""),
fileUrl: faker.internet.url(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
