import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session'
import * as serve from 'koa-static'
import * as cors from 'koa-cors'
import installProject from './controllers/project'
import installTask from './controllers/task'
import installUser from './controllers/user'
import './declare'
import {connect} from './models/mongo'
import config from './config'
import mock from './mock'

const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.keys = ['some secret hurr'];
app.use(session({
  key: 'koa:sess',   //cookie key (default is koa:sess)
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,  //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false,  //(boolean) renew session when session is nearly expired,
}, app));

const router = new Router();

router.get('/test', async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = 'Hello World!';
});

installProject(router);
installTask(router);
installUser(router);

app.use(router.routes());
app.use(serve(__dirname + '/../www'));

connect(config.MONGODB_DB_URL + config.MONGODB_DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.MONGODB_USER,
  pass: config.MONGODB_PASS,
}).then(() => {
  console.log('mongodb is connected')
  app.listen(3000);
  console.log('Server running on port 3000');
  mock()
}).catch((err) => {
  console.error('mongodb can not be connected')
  console.error(err)
})
