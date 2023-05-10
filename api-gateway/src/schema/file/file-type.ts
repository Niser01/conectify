import "reflect-metadata";
import { Field, ObjectType, ID, } from "type-graphql";
import { Stream } from "stream";

@ObjectType()
export class File {
  @Field(type => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  fileName: string;

  @Field()
  fileType: string;

  @Field()
  fileURL: string;

  @Field(type => [String])
  channelIds: string[];

  @Field()
  date: string;
}