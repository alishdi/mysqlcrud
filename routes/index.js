const { Router } = require('express');
const indexpage = Router()
indexpage.get('/',(req,res,next)=>{
    try {
        res.send('hello express.js')
    } catch (error) {
        next(error)
    }
})

module.exports=indexpage
