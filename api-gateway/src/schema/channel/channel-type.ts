import "reflect-metadata";
import { Field, ObjectType, ID, } from "type-graphql";

@ObjectType()
export default class Channel {  
    @Field({ nullable: true })
    id: string;

    @Field()
    name: string;
  
    @Field()
    description: string;
  
    @Field(type => [Number], { nullable: true })
    members?: number[];
    
    @Field(type => [Number], { nullable: true })
    files?: number[];

    @Field(type => [Number], { nullable: true })
    messages?: number[];

    @Field(type => [Number], { nullable: true })
    admins?: number[];
}
