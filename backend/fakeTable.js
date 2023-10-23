import { faker } from "@faker-js/faker";
import fs from "fs";

function createRandomUser() {
  let users = [];
  for (let id = 1; id <= 2500; id++) {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const birthday = faker.date.birthdate();
    const subscriptionTier = faker.helpers.arrayElement([
      "free",
      "basic",
      "business",
    ]);
    const email = faker.internet.email({ firstName, lastName });
    users.push({
      firstName,
      lastName,
      email,
      birthday,
      subscriptionTier,
    });
  }
  return { users };
}

let data = createRandomUser();
export { data };
// fs.writeFileSync("data.json", JSON.stringify(dataObj, null, "\t"));
