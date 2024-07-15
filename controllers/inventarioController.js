const Inventario = require("../models/Inventario");

exports.addInventario = async(req,res)=>{
    console.log(req.body);
    try{
        let inventario;
        inventario = new Inventario(req.body);
        await inventario.save();
        res.send(inventario);

    }
    catch(error){
         console.log(error);
        console.log("Tienes una problema");
    }
}

exports.getInventarios = async(req,res) =>{
    try{
        const inventario = await Inventario.find();
        res.json(inventario);

    }
    catch(error){
        console.log("Hubo un problema");
    }
}

exports.getInventariosDisponibles = async(req,res) =>{
    try{
        const inventario = await Inventario.find({ estado: "Disponible" });
        res.json(inventario);

    }
    catch(error){
        console.log("Hubo un problema");
    }
}

exports.assignColindancias = async (req, res) => {
    const { inventarioId, colindanciasArray } = req.body; // Suponiendo que los datos vienen en el cuerpo de la solicitud
    
    try {
        // Actualizar el inventario con las nuevas colindancias
        const inventarioActualizado = await Inventario.findByIdAndUpdate(inventarioId, { colindancias: colindanciasArray }, { new: true });

        if (!inventarioActualizado) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }

        return res.status(200).json({ inventario: inventarioActualizado });
    } catch (error) {
        console.error('Error al asignar colindancias:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};



exports.getInventarioPorId = async (req, res) => {
    try {
        const { id } = req.params; // Suponiendo que el ID se pasa como parámetro en la URL
        
        const inventario = await Inventario.findById(id);
        
        if (!inventario) {
            return res.status(404).json({ mensaje: 'Inventario no encontrado' });
        }
        
        res.json(inventario);
    } catch (error) {
        console.log("Hubo un problema:", error);
        res.status(500).json({ mensaje: 'Hubo un problema al buscar el inventario' });
    }
};

exports.updateInventario = async (req, res) => {
    console.log('modificando')
    const id = req.body.id; // Suponiendo que el ID se pasa como parámetro en la URL

    try {
        const inventario = await Inventario.findById(id);
        console.log(inventario)
        if (!inventario) {
            console.log('inventario no encontrado')
            return res.status(404).json({ message: 'Inventario no encontrado' });
            return
        }
        inventario.desarrollo = req.body.desarrollo;
        inventario.manzana = req.body.manzana;
        inventario.lote = req.body.lote;
        inventario.prototipo = req.body.prototipo;
        inventario.medidas = req.body.medidas;
        inventario.precioVenta = req.body.precioVenta;
        inventario.descuento = req.body.descuento;

        // Guarda los cambios en la base de datos
        await inventario.save();

        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return
    }
}

exports.getConteoStatus = async (req, res) => {
    try {
        const inventarios = await Inventario.find();

        const conteostatus = inventarios.reduce((conteo, inv) => {
            const estadoinv = inv.estado;

            conteo[estadoinv] = (conteo[estadoinv] || 0) + 1;

            return conteo;
        }, {});

        const resultadoFinal = Object.entries(conteostatus).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);
        return
    }
    catch (error) {
        console.log("Hubo un problema");
    }
}

//totalventas

exports.getotalventas = async (req, res) => {
    try {
        const inventarios = await Inventario.find({
            $or: [
                { estado: "Ocupado" },
                { estado: "Apartado" }
                // Agrega más condiciones OR si es necesario
            ]
        });

        // Calcula el total de respuestas
        const totalRespuestas = inventarios.length;

        // Envía el total de respuestas junto con los resultados de la consulta
        res.status(200).json(totalRespuestas);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ error: "Error al obtener las etapas de desarrollo" });
    }
};


//APARTADOS Y VENDIDOS POR DESARROLLO

exports.getEtapasDesarrollo = async (req, res) => {
    try {
        const inventarios = await Inventario.find({
            $or: [
              { estado: "Ocupado" },
              { estado: "Apartado" }
              // Agrega más condiciones OR si es necesario
            ]
          });

        const conteostatus = inventarios.reduce((conteo, inv) => {
            const estadoinv = inv.desarrollo;

            conteo[estadoinv] = (conteo[estadoinv] || 0) + 1;

            return conteo;
        }, {});

        const resultadoFinal = Object.entries(conteostatus).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);
        return
    }
    catch (error) {
        console.log("Hubo un problema");
    }
}






exports.assignCoordenada = async (req, res) => {
    const { inventarioId, coordenadaId } = req.body; // Suponemos que el inventarioId y coordenadaId vienen en el cuerpo de la solicitud

    try {
        // Encontrar el inventario por su ID
        const inventario = await Inventario.findById(inventarioId);

        if (!inventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }

        // Asignar el ID de la coordenada al inventario
        inventario.id_coordenada = coordenadaId;

        // Guardar el inventario actualizado
        await inventario.save();

        // Devolver el inventario actualizado en la respuesta JSON
        return res.status(200).json({ inventario });

    } catch (error) {
        console.error('Error al guardar ID de coordenada en el inventario:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

//Borrar inventario
exports.borrarInv = async(req,res)=>{
    try{
        const idparam = req.body.id;
        var borrado2 = await Inventario.deleteMany({ _id: idparam });
        
        res.send(borrado2);
        return

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}



// Función para cambiar el atributo 'estado'
exports.cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;  // Obtén el ID del documento desde los parámetros de la solicitud
        const { estado } = req.body;  // Obtén el nuevo estado desde el cuerpo de la solicitud
        
        // Encuentra el documento por ID y actualiza el atributo 'estado'
        const inventario = await Inventario.findByIdAndUpdate(id, { estado }, { new: true });
        
        if (!inventario) {
            // Si el documento no se encuentra
            return res.status(404).json({ mensaje: 'Inventario no encontrado' });
        }
        
        // Responde con el inventario actualizado
        res.json(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};









