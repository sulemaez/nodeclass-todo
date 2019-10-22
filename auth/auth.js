const bycrpt = require('bcrypt')

exports.hash = async (username,password) =>{
   
    bycrpt.hash(password,10,(err,hash)=>{
          //store in db

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

exports.confirm = (pass,hash)=> {
    return new Promise(resolve => {
        bycrpt.compare(pass,hash,(err,res)=>{
             if(err || !res){
                 console.log(err || res)
                 resolve(false)
             }
             resolve(true)
        })
    })
}


exports.key = async (id) =>{
  return new Promise(resolve => {
          //generate key
    let key = process.hrtime()
    
    let sql = `SELECT * FROM sessions WHERE userId = ${id}`
    
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }
       
       if(res.length > 0){
          sql = `UPDATE sessions SET sessionKey = '${key[1]}${id}' WHERE userId = ${id}`
       }else{
          sql = `INSERT INTO sessions(userId,sessionKey) VALUES(${id},'${key[1]}${id}')`
          //store key
       }

       db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
            resolve(false)
        }
       
         resolve(`${key[1]}${id}`)
       })
    })
  })
}

exports.auth = (req,res,next) =>{
    let key = req.body.key
    if(!key){
        key = req.query.key
    }
    console.log(key)
    if(!key){
       res.status(401)
       res.send({ message : "Invalid request"})   
       return
    }
    
    let sql = `SELECT * FROM sessions WHERE sessionKey = '${key}'`
    
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
            res.status(500)
            res.send({ message : "error !!"})
            return
        }
       
         if(results.length > 0){
             next()
         }else{
            res.status(401)
            res.send({ message : "Invalid request"})   
         }
       })


}