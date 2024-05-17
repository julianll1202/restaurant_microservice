import express from 'express'
import API from '../api/api';
var soap = require('soap');

const router = express.Router()

router.get('/listar', async function (req, res) {
    var args = {};
    var xml = 'http://localhost:3000/soap/mesas?wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://soap_backend:3000/soap/mesas'});
        var result = await client.ListarAsync(args);
        const comandas = await API.get("/comandas/listar")
        const comandasData = comandas.data
        const recibos = [];
        const resp = result[0]['result']
        for (let i = 0; i < resp.length; i++) {
            console.log('hola');
            for (let j = 0; j < comandasData.length; j++) {
                if (comandasData[j].mesaId === Number(result[0]['result'][i].mesaId)) {
                    recibos.push({
                        mesaId: comandasData[j].mesaId,
                        comandaId: comandasData[j].comandaId,
                        capacidad: result[0]['result'][i].capacidad,
                        ubicacion: result[0]['result'][i].ubicacion,
                        mesero: `${comandasData[j].empleado.empleadoNombre} ${comandasData[j].empleado.paterno} ${comandasData[j].empleado.materno}`,
                        fechaCreacion: comandasData[j].fechaCreacion,
                        precioFinal: Number(comandasData[j].precioFinal),
                        platillos: comandasData[j].platillosEnComanda
                    })
                }
            }
        }
        res.render('mesas.html', {comandas: recibos})
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al listar las mesas')
    }
})

router.post('/crear', async function (req, res) {
    const {capacidad, ubicacion, tipoMesa} = req.body;
    var xml = 'http://localhost:3000/soap/mesas?wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.CrearAsync({capacidad, ubicacion, tipoMesa});
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al crear la mesa')
    }
})

router.put('/actualizar', async function (req, res) {
    const {mesaId, capacidad, ubicacion, tipoMesa, ocupada} = req.body;
    var xml = 'http://localhost:3000/soap/mesas?wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.ActualizarAsync({mesaId, capacidad, ubicacion, tipoMesa, ocupada});
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al actualizar la mesa')
    }
})

router.delete('/eliminar/:mesaId', async function (req, res) {
    const {mesaId} = req.params;
    var xml = 'http://localhost:3000/soap/mesas?wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.EliminarAsync({mesaId});
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al eliminar la mesa')
    }
})
export default router
