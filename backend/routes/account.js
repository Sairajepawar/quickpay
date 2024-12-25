const express = require('express');
const {Account,User,Transaction} = require('../db/index');
const { authMiddleware } = require('../middleware/index')
const zod = require('zod');
const router = express.Router();
const mongoose = require('mongoose');

router.use(express.json());

// schema for transfer request
const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number(),
});

// to check the balance
router.get('/balance',authMiddleware,async (req,res)=>{
    try{
        const user = await User.findOne({userName:req.userName});
        if(!user){
            return res.status(404).json({
                message:"User Not Found",
            })
        }
        const acc = await Account.findOne({userId: user._id});
        if(!acc){
            return res.status(404).json({
                message:"User Not Found",
            })
        }
        return res.json({
            balance:acc.balance,
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

// not tested yet
// to transfer money to another account
router.post('/transfer',authMiddleware,async (req,res)=>{
    try{
        // create session, because partial execution of this transcation(due to any reasons)
        // can lead to anomalies
        // so we use session concept provided by mongoose
        const {success} = transferSchema.safeParse(req.body);
        if(!success){
            return res.status(411).send({
                message:"Incorrect Input",
            })
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        const temp1 = await User.findOne({userName:req.userName}).session(session);
        const sender = await Account.findOne({userId: temp1._id}).session(session);
        const reciever = await Account.findOne({userId: req.body.to}).session(session);

        if(!sender || !reciever){
            return res.status(400).send({
                message:"Invalid Account",
            })
        }

        if(sender.balance < req.body.amount){
            return res.status(400).send({
                message:"Insufficient Balance",
            })
        }

        // operation for sender
        await Account.updateOne({userId: temp1._id}, {$inc:{balance: -req.body.amount}}).session(session);
        // operation for reciever
        await Account.updateOne({userId: req.body.to}, {$inc:{balance: req.body.amount}}).session(session);

        // once operation is done, record this transaction
        const currentDate = new Date();
        await Transaction.create({
            date: currentDate,
            sender:temp1._id,
            reciever: req.body.to,
            amount:req.body.amount,
        })
        

        await session.commitTransaction();
        session.endSession();
        return res.json({
            message:"Transfer successful",
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
})

// add route to get transaction history of the user
// router.get('/history',authMiddleware,async (req,res)=>{
//     const userName = req.userName;
//     // logic to get all transaction related to user
//     // incoming transaction
//     // outgoing transaction
//     // sort them according to date
// })

module.exports = router;