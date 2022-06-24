const { Router } = require("express");
const prisma = require("../client/prisma");
const {    SignUpValidator,    SingInValidator,  } = require("../Validators/userV");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/singup",SignUpValidator,async function (req,res) {
    const errors = validationResult(req);
    if ( !errors.isEmpty()) {
        return res.status(400).json({error: errors.array});
    }
    const user = await prisma.user.create({data: req.body });
    console.log("success")
    return res.json({status: user});

});

router.post("/singin",SingInValidator, async function(req,res){
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array});     
    }
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {username},
    });
    if (!user) {
        return res.status(400).json({ error: "invalid request data"});
    }
    
    const valid= await bcrypt.compare(password, user.password);
    
    if (!valid) {
        return res.status(400).json({ error: "invalid request data"});
    }

    const token = jwt.sign(
        {
            username, 
            id: user.id,
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
        return res.json({token});

   
});

module.exports = router;
