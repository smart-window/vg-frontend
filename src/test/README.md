Current testing guidelines are as follows:

- Components should test for expected display.
- Every user action/click should be covered through unit tests.
- In functional services, every branch of logic should be tested.
- Ensure that all tests are passing before pushing code.
- Name your test file `<ComponentName>.test.js` and place it in the corresponding component folder.
- If you fix a bug, please write a unit test around it to avoid regression issues.

Common Testing Gotchas:

1. ensure testing-library's `waitFor` is always preceded by an `await` - failing to do so will cause nondeterministic test failures.
2. If a component calls `useEffect()`, ensure tests that render it are wrapped in `await act(async () => {})`
3. For mocked Apollo queries, ensure variable values exactly match what is passed in the component. If they don't, `useQuery().error` will have something like `no more mocked responses for query`
4. For mocked Apollo queries, ensure response fields exactly match the fields requested in the query. If they don't, `useQuery.data` and `useQuery.error` will confusingly be `undefined` even after `loading=false` - [Relevant Github Issue](https://github.com/apollographql/apollo-client/issues/7081#issuecomment-700923092)
