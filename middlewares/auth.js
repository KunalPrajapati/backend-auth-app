//making middlewares for auth,isStudent,isAdmin

const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = (req,res, next) => {

    try {
        
        //extract jwt token
        //req.cookies.token; -> extraction can be done like this also
        const token = req.body.token ;

        //if token is missing
        if(!token){
            return res.status(401).json({
                success : false,
                message : "No token found"
            })
        }

        //verify the token

        try {
            
            const decode = jwt.verify(token, process.env.JWT_SECRET);//decodes the token

            req.user = decode;//for checking the user's role


        } catch (error) {
            
            return res.status(401).json({
                success : false,
                message : "Invalid token"
            })

        }

        next(); //forwarded to next middleware
    

    } catch (error) {

        return res.status(401).json({
            success : false,
            message : "something went wrong with the token"
        })
        
    }

}

exports.IsStudent = (req,res,next) => {

    try {
        
        if(req.user.role != "Student"){//line 29 used here
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this route"
            });
        }

        next();


    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "user role does not match"
        })
    }
}

exports.IsAdmin = (req,res,next) => {

    try {
        
        if(req.user.role != "Admin"){//line 29 used here
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this route"
            });
        }

        next();

    }catch (error) {   

        return res.status(500).json({
            success : false,
            message : "user role does not match"
        })

    }
}