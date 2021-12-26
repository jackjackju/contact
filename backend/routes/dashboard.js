const {insertContact, searchContactDuplication, searchContact} = require("../queries/ContactQuery");
const router = require('express').Router();

router.put("/", async(req, res) => {
    try{
        let rows = await searchContact(req.body.user_id)
        return res.status(200).json({message: "Success", data: rows});
    }
    catch (err){
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
});

router.put("/add", async(req, res) => {
    try{
        let rows = await searchContactDuplication(req.body.name, req.body.user_id);
        if (rows.length !== 0){
            return res.status(200).json({message: "Contact exists"});
        }

        await insertContact(req.body.name, req.body.phone, req.body.email, req.body.user_id);
        return res.status(200).json({message: "Success"});
    }
    catch (err){
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
});


module.exports = router;
