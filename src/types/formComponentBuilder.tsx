import React from 'react'
import { formObject } from './formTypes'

type props = {
	data: formObject[]
	rawdata: any
	onchange: <t>(key: string, value: any) => void
}
type state = {
}

export const FormbuilderComponent = (props: props): JSX.Element => {
	const { data, onchange, rawdata } = props

	return <div>
			{data.map((formobj) => {
				switch (formobj.type) {
					case "boolean": {
						return <div>
							<label >{formobj.key} </label>
							<input type="checkbox" checked={formobj.value} onChange={_ => onchange(formobj.key, !formobj.value)} />
						</div>

					}
					case "number": {
						return <div>
							<label >{formobj.key} </label>
							<input type="number" value={formobj.value} onChange={c => {
								return onchange(formobj.key, c.currentTarget.valueAsNumber)
							}} />
						</div>

					}
					case "array": {
						const ob = typeof rawdata[formobj.key] === "undefined" ? rawdata[0][formobj.key] : rawdata[formobj.key]
						console.log(rawdata)
						return <FormbuilderComponent
							rawdata={ob}
							data={formobj.value}
							onchange={(k, v) => {
								ob[0][k] = v
								onchange(formobj.key, ob)
							}}
						/>
					}
					case "object": {
						const ob = rawdata[0][formobj.key]
						return <FormbuilderComponent
							rawdata={ob}
							data={formobj.value}
							onchange={(k, v) => {
								ob[0][k] = v
								onchange(formobj.key, ob)
							}}
						/>
					}
					case "string": {
						return <div>
							<label >{formobj.key} </label>
							<input type="text" value={formobj.value} onChange={c => onchange(formobj.key, c.currentTarget.value)} />
						</div>

					}
					default: {
						return <div></div>
					}
				}
			})}
	</div>
}
