import jwt from "jsonwebtoken";
import config from "../config/config";
// generate token
export const generateToken = (payload: any) => {
  const data = typeof payload === "string" ? JSON.parse(payload) : payload;
  const token = jwt.sign({ data }, String(config.jwtSecret), {
    expiresIn: "1d",
  });
  return token;
};
