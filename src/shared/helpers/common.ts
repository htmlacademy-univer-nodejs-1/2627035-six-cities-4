export function generateRandomValue(min: number, max: number, numberAfterDigit: number = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(numberAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length - 1);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : '';
}
