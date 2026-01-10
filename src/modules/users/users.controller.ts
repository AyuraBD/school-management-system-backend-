import { NextFunction, Request, Response } from "express";
import { userService } from "./users.service";

const getAllUsers = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const getSingleUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await userService.getSingleUser();
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err)
  }
}

const updateUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const {id} = req.params;
    const user = req.user;
    const result = await userService.updateUser(req.body, id as string, user?.email as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const changeRoleByAdmin = async(req: Request, res: Response, next: NextFunction)=>{
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
    next(err);
  }
}

const deleteUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {id} = req.params;
    const result = await userService.deleteUser(user?.id as string, user?.role as string, id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  changeRoleByAdmin,
  deleteUser
}