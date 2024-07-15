const mongoose = require('mongoose');
const CoordenadaSchema = require('./Coordenadas').Schema;
const Schema = mongoose.Schema;


const MapaSchema = mongoose.Schema({
    
    nombreMapa:{
        type:String,
        required:true
    }, 
    urlMapa:{
        type:String,
        required:true
    },
    coordenadas:[{type:Schema.Types.ObjectId,ref:'Coordenada'}],
});



module.exports = mongoose.model('Mapa',MapaSchema);