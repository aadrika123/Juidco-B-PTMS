import express from "express";
import { receivingUpload } from "../../../config/multer.config";
const router = express.Router()
import {
    getReceivedInventory,
    getReceivedInventoryById,
    getReceivedInventoryByOrderNo,
    createReceiving
} from "../../../controller/departmentalAdmin/daReceivedInventory.controller";


router.get('/', getReceivedInventory)
router.get('/by-order-no/:order_no', getReceivedInventoryByOrderNo)
router.post('/receive', receivingUpload.array('img'), createReceiving)
// router.get('/outbox', createReceiving)
// router.get('/outbox/:id', getPostProcurementOutboxById)
router.get('/:id', getReceivedInventoryById)



export default router