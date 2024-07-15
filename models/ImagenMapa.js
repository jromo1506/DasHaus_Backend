const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagenMapaSchema = mongoose.Schema({
    
    url:{
        type:String,
        requires:true
    },
    

});



module.exports = mongoose.model('ImagenMapa',ImagenMapaSchema);