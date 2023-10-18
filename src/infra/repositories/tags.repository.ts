import { TagsEntity } from "../../domain/entities/tags.entity";
import { ITagsRepository } from "../../domain/interfaces/repositories";
import prismaClient from "../database/prisma/prisma.client";

export class TagsRepository implements ITagsRepository {

    async create(title: string, tools_id: number): Promise<TagsEntity>{
        const createTags = await prismaClient.tags.create({data:{title,tools_id }});
        return createTags
    }
    async list(): Promise<TagsEntity[]>{
        const listTags = await prismaClient.tags.findMany()
        return listTags
    }
    async deleteById(id: number): Promise<void>{
     await prismaClient.tags.delete({where:{id:id}})
    }
}