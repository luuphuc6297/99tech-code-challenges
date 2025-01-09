const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./solution");

const testCases = [
  { input: 1, expected: 1 },
  { input: 5, expected: 15 },
  { input: 10, expected: 55 },
  { input: 100, expected: 5050 },
  { input: 0, expected: 0 },
];

const implementations = [
  { name: "sum_to_n_a (for loop)", fn: sum_to_n_a },
  { name: "sum_to_n_b (Gauss formula)", fn: sum_to_n_b },
  { name: "sum_to_n_c (recursion)", fn: sum_to_n_c },
];

describe("Sum to N implementations", () => {
  implementations.forEach(({ name, fn }) => {
    describe(name, () => {
      testCases.forEach(({ input, expected }) => {
        test(`should return ${expected} for n = ${input}`, () => {
          expect(fn(input)).toBe(expected);
        });
      });
    });
  });

  // Performance test
  test("Performance comparison", () => {
    const n = 1000000;
    console.log("\nPerformance test for n =", n);

    implementations.forEach(({ name, fn }) => {
      const start = process.hrtime.bigint();
      fn(n);
      const end = process.hrtime.bigint();
      const timeInMs = Number(end - start) / 1_000_000;
      console.log(`${name}: ${timeInMs.toFixed(3)}ms`);
    });
  });
});
