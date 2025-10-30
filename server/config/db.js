const mongoose=require("mongoose");

const connectMongoDb=async ()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected successfully on ip ${conn.connection.host}`);
    
    }
    catch(err){
        console.error(`Error ${err.message}`);
        process.exit(1);
        

    }
}

module.exports=connectMongoDb;