import { User } from "../../utils/types";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
