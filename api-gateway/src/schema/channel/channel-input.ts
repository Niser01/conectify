import { Field, InputType } from "type-graphql";
import { Length, MaxLength, ArrayMaxSize } from "class-validator";

@InputType()
export default class NewChannelInput {  
    @Field()
    channelName: string;
  
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