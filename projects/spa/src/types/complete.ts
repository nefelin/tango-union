/**
 * Complete is used to recursively make all optional properties required.
 * There is a defect in apollo mock provider which causes responses to return undefined
 * without throwing any errors of any fields are missing from the mock response data,
 * even if the missing fields are options. This type makes it easier to spot the problem.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Complete<T> = T extends Array<any> | Record<any, any>
  ? {
      [Prop in keyof T]-?: Complete<T[Prop]>;
    }
  : T;
