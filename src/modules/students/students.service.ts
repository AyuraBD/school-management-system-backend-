import { Students } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createStudents = async(data:Omit<Students, 'id' | 'createdAt' | 'updatedAt'>)=>{
  // console.log("Service");
  return await prisma.students.create({
    data:{
      ...data
    }
  })
}

export const studentService = {
  createStudents
}