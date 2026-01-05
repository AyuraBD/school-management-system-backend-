import { Request, Response } from "express";
import { studentService } from "./students.service";

const createStudent = async(req: Request, res: Response)=>{
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

export const studentController = {
  createStudent
}