const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Game = require('./Game');
const User = require('./User');


mongoose.connect('mongodb://127.0.0.1/ba')

const db = mongoose.connection;

db.on('error', err => {
    console.log('DB connection error', err);
    process.exit(1);
    
});

db.once('open', async () => {
    console.log('sucess! DB connected, model loaded.');
   
    await Game.deleteMany();

    const createdGames = await Game.create([
        {
        self_team: 'Brazil',
        opponent_team: 'France',
        game_date: new Date('2022-11-20T04:20:00Z'),
        self_score: 0,
        opponent_score: 1
        },
        {
        self_team: 'France',
        opponent_team: 'England',
        game_date: new Date('2022-11-20T04:20:00Z'),
        self_score: 2,
        opponent_score: 1
        }
    ])

    console.log('games:', createdGames);

// User seed
    await User.deleteMany();
    const createUsers = await User.create([
        {name: 'Eva Peng',
        email: 'eva@ga.co',
        passwordDigest: bcrypt.hashSync('chicken', 10), 
        }, // user 1

        {name: 'Harvey Li',
        email: 'harvey@ga.co',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        
        }, // user 2
    ]); // User.create

    console.log('Users:', createUsers)
    
    
    process.exit(0);
});