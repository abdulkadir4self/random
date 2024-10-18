const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'fca19bc66b61d46afa52d0b5b0408352e95aa5ee42e78741c62753730ae700a2';

const instructorAuthMW = function( req,res,next){  
    console.log('auth middleware called');
    const token = req.headers.authorization;
  
    if(token){
 
        jwt.verify(token , JWT_SECRET_KEY , function(error , decodedValue){
            if(!error){

                next();
            }
            else{
                res.json({
                    status:0,
                    message: 'pls login to continue'
                })
            }
        })
    }
    else{
        console.log('token not present')
        res.json({
            status:0,
            message: 'pls login to continue'
        })
    }
    

}

module.exports = instructorAuthMW
