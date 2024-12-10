var userDB = require('../model/model')

//create and save new user 
exports.create = (req, res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"})
        return
    }
    // new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the DB
    user
        .save(user)
        .then(data=>{
            //res.send(data)
            res.redirect('/')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "some error occurred while create user"
            })
        })
        
}

// retrieve and return all users/ single user
exports.find = (req, res)=>{
    
     // find user by id
    if(req.query.id)
    {
        const id = req.query.id
        userDB.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user"})
                }
                else{
                    res.send(data)
                }
            })        
            .catch(err=>{
                res.status(500).send({message: "Error Occurred while retriving"})
            })
    }
    else // find all users
    {
       
        userDB.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error Occurred while retriving"})
        })
    }


   
}

// update user by id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    const id = req.params.id
    userDB.findByIdAndUpdate(id, req.body)
        .then(data=> {
            if(!data){
                res.status(400).send({message: `Cannot update user with id: ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error update user information"})
        })
}

// detele user by id

exports.delete = (req, res)=>{
    
    const id = req.params.id
    userDB.findByIdAndDelete(id)
        .then(data=> {
            if(!data){
                res.status(400).send({message: `Cannot delete user with id: ${id}`})
            }else{
                res.send({message: "User was deleted successfully"})
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error delete user "})
        })

}