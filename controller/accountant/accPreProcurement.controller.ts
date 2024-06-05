import { Request, Response } from "express";
import {
    getPreProcurementDal,
    // getPreProcurementByIdDal,
    getPreProcurementBulkByOrderNoDal,
    createBoqDal,
    getPreProcurementForBoqDal
    // backToSrDal,
    // editPreProcurementDal,
    // releaseForTenderDal,
    // getPreProcurementOutboxDal,
    // getPreProcurementOutboxtByIdDal,
    // rejectDal
} from "../../dal/accountant/accPreProcurement.dal";



export const getPreProcurementForBoq = async (req: Request, res: Response) => {
    const result: any = await getPreProcurementForBoqDal(req)
    if (!result?.error) {
        res.status(200).json({
            status: true,
            message: `Pre procurement list fetched successfully`,
            data: result?.data,
            pagination: result?.pagination
        })
    } else {
        res.status(404).json({
            status: false,
            message: `Error while fetching Pre procurement list`,
            error: result?.message
        })
    }
}


export const getPreProcurement = async (req: Request, res: Response) => {
    const result: any = await getPreProcurementDal(req)
    if (!result?.error) {
        res.status(200).json({
            status: true,
            message: `Pre procurement list fetched successfully`,
            data: result?.data,
            pagination: result?.pagination
        })
    } else {
        res.status(404).json({
            status: false,
            message: `Error while fetching Pre procurement list`,
            error: result?.message
        })
    }
}


export const getPreProcurementBulkByOrderNo = async (req: Request, res: Response) => {
    const result: any = await getPreProcurementBulkByOrderNoDal(req)
    if (!result?.error) {
        res.status(200).json({
            status: true,
            message: `Pre procurement fetched successfully`,
            data: result
        })
    } else {
        res.status(404).json({
            status: false,
            message: `Error while fetching Pre procurement`,
            error: result?.message
        })
    }
}


export const createBoq = async (req: Request, res: Response) => {
    const result: any = await createBoqDal(req)
    if (!result?.error) {
        res.status(200).json({
            status: true,
            message: `BOQ created successfully`,
            data: result
        })
    } else {
        res.status(404).json({
            status: false,
            message: `Error while creating BOQ`,
            error: result?.message
        })
    }
}

// export const editPreProcurement = async (req: Request, res: Response) => {
//     const result: any = await editPreProcurementDal(req)
//     if (!result?.error) {
//         res.status(200).json({
//             status: true,
//             message: `Edit successful`,
//             data: result
//         })
//     } else {
//         res.status(404).json({
//             status: false,
//             message: `Error while editing`,
//             error: result?.message
//         })
//     }
// }

// export const releaseForTender = async (req: Request, res: Response) => {
//     const result: any = await releaseForTenderDal(req)
//     if (!result?.error) {
//         res.status(200).json({
//             status: true,
//             message: `Released for tender successfully`,
//             data: result
//         })
//     } else {
//         res.status(404).json({
//             status: false,
//             message: `Error while releasing for tender`,
//             error: result?.message
//         })
//     }
// }


// export const getPreProcurementOutbox = async (req: Request, res: Response) => {
//     const result: any = await getPreProcurementOutboxDal(req)
//     if (!result?.error) {
//         res.status(200).json({
//             status: true,
//             message: `Pre procurement outbox list for DA fetched successfully`,
//             data: result?.data,
//             pagination: result?.pagination
//         })
//     } else {
//         res.status(404).json({
//             status: false,
//             message: `Error while fetching Pre procurement outbox list for DA`,
//             error: result?.message
//         })
//     }
// }


// export const getPreProcurementOutboxById = async (req: Request, res: Response) => {
//     const result: any = await getPreProcurementOutboxtByIdDal(req)
//     if (!result?.error) {
//         res.status(200).json({
//             status: true,
//             message: `Pre procurement outbox for DA fetched successfully`,
//             data: result
//         })
//     } else {
//         res.status(404).json({
//             status: false,
//             message: `Error while fetching Pre procurement for DA`,
//             error: result?.message
//         })
//     }
// }


// export const reject = async (req: Request, res: Response) => {
//     const result: any = await rejectDal(req)
//     if (!result?.error) {
//         res.status(200).json({
//             status: true,
//             message: `Rejected successfully`,
//             data: result
//         })
//     } else {
//         res.status(404).json({
//             status: false,
//             message: `Error while rejecting`,
//             error: result?.message
//         })
//     }
// }