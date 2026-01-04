import { Schools } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const createSchool = async(data:Omit<Schools, 'id' | 'createdAt' | 'updatedAt' | 'userId'>, id:string)=>{
  const result = await prisma.schools.create({
    data:{
      ...data,
      userId : id
    }
  });
  console.log("Service:",result);
  return result;
}

export const schoolsService = {
  createSchool
}
