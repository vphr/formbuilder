export const pick = <T, U extends keyof T>(t: T, u: U): Pick<T, U> => {
	return { [u]: t[u] } as Pick<T, U>
}

export const pickMany = <T, U extends keyof T>(t: T, u: U[]): Pick<T, U> => {
	return u.reduce((s, prop) => (s[prop] = t[prop], s), {} as Pick<T, U>)
}

export const omitMany = <T, U extends keyof T>(t: T, keys: U[]): Omit<T, U> =>
	(Object.keys(t) as U[]).reduce(
		(s, prop) => (keys.includes(prop) ? s : { ...s, [prop]: t[prop] }),
		{} as Omit<T, U>
	);

export const omit = <T, U extends keyof T>(t: T, u: U): Omit<T, U> => {
	return (Object.keys(t) as U[]).reduce(
		(s, prop) => prop == u ? s : { ...s, [prop]: t[prop] },
		{} as Omit<T, U>);
}
