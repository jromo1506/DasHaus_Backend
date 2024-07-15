const Colindancia = require("../models/Colindancia");

exports.addColindancia = async(req,res)=>{
    try{
        let colindancia;
        console.log(req.body,"Info");
        colindancia = new Colindancia(req.body);
        await colindancia.save();
        res.send(colindancia);

    }
    catch(error){
        console.log("Hubo un problema",error);
    }
} 


exports.getColindanciasById = async (req, res) => {
    try {
        const { id } = req.params; // Obtén el ID del parámetro de la solicitud
        console.log("se va a buscar" + id);
        // Busca todas las colindancias que tengan el ID proporcionado
        const colindancias = await Colindancia.find({ id_inventario: id });

        if (colindancias.length === 0) {
            return res.status(404).json({ message: "No se encontraron colindancias con el ID proporcionado" });
        }

        res.json(colindancias); // Envía las colindancias encontradas como respuesta
    } catch (error) {
        console.error("Hubo un problema:", error);
        res.status(500).json({ message: "Hubo un problema al buscar las colindancias" });
    }
}