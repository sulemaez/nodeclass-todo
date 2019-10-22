//bycrypt package used for encryption and hashing
const bycrpt = require('bcrypt')

//hashes a password and stores the user in the db
exports.hash = async (username,password) =>{
    
    //function to hash
    //takes the text to hash and a salt in this case 10
    //the the callback function
    bycrpt.hash(password,10,(err,hash)=>{
        
        //insterts the created user with the hashed pasword to db
        let sql = `INSERT INTO users(username,password) VALUES('${username}','${hash}')`
          
        db.query(sql,(err,results) =>{
            if(err){
                console.log(err)
                return
            }
            //return response
            console.log("registered")
        })
    })
}

//checks if the given password mataches the stored one in db
exports.confirm = (pass,hash)=> {
    return new Promise(resolve => {
        //function in byrpt used to compare a plain text to a hash
        //takes the plain text then the hash   
        bycrpt.compare(pass,hash,(err,res)=>{
             //if an error occurs or the hash doesn't match 
             //return false 
             if(err || !res){
                 console.log(err || res)
                 resolve(false)
             }
             //if password matches return true
             resolve(true)
        })
    })
}

//creates a session key and stores in db
exports.key = async (id) =>{
  return new Promise(resolve => {
    //generate key
    //from the current time
    let key = process.hrtime()
    key = `${key[1]}${id}`

    //sql to check if user already has a session
    let sql = `SELECT * FROM sessions WHERE userId = ${id}`
    
    //query
    db.query(sql,(err,res)=>{
         
        if(err){
            console.log(err)
            return
        }
       
       //if session exists
       //upadate the key to the new one 
       if(res.length > 0){
          sql = `UPDATE sessions SET sessionKey = '${key}' WHERE userId = ${id}`
       }else{
          //if session does not exist
          //create a new session 
          sql = `INSERT INTO sessions(userId,sessionKey) VALUES(${id},'${key}')`
          //store key
       }
        
        //execute query
        db.query(sql,(err,results)=>{
            if(err){
               console.log(err)
               resolve(false)
            }
            //reurn the key 
            resolve(`${key}`)
        })
    })
  })
}

//middleware to authenticate all requests
//amkes sure user sending requests is valid
exports.auth = (req,res,next) =>{
    //get the key from body 
    let key = req.body.key

    //if not  get the key from the query
    if(!key){
        key = req.query.key
    }

    //if there is no key send error
    if(!key){
       res.status(401)
       res.send({ message : "Invalid request"})   
       return
    }
    
    //if key exists validate the key
    
    //checks if the key is in the database
    let sql = `SELECT * FROM sessions WHERE sessionKey = '${key}'`
    
    //execute the query
    db.query(sql,(err,results)=>{
       
        if(err){
            console.log(err)
            res.status(500)
            res.send({ message : "error !!"})
            return
        }
          
         if(results.length > 0){
             //if key exists allow the request to go through
             next()
         }else{
              //if key not exists return error
            res.status(401)
            res.send({ message : "Invalid request"})   
         }
       })


}