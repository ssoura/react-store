import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin User",
    email: "admin@localhost.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "Sourabh",
    email: "sourabh@localhost.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];

export default users;
