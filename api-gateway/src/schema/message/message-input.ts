import { Field, InputType } from "type-graphql";
import { Length, MaxLength, ArrayMaxSize } from "class-validator";

@InputType()
export default class NewMessageInput {  
    @Field()
    userId: string;
  
    @Field({ nullable: true })
    content?: string;
  
    @Field()
    channelId: string;
  
    @Field({ nullable: true })
    thread?: string;
  
    @Field({ nullable: true })
    visible?: boolean;
  
    @Field(type => [String], { nullable: true })
    filesId?: string[];
}