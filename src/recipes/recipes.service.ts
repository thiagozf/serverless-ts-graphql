import { plainToClass } from 'class-transformer'
import { Service, Inject } from 'typedi'

import { Recipe } from './recipe'
import { NewRecipeInput } from './types/new-recipe.input'

@Service()
export class RecipesService {
  private autoIncrementValue: number
  private items: Recipe[]

  public constructor(@Inject('SAMPLE_RECIPES') items: Recipe[]) {
    this.items = items
    this.autoIncrementValue = this.items.length
  }

  public async getAll(skip: number, take: number) {
    const start: number = skip
    const end: number = skip + take
    return this.items.slice(start, end)
  }

  public async getOne(id: string) {
    return this.items.find(it => it.id === id)
  }

  public async add(data: NewRecipeInput) {
    const recipe = this.createRecipe(data)
    this.items.push(recipe)
    return recipe
  }

  public async findIndex(recipe: Recipe) {
    return this.items.findIndex(it => it.id === recipe.id)
  }

  private createRecipe(recipeData: Partial<Recipe>): Recipe {
    const recipe = plainToClass(Recipe, recipeData)
    recipe.id = this.getId()
    return recipe
  }

  private getId(): string {
    return (++this.autoIncrementValue).toString()
  }
}
