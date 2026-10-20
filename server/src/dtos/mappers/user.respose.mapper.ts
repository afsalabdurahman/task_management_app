import { IUser } from "../../models/user.model";
import { UserResponseDTO } from "../user.response.dto";

export const toUserLoginResponse = (user: IUser): UserResponseDTO => {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    isVerified: user.isverified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};