import { PrismaClient } from '@prisma/client'
import { createPlatillo } from './platilloController'

const prisma = new PrismaClient()

export const getAllRecibos = async (req, res) => {
    const recibos = await prisma.ventas.findMany({
        select: {
            ventaId: true,
            mesero: true,
            numMesa: true,
            fechaCreacion: true,
            comandaId: true,
            precioFinal: true,
            platillosEnVentas: {
                select: {
                    platillo: {
                        select: {
                            nombre: true,
                            precio: true
                        }
                    }
                }
            }
        }
    })
    return recibos
}

export const createRecibo = async (req, res) => {
    const reciboInfo = req.body
    try {
        const newRecibo = await prisma.ventas.create({
            data: {
                comandaId: reciboInfo.comandaId,
                numMesa: reciboInfo.mesaId,
                precioFinal: reciboInfo.precioFinal,
                mesero: reciboInfo.mesero,
                fechaCreacion: reciboInfo.fechaCreacion
            }
        })
        const platillos = []
        reciboInfo.platillosEnVenta.forEach(async (platillo) => {
            const newPlatillo = await createPlatillo(platillo)
            platillos.push(newPlatillo)
            const p = await prisma.platillosEnVentas.create({
                data: {
                    platilloId: newPlatillo.platilloId,
                    ventaId: newRecibo.ventaId,
                    cantidad: platillo.cantidad
                }
            })
        })
        return newRecibo;
    } catch (err) {
        console.log(err)
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteCategoria = async (req, res) => {
    const categoria = req.body
    if (!categoria.id) {
        return 'Error: El id de la categoria es necesario'
    }
    try {
        const deletedCategoria = await prisma.categorias.delete({
            where: {
                categoriaId: categoria.id
            }
        })
        return deletedCategoria
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateCategoria = async (req, res) => {
    const categoria = req.body
    if (!categoria.id) {
        return 'Error: El id de la categoria es necesario'
    }
    try {
        const updatedCategoria = await prisma.categorias.update({
            where: {
                categoriaId: categoria.id
            },
            data: {
                categoriaNombre: categoria.nombre,
                descripcion: categoria.descripcion
            }
        })
        return updatedCategoria
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
