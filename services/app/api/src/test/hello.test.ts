const sum = (a: number, b: number) => {
  return a + b;
}

test('Adds two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});