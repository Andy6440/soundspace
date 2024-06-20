import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.model';

/**
 * Repository class for managing user data.
 */
export class UserRepository {
  /**
   * Creates a new user.
   * @param userData - The data of the user to be created.
   * @returns A promise that resolves to the created user.
   */
  async create(userData: User): Promise<User> {
    // create a new user
    const user = new UserModel(userData);

    return await user.save();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the retrieved user, or null if not found.
   */
  async getUserById(id: string): Promise<User | null> {
    return (await UserModel.find({ id: id })) as unknown as User;
  }
  async getUserByQuery(item: string, value: string): Promise<User | null> {
    // Crea un objeto de consulta dinámica
    const query: { [key: string]: string } = {};
    query[item] = value;
    return (await UserModel.findOne(query)) as unknown as User;
  }
  /**
   * Updates a user by their email.
   * @param userData - The updated data of the user.
   * @returns A promise that resolves to the updated user, or null if not found.
   */
  async updateUserByEmail(userData: User): Promise<User | null> {
    return (await UserModel.findOneAndUpdate(
      { email: userData.email },
      userData,
      { upsert: true, new: true },
    )) as unknown as User;
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param userData - The updated data of the user.
   * @returns A promise that resolves to the updated user, or null if not found.
   */
  async updateUser(id: string, userData: User): Promise<User | null> {
    return (await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    })) as unknown as User;
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to the deleted user, or null if not found.
   */
  async deleteUser(id: string): Promise<User | null> {
    return (await UserModel.findByIdAndDelete(id)) as unknown as User;
  }

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of all users.
   */
  async getAllUsers(): Promise<User[]> {
    return (await UserModel.find()) as unknown as User[];
  }
}
