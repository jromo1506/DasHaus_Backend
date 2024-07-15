const ImagenMapa = require("../models/ImagenMapa");


// AÑADIR UN NUEVO MAPA
exports.addMapa = async(req,res)=>{
    try{
        let mapa;
        mapa = new ImagenMapa(req.body);
        await mapa.save();
        res.send(mapa);

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
} 




// OBTENER TODOS LOS MAPAS
exports.getMapas = async(req,res) => {
    try{
        const mapa = await ImagenMapa.find();
        res.json(mapa);
    }
    catch(error){
        console.log(error);
        res.status(500).res('Hubo un error');
    }
}



// OBTENER MAPA POR ID
exports.getMapasById = async(req,res) => {
    const mapId = req.body.id;
    try{
        const mapa = await ImagenMapa.findById(mapId);
        if (!mapa) {
            console.log("lead no encontrado")
            res.json(null);
        }
        res.json(mapa);
    }
    catch(error){
        res.json(null);
    }
}





