import createCachedSelector from 're-reselect';
// import { createPathSelector } from '../../createPathSelector';
import { prop } from '../../..';
import { createBoundSelector } from '../../createBoundSelector';

interface State {
  first: {
    data: Record<string, any>;
  };
}

// function fakeFn(a: { b: string }) {
//   return (props: { c?: string }) => ({ z: 1, dd: 'dd' });
// }
// fakeFn({ b: '123' })({});

const symbolsStoreSelector = (state: State) => state.first;

export const symbolSelector1 = createCachedSelector(
  [
    symbolsStoreSelector,
    (state: unknown, props: { prop1: number }) => props.prop1,
    (state: unknown, props: { prop2: number }) => props.prop2,
    (state: unknown, props: { prop3: number }) => props.prop3,
    prop<{ prop4: number }>().prop4(),
    // createPathSelector(symbolsStoreSelector).data(),
    // createPropSelector<{ symbolId: number }>().symbolId(),
    // createPropSelector<{ prop: string }>().prop(),
  ],
  () => 1,
)({});

export const bounded = createBoundSelector(symbolSelector1, { prop1: 1 });

export const symbolSelector2 = createCachedSelector([bounded], () => 1)({});

//
// export const bounded = createBoundSelector(symbolSelector2, { symbolId: 1 });
