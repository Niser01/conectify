import "reflect-metadata";
import { Field, ObjectType,  InputType} from "type-graphql";

@ObjectType()
export class event {
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
