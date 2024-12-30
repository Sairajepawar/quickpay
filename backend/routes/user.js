const express = require("express");
const { User,Account } = require("../db");
const bcrypt = require("bcryptjs");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("../middleware/index");
const mongoose = require("mongoose");

// schema for signup
const signupSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
})

// schema for login
const loginSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string().min(6),
})

// schema for updating user info
const updateInfoSchema = zod.object({
    userName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// schema for updating user password
const updatePasswordSchema = zod.object({
    oldpassword: zod.string().min(6),
    newpassword: zod.string().min(6),
})

const router = express.Router();

router.use(express.json());

// routes for signup
router.post("/signup", async (req, res) => {
    const body = req.body;
    // cross verify the structure of input using zod
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(411).send({
            message:"Incorrect Input",
        })
    }
    const {userName, firstName, lastName, password} = body;
    // check whether user already exists or not
    try {
        const database = await User.findOne({ userName:userName });
        if (database) {
            return res.status(411).json({
                message: "Email/Username already exists",
            });
        }
        // encrpyt the password
        const hashPassword = await bcrypt.hash(password, 10);
        // saving in the database
        const user = await User.create({ userName, firstName, lastName, password: hashPassword });
        const userId = user._id;

        // for demonstration purpose i provided each account with random funds
        await Account.create({
            userId: userId,
            balance: 1+Math.round(Math.random()*1000),
        })

        // returning jwt token
        const token = jwt.sign({userName},process.env.JWT_SECRET)
        res.json({
            message: "Signup Successful",
            token: token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

// route for login
router.post("/login", async (req, res) => {
    const body = req.body;
    const { success } = loginSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"Wrong Format"
        })
    }
    const {userName, password} = body;
    try
    {
        // keep in mind passwords are hashed before they are stored in database
        const user = await User.findOne({userName});
        const token = jwt.sign({userName},process.env.JWT_SECRET)
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(match){
                return res.json({
                    message: "Logged in successfully",
                    token: token,
                })
            }
            else{
                return res.status(411).json({
                    message:"Wrong Password",
                })
            }
        }
        else{
            return res.status(411).json({
                error:"Invalid username"
            })
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

// update info of user
router.put("/", authMiddleware,async (req, res) => {
    const {success} = updateInfoSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Wrong format of body",
        })
    }
    try
    {
        const userName = req.userName;
        await User.updateOne({userName: userName}, req.body);
        return res.json({
            message:"Updation Successfully",
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

// updating user password
router.put("/updatePassword",authMiddleware,async(req,res)=>{
    const body = req.body;
    const {success} = updatePasswordSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Wrong format of body",
        })
    }
    try
    {
        const {oldpassword,newpassword} = body;
        const userName = req.userName;
        // check the initial password
        const user = await User.findOne({userName:userName});
        const match = await bcrypt.compare(oldpassword,user.password);
        if(!match){
            return res.status(411).json({
                "message":"Wrong Password",
            })
        }
        // update the password
        const hashPassword = await bcrypt.hash(newpassword,10);
        user.password = hashPassword;
        await user.save();
        return res.json({
            message:"Updation Successfully",
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

// not tested, something is wrong here
// to get public information of users for search
router.get('/bulk',authMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    try
    {

        const users = await User.find({
            userName: {$ne: req.userName},
            $or: [{
                firstName: {
                    $regex: filter
                }
            }, {
                lastName: {
                    $regex: filter
                }
            }]
        })
        res.json({
            users: users.map(user=>({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

// route to get current user firstname
router.get('/firstname',authMiddleware,async (req,res)=>{
    try
    {
        const user = await User.findOne({userName: req.userName});
        return res.json({
            firstName: user.firstName,
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

// to test whether server is running or not
router.get('/helloworld',(req,res)=>{
    res.send("Hello World");
})

module.exports = router;
