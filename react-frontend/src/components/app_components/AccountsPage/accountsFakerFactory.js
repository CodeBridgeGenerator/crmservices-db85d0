
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.company.name(""),
industry: faker.company.bs(""),
website: faker.internet.url(""),
email: faker.internet.email(""),
phone: faker.phone.number(""),
address: faker.location.streetAddress(""),
status: "Active",
notes: faker.lorem.paragraph(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
