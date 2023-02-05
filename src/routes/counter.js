const router=require("express").Router()
const CounterModel=require("../models/counter")

router.post("/create",async (req,res)=>{
    const counter=new CounterModel({
        name:req.body.name,
        seq:req.body.seq
    })
    try{
        const createdCounter=await counter.save()
        return res.status(201).send({ status: true, data: createdCounter });
    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }
})


module.exports=router