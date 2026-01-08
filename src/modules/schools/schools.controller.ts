import { Request, Response } from "express";
import { schoolsService } from "./schools.service";

const getSchool = async(req: Request, res:Response)=>{
  try{
    const user = req.user;
    const result = await schoolsService.getSchool(user?.id as string);
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

const createSchool = async(req: Request, res: Response)=>{
  try{
    const result = await schoolsService.createSchool(req.body, req.user?.id as string);
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

const updateSchool = async(req: Request, res: Response)=>{
  try{
    const user = req.user;
    const {id} = req.params;
    const result = await schoolsService.updateSchool(id as string, user?.id as string, req.body);
    res.status(200).json({
      success:true,
      data: result
    })
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

const deleteSchool = async(req: Request, res: Response)=>{
  try{
    const user = req.user;
    const userRole = req.user;
    const {id} = req.params;
    const result = await schoolsService.deleteSchool(user?.id as string, userRole?.role as string, id as string);
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

export const schoolController = {
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool
}