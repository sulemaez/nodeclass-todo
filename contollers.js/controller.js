
let auth = require('../auth/auth')

//handles the login request
exports.login = (req,res) => {

    let sql = "SELECT * FROM users WHERE username = '"+req.body.username+"'";
    
    //query the db
    db.query(sql,async (err,results)=>{

        if(err){
            console.log(err)
            res.send({ message : "Error in db !"})
            return
        }

        //if we have some rows returned length of results will be one
        //results is json aray , with the returned rows as json objects within the array
        if(results.length > 0){
            let valid = await auth.confirm(req.body.password,results[0].password)
            if(valid) {
                //create the key
                let key = await auth.key(results[0].id)
                console.log("HERERERE"+key)
                //send the key
                res.send({ message  : "Authenticated",key : key ,id : results[0].id})
            }
        }else{

            res.send({ message : "Not Authenticted"})
        }
        
    })
}

exports.signup = (req,res) =>{
    //get our pass and username
    let password = req.body.password
    let username = req.body.username
    
    //if user found return the message and id
    res.send({ message : "Registered", })

    //hash pass
    auth.hash(username,password)
   
  
} 


//handles request of a user's list
exports.getItems = (req,res) => {
    let sql = "SELECT * FROM lists WHERE userId = "+req.query.id

    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
            res.send({ message : "Error in db !"})
            return
        }
        
        if(results.length > 0){
            res.send(results)
        }else{
            res.send([])
        }
        
    })
}


