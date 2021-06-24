import React from 'react'
type formType = number | string | boolean | object
export type formTypeLiteral = "number" | "string" | "boolean" | "object" | "array" | "none"
export type formObject = {
	type: "string"
	key: string
	value: string
} |
{
	type: "number"
	key: string
	value: number
} |
{
	type: "boolean"
	key: string
	value: boolean
}
	|
{
	type: 'object'
	key: string
	value: formObject[]
} |

{
	type: 'array'
	key: string
	value: formObject[]
}
	|
{
	type: 'base'
	key: string
	value: formObject[]
} |
{
	type: 'none'
	key: string
}
export const processObjectKeys = function <t>(v: t[]): formObject[] {
	return v.flatMap((e) =>
		Object.entries(e).map(o => {
			switch (getFormType(o[1])) {
				case "boolean": {
					return ({
						type: "boolean",
						key: o[0],
						value: o[1]
					})
				}
				case "number": {
					return ({
						type: "number",
						key: o[0],
						value: o[1]

					})
				}
				case "string": {
					return ({
						type: "string",
						key: o[0],
						value: o[1]
					})
				}
				case "object": {
					return ({
						type: "object",
						key: o[0],
						value: processObjectKeys(o[1])
					})
				}
				case "array": {
					return ({
						type: "array",
						key: o[0],
						value: processObjectKeys(o[1])
					})
				}
				case "none":
					return ({
						type: "none",
						key: o[0],
					})
			}
		}))
}
export const getFormType = function <t>(v: t): formTypeLiteral {
	if (Array.isArray(v) && Object.keys(v).length === 1) {
		return "array"
	}
	else if (Array.isArray(v) && typeof v[0] === "object" && (!Array.isArray(v[0])) && Object.keys(v).length >= 1) {
		return 'object'
	}
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

