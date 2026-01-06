import { Schools } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getSchool = async(user:string)=>{
  return await prisma.schools.findMany({
    where:{
      userId: user
    }
  });
}

const createSchool = async(data:Omit<Schools, 'id' | 'createdAt' | 'updatedAt' | 'userId'>, id:string)=>{
  const result = await prisma.schools.create({
    data:{
      ...data,
      userId : id
    }
  });
  return result;
}

const updateSchool = async(id:string, userId: string, data:{name?:string, address?: string})=>{
  const updateData = await prisma.schools.findFirst({
    where:{
      userId: id
    }
  })
  if(updateData?.userId !== userId){
    throw new Error("Forbidden access");
  }
  return await prisma.schools.update({
    where: {
      id
    },
    data
  })
}

export const schoolsService = {
  getSchool,
  createSchool,
  updateSchool
}
