const Account = () => import(/* webpackChunkName: "Account" */ './views/Account/Account.vue');
const AccountLogin = () => import(/* webpackChunkName: "Account" */ './views/Account/AccountLogin.vue');
const Team = () => import(/* webpackChunkName: "Team" */ './views/Team/Team.vue');
const TeamAddTeam = () => import(/* webpackChunkName: "Team" */ './views/Team/TeamAddTeam.vue');
const TeamEditTeam = () => import(/* webpackChunkName: "Team" */ './views/Team/TeamEditTeam.vue');
const TeamListTeam = () => import(/* webpackChunkName: "Team" */ './views/Team/TeamListTeam.vue');
const Product = () => import(/* webpackChunkName: "Product" */ './views/Product/Product.vue');
const ProductAddProduct = () => import(/* webpackChunkName: "Product" */ './views/Product/ProductAddProduct.vue');
const ProductEditProduct = () => import(/* webpackChunkName: "Product" */ './views/Product/ProductEditProduct.vue');
const ProductListProduct = () => import(/* webpackChunkName: "Product" */ './views/Product/ProductListProduct.vue');
const Project = () => import(/* webpackChunkName: "Project" */ './views/Project/Project.vue');
const ProjectAddProject = () => import(/* webpackChunkName: "Project" */ './views/Project/ProjectAddProject.vue');
const ProjectEditProject = () => import(/* webpackChunkName: "Project" */ './views/Project/ProjectEditProject.vue');
const ProjectListProject = () => import(/* webpackChunkName: "Project" */ './views/Project/ProjectListProject.vue');
const Task = () => import(/* webpackChunkName: "Task" */ './views/Task/Task.vue');
const TaskAddTask = () => import(/* webpackChunkName: "Task" */ './views/Task/TaskAddTask.vue');
const TaskEditTask = () => import(/* webpackChunkName: "Task" */ './views/Task/TaskEditTask.vue');

export default [
  {
    name: 'Account',
    component: Account,
    path: '/account',
    meta: {},
    children: [
      {
        name: 'AccountLogin',
        component: AccountLogin,
        path: 'login',
        meta: {},
      },
    ],
  },
  {
    name: 'Team',
    component: Team,
    path: '/team',
    meta: {},
    children: [
      {
        name: 'TeamAddTeam',
        component: TeamAddTeam,
        path: 'addTeam',
        meta: {},
      },
      {
        name: 'TeamEditTeam',
        component: TeamEditTeam,
        path: 'editTeam',
        meta: {},
      },
      {
        name: 'TeamListTeam',
        component: TeamListTeam,
        path: 'listTeam',
        meta: {},
      },
    ],
  },
  {
    name: 'Product',
    component: Product,
    path: '/product',
    meta: {},
    children: [
      {
        name: 'ProductAddProduct',
        component: ProductAddProduct,
        path: 'addProduct',
        meta: {},
      },
      {
        name: 'ProductEditProduct',
        component: ProductEditProduct,
        path: 'editProduct',
        meta: {},
      },
      {
        name: 'ProductListProduct',
        component: ProductListProduct,
        path: 'listProduct',
        meta: {},
      },
    ],
  },
  {
    name: 'Project',
    component: Project,
    path: '/project',
    meta: {},
    children: [
      {
        name: 'ProjectAddProject',
        component: ProjectAddProject,
        path: 'addProject',
        meta: {},
      },
      {
        name: 'ProjectEditProject',
        component: ProjectEditProject,
        path: 'editProject',
        meta: {},
      },
      {
        name: 'ProjectListProject',
        component: ProjectListProject,
        path: 'listProject',
        meta: {},
      },
    ],
  },
  {
    name: 'Task',
    component: Task,
    path: '/task',
    meta: {},
    children: [
      {
        name: 'TaskAddTask',
        component: TaskAddTask,
        path: 'addTask',
        meta: {},
      },
      {
        name: 'TaskEditTask',
        component: TaskEditTask,
        path: 'editTask',
        meta: {},
      },
    ],
  },
]
