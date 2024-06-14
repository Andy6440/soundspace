import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export class UserRepository {
   async create(userData: User): Promise<User> {
    // create a new user
    const user = new UserModel(userData);

    return await user.save();
  }
  // get user by id
  async getUserById(id: string): Promise<User | null> {
    return await UserModel.find({ id: id }) as unknown as User;
  }

  async updateUser(id: string, userData: User): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true }) as unknown as User;
  }

  async deleteUser(id: string): Promise<User | null> {
    return await UserModel.findByIdAndDelete(id) as unknown as User;
  }

  async getAllUsers(): Promise<User[]> {
    return await UserModel.find() as unknown as User[];
  }
}

