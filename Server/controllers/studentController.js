const argon = require('argon2')

exports.LoginAdmin = async (req,res) =>{
    const {email , password} = req.body;
    const hassedPassword = await argon.hash(password);
    const user = {
        email : email,
        password : hassedPassword
    }
    return res.status(200).json({
        message : "Data has been Recived ",
        user 
    })
}

