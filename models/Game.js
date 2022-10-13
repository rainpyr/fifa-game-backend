const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({

    self_team: String,
    opponent_team: String,
    self_score: Number,
    opponent_score: Number,
    created_at: {
        type: Date, 
        default: Date.now()
    }
    
});  // end of schema definition;

const model = mongoose.model('Game', GameSchema);



module.exports = model;