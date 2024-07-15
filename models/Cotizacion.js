const mongoose = require('mongoose');
const MensualidadSchema = require('./Mensualidad').Schema;
const Schema = mongoose.Schema;


const CotizacionSchema = mongoose.Schema({
    // ID DEL LEAD
    id_usuario:{
        type:String,
        required:true
    },
    m2: {
        type: Number,
        required: true
    },
    costo_m2: {
        type: Number,
        required: true
    },
    precioSinEnganche: {
        type: Number,
        required: true
    },
    tieneEnganche: {
        type: String,
        required: true
    },
    enganche: {
        type: Number,
        required: true
    },
    plazos: {
        type: Number,
        required: true
    },
    pagosEnganche: [{ type: Schema.Types.ObjectId, ref: 'Mensualidad' }],
    mensualidades: [{ type: Schema.Types.ObjectId, ref: 'Mensualidad' }]
});

module.exports = mongoose.model('Cotizacion', CotizacionSchema);
