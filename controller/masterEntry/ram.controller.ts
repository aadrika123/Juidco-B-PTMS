import { Request, Response } from "express";
import { createRamDal, getRamDal } from "../../dal/masterEntry/ram.dal";


export const createRam = async (req: Request, res: Response) => {
    const result: any = await createRamDal(req)
    if (!result?.error) {
        res.status(201).json({
            status: true,
            message: `Brand created having id : ${result.id}`
        })
    } else {
        res.status(400).json({
            status: false,
            message: `Brand creation failed`,
            error: result?.message
        })
    }
}


export const getRam = async (req: Request, res: Response) => {
    const result: any = await getRamDal(req)
    if (!result?.error) {
        res.status(200).json({
            status: true,
            message: `Brand list fetched successfully`,
            data: result
        })
    } else {
        res.status(404).json({
            status: false,
            message: `Error while fetching brand list`,
            error: result?.message
        })
    }
}