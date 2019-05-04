const express = require('express');
const router = express.Router();
const db = require('../config/database');

const shelter = require("../models/Shelter")

router.get("/", (req,res) => {
    shelter.findAll()
    .then(shelters => res.send(shelters))
    .catch(err => console.log(err))
});

router.post("/", (req,res) => {
    let { name, address, city, state, zip, gender, day, timein, timeout, beds, ages_served, registration } = req.body;

   if (!name || !address || !city || !state || !zip || !gender || !day || !timein || !timeout || !beds || !ages_served || !registration) {
        res.send(400);
    }
    const newShelter = shelter.build({
        name,
        address,
        city,
        state,
        zip,
        gender,
        day, 
        timein,
        timeout,
        beds,
        ages_served,
        registration
    })
    newShelter.save()
    .then(() => res.send("shelter saved"))
    .catch(() => console.log(err))
})

module.exports = router;