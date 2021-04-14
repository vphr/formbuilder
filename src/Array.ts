
export type PickArray<a> = Pick<a, {
	[val in keyof a]: a[val] extends any[] ? val : never
}[keyof a]>

export type ArrayVal<T> = T extends Array<infer U> ? U : never;

export const Append = <a>(a: a, as: a[]): a[] => as.concat(a)
export const Last = <a>(as: a[]): a => as[as.length - 1]


