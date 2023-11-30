const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.js");

//object id pass
const ObjectId = require('mongoose').Types.ObjectId; // Assuming you're using Mongoose for MongoDB


// get, post, put, delete
// base path : http://localhost:3000/employees

//get api

 router.get('/', async (req, res) => {
    try {
      const users = await Employee.find(); // Retrieve data using the model
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  });
  

  //get single api

 
  router.get('/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      const userID = await Employee.findById(req.params.id);
      if (userID) {
        res.send(userID); // Return the user data if it exists
      } else {
        console.log('error in get data: ' + req.params.id);
        res.status(500).json({ error: 'Failed to get data' }); // Return an error if user data is not found
      }
    } else {
      res.status(400).json({ error: 'Invalid ID: ' + req.params.id });
    }
  });
  
  
  

//post api

router.post('/', async (req,res)=>{
    let emp = new Employee({
    name:req.body.name,
    email:req.body.email,
    mobile:req.body.mobile,
    subject:req.body.subject,
    desc:req.body.desc,

    });

  try {
    const test =  await emp.save(); // Retrieve data using the model
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

//update api

router.put('/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {

        let emp = {
          name:req.body.name,
          email:req.body.email,
          mobile:req.body.mobile,
          subject:req.body.subject,
          desc:req.body.desc,
            };

      const deleteId = await Employee.findByIdAndUpdate(req.params.id, {$set:emp},{new:true});
      if (deleteId) {
        res.send(deleteId); // Return the user data if it exists
      } else {
        console.log('error in update data: ' + req.params.id);
        res.status(500).json({ error: 'Failed to update data' }); // Return an error if user data is not found
      }
    } else {
      res.status(400).json({ error: 'Invalid ID: ' + req.params.id });
    }
  });








//delte api

router.delete('/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      const deleteId = await Employee.findByIdAndDelete(req.params.id);
      if (deleteId) {
        res.send(deleteId); // Return the user data if it exists
      } else {
        console.log('error in delete data: ' + req.params.id);
        res.status(500).json({ error: 'Failed to delete data' }); // Return an error if user data is not found
      }
    } else {
      res.status(400).json({ error: 'Invalid ID: ' + req.params.id });
    }
  });
  

module.exports = router;