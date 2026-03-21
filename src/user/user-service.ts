import bcrypt from "bcrypt";

export const register = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Missing fields");
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userQuery();
};
