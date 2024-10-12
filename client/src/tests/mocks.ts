import { User } from "../types";

export const mockedUser: User = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123-456-7890",
  website: "example.com",
  company: { name: "Example Co.", catchPhrase: "We lead", bs: "synergy" },
  address: {
    street: "Main St",
    suite: "Apt. 1",
    city: "Metropolis",
    zipcode: "12345",
  },
};
