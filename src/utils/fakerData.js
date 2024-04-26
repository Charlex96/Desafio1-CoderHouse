import { faker } from "@faker-js/faker";

export const getRandomCode = () => {
  return faker.string.alphanumeric(5);
};
