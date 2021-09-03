import * as r from 'ramda';

import { Unary } from '../types/utility/unary';

type SpreadableEventListeners<EventType> = Partial<
  Record<string, Unary<EventType>>
>;

function mergeListenerMaps<EventType>(
  listenerMaps: Array<SpreadableEventListeners<EventType>>,
) {
  const mergedMap: Record<string, Array<Unary<EventType>>> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const m of listenerMaps) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, handlerFn] of Object.entries(m)) {
      if (!mergedMap[key]) {
        mergedMap[key] = [];
      }
      if (handlerFn) {
        mergedMap[key]?.push(handlerFn);
      }
    }
  }

  return r.mapObjIndexed(
    (fnList) => (e: EventType) => fnList.forEach((fn) => fn(e)),
    mergedMap,
  );
}

export default mergeListenerMaps;
