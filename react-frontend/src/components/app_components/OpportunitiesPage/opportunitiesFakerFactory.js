import { faker } from "@faker-js/faker";
export default (user, count, accountIdIds, primaryContactIdIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      accountId: accountIdIds[i % accountIdIds.length],
      primaryContactId: primaryContactIdIds[i % primaryContactIdIds.length],
      name: faker.commerce.productName(""),
      stage: "Prospecting",
      probability: faker.datatype.number(""),
      amount: faker.finance.amount(""),
      expectedCloseDate: faker.date.future(""),
      leadSource: faker.lorem.word(""),
      description: faker.lorem.paragraph(""),
      closedDate: faker.date.recent(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
