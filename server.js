const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://EvaPeng:<Abce%456258>@cluster0.8lvzpn6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());


app.use (express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ...`);
    
});

// Mongoose DB initilisation
const mongoose = require('mongoose');
const Game = require('./models/Game');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1/ba');
const db = mongoose.connection;

db.on('error', err => {
    console.log('error connecting to DB server', err);
    process.exit(1);
   

});


// authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtAuthenticate = require('express-jwt');

const checkAuth = () => {
    return jwtAuthenticate.expressjwt({
        secret: SERVER_SECRET_KEY, // check the token hasn't been tampered with
        algorithms: ['HS256'],
        requestProperty: 'auth' // gives ys 'req.auth'
    });
}; // checkAuth()



const SERVER_SECRET_KEY = 'YourChicken';




app.get('/', (req, res) => {
    console.log('Root route was requested.');
    res.json({hello: 'there'})

});

app.get('/games/:self_team/:opponent_team', async (req, res) => {
   
    
    try {
        const games = await Game.find(
            {
                self_team: req.params.self_team,
                opponent_team: req.params.opponent_team
            }
        );
        console.log('games', games);
        res.json(games);

    } catch(err) {
        console.error('error loading all games:', req.params, err);
        res.sendStatus(422)
        
    }
}); // GET /games/:/:

app.post('/games', async (req, res) => {
    
    console.log('body', req.body);

    const newGame = {
        self_team: req.body.self_team,
        opponent_team: req.body.opponent_team,
        self_score: req.body.self_score,
        opponent_score: req.body.opponent_score
    };
    try {

        const result = await Game.create(newGame)
        // const result = await Game.updateOne(
            
        //     {_id: req.body.game_id},
            
        //     {    
        //         $push: {
        //             games: newGame
        //         }
        //     }


        // ); // updateOne()
        res.json(newGame);
        console.log(newGame);
        
    } catch(err) {
        console.error('error updating flight to add reservation', err);
        res.sendStatus(422);
    }
})


// login route

// app.post('/login', async (req, res) => {
//     console.log('login:', req.body);
    
//     const {email, password } = req.body;
//     try {
//         const user = await User.findOne({email: email}); // const email = req.body.email ....
//         if(user && bcrypt.compareSync(password, user.passwordDigest)){
//             // correct credentials
//             // res.json({sucess: true})
//             const token = jwt.sign(
//                 // the data to encode in the 'payload':
//                 {_id: user._id},
                
//                 SERVER_SECRET_KEY,
//                 {expiresIn: '72h'}  // 3 days
//             );
//             res.json({token}); 

//         } else {
//             // incorrect credentials: user not found
//             res.status(401).json({sucess: false}); // unauthorised
//         }

//     } catch(err){
//         console.log('Error verifying login credentials:', err);
        
//         res.sendStatus(500); // low-level error 


//     }
    

// }); // POST /login


// app.use(checkAuth());

// // Custom middleware
// app.use( async (req, res, next) => {

//     try {
//         const user = await User.findOne({_id: req.auth._id});
//         if(user === null) {
//             res.sendStatus(401); // invalid/stale token
//             // note that byrunning a response method here
//         } else {
//             req.current_user = user;
//             next();
//         }

//     } catch(err) {
//         res.sendStatus(500);
//     }
// });

// // all routes below now have a 'req.current_user' defined
// app.get('/current_user', (req, res) => {
//     res.json(req.current_user);
// });
