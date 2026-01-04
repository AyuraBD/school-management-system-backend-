import { Classes } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createClasses = async (data:Omit<Classes, 'id' | 'createdAt' | 'updatedAt'>)=>{
  const result = await prisma.classes.create({
    data:{
      ...data
    }
  });
  return result;
}

export const classesService = {
  createClasses
}