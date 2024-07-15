const mongoose = require('mongoose');


const ColindanciaSchema = mongoose.Schema({
    
    id_inventario:{
        type:String,
        required:true
    },
    manzanac:{
        type:String,
        required:true
    },
    lotec:{
        type:String,
        requires:true
    },
    metros:{
        type:String,
        requires:true
    },
    direccion:{
        type:String,
        requires:true
    },
    

});

module.exports = mongoose.model('Colindancia',ColindanciaSchema);