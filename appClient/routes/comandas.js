import express from 'express'
import { cambiarEstatusComanda, cancelComanda, createComanda, deleteComanda, getAllComandas, getComandaById, updateComanda } from '../controllers/comandaController.js'
import API from '../api/api.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const comandas = await API.get("/comandas/listar")
    console.log(comandas.data)
    comandas.data.forEach((r) => {
        const d = new Date(r.fechaCreacion)
        r.fecha = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
        r.hora = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    })
    res.render('mesas.html', {titulo: 'Comandas', comandas: comandas.data})
})

// router.get('/ver/:id', async function (req, res) {
//     const id = req.params.id
//     const comanda = await getComandaById(Number(id))
//     res.status(200).send(comanda)
// })

// router.post('/crear', async function (req, res) {
//     const comanda = await createComanda(req, res)
//     if (!JSON.stringify(comanda).startsWith('"Error')) {
//         res.status(200).send(comanda)
//     } else {
//         res.status(400).send(comanda)
//     }
// })

// router.put('/actualizar', async function (req, res) {
//     const comandaActualizada = await updateComanda(req, res)
//     if (!JSON.stringify(comandaActualizada).startsWith('"Error')) {
//         res.status(200).send(comandaActualizada)
//     } else {
//         res.status(400).send(comandaActualizada)
//     }
// })

// router.delete('/eliminar', async function (req, res) {
//     const comandaD = await deleteComanda(req, res)
//     if (!JSON.stringify(comandaD).startsWith('"Error')) {
//         res.status(200).send(comandaD)
//     } else {
//         res.status(400).send(comandaD)
//     }
// })
// export default router

// router.put('/cancelar/:id', async function (req, res) {
//     const id = req.params.id
//     const comanda = await cancelComanda(id)
//     if (!JSON.stringify(comanda).startsWith('"Error')) {
//         res.status(200).send(comanda)
//     } else {
//         res.status(400).send(comanda)
//     }
// })

// router.put('/cambiar/:id', async function (req, res) {
//     const id  = req.params.id
//     const estatus = req.body.estatus
//     const comanda = await cambiarEstatusComanda(Number(id), Number(estatus))
//     if (!JSON.stringify(comanda).startsWith('"Error')) {
//         res.status(200).send(comanda)
//     } else {
//         res.status(400).send(comanda)
//     }
// })
module.exports = router