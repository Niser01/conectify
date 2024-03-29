import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";
import { File } from "../file/file-type.js";



@ObjectType()
export class PlainMessage {
  @Field(type => ID)
  _id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  edited: boolean;

  @Field()
  channelId: string;

  @Field({ nullable: true })
  thread?: string;

  @Field()
  visible: boolean;

  @Field(type => [String], { nullable: true })
  replies?: string[];

  @Field({ nullable: true })
  reactions?: string;

  @Field(type => [String], { nullable: true })
  filesId?: string[];

  @Field()
  updated_at: Date;

  @Field()
  created_at: Date;
}

@ObjectType()
export class Message {
  @Field(type => ID)
  _id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  edited: boolean;

  @Field()
  channelId: string;

  @Field({ nullable: true })
  channelName: string;

  @Field({ nullable: true })
  thread?: string;

  @Field()
  visible: boolean;

  @Field(type => [String], { nullable: true })
  replies?: string[];

  @Field({ nullable: true })
  reactions?: string;

  @Field(type => [File], { nullable: true })
  files?: File[];

  @Field()
  updated_at: Date;

  @Field()
  created_at: Date;
}

@ObjectType()
export class MessageAsThread {
  @Field(type => ID)
  _id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  edited: boolean;

  @Field()
  channelId: string;

  @Field({ nullable: true })
  thread?: string;

  @Field()
  visible: boolean;

  @Field(type => [Message], { nullable: true })
  replies?: Message[];

  @Field({ nullable: true })
  reactions?: string;

  @Field(type => [File], { nullable: true })
  files?: File[];

  @Field()
  updated_at: Date;

  @Field()
  created_at: Date;
}
