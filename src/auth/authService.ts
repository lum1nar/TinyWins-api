import type { NewPerson } from "@/db/types.js";
import * as userRepository from "@/user/userRepository.js";
import bcrypt from "bcrypt";
import type { loginInput, registerInput } from "./authSchema.ts";

export const registerUser = async (person: registerInput) => {
  const password_hash = await bcrypt.hash(person.password, 10);

  const newPerson: NewPerson = {
    username: person.name,
    email: person.email,
    password_hash: password_hash,
  };

  return await userRepository.createPerson(newPerson);
};

export const login = async (data: loginInput) => {};
