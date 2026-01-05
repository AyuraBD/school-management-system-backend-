import { Classes } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getClasses = async(schoolId:string)=>{
  return await prisma.classes.findMany({
    where:{
      schoolId
    }
  })
}

const createClasses = async (data:Omit<Classes, 'id' | 'createdAt' | 'updatedAt'>)=>{
  const result = await prisma.classes.create({
    data:{
      ...data
    }
  });
  return result;
}

export const classesService = {
  getClasses,
  createClasses
}