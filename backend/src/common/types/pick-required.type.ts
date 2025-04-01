export type PickRequiredType<T, K extends keyof T> = { [P in K]-?: T[P] };
