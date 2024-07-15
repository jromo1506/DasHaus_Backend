const mongoose = require('mongoose');
const LeadSchema = mongoose.Schema({
    leadName:{
        type:String,
        requires:true
    },
    nota:{
        type:String,
        requires:true
    },
    leadOrigin:{
        type:String,
        requires:true

    },
    leadEmail:{
        type:String,
        requires:true

    },
    leadNumber:{
        type:String,
        requires:true
    },
    leadModel:{
        type:String,
        requires:true
    },
    leadStatus:{
        type:String,
        requires:true
    },
    leadDate:{
        type:Date,
        requires:true
    },
    leadVendor:{
        type:String,
        requires:true
    },
    nameVendor:{
        type:String,
        requires:true
    },
    idinteres:{
        type:String,
        requires:true
    },
    currentDate:{
        type:String,
        requires:true
    }


});

module.exports = mongoose.model('Lead',LeadSchema);