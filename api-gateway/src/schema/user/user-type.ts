import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class User {
    @Field(type => ID)
    ID: string;

    @Field()
    Names: string;

    @Field()
    LastNames: string;

    @Field()
    PhotoId: number;

    @Field()
    EMail: string;

    @Field()
    Status: number;

    @Field()
    PhoneNumber: string;
}


@ObjectType()
export class SavedElement{
    @Field(type => ID)
    ID: string;

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
