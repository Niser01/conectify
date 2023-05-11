import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class SavedElement{
    @Field(type => ID)
    ID: string;

    @Field()
    IDUser: number;

    @Field()
    IDElement: number;

}
