const mongoose = require('mongoose');


const CoordenadaSchema = mongoose.Schema({
    
    id_mapa:{
        type:String,
        required:true
    }, 
    nombre_lote:{
        type:String,
        required:false,
        default: 'Sin definir'
    },
    id_inventario:{
        type:String,
        required:false,
        default:'Sin asignar'
    },
    estado_lote:{
        type:String,
        required:false,
        default: 'Disponible'
    },

    coordenadaX:{
        type:Number,
        required:true
    },
    coordenadaY:{   
        type:Number,
        requires:true
    }

});

module.exports = mongoose.model('Coordenada',CoordenadaSchema);