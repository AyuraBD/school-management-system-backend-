import { NextFunction, Request, Response } from "express";
import { studentService } from "./students.service";

const createStudent = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await studentService.createStudents(req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

const getStudent = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user;
    const {schoolId} = req.params;
    const result = await studentService.getStudents(userId?.id as string, schoolId as string);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

export const studentController = {
  getStudent,
  createStudent
}