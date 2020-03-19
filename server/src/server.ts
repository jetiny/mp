import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser'
import * as serve from 'koa-static'
import * as cors from 'koa-cors'
import installIteration from './controllers/iteration'
import installProduct from './controllers/product'
import installTask from './controllers/task'
import installUser from './controllers/user'
import installTeam from './controllers/team'
import installStage from './controllers/stage'
import './declare'
import {connect} from './models/mongo'
import config from './config'
import mock from './mock'

const app = new Koa();

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        error: 401,
        message: 'Protected resource, use Authorization header to get access\n'
      };
    } else {
      throw err;
    }
  });
});

app.use(cors());
app.use(bodyParser());

const router = new Router();

router.get('/flutter', async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = {
    name: 'flutter',
    age: 10,
  };
});

installIteration(router);
installProduct(router);
installTask(router);
installUser(router);
installTeam(router);
installStage(router);

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
