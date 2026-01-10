import { NextFunction, Request, Response } from "express";
import { classesService } from "./classes.service";

const getClasses = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {schoolId} = req.params;
    const result = await classesService.getClasses(schoolId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const createClasses = async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const result = await classesService.createClasses(req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

const updatedClasses = async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const user = req.user;
    const {id} = req.params;
    const result = await classesService.updateClasses(user?.id as string, id as string, req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

const delateClasses = async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const user = req.user;
    const {id} = req.params;
    const result = await classesService.deleteClasses(user?.id as string, id as string);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

export const classesController = {
  createClasses,
  getClasses,
  updatedClasses,
  delateClasses
}