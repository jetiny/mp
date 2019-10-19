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
      {name: 'EditTeam'},
      {name: 'ListTeam'},
    ]},
    {name: 'Product', views: [
      {name: 'AddProduct'},
      {name: 'EditProduct'},
      {name: 'ListProduct'},
    ]},
    {name: 'Project', views: [
      {name: 'AddProject'},
      {name: 'EditProject'},
      {name: 'ListProject'},
    ]},
    {name: 'Task', views: [
      {name: 'AddTask'},
      {name: 'EditTask'},
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
          }
        }
      ]
    }
  ]
}
