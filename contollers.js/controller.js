
//handles the login request
exports.login = (req,res) => {

    let sql = "SELECT * FROM users WHERE username = '"+req.body.username+"' AND password = '"+req.body.password+"'"
    
    //query the db
    db.query(sql,(err,results)=>{

        if(err){
            console.log(err)
            res.send({ message : "Error in db !"})
            return
        }

        //if we have some rows returned length of results will be one
        //results is json aray , with the returned rows as json objects within the array
        if(results.length > 0){
            //if user found return the message and id
            res.send({ message : "Authenticated", id : results[0].id})
        }else{

            res.send({ message : "Not Authenticted"})
        }
        
    })
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


