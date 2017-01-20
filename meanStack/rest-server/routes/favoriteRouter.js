var express = require('express')
var bodyParser = require('body-parser')

var Favorites = require('../models/favoriteSchema')
var Verify = require('./verify')

var favoritesRouter = express.Router()

favoritesRouter.use(bodyParser.json())

/* Route '/' */

favoritesRouter
  .route('/')

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    var userId = req.decoded._doc._id

    Favorites.find({ postedBy: userId })
      .populate('postedBy dishes')
      .exec(function (err, dish) {
        if (err) return next(err)
        res.json(dish)
      })
  })

  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    var userId = req.decoded._doc._id
    var dishId = req.body._id

    Favorites.update({ postedBy: userId },
      { $push: { dishes: dishId } },
      { upsert: true },
      function (err, data) {
        if (err) return next(err)
        res.json(data)
      })
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    var userId = req.decoded._doc._id

    Favorites.remove({ postedBy: userId }, function (err, resp) {
      if (err) next(err)
      res.json(resp)
    })
  })

favoritesRouter
  .route('/:dishId')

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    var dishId = req.params.dishId

    Favorites.findByIdAndRemove(dishId, function (err, resp) {
      if (err) return next(err)
      res.json(resp)
    })
  })

module.exports = favoritesRouter
