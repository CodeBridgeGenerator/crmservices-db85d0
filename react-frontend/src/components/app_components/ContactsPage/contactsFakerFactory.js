import { faker } from "@faker-js/faker";
export default (user, count, accountIdIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      accountId: accountIdIds[i % accountIdIds.length],
      firstName: faker.person.firstName(""),
      lastName: faker.person.lastName(""),
      jobTitle: faker.person.jobTitle(""),
      email: faker.internet.email(""),
      phone: faker.phone.number(""),
      status: "Inactive",
      notes: faker.lorem.paragraph(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
