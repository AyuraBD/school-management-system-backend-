import { Request, Response } from "express";
import { userService } from "./users.service";

const getAllUsers = async(req: Request, res: Response)=>{
  try{
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

const getSingleUser = async(req: Request, res: Response)=>{
  try{
    const result = await userService.getSingleUser();
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

const updateUser = async(req: Request, res: Response)=>{
  try{
    const {id} = req.params;
    const user = req.user;
    const result = await userService.updateUser(req.body, id as string, user?.email as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    res.status(400).json({
      success:false,
      message: err.message
    })
  }
}

const changeRoleByAdmin = async(req: Request, res: Response)=>{
  try{
    const user = req.user;
    const {id} = req.params;
    console.log("Id from body:", id);
    const result = await userService.changeRoleByAdmin(req.body, user?.id as string, id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  changeRoleByAdmin
}