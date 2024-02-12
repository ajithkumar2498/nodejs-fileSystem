import express from "express";
import fs from "fs"
import path from "path"

const PORT = process.env.PORT || 7000
const app = express ()
app.use(express.json())

app.post('/createfile',(req,res)=>{
    try {
        const folderpath ='src/textfiles'
        const currentDateTime = new Date().toISOString().replace(/[-T:]/g, '').split('.'[0])

        const filename= `${currentDateTime}.txt`

        const filepath = path.join(folderpath,filename)

        const filecontent = `TimeStamp:${new Date().toLocaleString()}`

        fs.writeFile(filepath, filecontent, 'utf-8',(err)=>{
            if(err){
                console.log('error creating in textfile',err)
                res.status(500).send({
                    message:"internal Server Error"
                })
            }else{
               console.log('text Created Successfully',filepath)
               res.status(201).send(JSON.stringify({message:"text file created Successfully"},filepath))
            }
        })
    } catch (error) {
        console.log(error)
    }
   
})



 app.listen(PORT,()=>console.log(`APP Listening in ${PORT}`))
