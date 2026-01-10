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

const updateClasses = async(userId: string, paramId: string, data:Partial<Classes>)=>{
  const currentData = await prisma.classes.findUnique({
    where:{
      id: paramId
    },
    select:{
      school:{
        select:{
          userId: true
        }
      }
    }
  });
  if(!currentData?.school){
    throw new Error("Class not found that you are looking for.");
  }
  const isOwner = currentData?.school.userId === userId;
  if(!isOwner){
    throw new Error("You cannot update the class's data.");
  }
  return await prisma.classes.update({
    where:{
      id: paramId
    },
    data
  })
}

const deleteClasses = async(userId: string, paramId: string)=>{
  const currentData = await prisma.classes.findUnique({
    where:{
      id: paramId
    },
    select:{
      school:{
        select:{
          userId: true
        }
      }
    }
  });
  if(!currentData?.school){
    throw new Error("Class not found that you want to delete.");
  }
  const isOwner = currentData?.school.userId === userId;
  if(!isOwner){
    throw new Error("You cannot delete the class's data.");
  }
  return await prisma.classes.delete({
    where:{
      id: paramId
    },
    select:{
      id: true
    }
  })
}

export const classesService = {
  getClasses,
  createClasses,
  updateClasses,
  deleteClasses
}