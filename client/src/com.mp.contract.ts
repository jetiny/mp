
// imports

// structs
/**
 * UserLoginRequest
 */
export interface UserLoginRequest {
  /**
   * username 
   */
  username : String;
  /**
   * password 
   */
  password : String;
}

// buildin structs
// services
/**
 * User
 */
export interface User {
  /**
   * Login
   * @param input UserLoginRequest
   */
  Login(input: UserLoginRequest): Promise<any>;
}

export interface ServicesHandler {
  User: User
}

interface StructOptions {
  extract?: boolean
  replace?: boolean
}

interface StructHandler<T> {
  create(value?: T): T
  check(value: T, opts? : StructOptions): boolean
  checkAsync(value: T, opts? : StructOptions): Promise<boolean>
  extract(value: T, opts? : StructOptions): T
  extractAsync(value: T, opts? : StructOptions): Promise<T>
}

export interface StructsHandler {
  UserLoginRequest: StructHandler<UserLoginRequest>
}
