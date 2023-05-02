import { Field, InputType } from "type-graphql";
import { Length, MaxLength, ArrayMaxSize } from "class-validator";

@InputType()
export default class NewFileInput {}