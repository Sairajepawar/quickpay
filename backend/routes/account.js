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

// compare function to sort transaction according to date
function compare(a,b){
    return a.date<b.date;
}

// convert userid to username
async function to_username(id){
    const user = await User.findOne({_id:id});
    console.log(user);
    return user.userName; 
}

//convert iso-timestamp into human readable date
function to_date(timestamp){
    const date = new Date(timestamp);

    // Convert to IST
    const istDate = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long", // Include day of the week
    year: "numeric",
    month: "long", // Full month name
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    });

    return istDate;
}


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
router.get('/history',authMiddleware,async (req,res)=>{
    const user = await User.findOne({userName:req.userName});
    const id = user._id;
    try{
        // incoming transaction
        const incoming_transaction = await Transaction.find({sender:id});
        // outgoing transaction
        const outgoing_transcation = await Transaction.find({reciever:id});
        // sort them according to date
        var transaction = incoming_transaction.concat(outgoing_transcation);
        transaction.sort(compare);
        const transformed_transaction = await Promise.all(transaction.map(async (ele)=>{
            const transformed_ele = {};
            transformed_ele.date = to_date(ele.date);
            transformed_ele.sender = await to_username(ele.sender);
            transformed_ele.reciever = await to_username(ele.reciever);
            transformed_ele.amount = ele.amount;
            return transformed_ele;
        }))
        return res.json({
            transaction: transformed_transaction
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

module.exports = router;