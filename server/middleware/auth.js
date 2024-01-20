import jwt from 'jsonwebtoken'


// wants to like a post 
// goes to auth middleware (check for permission)
// like, delete, create post 



const authMiddleware = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.lenght < 500


        let decodedData;

        if (token && isCustomAuth) {
            // this for jwt token 
            decodedData = jwt.verify(token,'test')
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub



        }
        next()


    } catch (error) {
        console.log(error)

    }
}


export default authMiddleware