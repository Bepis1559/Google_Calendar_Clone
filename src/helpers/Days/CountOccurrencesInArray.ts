export function CountOccurrencesInArray(array: string[], el: string) {
  return array.filter((x) => x === el).length;
}
