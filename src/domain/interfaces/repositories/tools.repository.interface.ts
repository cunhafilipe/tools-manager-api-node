import { ToolsEntity } from "../../entities";

export interface IToolsRepository{
create(
   title: string,
   link: string,
   description: string,
): Promise<ToolsEntity>;
list(): Promise<ToolsEntity[]>;
deleteById(id: number): Promise<void>;
findBy(filter: {id?:number;title?: string}): Promise<ToolsEntity>;
findByKey(key:string): Promise<ToolsEntity[]>;
}