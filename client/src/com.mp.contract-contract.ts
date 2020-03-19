export default {
  contract: '1.0.0',
  package: 'com.mp.contract',
  version: '1.0.0',
  pages: [
    {
      name: 'Account',
      views: [
        {
          name: 'Login',
        },
      ],
    },
    {
      name: 'Team',
      views: [
        {
          name: 'AddTeam',
        },
        {
          name: 'ListTeam',
        },
      ],
    },
    {
      name: 'Product',
      views: [
        {
          name: 'EditProduct',
        },
        {
          name: 'ListProduct',
        },
      ],
    },
    {
      name: 'Iteration',
      views: [
        {
          name: 'ListIteration',
        },
      ],
    },
    {
      name: 'Task',
      views: [
        {
          name: 'ListTask',
        },
      ],
    },
  ],
  services: [
    {
      name: 'User',
      actions: [
        {
          name: 'Login',
          request: 'UserLoginRequest',
          response: 'UserLoginResponse',
        },
        {
          name: 'SearchUser',
        },
      ],
    },
    {
      name: 'Team',
      actions: [
        {
          name: 'ListTeam',
        },
        {
          name: 'ListUserTeams',
        },
        {
          name: 'CreateTeam',
        },
        {
          name: 'UpdateTeam',
        },
        {
          name: 'ListTeamUsers',
        },
        {
          name: 'AddTeamUser',
        },
        {
          name: 'DeleteTeam',
        },
        {
          name: 'ChangeTeamUserRole',
        },
        {
          name: 'CreateProduct',
        },
        {
          name: 'ListTeamProducts',
        },
      ],
    },
    {
      name: 'Product',
      actions: [
        {
          name: 'UpdateProduct',
        },
        {
          name: 'DeleteProduct',
        },
        {
          name: 'GetUserProducts',
        },
        {
          name: 'ListTeamsProducts',
        },
        {
          name: 'GetUserTeamProducts',
        },
        {
          name: 'ListProductUsers',
        },
        {
          name: 'AddProductUser',
        },
        {
          name: 'CreateIteration',
        },
        {
          name: 'ChangeProductUserRole',
        },
        {
          name: 'GetProductUserList',
        },
      ],
    },
    {
      name: 'Iteration',
      actions: [
        {
          name: 'UpdateIteration',
        },
        {
          name: 'DeleteIteration',
        },
        {
          name: 'StartIteration',
        },
        {
          name: 'StopIteration',
        },
        {
          name: 'ListProductIterations',
        },
        {
          name: 'UpdateIterationStages',
        },
      ],
    },
    {
      name: 'Stage',
      actions: [
        {
          name: 'ListStages',
        },
        {
          name: 'ListIterationsStages',
        },
      ],
    },
    {
      name: 'Task',
      actions: [
        {
          name: 'ListTasks',
        },
        {
          name: 'CreateTask',
        },
        {
          name: 'UpdateTask',
        },
        {
          name: 'StartTask',
        },
        {
          name: 'StopTask',
        },
        {
          name: 'DeleteTask',
        },
      ],
    },
  ],
  dependencies: [],
  structs: [
    {
      fields: [
        {
          name: 'username',
          type: 'String',
        },
        {
          name: 'password',
          type: 'String',
        },
      ],
      name: 'UserLoginRequest',
    },
    {
      fields: [
        {
          type: 'String',
          name: 'id',
        },
        {
          type: 'String',
          name: 'name',
        },
        {
          type: 'String',
          name: 'nick',
        },
        {
          type: 'String',
          name: 'token',
        },
        {
          type: 'Number',
          name: 'ts',
        },
        {
          type: 'Number',
          name: 'expirs',
        },
        {
          type: 'Number',
          title: '本机时间',
          optional: true,
          name: 'lts',
        },
      ],
      name: 'UserLoginResponse',
    },
  ],
  validators: [],
}