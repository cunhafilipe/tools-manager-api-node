import { TagsEntity } from "../../entities";

export interface ITagsRepository {
    create(title: string, tools_id: number): Promise<TagsEntity>;
    list(tags: string): Promise<TagsEntity[]>;
    deleteById(id: number): Promise<void>;
}