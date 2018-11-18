const express = require('express');
const router = express.Router();
const Ride = require('../models/rides');
const Pool = require('../models/pools');
const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var config = {
    apiKey: "AIzaSyApwCN3N5pLJgQpTvlT4SGAIyUgN5DcuBk",
    authDomain: "greenride-21c1c.firebaseapp.com",
    databaseURL: "https://greenride-21c1c.firebaseio.com",
    projectId: "greenride-21c1c",
    storageBucket: "greenride-21c1c.appspot.com",
    messagingSenderId: "343803324174"
  };
  firebase.initializeApp(config);

//Get current User
router.get('/getCurrentUser', (req,res,next)=>{
  res.json({user: (firebase.auth().currentUser)['email']});
});

//signup
router.post('/signUp', (req,res,next)=>{
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    res.json({error: [errorCode, errorMessage]});
    // ...
  });
});

//login
router.post('/login', (req,res,next)=>{
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  res.json({error: [errorCode, errorMessage]});
  // ...
});
res.json({user: email});
});

//signout

router.post('/signout', (req,res,next)=>{
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  res.json({msg: "Logged out successfully"});
}).catch(function(error) {
  // An error happened.
  res.json({msg: "Logout failed"});
});
});



//Retrieve all available rides
router.get('/getRides', (req,res,next)=>{
  Ride.find((err,rides)=>{
    res.json(rides);
  });
});

//Add Ride
router.post('/addRide', (req,res,next)=>{
  let newRide = new Ride({
    user: req.body.user,
    totalSeats: req.body.totalSeats,
    availableSeats: req.body.totalSeats,
    time: req.body.time,
    src: req.body.src,
    dest: req.body.dest,
    paid: req.body.paid,
    amount: req.body.amount
  });
  if(newRide.user!=(firebase.auth().currentUser)['email'])
  {
    res.json({msg:"User not logged in"});
    return;
  }
  newRide.save((err,ride)=>{
    if(err){
      res.json({msg: "Failed to add ride"});
    }
    else{
      res.json({msg: "Ride added successfully"});
    }
  });
});

//Delete Ride
router.post('/deleteRide', (req,res,next)=>{
  Ride.findByIdAndRemove(req.body._id, (err, ride)=>{
    if(ride.user!=(firebase.auth().currentUser)['email'])
    {
      res.json({msg:"User not logged in"});
      return;
    }
    if(err){
      res.json({msg: "Failed to remove ride"});
    }
    else{
      res.json({msg: "Ride removed successfully"});
    }
  });
});
// -------------------------------------------------

//Retrieve all available pools for given user
router.get('/getPools/:user', (req,res,next)=>{
  if(req.params.user!=(firebase.auth().currentUser)['email'])
  {
    res.json({msg:"User not logged in"});
    return;
  }
  Pool.find({user: req.params.user},(err,pools)=>{
    res.json(pools);
  });
});

//Add Pool
router.post('/addPool', (req,res,next)=>{
  let newPool = new Pool({
    ride: req.body.ride,
    user: req.body.user,
    bookedSeats: req.body.bookedSeats
  });
  if(newPool.user!=(firebase.auth().currentUser)['email'])
  {
    res.json({msg:"User not logged in"});
    return;
  }
  // console.log(newPool.ride);
  Ride.findOne({_id: newPool.ride}, (err, ride)=>{
    if(err)
    {
      console.log("Cannot find ride");
    }
    else {
      if(ride==null)
      {
        console.log("Cannot find ride");
        res.json({msg: "Cannot find ride"});
        return;
      }
      if(ride.availableSeats>=newPool.bookedSeats)
      {
        ride.availableSeats = ride.availableSeats-newPool.bookedSeats;
        ride.save((err)=>{
          if(err){
            console.log("error");
          }
        });
        newPool.save((err,pool)=>{
          if(err){
            res.json({msg2: "Failed to add Pool"});
          }
          else{
            res.json({msg2: "Pool added successfully"});
          }
        });
      }
      else {
        console.log("Error2");
      }
    }
  });
//  console.log(ride.user);

});

//Delete Pool
router.post('/deletePool', (req,res,next)=>{
  Pool.findOne({_id: req.body._id}, (err, pool)=>{
    if(pool.user!=(firebase.auth().currentUser)['email'])
    {
      res.json({msg:"User not logged in"});
      return;
    }
    Ride.findOne({_id: pool.ride}, (err, ride)=>{
      if(err)
      {
        res.json({msgRide: "Cannot Find Ride"});
        console.log("Cannot Find Ride");
      }
      else {
        if(ride==null)
        {
          console.log("Cannot find ride");
          res.json({msgRide: "Cannot find ride"});
          return;
        }
        ride.availableSeats = ride.availableSeats + pool.bookedSeats;
        ride.save((err)=>{
          if(err){
            console.log("Could not save ride");
            res.json({msgRide: "Could not save ride"});
          }
        });
        pool.remove((err)=>{
          if(err){
            console.log("Could not delete");
            res.json({msgPool: "Pool not deleted"})
          }
          else {
            res.json({msg: "Pool removed successfully"})
          }
        });
      }
    });
  });
});

module.exports =  router;
