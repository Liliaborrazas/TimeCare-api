const mongoose = require('mongoose');
require('../configs/db.config');
const User = require('../models/user.model');

User.remove({}).then(() => { console.log("Users removed") });

var users = [
    {
        email: "julio@julio.com",
        name: "Julio",
        password: "123",
        role: "carer"
    },
    {
        email: "lily@gmail.com",
        name: "Lily",
        password: "12344",
        role: "parent"
    },
    {
        email: "cowa@cowa.com",
        name: "Cowa",
        password: "12323",
        role: "parent"
    },
    {
        email: "pepe@pepe.com",
        name:"Pepe",
        password: "11111",
        role: "carer"
    },
    {
        email: "alva@alva.com",
        name: "Alvaro",
        password: "111112",
        role: "carer"
    },
    {
        email: "tito@tito.com",
        name: "Tito",
        password: "2222",
        role: "parent"
    }
]

User.create(users)
  .then(() => {
    console.info("Seeds success!");
    mongoose.connection.close();
  })