import { Subjects } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createSubject = async(data:Omit<Subjects, 'id' | 'createdAt' | 'updatedAt'>) =>{
  return await prisma.subjects.create({
    data:{
      ...data
    }
  })
}

export const subjectService = {
  createSubject,
}