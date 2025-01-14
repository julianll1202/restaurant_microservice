import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.js'
/*
import usersRouter from './routes/users.js'
import empleadosRouter from './routes/empleados.js'
import puestosRouter from './routes/puestos.js'
import categoriasRouter from './routes/categorias.js'
*/
import ventasRouter from './routes/recibos.js'
import mesasRouter from './routes/mesas.js'
import comandasRouter from './routes/comandas.js'
/*
import clientesRouter from './routes/clientes.js'
import comprasRouter from './routes/compras.js'
import productosRouter from './routes/productos.js'
import rolesRouter from './routes/roles.js'
import imgRouter from './routes/imagenes.js'
*/
import nunjucks from 'nunjucks'
import cors from 'cors'

const app = express()
nunjucks.configure('views', {
    autoescape: true,
    express: app
  })
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html')
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', indexRouter)
app.use('/comandas', comandasRouter)
app.use('/ventas', ventasRouter)
/*
app.use('/users', usersRouter)
app.use('/empleados', empleadosRouter)
app.use('/puestos', puestosRouter)
app.use('/categorias', categoriasRouter)
app.use('/platillos', platillosRouter)
app.use('/clientes', clientesRouter)
app.use('/compras', comprasRouter)
app.use('/productos', productosRouter)
app.use('/roles', rolesRouter)
app.use('/imagenes', imgRouter)
*/
app.use('/mesas', mesasRouter)

export default app




