import createCachedSelector from 're-reselect';
import { createPathSelector } from '../../createPathSelector';
import { createPropSelector } from '../../createPropSelector';
import { createBoundSelector } from '../../createBoundSelector';

interface State {
  first: {
    data: Record<string, any>;
  };
}

function fakeFn() {}
fakeFn();

const symbolsStoreSelector = (state: State) => state.first;

export const symbolSelector = createCachedSelector(
  [
    createPathSelector(symbolsStoreSelector).data(),
    createPropSelector<{ symbolId: number }>().symbolId(),
  ],
  () => undefined,
)({});

export const bounded = createBoundSelector(symbolSelector, { symbolId: 1 });
