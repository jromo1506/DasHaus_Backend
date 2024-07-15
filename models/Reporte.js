const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReporteSchema = mongoose.Schema({
    
    tipo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:false
    },
    id_usuario:{
        type:String,
        required:false
    },
    fecha:{
        type:String,
        required:false
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    }
    
    

});

module.exports = mongoose.model('Reporte',ReporteSchema);