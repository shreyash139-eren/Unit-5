const passport=require("passport")
require("dotenv").config()
const express=require("express")
const UserRouter=express.Router()

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
},
function (accessToken,refreshToken,profilt,done){
    return done(profile)
}
))

UserRouter.get("/auth/github",passport.authenticate("github",{Scope:["user:email"]}))

UserRouter.get("/auth/github/callback",passport.authenticate("github",{session:false,failureRedirect:"/login"}),async function(req,res){
    try {
        const gitHubUserId=req.user.Id
        const user=await UserModel.find({})
    } catch (error) {
        
    }
})