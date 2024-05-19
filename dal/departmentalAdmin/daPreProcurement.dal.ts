import { Request } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()


export const getPreProcurementDal = async (req: Request) => {
    const page: number | undefined = Number(req?.query?.page)
    const take: number | undefined = Number(req?.query?.take)
    const startIndex: number | undefined = (page - 1) * take
    const endIndex: number | undefined = startIndex + take
    let count: number
    let totalPage: number
    let pagination: any = {}
    const whereClause: any = {};

    const search: string = req?.query?.search ? String(req?.query?.search) : ''

    const category: any[] = Array.isArray(req?.query?.category) ? req?.query?.category : [req?.query?.category]
    const subcategory: any[] = Array.isArray(req?.query?.scategory) ? req?.query?.scategory : [req?.query?.scategory]
    const brand: any[] = Array.isArray(req?.query?.brand) ? req?.query?.brand : [req?.query?.brand]

    whereClause.OR = [
        {
            order_no: {
                contains: search,
                mode: 'insensitive'
            }
        },
        {
            other_description: {
                contains: search,
                mode: 'insensitive'
            }
        }
    ];

    if (category[0]) {
        whereClause.category_masterId = {
            in: category
        }
    }
    if (subcategory[0]) {
        whereClause.subcategory_masterId = {
            in: subcategory
        }
    }
    if (brand[0]) {
        whereClause.brand_masterId = {
            in: brand
        }
    }

    try {
        count = await prisma.da_pre_procurement_inbox.count({
            where: whereClause
        })
        const result = await prisma.da_pre_procurement_inbox.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: whereClause,
            ...(page && { skip: startIndex }),
            ...(take && { take: take }),
            select: {
                id: true,
                order_no: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                subcategory: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                brand: true,
                processor: true,
                ram: true,
                os: true,
                rom: true,
                graphics: true,
                other_description: true,
                rate: true,
                quantity: true,
                total_rate: true,
                status: {
                    select: {
                        id: true,
                        status: true
                    }
                },
                isEdited: true,
                remark: true,
                colour: true,
                material: true,
                dimension: true,
                room_type: true,
                included_components: true,
                size: true,
                recomended_uses: true,
                bristle: true,
                weight: true,
                number_of_items: true
            }
        })
        totalPage = Math.ceil(count / take)
        if (endIndex < count) {
            pagination.next = {
                page: page + 1,
                take: take
            }
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                take: take
            }
        }
        pagination.currentPage = page
        pagination.currentTake = take
        pagination.totalPage = totalPage
        return {
            data: result,
            pagination: pagination
        }
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const getPreProcurementByIdDal = async (req: Request) => {
    const { id } = req.params
    try {
        const result = await prisma.da_pre_procurement_inbox.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                order_no: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                subcategory: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                brand: true,
                processor: true,
                ram: true,
                os: true,
                rom: true,
                graphics: true,
                other_description: true,
                rate: true,
                quantity: true,
                total_rate: true,
                status: {
                    select: {
                        id: true,
                        status: true
                    }
                },
                isEdited: true,
                remark: true,
                colour: true,
                material: true,
                dimension: true,
                room_type: true,
                included_components: true,
                size: true,
                recomended_uses: true,
                bristle: true,
                weight: true,
                number_of_items: true
            }
        })
        return result
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const getPreProcurementByOrderNoDal = async (req: Request) => {
    const { order_no } = req.params
    try {
        const result = await prisma.da_pre_procurement_inbox.findFirst({
            where: {
                order_no: order_no
            },
            select: {
                id: true,
                order_no: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                subcategory: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                brand: true,
                processor: true,
                ram: true,
                os: true,
                rom: true,
                graphics: true,
                other_description: true,
                rate: true,
                quantity: true,
                total_rate: true,
                status: {
                    select: {
                        id: true,
                        status: true
                    }
                },
                isEdited: true,
                remark: true,
                colour: true,
                material: true,
                dimension: true,
                room_type: true,
                included_components: true,
                size: true,
                recomended_uses: true,
                bristle: true,
                weight: true,
                number_of_items: true
            }
        })
        return result
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const backToSrDal = async (req: Request) => {
    const { preProcurement, remark }: { preProcurement: string[], remark: string } = req.body
    try {
        preProcurement.map(async (item) => {
            const inbox: any = await prisma.da_pre_procurement_inbox.findFirst({
                where: {
                    id: item
                },
                select: {
                    order_no: true,
                    category_masterId: true,
                    subcategory_masterId: true,
                    brand: true,
                    processor: true,
                    ram: true,
                    os: true,
                    rom: true,
                    graphics: true,
                    other_description: true,
                    rate: true,
                    quantity: true,
                    total_rate: true,
                    statusId: true,
                    isEdited: true,
                    remark: true,
                    colour: true,
                    material: true,
                    dimension: true,
                    room_type: true,
                    included_components: true,
                    size: true,
                    recomended_uses: true,
                    bristle: true,
                    weight: true,
                    number_of_items: true
                }
            })
            if (inbox === null) {
                return
            }
            inbox.remark = remark
            await prisma.$transaction([

                prisma.da_pre_procurement_outbox.create({
                    data: inbox
                }),
                prisma.sr_pre_procurement_inbox.create({
                    data: inbox
                }),
                prisma.procurement_status.update({
                    where: {
                        id: inbox?.statusId
                    },
                    data: {
                        status: -1
                    }
                }),
                prisma.da_pre_procurement_inbox.delete({
                    where: {
                        id: item
                    },
                }),
                prisma.sr_pre_procurement_outbox.delete({
                    where: {
                        order_no: inbox?.order_no
                    },
                })

            ])
        })
        return "Reversed"
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const editPreProcurementDal = async (req: Request) => {
    const {
        id,
        order_no,
        category,
        subcategory,
        brand,
        processor,
        ram,
        os,
        rom,
        graphics,
        other_description,
        rate,
        quantity,
        total_rate,
        remark,
        colour,
        material,
        dimension,
        room_type,
        included_components,
        size,
        recomended_uses,
        bristle,
        weight,
        number_of_items
    } = req.body


    const data: any = {
        category: { connect: { id: category } },
        subcategory: { connect: { id: subcategory } },
        brand: brand,
        processor: processor,
        ram: ram,
        os: os,
        rom: rom,
        graphics: graphics,
        other_description: other_description,
        rate: Number(rate),
        quantity: Number(quantity),
        total_rate: Number(total_rate),
        remark: remark,
        isEdited: true,
        colour: colour,
        material: material,
        dimension: dimension,
        room_type: room_type,
        included_components: included_components,
        size: size,
        recomended_uses: recomended_uses,
        bristle: bristle,
        weight: weight,
        number_of_items: Number(number_of_items)
    }
    if (Number(rate) && Number(quantity)) {
        if (Number(rate) * Number(quantity) !== Number(total_rate)) {
            return { error: true, message: "The calculation result for total rate is invalid" }
        }
    }

    const preProcurement: any = await prisma.da_pre_procurement_inbox.findFirst({
        where: {
            id: id
        },
        select: {
            order_no: true,
            category_masterId: true,
            subcategory_masterId: true,
            brand: true,
            processor: true,
            ram: true,
            os: true,
            rom: true,
            graphics: true,
            other_description: true,
            rate: true,
            quantity: true,
            statusId: true,
            total_rate: true,
            remark: true,
            isEdited: true,
            colour: true,
            material: true,
            dimension: true,
            room_type: true,
            included_components: true,
            size: true,
            recomended_uses: true,
            bristle: true,
            weight: true,
            number_of_items: true
        }
    })
    const historyExistance = await prisma.pre_procurement_history.count({
        where: {
            order_no: order_no
        }
    })

    try {
        await prisma.$transaction([

            ...(historyExistance === 0 ? [prisma.pre_procurement_history.create({
                data: preProcurement
            })] : []),
            prisma.da_pre_procurement_inbox.update({
                where: {
                    id: id
                },
                data: data
            }),
            prisma.sr_pre_procurement_outbox.update({
                where: {
                    order_no: order_no
                },
                data: data
            }),
            // prisma.pre_procurement_history.update({
            //     where: {
            //         order_no: order_no
            //     },
            //     data: data
            // })

        ])
        return 'Edited'
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const releaseForTenderDal = async (req: Request) => {
    const { preProcurement }: { preProcurement: string[] } = req.body
    try {
        preProcurement.map(async (item) => {
            const inbox: any = await prisma.da_pre_procurement_inbox.findFirst({
                where: {
                    id: item
                },
                select: {
                    order_no: true,
                    category_masterId: true,
                    subcategory_masterId: true,
                    brand: true,
                    processor: true,
                    ram: true,
                    os: true,
                    rom: true,
                    graphics: true,
                    other_description: true,
                    rate: true,
                    quantity: true,
                    total_rate: true,
                    statusId: true,
                    isEdited: true,
                    remark: true,
                    colour: true,
                    material: true,
                    dimension: true,
                    room_type: true,
                    included_components: true,
                    size: true,
                    recomended_uses: true,
                    bristle: true,
                    weight: true,
                    number_of_items: true
                }
            })
            if (inbox === null) {
                return
            }
            await prisma.$transaction([

                prisma.da_pre_procurement_outbox.create({
                    data: inbox
                }),
                prisma.sr_pre_procurement_inbox.create({
                    data: inbox
                }),
                prisma.procurement_status.update({
                    where: {
                        id: inbox?.statusId
                    },
                    data: {
                        status: 2
                    }
                }),
                prisma.da_pre_procurement_inbox.delete({
                    where: {
                        id: item
                    },
                }),
                prisma.sr_pre_procurement_outbox.delete({
                    where: {
                        order_no: inbox?.order_no
                    },
                })

            ])
        })
        return "Released for tender"
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const getPreProcurementOutboxDal = async (req: Request) => {
    const page: number | undefined = Number(req?.query?.page)
    const take: number | undefined = Number(req?.query?.take)
    const startIndex: number | undefined = (page - 1) * take
    const endIndex: number | undefined = startIndex + take
    let count: number
    let totalPage: number
    let pagination: any = {}
    const whereClause: any = {};

    const search: string = req?.query?.search ? String(req?.query?.search) : ''

    const category: any[] = Array.isArray(req?.query?.category) ? req?.query?.category : [req?.query?.category]
    const subcategory: any[] = Array.isArray(req?.query?.scategory) ? req?.query?.scategory : [req?.query?.scategory]
    const brand: any[] = Array.isArray(req?.query?.brand) ? req?.query?.brand : [req?.query?.brand]

    whereClause.OR = [
        {
            order_no: {
                contains: search,
                mode: 'insensitive'
            }
        },
        {
            other_description: {
                contains: search,
                mode: 'insensitive'
            }
        }
    ];

    if (category[0]) {
        whereClause.category_masterId = {
            in: category
        }
    }
    if (subcategory[0]) {
        whereClause.subcategory_masterId = {
            in: subcategory
        }
    }
    if (brand[0]) {
        whereClause.brand_masterId = {
            in: brand
        }
    }

    try {
        count = await prisma.da_pre_procurement_outbox.count({
            where: whereClause
        })
        const result = await prisma.da_pre_procurement_outbox.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: whereClause,
            ...(page && { skip: startIndex }),
            ...(take && { take: take }),
            select: {
                id: true,
                order_no: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                subcategory: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                brand: true,
                processor: true,
                ram: true,
                os: true,
                rom: true,
                graphics: true,
                other_description: true,
                rate: true,
                quantity: true,
                total_rate: true,
                status: {
                    select: {
                        id: true,
                        status: true
                    }
                },
                isEdited: true,
                remark: true,
                colour: true,
                material: true,
                dimension: true,
                room_type: true,
                included_components: true,
                size: true,
                recomended_uses: true,
                bristle: true,
                weight: true,
                number_of_items: true
            }
        })
        totalPage = Math.ceil(count / take)
        if (endIndex < count) {
            pagination.next = {
                page: page + 1,
                take: take
            }
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                take: take
            }
        }
        pagination.currentPage = page
        pagination.currentTake = take
        pagination.totalPage = totalPage
        return {
            data: result,
            pagination: pagination
        }
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const getPreProcurementOutboxtByIdDal = async (req: Request) => {
    const { id } = req.params
    try {
        const result = await prisma.da_pre_procurement_outbox.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                order_no: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                subcategory: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                brand: true,
                processor: true,
                ram: true,
                os: true,
                rom: true,
                graphics: true,
                other_description: true,
                rate: true,
                quantity: true,
                total_rate: true,
                status: {
                    select: {
                        id: true,
                        status: true
                    }
                },
                isEdited: true,
                remark: true,
                colour: true,
                material: true,
                dimension: true,
                room_type: true,
                included_components: true,
                size: true,
                recomended_uses: true,
                bristle: true,
                weight: true,
                number_of_items: true
            }
        })
        return result
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}


export const rejectDal = async (req: Request) => {
    const { preProcurement, remark }: { preProcurement: string[], remark: string } = req.body
    try {
        preProcurement.map(async (item) => {
            const inbox: any = await prisma.da_pre_procurement_inbox.findFirst({
                where: {
                    id: item
                },
                select: {
                    order_no: true,
                    category_masterId: true,
                    subcategory_masterId: true,
                    brand: true,
                    processor: true,
                    ram: true,
                    os: true,
                    rom: true,
                    graphics: true,
                    other_description: true,
                    rate: true,
                    quantity: true,
                    total_rate: true,
                    statusId: true,
                    isEdited: true,
                    remark: true,
                    colour: true,
                    material: true,
                    dimension: true,
                    room_type: true,
                    included_components: true,
                    size: true,
                    recomended_uses: true,
                    bristle: true,
                    weight: true,
                    number_of_items: true
                }
            })
            if (inbox === null) {
                return
            }
            inbox.remark = remark
            await prisma.$transaction([

                prisma.da_pre_procurement_outbox.create({
                    data: inbox
                }),
                prisma.sr_pre_procurement_inbox.create({
                    data: inbox
                }),
                prisma.procurement_status.update({
                    where: {
                        id: inbox?.statusId
                    },
                    data: {
                        status: -2
                    }
                }),
                prisma.da_pre_procurement_inbox.delete({
                    where: {
                        id: item
                    },
                }),
                prisma.sr_pre_procurement_outbox.delete({
                    where: {
                        order_no: inbox?.order_no
                    },
                })

            ])
        })
        return "Rejected"
    } catch (err: any) {
        console.log(err?.message)
        return { error: true, message: err?.message }
    }
}