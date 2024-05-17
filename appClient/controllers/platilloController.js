import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPlatillos = async (req, res) => {
    const platillos = await prisma.platillos.findMany()
    return platillos
}

export const getPlatillosCategoria = async (req, res, categoria) => {
    const platillosCategoria = await prisma.platillos.findMany({
        where: {
            categoriaId: parseInt(categoria)
        },
        select: {
            platilloId: true,
            platilloNombre: true,
            precio: true,
            descripcion: true,
            categoriaId: true,
            imagen: {
                select: {
                    imagenId: true,
                    url: true
                }
            }
        }
    })
    return platillosCategoria
}

export const createPlatillo = async (info) => {

    try {
        const platilloNuevo = await prisma.platillos.upsert({
            where: {
                nombre: info.nombre.trim(),
            },
            update: {
                nombre: info.nombre.trim(),
                precio: info.precio
            },
            create: {
                nombre: info.nombre.trim(),
                precio: info.precio
            }
        })
        return platilloNuevo
    } catch (err) {
        console.error(err)
        return 'Error: No se pudo crear el registro'
    }
}

export const deletePlatillo = async (req, res) => {
    const platillo = req.params
    if (!platillo.id) {
        return 'Error: El id del platillo es necesario'
    }
    try {
        const deletedPlatillo = await prisma.platillos.delete({
            where: {
                platilloId: Number(platillo.id)
            }
        })
        return deletedPlatillo
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updatePlatillo = async (req, res) => {
    const p = req.params
    const platillo = req.body
    if (!p) {
        return 'Error: El id del platillo es necesario'
    }
    try {
        const updatedPlatillo = await prisma.platillos.update({
            where: {
                platilloId: Number(p.id)
            },
            data: {
                platilloNombre: platillo.nombre,
                descripcion: platillo.descripcion,
                precio: platillo.precio,
                categoriaId: platillo.categoriaId,
                imagenId: platillo.imagenId
            }
        })
        return updatedPlatillo
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
