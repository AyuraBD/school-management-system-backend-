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

const getStudents = async(userId: string, schoolId:string)=>{
  const userData = await prisma.schools.findUnique({
    where: {
      id: schoolId
    },
    select:{
      user:{
        select:{
          id: true
        }
      }
    }
  })
  if(userData?.user?.id !== userId){
    throw new Error("You are authorize to get students data");
  }
  const result = await prisma.students.findMany({
    // const {name, class, roll, fatherName} = req.params;
    // where:{
    //   OR:[
    //     {
    //       name:{

    //       }
    //     }
    //   ]
    // }
  })
  console.log(result);
}

export const studentService = {
  getStudents,
  createStudents
}