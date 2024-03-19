const jwt = require("jsonwebtoken");

exports.auth = (req, res, next)=> {
    try {    
        // console.log(100)
        const token = req.headers.authorization || req.cookies.token;
        // console.log(token)
        // console.log("token in auth", token)
        //console.log(token)
        
        if (!token) 
        {
            res.status(401).json({
                status:"401-USER"
            })
            return;
        }


        try{ 
            const decode = jwt.verify(token, "shubham");
            //console.log(decode)
            res.user = decode;
            next();
        }
        catch(err){
            res.status(401).json({ 
                "message":err
            });
            return;
        }
        
    }
    catch(err)
    {
        res.status(400).json({
            status:err.message || "BAD-REQUEST"
        })
        return
    }
}