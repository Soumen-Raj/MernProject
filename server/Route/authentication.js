const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authenticate");

require('../DB/connection');
const User = require('../Schema/userSchema');

router.get('/', (req, res)=>{
    res.send('Hello World route')
});



// Using async
router.post('/register', async (req, res)=>{

    const {name, email, phone, work, password, cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "plz filled all feild"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error: "email already exist"}); 
        } else if(password != cpassword){
            return res.status(422).json({error: "password not matching"});
        } else {
            const user = new User({name, email, phone, work, password, cpassword});
        
        await user.save();
        res.status(201).json({message:"User registered successfully"});
        }  
        
    }catch(err){
        console.log(err);
    }
    
});

// Login route
router.post('/signin', async (req, res)=>{

    try{
        let token;
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "please filled the data"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const match = await bcrypt.compare(password, userLogin.password);


        if(!match){
            res.status(400).json({error:"user error"});
        } else{
            token =  await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly: true
            });

        res.json({message:"user signing successfully"});
        }
        } else {
            res.status(400).json({error:"user input error"});
        }

        


    } catch (err) {
        console.log(err);
    }
});

// about page

router.get('/about', authenticate , (req, res) =>{
    console.log("Hello About")
    res.send(req.rootUser);
});

// get user data for contact us and home page 
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// contact us page 

router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plzz filled the contact form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user Contact successfully" });

        }
        
    } catch (error) {
        console.log(error);
    }

});


// Logout  ka page 
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User lOgout');
});


module.exports = router;