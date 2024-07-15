const Cotizacion = require("../models/Cotizacion");
const Mensualidad = require("../models/Mensualidad");



exports.addMensualidad = async(req,res)=>{
    try{
        let mensualidad;
        mensualidad= new Mensualidad(req.body);
        await mensualidad.save();
        res.send(mensualidad);
    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}


exports.buscarPorIdCotizacion = async(req,res)=>{
    try{
        const id_cotizacion = req.body.id;
        console.log(id_cotizacion)
        var resultados= await Mensualidad.find({ id_cotizacion: id_cotizacion });
        console.log(resultados, "resultados de busqueda")
        res.send(resultados);
        return
    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}


exports.borrarPorIdCotizacion = async(req,res)=>{
    try{
        const id_cotizacion = req.body.id;
        console.log(id_cotizacion, 'borrando por Cotizacion')
        await Mensualidad.deleteMany({id_cotizacion: id_cotizacion});
        res.send('logrado');
        return
    }
    catch(error){
        console.log("Hubo un problema",error);
    }
}

