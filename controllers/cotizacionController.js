const Cotizacion = require("../models/Cotizacion");

exports.addCotizacion = async(req,res)=>{
    try{
        let cotizacion;
        cotizacion = new Cotizacion(req.body);
        await cotizacion.save();
        res.send(cotizacion);

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}


// Buscar todas las cotizaciones que capturo X usuario
exports.buscarCotizacionPorIdUsuario = async(req,res)=>{
    try{
        const id_Usuario = req.body.id;
        var respuesta = await Cotizacion.findOne({ id_usuario: id_Usuario });
        res.send(respuesta);
        return

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}

// Buscar todas las cotizaciones que capturo X usuario
exports.borrarCotizacionPorIdUsuario = async(req,res)=>{
    try{
        const id_Usuario = req.body.id;
        var borrado = await Cotizacion.findOne({ id_usuario: id_Usuario });
        var borrado2 = await Cotizacion.deleteMany({ id_usuario: id_Usuario });
        res.send(borrado);
        return

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}

// Obtener una cotizacion cuando se de clic en la lista de cotizaciones
exports.buscarCotizacionPorIdCotizacion = async(req,res) => {
    try{
        const id_cotizacion = req.body.id_cotizacion;
        console.log(id_cotizacion)
        var resultados= await Cotizacion.find();
        console.log(resultados)
        res.send(resultados);

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}





