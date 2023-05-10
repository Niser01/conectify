import { Field, InputType } from "type-graphql";

@InputType()
export default class NewFileInput {  
    @Field()
    userId: string;
  
    @Field({ nullable: true })
    channelId?: string;

    @Field(type => [String], { nullable: true })
    channelIds?: string[];
  
    @Field({ nullable: true })
    filters?: string;
  
    @Field(type => [String], { nullable: true })
    filesId?: string[];
}