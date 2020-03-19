
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

/**
 * UserLoginResponse
 */
export interface UserLoginResponse {
  /**
   * id 
   */
  id : String;
  /**
   * name 
   */
  name : String;
  /**
   * nick 
   */
  nick : String;
  /**
   * token 
   */
  token : String;
  /**
   * ts 
   */
  ts : Number;
  /**
   * expirs 
   */
  expirs : Number;
  /**
   * lts 本机时间
   */
  lts ?: Number;
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
   * @return UserLoginResponse
   */
  Login(input: UserLoginRequest): Promise<UserLoginResponse>;
  /**
   * SearchUser
   */
  SearchUser(input?: any): Promise<any>;
}

/**
 * Team
 */
export interface Team {
  /**
   * ListTeam
   */
  ListTeam(input?: any): Promise<any>;
  /**
   * ListUserTeams
   */
  ListUserTeams(input?: any): Promise<any>;
  /**
   * CreateTeam
   */
  CreateTeam(input?: any): Promise<any>;
  /**
   * UpdateTeam
   */
  UpdateTeam(input?: any): Promise<any>;
  /**
   * ListTeamUsers
   */
  ListTeamUsers(input?: any): Promise<any>;
  /**
   * AddTeamUser
   */
  AddTeamUser(input?: any): Promise<any>;
  /**
   * DeleteTeam
   */
  DeleteTeam(input?: any): Promise<any>;
  /**
   * ChangeTeamUserRole
   */
  ChangeTeamUserRole(input?: any): Promise<any>;
  /**
   * CreateProduct
   */
  CreateProduct(input?: any): Promise<any>;
  /**
   * ListTeamProducts
   */
  ListTeamProducts(input?: any): Promise<any>;
}

/**
 * Product
 */
export interface Product {
  /**
   * UpdateProduct
   */
  UpdateProduct(input?: any): Promise<any>;
  /**
   * DeleteProduct
   */
  DeleteProduct(input?: any): Promise<any>;
  /**
   * GetUserProducts
   */
  GetUserProducts(input?: any): Promise<any>;
  /**
   * ListTeamsProducts
   */
  ListTeamsProducts(input?: any): Promise<any>;
  /**
   * GetUserTeamProducts
   */
  GetUserTeamProducts(input?: any): Promise<any>;
  /**
   * ListProductUsers
   */
  ListProductUsers(input?: any): Promise<any>;
  /**
   * AddProductUser
   */
  AddProductUser(input?: any): Promise<any>;
  /**
   * CreateIteration
   */
  CreateIteration(input?: any): Promise<any>;
  /**
   * ChangeProductUserRole
   */
  ChangeProductUserRole(input?: any): Promise<any>;
  /**
   * GetProductUserList
   */
  GetProductUserList(input?: any): Promise<any>;
}

/**
 * Iteration
 */
export interface Iteration {
  /**
   * UpdateIteration
   */
  UpdateIteration(input?: any): Promise<any>;
  /**
   * DeleteIteration
   */
  DeleteIteration(input?: any): Promise<any>;
  /**
   * StartIteration
   */
  StartIteration(input?: any): Promise<any>;
  /**
   * StopIteration
   */
  StopIteration(input?: any): Promise<any>;
  /**
   * ListProductIterations
   */
  ListProductIterations(input?: any): Promise<any>;
  /**
   * UpdateIterationStages
   */
  UpdateIterationStages(input?: any): Promise<any>;
}

/**
 * Stage
 */
export interface Stage {
  /**
   * ListStages
   */
  ListStages(input?: any): Promise<any>;
  /**
   * ListIterationsStages
   */
  ListIterationsStages(input?: any): Promise<any>;
}

/**
 * Task
 */
export interface Task {
  /**
   * ListTasks
   */
  ListTasks(input?: any): Promise<any>;
  /**
   * CreateTask
   */
  CreateTask(input?: any): Promise<any>;
  /**
   * UpdateTask
   */
  UpdateTask(input?: any): Promise<any>;
  /**
   * StartTask
   */
  StartTask(input?: any): Promise<any>;
  /**
   * StopTask
   */
  StopTask(input?: any): Promise<any>;
  /**
   * DeleteTask
   */
  DeleteTask(input?: any): Promise<any>;
}

export interface ServicesHandler {
  User: User
  Team: Team
  Product: Product
  Iteration: Iteration
  Stage: Stage
  Task: Task
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
  UserLoginResponse: StructHandler<UserLoginResponse>
}
