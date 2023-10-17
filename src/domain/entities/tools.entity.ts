import { TagsEntity } from "./tags.entity";

export class ToolsEntity {
    id!: number;
    title!: string;
    link!: string;
    description!: string;
    tags?: TagsEntity[];
}