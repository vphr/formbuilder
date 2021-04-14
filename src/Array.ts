
export type PickArray<a> = Pick<a, {
	[val in keyof a]: a[val] extends any[] ? val : never
}[keyof a]>

export type ArrayVal<T> = T extends Array<infer U> ? U : never;

export const Last = <a>(as: a[]): a => as[as.length - 1]
export const flatten_array = <a>(mma: a[]): a[] =>
	mma.reduce(
		(acc, arr) =>
		(Array.isArray(arr) ? flatten_array(arr) : acc.concat(arr)
		), [])


