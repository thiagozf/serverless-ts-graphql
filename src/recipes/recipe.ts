import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Recipes' })
export class Recipe {
  @Field(() => ID)
  public id: string

  @Field()
  public title: string

  @Field({ nullable: true })
  public description?: string

  @Field()
  public creationDate: Date

  @Field(() => [String])
  public ingredients: string[]
}
