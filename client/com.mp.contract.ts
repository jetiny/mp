import {Contract} from 'savml'

export default class MContract implements Contract {
  contract = '1.0.0'
  package = 'com.mp.contract'
  version = '1.0.0'
  pages = [
    {name: 'Account', views: [
      {name: 'Login'},
    ]},
    {name: 'Team', views: [
      {name: 'AddTeam'},
      {name: 'ListTeam'},
    ]},
    {name: 'Product', views: [
      {name: 'EditProduct'},
      {name: 'ListProduct'},
    ]},
    {name: 'Iteration', views: [
      {name: 'ListIteration'},
    ]},
    {name: 'Task', views: [
      {name: 'ListTask'},
    ]},
  ]
  services = [
    {
      name: 'User',
      actions: [
        {
          name: 'Login',
          request: {
            fields: [
              {name: 'username', type: String},
              {name: 'password', type: String},
            ]
          },
          response: {
            fields: {
              id: String,
              name: String,
              nick: String,
              token: String,
              ts: Number,
              expirs: Number,
              lts: {
                type: Number,
                title: '本机时间',
                optional: true
              }
            }
          }
        },
        {name: 'SearchUser'}
      ]
    },
    {
      name: 'Team',
      actions: [
        {name: 'ListTeam'},
        {name: 'ListUserTeams'},
        {name: 'CreateTeam'},
        {name: 'UpdateTeam'},
        {name: 'ListTeamUsers'},
        {name: 'AddTeamUser'},
        {name: 'DeleteTeam'},
        {name: 'ChangeTeamUserRole'},
        {name: 'CreateProduct'},
        {name: 'ListTeamProducts'},
      ]
    },
    {
      name: 'Product',
      actions: [
        {name: 'UpdateProduct'},
        {name: 'DeleteProduct'},
        {name: 'GetUserProducts'},
        {name: 'ListTeamsProducts'},
        {name: 'GetUserTeamProducts'},
        {name: 'ListProductUsers'},
        {name: 'AddProductUser'},
        {name: 'CreateIteration'},
        {name: 'ChangeProductUserRole'},
        {name: 'GetProductUserList'},
      ]
    },
    {
      name: 'Iteration',
      actions: [
        {name: 'UpdateIteration'},
        {name: 'DeleteIteration'},
        {name: 'StartIteration'},
        {name: 'StopIteration'},
        {name: 'ListProductIterations'},
        {name: 'UpdateIterationStages'},
      ]
    },
    {
      name: 'Stage',
      actions: [
        {name: 'ListStages'},
        {name: 'ListIterationsStages'},
      ]
    },
    {
      name: 'Task',
      actions: [
        {name: 'ListTasks'},
        {name: 'CreateTask'},
        {name: 'UpdateTask'},
        {name: 'StartTask'},
        {name: 'StopTask'},
        {name: 'DeleteTask'},
      ]
    },
  ]
}
