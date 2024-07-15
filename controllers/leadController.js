const Lead = require('../models/Lead');

// ALTA LEADS 

exports.addLead = async (req, res) => {
    try {
        let lead;
        lead = new Lead(req.body);
        await lead.save();
        res.send(lead);

    }
    catch (error) {
        console.log("Hubo un problema");
    }
}

exports.getLeads = async (req, res) => {
    console.log("geteandoleads")
    try {
        const leads = await Lead.find();
        res.json(leads);

    }
    catch (error) {
        console.log("Hubo un problema");

    }
}

exports.getCategoryLeads = async (req, res) => {
    try {
        const leads = await Lead.find();


        const origenLeadOptions = [
            'RECOMENDACIÓN',
            'WATS APP y FACEBOOK',
            'REDES SOCIALES',
            'VISITA AL DESARROLLO',
            'ESPECTACULARES',
            'PRENSA Y REVISTAS',
            'RADIO',
            'FERIAS Y EXPOSICIONES',
            'VOLANTEO CREATIVO',
            'SINDICATOS',
            'VISITA A EMPRESAS',
            'FOLLETOS EN BANCOS',
            'CENTROS COMERCIALES',
            'OTROS'

        ];

        const conteoPorLeadOrigin = leads.reduce((conteo, lead) => {
            const leadOrigin = lead.leadOrigin;
            conteo[leadOrigin] = (conteo[leadOrigin] || 0) + 1;
            return conteo;
        }, {});

        origenLeadOptions.forEach(option => {
            if (!conteoPorLeadOrigin.hasOwnProperty(option)) {
                conteoPorLeadOrigin[option] = 0;
            }
        });

        const resultadoFinal = Object.entries(conteoPorLeadOrigin).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);

    }
    catch (error) {
        console.log("Hubo un problema");

    }
}

// OBTENER USERNAME POR ID
exports.getUsernameById = async(req, res) => {
    const userId = req.params.id;
    try {
        const usuario = await Lead.findById(userId);
        if (!usuario) {
            console.log("Usuario no encontrado");
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        res.json({ username: usuario.leadName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

exports.getLeadsProspectos = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "PROSPECTO" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "LEAD" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

//obtener todos los tipos de lead


exports.getLeadsEntregado = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "VIVIENDA ENTREGADA" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsFirmado = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "FIRMADO" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsContrato = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "CONTRATO GENERADO" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsCotizado = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "COTIZADO" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

///'INSTRUCCION NOTARIAL', 'NOTARIAL LISTO'

exports.getLeadsNotarial = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "INSTRUCCION NOTARIAL" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsListoNotarial = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "NOTARIAL LISTO" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}


exports.getLeadsApartados = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "APARTADO" });
        res.json(leads);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsByVendor = async (req, res) => {
    try {
        const leads = await Lead.find({ leadVendor: req.body.id });

        res.send(leads);

    }
    catch (error) {
        console.log("Hubo un problema");
    }
}


exports.getApartadosConteo = async (req, res) => {
    try {
        const numeroLeadsApartados = await Lead.countDocuments({ leadStatus: "APARTADO" });
        res.json({ count: numeroLeadsApartados });
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener el número de leads apartados" });
    }
}

exports.getLeadsGlobalConteo = async (req, res) => {
    try {
        const numeroLeads = await Lead.countDocuments();
        res.json({ count: numeroLeads });
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener el número de leads apartados" });
    }
}

exports.getHitrateApartado = async (req, res) => {
    try {
        const numeroLeads = await Lead.countDocuments();
        const estadosLeads = ['APARTADO', 'CONTRATO', 'FIRMADO', 'VIVIENDA ENTREGADA'];
        const numeroLeadsApartados = await Lead.countDocuments({ leadStatus: { $in: estadosLeads } });
        const responseData = [
            { "name": "Leads sin apartado", "value": numeroLeads-numeroLeadsApartados },
            { "name": "Leads con apartado", "value": numeroLeadsApartados }
          ];
          
          res.json(responseData);

    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener el número de leads apartados" });
    }
}

exports.getApartadoPorCanal = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "APARTADO" });


        const origenLeadOptions = [
            'RECOMENDACIÓN',
            'WATS APP y FACEBOOK',
            'REDES SOCIALES',
            'VISITA AL DESARROLLO',
            'ESPECTACULARES',
            'PRENSA Y REVISTAS',
            'RADIO',
            'FERIAS Y EXPOSICIONES',
            'VOLANTEO CREATIVO',
            'SINDICATOS',
            'VISITA A EMPRESAS',
            'FOLLETOS EN BANCOS',
            'CENTROS COMERCIALES',
            'OTROS'

        ];

        const conteoPorLeadOrigin = leads.reduce((conteo, lead) => {
            const leadOrigin = lead.leadOrigin;

            // Inicializa la propiedad en 0 si no existe
            conteo[leadOrigin] = (conteo[leadOrigin] || 0) + 1;

            return conteo;
        }, {});

        // Asegúrate de agregar las opciones faltantes con un valor de 0
        origenLeadOptions.forEach(option => {
            if (!conteoPorLeadOrigin.hasOwnProperty(option)) {
                conteoPorLeadOrigin[option] = 0;
            }
        });

        // Convierte el objeto en un array de objetos
        const resultadoFinal = Object.entries(conteoPorLeadOrigin).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);

    }
    catch (error) {
        console.log("Hubo un problema");

    }
}



exports.getApartadoPorprototipo = async (req, res) => {
    try {
        const leads = await Lead.find({ leadStatus: "APARTADO" });

        const conteoPorLeadOrigin = leads.reduce((conteo, lead) => {
            const leadOrigin = lead.leadModel;

            conteo[leadOrigin] = (conteo[leadOrigin] || 0) + 1;

            return conteo;
        }, {});

        const resultadoFinal = Object.entries(conteoPorLeadOrigin).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);

    }
    catch (error) {
        console.log("Hubo un problema");
    }
}


//recuperar leads por vendedor


exports.getVendorAcomulado = async (req, res) => {
    try {
        const leads = await Lead.find();

        const conteoPorLeadOrigin = leads.reduce( (conteo, lead) => {
            
            
            const leadOrigin = lead.nameVendor;

            conteo[leadOrigin] = (conteo[leadOrigin] || 0) + 1;

            return conteo;
            
        }, {});

        const resultadoFinal = Object.entries(conteoPorLeadOrigin).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);

    }
    catch (error) {
        console.log("Hubo un problema");
    }
}


/*Proceso de avanzar leads*/

exports.anvanzarLead = async (req, res) => {
    const leadId = req.body.id;
  console.log(req.body.id)

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

    const estadosSecuenciales = ['LEAD', 'PROSPECTO', 'APARTADO','COTIZADO' ,'CONTRATO GENERADO', 'FIRMADO','INSTRUCCION NOTARIAL', 'NOTARIAL LISTO', 'VIVIENDA ENTREGADA']; 

    const indiceActual = estadosSecuenciales.indexOf(lead.leadStatus);

    if (indiceActual !== -1 && indiceActual < estadosSecuenciales.length - 1) {
      lead.leadStatus = estadosSecuenciales[indiceActual + 1];

      await lead.save();

      res.json(lead);
    } else {
      res.status(400).json({ error: 'No hay un próximo estado en la secuencia para este lead.' });
    }
  } catch (error) {
    console.error("Hubo un problema", error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el lead por ID.' });
  }
  };

  
exports.setApartado = async (req, res) => {
    const leadId = req.body.id;
    const currentinteres = req.body.currentinteres;
    const modelotarget = req.body.modelotarget;


  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }
    lead.leadModel= modelotarget
    lead.idinteres = currentinteres

    await lead.save();

    res.json(lead);
    
  } catch (error) {
    console.error("Hubo un problema", error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el lead por ID.' });
  }
  };

  
exports.popApartado = async (req, res) => {
    const leadId = req.body.id;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }
    lead.leadModel= ''
    lead.idinteres = ''

    await lead.save();

    res.json(lead);
    
  } catch (error) {
    console.error("Hubo un problema", error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el lead por ID.' });
  }
  };

  
exports.regresarLead = async (req, res) => {
    const leadId = req.body.id;
  console.log(req.body.id)

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

    const estadosSecuenciales = ['LEAD', 'PROSPECTO', 'APARTADO','COTIZADO' ,'CONTRATO GENERADO', 'FIRMADO', 'INSTRUCCION NOTARIAL', 'NOTARIAL LISTO','VIVIENDA ENTREGADA']; 

    const indiceActual = estadosSecuenciales.indexOf(lead.leadStatus);

    if (indiceActual !== -1 && indiceActual < estadosSecuenciales.length - 1) {
      lead.leadStatus = estadosSecuenciales[indiceActual - 1];

      await lead.save();

      res.json(lead);
    } else {
      res.status(400).json({ error: 'No hay un próximo estado en la secuencia para este lead.' });
    }
  } catch (error) {
    console.error("Hubo un problema", error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el lead por ID.' });
  }
  };




  /*Cambiar lead de vendor*/

exports.cambiarVendorLead = async (req, res) => {
    const leadId = req.body.id;
    const nombreVendor = req.body.username;
    const idVendor = req.body.vid;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

   lead.nameVendor = nombreVendor;
   lead.leadVendor = idVendor

    await lead.save();

    res.json(lead);
    
  } catch (error) {
    console.error("Hubo un problema", error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el lead por ID.' });
  }
  };

  exports.getLeadsMes = async (req, res) => {
    try {
        const leads = await Lead.find();
        const monthNames= [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const conteoPorLeadOrigin = leads.reduce((conteo, lead) => {
            var mes =  new Date(lead.currentDate).getMonth();

            var leadOrigin =  monthNames[mes];

            conteo[leadOrigin] = (conteo[leadOrigin] || 0) + 1;

            return conteo;
        }, {});

        const resultadoFinal = Object.entries(conteoPorLeadOrigin).map(([name, value]) => ({ name, value }));


        res.json(resultadoFinal);


    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadsVendorMes = async (req, res) => {
    try {
        const leads = await Lead.find();
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const conteoPorLeadOrigin = leads.reduce((conteo, lead) => {
            const fecha = new Date(lead.currentDate);
            const mes = monthNames[fecha.getMonth()];
            const anio = fecha.getFullYear();
            const leadOrigin = `${mes} ${anio}`;
            const idVendor = lead.nameVendor;

            if (!conteo[idVendor]) {
                conteo[idVendor] = {};
            }

            if (!conteo[idVendor][leadOrigin]) {
                conteo[idVendor][leadOrigin] = 0;
            }

            conteo[idVendor][leadOrigin] += 1;

            return conteo;
        }, {});

        const resultadoFinal = Object.entries(conteoPorLeadOrigin).map(([vendor, data]) => ({
            name: `${vendor}`,
            series: Object.entries(data).map(([mes, value]) => ({ name: mes, value }))
        }));

        res.json(resultadoFinal);
    } catch (error) {
        console.log("Hubo un problema", error);
        res.status(500).json({ error: "Hubo un problema al obtener los leads" });
    }
}

exports.getLeadById = async (req, res) => {
    const leadId = req.params.id; // Suponiendo que el _id se pasa como parámetro en la URL

    try {
        const lead = await Lead.findById(leadId);
        
        if (!lead) {
            return res.status(404).json({ message: 'Lead no encontrado' });
        }
        
        res.json(lead);
    } catch (error) {
        console.error("Hubo un problema:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};