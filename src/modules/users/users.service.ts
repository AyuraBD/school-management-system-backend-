import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

const getAllUsers = async()=>{
  return await prisma.user.findMany({});
}

const getSingleUser = async()=>{
  console.log("Single user");
}

const updateUser = async(data:{name?: string, image?: string}, id: string, email: string)=>{
  const userData = await prisma.user.findFirst({
    where:{id}
  });
  const isOwner = userData?.email === email;
  console.log(userData?.email,'',userData?.role)
  const isAdmin = userData?.role === "ADMIN";
  
  if(!isOwner && !isAdmin){
    throw new Error("Forbidden access");
  }
  const result = await prisma.user.update({
    where:{id},
    data
  })
  return result
}

const changeRoleByAdmin = async(data:{role:UserRole}, userId: string, paramId: string)=>{
  const adminData = await prisma.user.findFirst({
    where:{
      id: userId
    }
  })
  if(adminData?.role !== "ADMIN"){
    throw new Error("Forbidden access");
  }
  // Verifieng users email
  const updatingData = await prisma.user.findFirst({
    where: {
      id: paramId
    },
    select:{
      emailVerified: true
    }
  });
  if(!updatingData?.emailVerified){
    throw new Error("The user's email isn't verified. The user need to verify thier email first.")
  }

  // Updating user's role
  return await prisma.user.update({
    where:{
      id: paramId
    },
    data:{
      ...data
    }
  })
}

export const userService = {
  getAllUsers,
  getSingleUser,
  changeRoleByAdmin,
  updateUser
}