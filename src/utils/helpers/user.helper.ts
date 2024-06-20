class UserHelper {
  private static instance: UserHelper; // Private static property to hold the instance
  constructor() {}
  static getInstance(): UserHelper {
    if (!UserHelper.instance) {
      UserHelper.instance = new UserHelper();
    }
    return UserHelper.instance;
  }
  public isType(data: any, type: string): boolean {
    return data.type === type;
  }
  // Devuelve true si data cumple con el modelo, false en caso contrario
}

export const userHelper = UserHelper.getInstance();
