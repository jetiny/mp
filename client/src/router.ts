const Account = () => import(/* webpackChunkName: "Account" */ './views/Account/Account.vue');
const AccountLogin = () => import(/* webpackChunkName: "Account" */ './views/Account/AccountLogin.vue');
const Team = () => import(/* webpackChunkName: "Team" */ './views/Team/Team.vue');
const TeamAddTeam = () => import(/* webpackChunkName: "Team" */ './views/Team/TeamAddTeam.vue');
const TeamListTeam = () => import(/* webpackChunkName: "Team" */ './views/Team/TeamListTeam.vue');
const Product = () => import(/* webpackChunkName: "Product" */ './views/Product/Product.vue');
const ProductEditProduct = () => import(/* webpackChunkName: "Product" */ './views/Product/ProductEditProduct.vue');
const ProductListProduct = () => import(/* webpackChunkName: "Product" */ './views/Product/ProductListProduct.vue');
const Iteration = () => import(/* webpackChunkName: "Iteration" */ './views/Iteration/Iteration.vue');
const IterationListIteration = () => import(/* webpackChunkName: "Iteration" */ './views/Iteration/IterationListIteration.vue');
const Task = () => import(/* webpackChunkName: "Task" */ './views/Task/Task.vue');
const TaskListTask = () => import(/* webpackChunkName: "Task" */ './views/Task/TaskListTask.vue');

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
    name: 'Iteration',
    component: Iteration,
    path: '/iteration',
    meta: {},
    children: [
      {
        name: 'IterationListIteration',
        component: IterationListIteration,
        path: 'listIteration',
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
        name: 'TaskListTask',
        component: TaskListTask,
        path: 'listTask',
        meta: {},
      },
    ],
  },
]
