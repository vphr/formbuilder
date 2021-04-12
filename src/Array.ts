
export type PickArray<a> = Pick<a, {
	[val in keyof a]: a[val] extends any[] ? val : never
}[keyof a]>

export type ArrayVal<T> = T extends Array<infer U> ? U : never;