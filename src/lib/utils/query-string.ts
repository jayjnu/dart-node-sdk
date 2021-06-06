export function stringify(
  queryObject: string[][] | Record<string, string> | string | URLSearchParams
): string {
  return new URLSearchParams(queryObject).toString();
}
