const File = require('./models/file')
const fs = require('fs')
const connectDB = require('./config/db');
connectDB();


async function fetchData()
{
    const pastDate = new Date(Date.now() - 1000*60*60*24);
    const files =await File.find({createdAt : {$lt:pastDate}});

    if(files.length){
        for (const file of files) {
            try{
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);
            }     
            catch(err)
            {
                console.log('Error occoured while deleting the file')
            }
        }
        console.log("Job Done");

    }


}
fetchData().then(() => {
    process.exit();
})