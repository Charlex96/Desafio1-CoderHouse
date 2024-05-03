import { faker } from "@faker-js/faker";

export const getRandomCode = () => {
  return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 10, max: 100 }),
        image: faker.image.url(),
        id: faker.database.mongodbObjectId(),
        code: faker.string.alphanumeric(100),
        description: faker.lorem.paragraph()
    }
  };
