var express = require('express');
var bodyParser = require('body-parser')
var leaderRouter = express.Router();
var Leaders = require('../models/leadership');

var Verify = require('./verify');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Leaders.find({}, function (err, leaders) {
        if (err) throw err;
        res.json(leaders);
    });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
  Leaders.create(req.body, function (err, dish) {
      if (err) throw err;
      console.log('Leader created!');
      var id = dish._id;

      res.writeHead(200, {
          'Content-Type': 'text/plain'
      });
      res.end('Added the leader with id: ' + id);
  });

})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Leaders.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
  });

});

leaderRouter.route('/:leaderId')
.get(function(req,res,next){
    Leaders.findById(req.params.leaderId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function(req, res, next){
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function(req, res, next){
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = leaderRouter;
