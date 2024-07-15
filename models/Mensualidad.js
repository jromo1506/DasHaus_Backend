const mongoose = require('mongoose');

const MensualidadSchema = mongoose.Schema({
    id_cotizacion:{
        type:String,
        required:true

    },
    es_enganche_o_mensualidad:{
        type:String,
        required:true
    },
    periodo:{
        type:String,
        required:true
    },
    pago:{
        type:String,
        required:true
    },
    fecha_pago:{
        type:String,
        required:true
    },  
    interes:{
        type:Number,
        required:false
    },
    capitalAmortizado:{
        type:Number,
        required:false
    },
    saldoFinalDePeriodo:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('Mensualidad',MensualidadSchema);
