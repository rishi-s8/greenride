const express = require('express');
const router = express.Router();
const Ride = require('../models/rides');
const Pool = require('../models/pools');

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

//Add Ride
router.post('/addUser', (req,res,next)=>{

});

router.delete('/deleteUser', (req,res,next)=>{

});

module.exports =  router;
