import robodux, { AnyState, ActionsAny } from './slice';

export interface LoadingItemState {
  error: string;
  loading: boolean;
  success: boolean;
}

export const defaultLoadingItem = () => ({
  error: '',
  loading: false,
  success: false,
});

export default function createLoadingSlice<
  A extends ActionsAny = any,
  S extends AnyState = AnyState
>(slice: keyof S) {
  const initialState = defaultLoadingItem();
  return robodux<LoadingItemState, A, S>({
    slice,
    initialState,
    actions: {
      [`${slice}Error`]: (state: LoadingItemState, error: string) => ({
        error,
        loading: false,
        success: false,
      }),
      [`${slice}Success`]: () => ({
        error: '',
        loading: false,
        success: true,
      }),
      [slice]: () => ({
        error: '',
        loading: true,
        success: false,
      }),
    } as any,
  });
}
