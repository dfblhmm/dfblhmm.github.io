const { resolve } = require('path');
const { readFileSync } = require('fs');
const koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');

const app = new koa();
const router = new Router();

router.get('/login', ctx => {
  ctx.body = 'login';
  ctx.response.set('Access-Control-Allow-Origin', ctx.request.origin);
  ctx.response.set('Access-Control-Allow-Credentials', true);
  ctx.cookies.set('name', 'why', {
    maxAge: 60 * 1000,
    httpOnly: false,
  })
})

router.get('/info', ctx => {
  const info = ctx.cookies.get('name');
  ctx.body = `<h2>${info}</h2>`;
  ctx.response.set('Access-Control-Allow-Origin', ctx.request.origin);
  ctx.response.set('Access-Control-Allow-Credentials', true);
})

app.use(router.routes()).use(router.allowedMethods());
app.use(koaStatic('./'));

app.use(ctx => {
  const staticPath = resolve(__dirname, 'index.html');
  const htmlContent = readFileSync(staticPath, 'utf-8');
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = htmlContent;
})


app.listen(8000, () => {
  console.log('服务器启动成功');
})