const Reporte = require("../models/Reporte");

// ALTAS USUARIOS
exports.addReporte = async(req,res) =>{
    try{
        let reporte;
        reporte = new Reporte(req.body);
        await reporte.save();
        res.send(reporte);
    }
    catch(error){
        console.log("Hubo un problema");
    }
}

// OBTENER TODOS LOS USUARIOS
exports.getReportes = async(req,res) => {
    try{
        const reporte = await Reporte.find({ status: true });
        res.json(reporte);
    }
    catch(error){
        console.log(error);
        res.status(500).res('Hubo un error');
    }
}

exports.getReportesfin = async(req,res) => {
    try{
        const reporte = await Reporte.find({ status: false });
        res.json(reporte);
    }
    catch(error){
        console.log(error);
        res.status(500).res('Hubo un error');
    }
}

//obtener conteo reportes por categoria

exports.getReportesCategoria = async (req, res) => {
    try {
        const reportes = await Reporte.find({ status: true });

        const conteoPorTipo = reportes.reduce((conteo, reporte) => {
            const tipo = reporte.tipo;

            conteo[tipo] = (conteo[tipo] || 0) + 1;

            return conteo;
        }, {});

        const resultadoFinal = Object.entries(conteoPorTipo).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);

    }
    catch (error) {
        console.log("Hubo un problema");
    }
}


exports.deleteReporte = async(req,res) =>{
    const reporteId = req.params.id;
    console.log(reporteId)
    try{
        const deletedReporte = await Reporte.findByIdAndDelete(reporteId);
        if (!deletedReporte) {
        return res.status(404).send("Reporte no encontrado");
        }
        res.send(deletedReporte);
        }
    catch(err){
        console.error(err);
        res.status(500).send("Error al eliminar el Reporte");
    }
}



exports.setEstado = async (req, res) => {
  const reporteId = req.body.id;
  const reporteStatus = req.body.status;

  try {
    const rep = await Reporte.findById(reporteId);
    if (!rep) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }
    rep.status = reporteStatus;
   

    await rep.save();

    res.json(rep);
    
  } catch (error) {
    console.error("Hubo un problema", error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el lead por ID.' });
  }
};

