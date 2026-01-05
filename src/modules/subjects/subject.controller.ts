import { Request, Response } from "express";
import { subjectService } from "./subject.service";

const createSubject = async(req: Request, res: Response) =>{
  try{
    const result = await subjectService.createSubject(req.body);
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

export const subjectController = {
  createSubject
}