import {prisma} from './lib/prisma';
import app from './app';

const PORT = process.env.PORT || 5000;

async function main() {
  try{
    await prisma.$connect();
    app.listen(PORT, ()=>{
      console.log(`Prisma express server is running on Port: ${PORT}`)
    });
  }catch(err:any){
    console.log("An error is occured");
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();