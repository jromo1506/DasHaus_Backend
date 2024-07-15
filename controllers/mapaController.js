const Mapa = require("../models/Mapa");



exports.addMapa = async(req,res)=>{
    try{
        let mapa;
        mapa = new Mapa(req.body);
        await mapa.save();
        res.send(mapa);

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
} 



exports.eliminarPorId = async (req, res) => {
    try {
        const id = req.params.id; // Se asume que el id se pasa como un parámetro en la URL
        const resultado = await Mapa.findByIdAndDelete(id); // Buscar y eliminar el registro por su id
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


exports.getMapas = async(req,res) =>{
    try{
        const mapa = await Mapa.find();
        res.json(mapa);
    }
    catch(error){
        console.log("Hubo un problema");
    }
}



exports.assignCoordenadas = async (req, res) => {
    const { nombreMapa, coordenadasArray } = req.body; // Suponiendo que los datos vienen en el cuerpo de la solicitud
    
    try {
        console.log(nombreMapa,"Nombre del mapa");
        // Actualizar el inventario con las nuevas colindancias
        const mapaActualizado = await Mapa.findByIdAndUpdate(nombreMapa, { coordenadas: coordenadasArray }, { new: true });

        if (!mapaActualizado) {
            return res.status(404).json({ error: 'Mapa no encontrado' });
        }

        return res.status(200).json({ mapa: mapaActualizado });
    } catch (error) {
        console.error('Error al asignar colindancias:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getMapaPorId = async(req,res) =>{
    try {
        const { id } = req.params; // Suponiendo que el ID se pasa como parámetro en la URL
        
        const mapa = await Mapa.findById(id);
        
        if (!mapa) {
            return res.status(404).json({ mensaje: 'Inventario no encontrado' });
        }
        
        res.json(mapa);
    } catch (error) {
        console.log("Hubo un problema:", error);
        res.status(500).json({ mensaje: 'Hubo un problema al buscar el inventario' });
    }
}

exports.deleteMapa = async(req,res) =>{
    const idmapa = req.params.id;
    try{
        const deleteMapa = await Mapa.findByIdAndDelete(idmapa);
        if (!deleteMapa) {
        return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).send("Usuario eliminado correctamente");
        }
    catch(err){
        console.error(err);
        res.status(500).send("Error al eliminar el usuario");
    }
}



