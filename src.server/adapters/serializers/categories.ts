import { Category } from '@src/domain/category'
import it from 'iterated'
export function dump(categories: Iterable<Category>): Category[] {
  return it.array(categories)
}
