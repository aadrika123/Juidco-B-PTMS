import express from 'express'
// import { upload } from '../../config/multer.config'
import { distAuth } from '../../middleware/userAuth'
const router = express.Router()
import { createStockRequest, forwardToSr, getStockReqInbox, getStockReqOutbox, handover, returnToInventory, AddDeadStock } from '../../controller/distributor/distStockRequest.controller'

router.use(distAuth)

router.post('/', createStockRequest)
router.get('/', getStockReqInbox)
router.get('/outbox', getStockReqOutbox)
router.post('/to-sr', forwardToSr)
router.post('/handover', handover)
router.post('/return-inv', returnToInventory)
router.post('/add-dead-stock', AddDeadStock)

export default router
