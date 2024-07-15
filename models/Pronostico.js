const mongoose = require('mongoose');



const PronosticoSchema = mongoose.Schema({
    
    tipo:{
        type:String,
        required:true
    }, 
    valor:{
        type:Number,
        required:false,
        default: 0
    },
    

});

module.exports = mongoose.model('Pronostico',PronosticoSchema);