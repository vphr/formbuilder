import React from 'react'
import { formObject, formObjectConstructor, formTypeLiteral } from './formTypesExperimental'

type props = {
	attr: formObject[]
	onchange: (key: string, value: any, index: number) => void
}
type state = {
}


export class FormbuilderTEST extends React.Component<props, state> {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return <div>
			{JSON.stringify(this.props.attr)}
			{this.props.attr.flatMap((e, j) => {
				switch (e.type) {
					case "object": {
						return <FormbuilderTEST attr={e.value as formObject[]} onchange={(k, v, i) => {
							let nested_data = this.props.attr[j] as any
							//let new_entry = { ...nested_data, {nested_data.value[i]: formObjectConstructor(typeof v as formTypeLiteral, v as any, k) }

							nested_data.value[i] = formObjectConstructor(typeof v as formTypeLiteral, v as any, k)
							console.log(nested_data)
							//console.log({...this.props.attr[e.key], [this.props.attr[j].value[i]]: nested_data })
							let fin2 = { ...this.props.attr[j].value[i], value: v }
							let res = { ...this.props.attr[j].value[i].key }
							console.log(e.key)
							let example = { ...e, [e.key]: nested_data }
							console.log(this.props.attr[e.key])
							this.props.onchange(this.props.attr[e.key], nested_data, i)
						}
						} />
					}
					case "boolean": {
						return <div>
							<label >{e.key}</label>
							<input type="checkbox" value={e.value as formTypeLiteral} onChange={c => this.props.onchange(e.key, c.currentTarget.value, j)} />
						</div>
					}
					case "string": {
						return <div>
							<label >{e.key}</label>
							<input type="text" value={e.value as formTypeLiteral} onChange={c => this.props.onchange(e.key, c.currentTarget.value, j)} />
						</div>
					}
					case "number": {
						return <div>
							<label >{e.key}</label>
							<input type="number" value={e.value as formTypeLiteral} onChange={c => this.props.onchange(e.key, c.currentTarget.value, j)} />
						</div>
					}
				}
			}
			)}
		</div>
	}
}
