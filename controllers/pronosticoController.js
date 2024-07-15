const Pronostico = require("../models/Pronostico");


exports.getPronosticos = async(req,res) => {
    try{
        const pronostico = await Pronostico.find();
        res.json(pronostico);
    }
    catch(error){
        console.log(error);
        res.status(500).res('Hubo un error');
    }
}

exports.addPronostico = async(req,res) => {
    try{

        pronostico = new Pronostico(req.body);
        await pronostico.save();
        res.send(pronostico);

    }
    catch(error){
        console.log(error);
        res.status(500).res('Hubo un error');
    }
}

exports.updatePronostico = async (req, res) => {
    console.log('modificando')
    const tipop = req.body.tipo; // Suponiendo que el ID se pasa como parámetro en la URL
    console.log(tipop)
    try {
        const inventario = await Pronostico.findOne({ tipo: tipop });
        console.log(inventario)
        if (!inventario) {
            console.log('inventario no encontrado')
            return res.status(404).json({ message: 'Inventario no encontrado' });
            return
        }
        inventario.valor = req.body.valor;
        console.log(inventario)
        await inventario.save();

        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return
    }
}