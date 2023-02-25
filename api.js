const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('./models/users');
const mongoose = require('mongoose')

//Database connection
mongoose.connect("mongodb+srv://uzairjunaidkhan:9p.5C7U2Ma9NhYf@mean-app.yygqjic.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser: true},(err) =>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("sucessfully connected!")
    }
}
);

router.get('/', (req, res) => {
    res.send('send');
})


////////////////////////////////////////

router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special', (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })
  
  //////////////////////////////////////////

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) =>{
        if(error){
            console.log(error)
        }else{
            let payload = { subject: registeredUser._id, role: registeredUser.role }
            let token = jwt.sign(payload, 'confidential-work') 
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) =>{
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) =>{

        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid Email')
            }
            else if(user.password != userData.password){
                res.status(401).send('Invalid password')
            }
            else{
                let payload = { subject: user._id, role: user.role }
                let token = jwt.sign(payload, 'confidential-work')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/read', (req, res) => {
  User.find({}, (err, result) =>{
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  });
  
});


module.exports = router 