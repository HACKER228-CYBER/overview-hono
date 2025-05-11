export interface IRequestResponse<T> {
  pagination: {
    limit: number;
    page: number;
    total: number;
  };
  data: T;
}

const r = [
  {
    id: 6,
    name: "user3",
    age: 20,
    email: "user3@hono.com",
    description: null,
  },
  {
    id: 7,
    name: "user2",
    age: 20,
    email: "user2@hono.com",
    description: null,
  },
  {
    id: 8,
    name: "user",
    age: 10,
    email: "user@gmai.com",
    description: null,
  },
  {
    id: 9,
    name: "user",
    age: 10,
    email: "user3@gmai.com",
    description: null,
  },
  {
    id: 10,
    name: "user",
    age: 10,
    email: "user4@gmai.com",
    description: null,
  },
  {
    id: 11,
    name: "user",
    age: 10,
    email: "user6@gmai.com",
    description: null,
  },
  {
    id: 12,
    name: "username",
    age: 10,
    email: "email@gmail.com",
    description: null,
  },
  {
    id: 13,
    name: "username",
    age: 10,
    email: "1email@gmail.com",
    description: null,
  },
  {
    id: 14,
    name: "username",
    age: 10,
    email: "2email@gmail.com",
    description: null,
  },
  {
    id: 15,
    name: "rulabadok",
    age: 50,
    email: "getud@mailinator.com",
    description: null,
  },
  {
    id: 16,
    name: "puxojan",
    age: 66,
    email: "mujuzewele@mailinator.com",
    description: null,
  },
  {
    id: 17,
    name: "rejopypup",
    age: 23,
    email: "lefufeco@mailinator.com",
    description: null,
  },
  {
    id: 18,
    name: "user200",
    age: 20,
    email: "user200@hono.com",
    description: null,
  },
  {
    id: 19,
    name: "user2",
    age: 20,
    email: "user1@hono.com",
    description: null,
  },
];
