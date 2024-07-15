const Coordenada = require("../models/Coordenadas");

exports.addCoordenada = async(req,res)=>{
    try{
        let coordenada;
        // console.log(req.body,"Info");
        coordenadas = new Coordenada(req.body);
        await coordenadas.save();
        res.json(coordenadas);

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
} 

// OBTIENE TODAS LAS COORDENADAS DE UN MAPA

exports.buscarCoordenadasPorIdMapa = async (req, res) => {
    try {
        const id_mapa = req.params.id; // Suponiendo que el id_mapa se envía como un parámetro en la URL
        const resultados = await Coordenada.find({ id_mapa }); // Buscar en la base de datos todos los registros con el mismo id_mapa
        if (resultados && resultados.length > 0) {
            res.send(resultados); // Si se encuentran registros con el mismo id_mapa, enviarlos como respuesta
        } else {
            res.status(404).send("No se encontró ningún registro con ese id_mapa");
        }
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).send("Hubo un problema al buscar las coordenadas por id_mapa");
    }
}

exports.eliminarPorId = async (req, res) => {
    try {
        const id = req.params.id; // Se asume que el id se pasa como un parámetro en la URL
        const resultado = await Colindancia.findByIdAndDelete(id); // Buscar y eliminar el registro por su id
        if (resultado) {
            res.send("Registro eliminado correctamente");
        } else {
            res.status(404).send("No se encontró ningún registro con ese id");
        }
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).send("Hubo un problema al eliminar el registro por id");
    }
};

// BUSCAR POR ID

exports.buscarCoordenadaPorId = async (req, res) => {
    const id = req.body.id;  // Asegúrate de obtener el ID desde el cuerpo de la solicitud

    try {
        const coordenada = await Coordenada.findById(id);  // Busca la coordenada por ID

        // Verifica si la coordenada fue encontrada
        if (!coordenada) {
            return res.status(404).json({ mensaje: 'Coordenada no encontrada' });
        }

        // Devuelve la coordenada encontrada como respuesta
        return res.status(200).json(coordenada);
    } catch (error) {
        console.error('Error al buscar coordenada por ID:', error);
       return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
// BUSCAR POR ID Y PONER NOMBRE

exports.actualizarNombreLote = async (req, res) => {
    const { id, nuevoNombre } = req.body;

    try {
        const coordenada = await Coordenada.findById(id);
        if (!coordenada) {
            return res.status(404).json({ mensaje: 'Coordenada no encontrada' });
        }

        coordenada.nombre_lote = nuevoNombre;
        await coordenada.save();

        res.status(200).json({ mensaje: 'Nombre del lote actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar nombre del lote:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// ASIGNAR UN INVENTARIO


exports.actualizarIdInventario = async (req, res) => {
    const { id, nuevoId } = req.body;

    try {
        const coordenada = await Coordenada.findById(id);
        if (!coordenada) {
            return res.status(404).json({ mensaje: 'Coordenada no encontrada' });
        }

        coordenada.id_inventario = nuevoId;
        await coordenada.save();

        res.status(200).json({ mensaje: 'ID de inventario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar ID de inventario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.actualizarEstadoLote = async (req, res) => {
    const { id, nuevoEstado } = req.body;

    try {
        // Busca el documento de Coordenada por ID
        const coordenada = await Coordenada.findById(id);
        if (!coordenada) {
            // Si no se encuentra, devuelve un error 404
            return res.status(404).json({ mensaje: 'Coordenada no encontrada' });
        }

        // Actualiza el campo estado_lote con el nuevo valor
        coordenada.estado_lote = nuevoEstado;

        // Guarda los cambios en la base de datos
        await coordenada.save();

        // Envía una respuesta exitosa con un mensaje
        res.status(200).json({ mensaje: 'Estado del lote actualizado correctamente' });
    } catch (error) {
        // En caso de un error, registra y envía un error 500
        console.error('Error al actualizar el estado del lote:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.actualizarEstadoLote = async (req, res) => {
    const { id, nuevoEstado } = req.body;

    try {
        // Busca el documento de Coordenada por ID
        const coordenada = await Coordenada.findById(id);
        if (!coordenada) {
            // Si no se encuentra, devuelve un error 404
            return res.status(404).json({ mensaje: 'Coordenada no encontrada' });
        }

        // Actualiza el campo estado_lote con el nuevo valor
        coordenada.estado_lote = nuevoEstado;

        // Guarda los cambios en la base de datos
        await coordenada.save();

        // Envía una respuesta exitosa con un mensaje
        res.status(200).json({ mensaje: 'Estado del lote actualizado correctamente' });
    } catch (error) {
        // En caso de un error, registra y envía un error 500
        console.error('Error al actualizar el estado del lote:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};



// exports.buscarPorIdMapa = async (req, res) => {
//     try {
//         const idMapa = req.params.idMapa; // Se asume que el nombreMapa se pasa como un parámetro en la URL
//         const registros = await Mapa.find({ id_mapa: idMapa }); // Buscar registros por nombreMapa
//         if (registros.length > 0) {
//            return res.json(registros); // Retorna los registros encontrados en formato JSON
//         } else {
//             res.status(404).send("No se encontraron registros con ese nombreMapa");
//         }
//     } catch (error) {
//         console.log("Hubo un problema", error);
//         res.status(500).send("Hubo un problema al buscar registros por nombreMapa");
//     }
// };







