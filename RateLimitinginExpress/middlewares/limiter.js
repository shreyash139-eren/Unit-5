const rateLimit =require('express-rate-limit')


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	limit: 5,
	standardHeaders: 'draft-8', 
	legacyHeaders: false,
    message:{error: "Too many requests, please try again later."}
})
module.exports=limiter
