import { NewRecipeInput } from './types/new-recipe.input'
import { Recipe } from './recipe'
import { RecipesService } from './recipes.service'
import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql'
import { RecipesArgs } from './types/recipes.args'

@Resolver(() => Recipe)
export class RecipesResolver {
  private readonly recipesService: RecipesService

  public constructor(recipesService: RecipesService) {
    this.recipesService = recipesService
  }

  @Query(() => Recipe)
  public async recipe(@Arg('id') id: string): Promise<Recipe> {
    return this.recipesService.getOne(id)
  }

  @Query(() => [Recipe])
  public async recipes(@Args() options: RecipesArgs): Promise<Recipe[]> {
    const { skip, take } = options
    return this.recipesService.getAll(skip, take)
  }

  @Mutation(() => Recipe)
  public async addRecipe(
    @Arg('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    return this.recipesService.add(newRecipeData)
  }
}
