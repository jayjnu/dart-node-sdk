export function mapEntries<T, P>(
  obj: Record<string, T>,
  transform: (entry: [string, T]) => [string, unknown]
): P {
  const map = new Map();

  Object.entries(obj).forEach((entry) => {
    map.set(...transform(entry));
  });

  return Object.fromEntries(map);
}
