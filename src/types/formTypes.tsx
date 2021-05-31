import React from 'react'
type formType = number | string | boolean | object
export type formTypeLiteral = "number" | "string" | "boolean" | "object"
type ElementType<T> = T extends Array<infer U> ? ElementType<U> : T;
export interface formObject {
	type: formTypeLiteral
	value: formType
	key: string
}
export const formObjectConstructor = function(t: formTypeLiteral, v: formType, k: string): formObject {
	return ({
		key: k,
		value: v,
		type: t
	})
}
export const mergeFunction = function <T>(o: ElementType<T>): formObject[] {
	let t = o
	if (Array.isArray(t)) {
		return t.flatMap(e => mergeFunction(e))
	}
	else if (typeof t == "object") {
		let n = Object.keys(o).flatMap(e => objToElement(o[e], e))
		return n
	}

}

export const objToElement = function <T extends formType>(o: ElementType<T>, k: string): formObject {
	let _type = typeof o
	return ({
		type: _type as formTypeLiteral,
		value: Array.isArray(o) ? o.flatMap(e => mergeFunction(e)) :
			_type == "object" ? Object.keys(o).flatMap(e => objToElement(o[e], e))
				: o,
		key: k
	})
}
export function NumberElement(v: number, label: string, change: (v: number) => void): JSX.Element {
	return <div>
		<label >{label}</label>
		<input type="number" value={v} onChange={e => change(e.currentTarget.valueAsNumber)} />
	</div >
}
export function StringElement(v: string, label: string, change: (v: string) => void): JSX.Element {
	return <div>
		<label >{label}</label>
		<input type="text" value={v} onChange={e => change(e.currentTarget.value)} />
	</div >
}

