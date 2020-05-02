require('dotenv').config()
const express = require('express')
const consign = require('consign')
const app = express()


app.disable('x-powered-by')


consign({
    cwd: 'app',
    verbose: process.env.APP_DEBUG === 'true' || false,
    locale: 'pt-br'
}).include('./middlewares/globals').then('../routes').into(app)

app.get('/', (req, res) => {
    res.send('Hello World');
  });
  
app.listen(process.env.APP_PORT || 3000, () => {
    console.log('=> Servidor rodando!')
})