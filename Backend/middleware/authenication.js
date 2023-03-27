const jwt=require("jsonwebtoken")


const authentication=(req,res,next)=>{
    const token=req.headers.authorization;

    if(token){
        const decoded=jwt.verify(token,'masai');
        if(decoded){
            req.body.userid=decoded.dataid;
            next()
        }
    }
}

module.exports={
    authentication
}

