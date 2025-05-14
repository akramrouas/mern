import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Email incorrect" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    generateToken(res, user._id);
    res.json({
        message: "Connexion réussie",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    generateToken(res, user._id);
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

  

const logoutUser   = asyncHandler(async  (req,res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires : new Date(0),
    })
   
    res.status(200).json({ message: "Déconnexion réussie" });
}) 


const getUserProfile   = asyncHandler(async  (req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name ,
            email: user.email
        })
    }
    else{
        res.status(404).json({ message: "User not found" });
    }
}) 


const updateUserProfile   = asyncHandler(async  (req,res) => {
    const user = await User.findById(req.user._id) ;
    if(user){
        user.name = req.body.name  || user.name;
        user.email = req.body.email || user.email ;

        if(req.body.password ){
            user.password = req.body.password ;
        }    
        const updateUser = await user.save();
        res.json({
            _id:updateUser.id,
            name:updateUser.name ,
            email:updateUser.email,
            message: 'Profile updated successfully',
            
        })

    }else{
        res.status(404).json({ message: "User not found" });
    }
  
   
}) 
export {authUser,registerUser,updateUserProfile,getUserProfile,logoutUser} 