// require express package, burger model file, and exprss router
const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

// routes 
router.get("/", (req,res) => {
    burger.selectAll(function(data) {
        let hbsObject = { burgers: data };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// post route
router.post("/api/burgers", function(req, res) {
    burger.insertOne({burger_name: req.body.burger_name, devoured: req.body.devoured}, function(result) {
        // send back the ID of new burger
        res.json({ id: result.insertId });
    });
});
// put route
router.put("/api/burgers/:id", function(req, res) {
    const burgerId = { id: req.params.id };
    // const devoured = req.params.devoured;
   
    console.log("burger id:" + burgerId);
    const updateValues = {
        // switch boolean to tiny int
        devoured: (req.body.devoured === "true" ? 1 : 0)
    };
    console.log(updateValues);
    burger.updateOne( updateValues, burgerId, function(result) {
        // devoured: req.body.devoured
        if (result.changedRows == 0) {
            // if no rows changed, then ID doesn't exist ... 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
    // delete route
    router.delete("/api/burger/:id", (req,res) => {
        burger.delete({ id: req.params.id }, data => {
            console.log(data);
            res.json(data);
        });
    });
// export the router

module.exports = router;