import { Request, Response } from "express";
import { classesService } from "./classes.service";

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
  createClasses
}