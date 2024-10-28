"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUsers = void 0;
const faker_1 = require("@faker-js/faker");
//? Función que genera un usuario fake basado en la interfaz User
const fakeUsers = () => {
    return {
        // user_id: faker.datatype.uuid(),  
        user_name: faker_1.faker.internet.userName(),
        user_password: faker_1.faker.internet.password(),
        user_picture: faker_1.faker.image.avatar(),
        user_joined: faker_1.faker.date.past().toISOString(),
        user_jobDescription: faker_1.faker.name.jobTitle(),
        user_schedule: [
            faker_1.faker.date.weekday(),
            faker_1.faker.date.weekday(),
            faker_1.faker.date.weekday()
        ],
        user_contact: faker_1.faker.phone.number(),
        user_status: faker_1.faker.helpers.arrayElement(['Active', 'Inactive']),
    };
};
exports.fakeUsers = fakeUsers;
