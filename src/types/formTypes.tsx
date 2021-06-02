import React from 'react'
type formType = number | string | boolean | object
export type formTypeLiteral = "number" | "string" | "boolean" | "object" | "array" | "none"
export interface formObject2 {
	type: formTypeLiteral
	value: formType
	key: string
}

export type formObject = {
	type: "string"
	index: number
	key: string
	value: string
} |
{
	type: "number"
	index: number
	key: string
	value: number
} |
{
	type: "boolean"
	index: number
	key: string
	value: boolean
}
	|
{
	type: 'object'
	index: number
	key: string
	children: formObject[]
} |

{
	type: 'array'
	index: number
	key: string
	children: formObject[]
} |
{
	type: 'none'
	index: number
	key: string
}
export const processObjectKeys = function <t>(v: t[]): formObject[] {
	return v.flatMap((e, index) =>
		Object.entries(e).map(o => {
			//console.log(e, o, getFormType(o[1]))
			switch (getFormType(o[1])) {
				case "boolean": {
					return ({
						type: "boolean",
						index: index,
						key: o[0],
						value: o[1]
					})
				}
				case "number": {
					return ({
						type: "number",
						index: index,
						key: o[0],
						value: o[1]

					})
				}
				case "string": {
					return ({
						type: "string",
						index: index,
						key: o[0],
						value: o[1]
					})
				}
				case "object": {
					return ({
						type: "object",
						index: index,
						key: o[0],
						children: processObjectKeys(o[1])
					})
				}
				case "array": {
					return ({
						type: "array",
						index: index,
						key: o[0],
						children: processObjectKeys(o[1])
					})
				}
				case "none":
					return ({
						type: "none",
						key: o[0],
						index: index
					})
			}
		}))
}
export const getFormType = function <t>(v: t): formTypeLiteral {
	if (Array.isArray(v) && typeof v[0] === "object" && Array.isArray(v[0])) {
		return "array"
	}
	else if (Array.isArray(v) && typeof v[0] === "object" && !(Array.isArray(v[0]))) {
		//else if (v instanceof Array && typeof v[0] === "object" && !(v[0] instanceof Array)) {
		return 'object'
	}
	/*
	 v.flatMap(e => Object.keys(e).filter(o => Array.isArray(e[o]))).length > 0 
	 */
	else if (typeof v == "string") {
		return "string"
	}
	else if (typeof v == "boolean") {
		return "boolean"
	}
	else if (typeof v == "number") {
		return "number"
	}
	return "none"
}

/*export const formObjectConstructor = function(v: formObject, k: string): formObject {
	if (Array.isArray(v)) {
		return ({
			key: k,
			value: v.flatMap(oo => Object.keys(oo).flatMap(e => formObjectConstructor(oo[e], e))),
			type: "array"
		})
	}
	else if (typeof v == "string") {
		return ({
			key: k,
			value: v,
			type: "string"
		})
	}
	else if (typeof v == "boolean") {
		return ({
			key: k,
			value: v,
			type: "boolean"
		})
	}
	else if (typeof v == "number") {
		return ({
			key: k,
			value: v,
			type: "number"
		})
	}
	return ({
		key: k,
		value: v,
		type: null
	})
}
export const mergeFunction = function(o: ElementType<formObject>): formObject[] {
	let t = o
	if (Array.isArray(t)) {
		return t.flatMap(e => mergeFunction(e))
	}
	else if (typeof t == "object") {
		let n = Object.keys(o).flatMap(e => objToElement(o[e], e))
		return n
	}
	return

}

export const objToElement = function(o: ElementType<formObject>, k: string): formObject {
	return formObjectConstructor(o, k)
}*/

/*
export const processObjectKeys = function <t>(v: t[]) {

let test2 = v.flatMap((e, j) => Object.entries(e).map(o => {
//console.log(o[1], getFormType(o[1]))
let t = ({
key: o[0],
value: o[1],
index: j
})
return t
}))
let test = v.flatMap((e, j) => Object.keys(e).flatMap(o => {
let res = e[o]
if (Array.isArray(res) && res.length === 1) {
res = res[0]
}
let t = ({
key: o,
value: e[o],
index: j
})
return t
}))
return test2

}
 */
