const mongoose = require('mongoose');
const ColindanciaSchema = require('./Colindancia').Schema;
const Schema = mongoose.Schema;


const InventarioSchema = mongoose.Schema({
    
    id_usuario:{
        type:String,
        required:true
    },
    id_coordenada:{
        type:String,
        required:false
    },
    desarrollo:{
        type:String,
        required:true
    },
    manzana:{
        type:String,
        required:true
    },
    lote:{
        type:String,
        requires:true
    },
    metros:{
        type:String,
        requires:true
    },
    prototipo:{
        type:String,
        requires:true
    },
    medidas:{
        type:String,
        requires:true
    },
    precioVenta:{
        type:String,
        requires:true
    },
    descuento:{
        type:Number,
        requires:true
    }, 
    estado:{
        type:String,
        requires:true,
        default:"Disponible"
    },
    
    colindancias:[{type:Schema.Types.ObjectId,ref:'Colindancia'}],

});

module.exports = mongoose.model('Inventario',InventarioSchema);