import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class event {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    start: string;

    @Field()
    end: string;

    @Field()
    location: string;

    @Field()
    allDay: string;
}
