# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I have assumed that, since there are many conditionals, the data should be from a non-trusted source. The ideal would be having Typescript, because making so many checks during runtime execution increases the complexity. Specially because Javascript does not has a consistent way to verify types - `typeof [1, 2, 3]` or `typeof new Date()` or `typeof { clipboard: 'health' }` will end up with the same result `object`. Also, I have interpred "clean code" and "readable" as a balance between "easy to understand what is happening" and "short and efficcient".

In this case scenario, I choose to make short circuits, verifying the most shallow and known cases (determined by the constants) before the most deep and uncertain cases - the checks are required to avoid bugs and unexpected behaviors, and this approach helps to reduce time and complexity in the first cases. I have splitted the code in minor and testable functions to avoid code repetition and to absctract the inner workings, letting the clarity to the function name - just by reading inside the function `deterministicPartitionKey` is possible to know the rules.
