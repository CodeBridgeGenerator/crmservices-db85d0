
import { faker } from "@faker-js/faker";
export default (user,count,opportunityIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
opportunityId: opportunityIdIds[i % opportunityIdIds.length],
negotiationDate: faker.date.recent(""),
status: "Agreed",
offeredAmount: faker.finance.amount(""),
counterAmount: faker.finance.amount(""),
notes: faker.lorem.paragraph(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
