import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";

//Created the object types of the user_models

@ObjectType()
export class User {
  @Field(type => ID)
  ID: number;

  @Field()
  Names: string;

  @Field()
  LastNames: string;

  @Field()
  PhotoId: string;

  @Field()
  EMail: string;

  @Field()
  Status: number;

  @Field()
  PhoneNumber: string;

  @Field()
  SSO_UserId: string;
}

@ObjectType()
export class UserId{
  @Field(type => ID)
  ID: number;
}

@ObjectType()
export class SavedElement{

  @Field()
  IDUser: number;

  @Field()
  IDElement: number;

}


@ObjectType()
export class Message {
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
