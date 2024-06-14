import { AppError } from "../../errors/app.error";
import { User } from "../../interfaces/user.interface";
import { UserRepository } from "../../repositories/user.repository";


 class userDbService {
    private  userRepository: UserRepository;
    private constructor() {
        this.userRepository = new UserRepository();
    }
    private static instance: userDbService;
    public static getInstance(): userDbService {
        if (!userDbService.instance) {
            userDbService.instance = new userDbService();
        }
        return userDbService.instance;
    }
  async createUser(user: User) {
    try {
      return await this.userRepository.create(user);
    } catch (error: any) {
        console.log(error);
        throw new AppError(error.message, 500);
    }
  }
    async getUserById(id: string) {
        try {
        return await this.userRepository.getUserById(id);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }   
    async updateUser(id: string, user: User) {
        try {
        return await this.userRepository.updateUser(id, user);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }
    async deleteUser(id: string) {
        try {
        return await this.userRepository.deleteUser(id);
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }
    async getAllUsers() {
        try {
        return await this.userRepository.getAllUsers();
        } catch (error: any) {
            throw new AppError(error.message, 500);
        }
    }
}

export const userDbServices = userDbService.getInstance();