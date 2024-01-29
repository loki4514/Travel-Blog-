import jwt from 'jsonwebtoken'


// wants to like a post 
// goes to auth middleware (check for permission)
// like, delete, create post 



const authMiddleware = async (req,res,next) => {
    try {
        console.log(req.headers.authorization,"the request hoioiuterietruithihk oioietoii headers")
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500


        let decodedData;

        if (token && isCustomAuth) {
            console.log("i'm insdie the token of iscustomauth")
            // this for jwt token 
            decodedData = jwt.verify(token,'test')
            req.userId = decodedData?.email
        } else {
            console.log("i'm insdie the token of googleauth")
            decodedData = jwt.decode(token)
            req.userId = decodedData?.email



        }
        next()


    } catch (error) {
        console.log(error)

    }
}


export default authMiddleware