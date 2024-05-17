import express from 'express'
import { createCategoria, deleteCategoria, getAllCategorias, updateCategoria } from '../controllers/categoriaController.js'
import { createRecibo, getAllRecibos } from '../controllers/reciboController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const recibos = await getAllRecibos(req, res)
    console.log(recibos)
    recibos.forEach((r) => {
        r.fecha = `${r.fechaCreacion.getDate()}/${r.fechaCreacion.getMonth()}/${r.fechaCreacion.getFullYear()}`
        r.hora = `${r.fechaCreacion.getHours()}:${r.fechaCreacion.getMinutes()}`
    })
    res.render('recibos.html', {titulo: 'Recibos', ventas: recibos})
})

router.post('/crear', async function (req, res) {
    const recibo = await createRecibo(req, res)
    console.log(recibo)
    if (!JSON.stringify(recibo).startsWith('"Error')) {
        res.status(200).send(recibo)
    } else {
        res.status(400).send(recibo)
    }
})

router.put('/actualizar', async function (req, res) {
    const categoriaActualizada = await updateCategoria(req, res)
    if (!JSON.stringify(categoriaActualizada).startsWith('"Error')) {
        res.status(200).send(categoriaActualizada)
    } else {
        res.status(400).send(categoriaActualizada)
    }
})
router.delete('/eliminar', async function (req, res) {
    const categoriaD = await deleteCategoria(req, res)
    if (!JSON.stringify(categoriaD).startsWith('"Error')) {
        res.status(200).send(categoriaD)
    } else {
        res.status(400).send(categoriaD)
    }
})
export default router
