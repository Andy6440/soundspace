import { AppError } from "../../errors/app.error";
import { User } from "../../interfaces/user.interface";
import { UserRepository } from "../../repositories/user.repository";


/**
 * Service class for interacting with the user database.
 */
class userDbService {
    private userRepository: UserRepository;

    private constructor() {
        this.userRepository = new UserRepository();
    }

    private static instance: userDbService;

    /**
     * Returns the singleton instance of the userDbService class.
     * @returns The singleton instance of the userDbService class.
     */
    public static getInstance(): userDbService {
        if (!userDbService.instance) {
            userDbService.instance = new userDbService();
        }
        return userDbService.instance;
    }

    /**
     * Creates a new user in the database.
     * @param user - The user object to be created.
     * @returns A promise that resolves to the created user.
     * @throws AppError if there is an error creating the user.
     */
    async createUser(user: User) {
        try {
            return await this.userRepository.create(user);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }

    /**
     * Retrieves a user from the database by their ID.
     * @param id - The ID of the user to retrieve.
     * @returns A promise that resolves to the retrieved user.
     * @throws AppError if there is an error retrieving the user.
     */
    async getUserById(id: string) {
        try {
            return await this.userRepository.getUserById(id);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }
    async getUserByEmail(email: string) {
        try {
            return await this.userRepository.getUserByQuery('email',email);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }

    /**
     * Updates user data in the database.
     * @param userData - The updated user data.
     * @returns A promise that resolves to the updated user.
     * @throws AppError if there is an error updating the user data.
     */
    async updateUserData(userData: User) {
        try {
            return await this.userRepository.updateUserByEmail(userData);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }

    /**
     * Updates a user in the database by their ID.
     * @param id - The ID of the user to update.
     * @param user - The updated user object.
     * @returns A promise that resolves to the updated user.
     * @throws AppError if there is an error updating the user.
     */
    async updateUser(id: string, user: User) {
        try {
            return await this.userRepository.updateUser(id, user);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }

    /**
     * Deletes a user from the database by their ID.
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves when the user is deleted.
     * @throws AppError if there is an error deleting the user.
     */
    async deleteUser(id: string) {
        try {
            return await this.userRepository.deleteUser(id);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }

    /**
     * Retrieves all users from the database.
     * @returns A promise that resolves to an array of all users.
     * @throws AppError if there is an error retrieving the users.
     */
    async getAllUsers() {
        try {
            return await this.userRepository.getAllUsers();
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }
}

export const userDbServices = userDbService.getInstance();