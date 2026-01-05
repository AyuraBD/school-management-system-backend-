import { Request, Response } from "express";
import { classesService } from "./classes.service";

const getClasses = async(req: Request, res: Response)=>{
  try{
    const user = req.user;
    const {schoolId} = req.params;
    const result = await classesService.getClasses(schoolId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    res.status(400).json({
      success: true,
      message: err.message
    });
  }
}

const createClasses = async(req: Request, res: Response) =>{
  try{
    const result = await classesService.createClasses(req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

export const classesController = {
  createClasses,
  getClasses
}