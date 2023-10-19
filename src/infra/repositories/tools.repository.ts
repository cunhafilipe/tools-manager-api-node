import { ToolsEntity } from "../../domain/entities/tools.entity";
import { IToolsRepository } from "../../domain/interfaces/repositories";
import prismaClient from "../database/prisma/prisma.client";

export class ToolsRepository implements IToolsRepository {

    async create(
        title: string,
        link: string,
        description: string,
    ): Promise<ToolsEntity> {
        const tools = await prismaClient.tools.create({ data: { title, description, link } })
        return tools
    }

    async list(): Promise<ToolsEntity[]> {
        const tools = await prismaClient.tools.findMany({ include: { tags: true } })
        return tools
    }

    async deleteById(id: number): Promise<void> {

        await prismaClient.tools.delete({ where: { id: id } })
    }

    async findBy(filter: { id?: number; title?: string }): Promise<any> {
        const tool = await prismaClient.tools.findFirst({
            where: {
                id: filter.id,
                title: filter.title
            }
        })
        return tool
    }


    async findByKey(key: string): Promise<ToolsEntity[]> {
        const findByKey = await prismaClient.tools.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: key
                        }
                    },
                    {
                        link: {
                            contains: key
                        }
                    },
                    {
                        description: {
                            contains: key
                        }
                    },
                    {
                        tags: {
                            some: {
                                title: {
                                    contains: key
                                }
                            }
                        }


                    }
                ]
            }
        })
        return findByKey
    }

}