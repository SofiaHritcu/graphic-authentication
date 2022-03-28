import { SORT_ORDER } from "@/config/sort-config";

/**
 *
 * @param array it can be of any type and structure
 * @param fieldName the field name by which you need the array to be sorted
 * @param sortOrder the desired sort order
 * @returns the sorted array
 */
export const sortByFieldName = (
  array: any[],
  fieldName: string,
  sortOrder: number = SORT_ORDER.ASCENDING
): any[] => {
  const { greater, lower } =
    sortOrder === SORT_ORDER.ASCENDING
      ? { greater: 1, lower: -1 }
      : { greater: -1, lower: 1 };
  return array.sort((currentEl: any, nextEl: any) => {
    if (currentEl[fieldName] === nextEl[fieldName]) {
      return 0;
    }
    return currentEl[fieldName] > nextEl[fieldName] ? greater : lower;
  });
};
