const user = require("../model/User/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn = async(req, res) => { 
    try{
        const {name, email, password, username} = req.body;
        console.log(name, email, password, username, await user.findOne({email}), await user.findOne({username}))
        if (!email || !password || !name || !username){
            res.status(400).json({ 
                "error":"Fill All Details "
            })
            return ; 
        }

        const responseEmail = await user.findOne({email})
        const responseUsername = await user.findOne({username})  
        
        if (responseEmail){ 
            res.status(400).json({
                "error":"400-EMAIL"  
            })  
            return;   
        }
        
        else if (responseUsername){
            res.status(400).json({ 
                "error":"400-USERNAME"      
            })
            return;
            
        }
        
        let hashpw;
        try{
            hashpw = await bcrypt.hash(password, 10)
        }
        catch(err){
            res.status(500).json({
                "error":"error in Hashing"
            })
        }
        console.log(name,email, password, hashpw);

        const lastUpdated = new Date().toString();
        
        const response = await user.create({email, password:hashpw, name, username, lastUpdated});
        console.log(name,email, password, hashpw);

        const payload = {
            "email":email,
            "username":username,
            "lastUpdated":response.lastUpdated
        }

        let token = jwt.sign(payload, "shubham", {expiresIn:"2h",});
        response.token = token;
        response.password = undefined;

        //console.log(token)

        const option = {
            expires: new Date(Date.now() + 3 * 24 * 3600 * 1000) ,
            httpOnly:true
        }

        res.cookie("token",token, option).status(200).json({
            "sucess":"true",
            "data":response
        })
    }

    catch(err){
        res.status(400).json({
            "error":"Unknown Error"
        })
    }
}

exports.logIn = async(req, res) =>{
    try{
        const {identity, password} = req.body;
        
        //console.log(identity, password)
        if (!identity || !password){
            res.status(400).json({
                "error":"400-EMPTY"
            })
            return;
        }
        
        const response = await user.findOne({"email":identity}) || await await user.findOne({"username":identity}) ;
        
        
        //console.log(123);
        
        if (!response){
            res.status(401).json({
                "error":"401-USER"
            })
            return;
        }
        const email = response.email;
        const username = response.username;

        const payload = {
            "email":email,
            "username":username,
            "lastUpdated":response.lastUpdated
        }

        if (await bcrypt.compare(password, response.password)){
            
            
            let token = jwt.sign(payload, "shubham", {expiresIn:"2h",});
            response.token = token;
            response.password = undefined;

            //console.log(token)

            const option = {
                expires: new Date(Date.now() + 3 * 24 * 3600 * 1000) ,
                httpOnly:true
            }

            res.cookie("token",token, option).status(200).json({
                "sucess":"true",
                "data":response
            })
            
        }
        else{
            res.status(401).json({
                "error":"401-PASSWORD"
            })
            return;
        }
    }
    catch(err){
        res.status(400).json({
            "error":"Unknown Error"
        })
    }
}


exports.autoLogin = async(req, res, next) => {
    try{
        const response = await user.findOne({"email":res.user.email});

        // console.log(response.lastUpdated , res.user.lastUpdated[0])

        if (!response || response.lastUpdated[0] !== res.user.lastUpdated[0])
        {
                res.status(401).json({
                    "message":"Unauthorized"
                })
                return
        }   
        res.status(200).json({
            "data":response
        })
    }
    catch(err)
    {
        res.status(400).json({
            "message":err
        })
    }
    
}
