import express from 'express'
import { createEmpleado, deleteEmpleado, getAllEmpleados, getMeseros, updateEmpleado } from '../controllers/empleadoController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const empleados = await getAllEmpleados(req, res)
    res.status(200).send(empleados)
})

router.get('/meseros/listar', async function (req, res) {
    const meseros = await getMeseros(req, res)
    res.status(200).send(meseros)
})

router.post('/crear', async function (req, res) {
    const empleado = await createEmpleado(req, res)
    if (!JSON.stringify(empleado).startsWith('"Error')) {
        res.status(200).send(empleado)
    } else {
        res.status(400).send(empleado)
    }
})

router.put('/actualizar', async function (req, res) {
    const empleadoActualizado = await updateEmpleado(req, res)
    if (!JSON.stringify(empleadoActualizado).startsWith('"Error')) {
        res.status(200).send(empleadoActualizado)
    } else {
        res.status(400).send(empleadoActualizado)
    }
})
router.delete('/eliminar/:empleadoId', async function (req, res) {
    const empleadoD = await deleteEmpleado(req, res)
    if (!JSON.stringify(empleadoD).startsWith('"Error')) {
        res.status(200).send(empleadoD)
    } else {
        res.status(400).send(empleadoD)
    }
})
export default router
