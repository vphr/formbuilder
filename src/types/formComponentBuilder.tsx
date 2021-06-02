import React from 'react'
import { formObject, getFormType, processObjectKeys } from './formTypes'

type props<a> = {
	data: a[]
	onchange: <t>(key: string, value: t, index: number) => void
}
type state = {
}


export class FormbuilderTEST<a> extends React.Component<props<a>, state> {
	constructor(props: props<a>) {
		super(props)
		this.state = {
			children: []
		}
	}
	render() {
		return <div>
			{JSON.stringify(this.props.data)}
			{processObjectKeys(this.props.data).flatMap(formobj => {
				//{this.props.data.flatMap((e, j) => Object.keys(e).flatMap(o => {
				switch (formobj.type) {
					case "boolean": {
						return <div>
							<label >{formobj.key} </label>
							<input type="checkbox" checked={formobj.value} onChange={_ => this.props.onchange(formobj.key, !formobj.value, formobj.index)} />
						</div>

					}
					case "number": {
						return <div>
							<label >{formobj.key} </label>
							<input type="number" value={formobj.value} onChange={c => this.props.onchange(formobj.key, c.currentTarget.valueAsNumber, formobj.index)} />
						</div>

					}
					case "object": {
						return <FormbuilderTEST
							data={this.props.data[formobj.index][formobj.key]}
							onchange={(k, v, i) => {
								let res = { ...this.props.data[formobj.index][formobj.key] }
								res[i] = { [k]: v }
								this.props.onchange(formobj.key, res, i)
							}}
						/>
					}
					case "string": {
						return <div>
							<label >{formobj.key} </label>
							<input type="text" value={formobj.value} onChange={c => this.props.onchange(formobj.key, c.currentTarget.value, formobj.index)} />
						</div>

					}
					default: {
						return <div></div>
					}
				}
			})}

		</div>
	}
}
/*

			{this.props.attr.map((e, j) => {
				switch (e.type) {
					case "array": {
						return <FormbuilderTEST attr={e.value} onchange={(k, v, i) => {
							let t = typeof this.props.attr[j].value[i].type
							return this.props.onchange(k, v, i)
						}
						} />
					}
					case "object": {
						return <FormbuilderTEST attr={e.value as formObject[]} onchange={(k, v, i) => {
							let nested_data = this.props.attr[j] as any
							nested_data.value[i] = formObjectConstructor(v, k)
							this.props.onchange(this.props.attr[e.key], nested_data, i)
						}
						} />
					}
					case "boolean": {
						return <div>
							<label >{e.key}</label>
							<input type="checkbox" checked={e.value} onChange={c => this.props.onchange(e.key, !e.value, j)} />
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
*/
/*
						data={this.props.data[formobj.index][formobj.key]} onchange={(k, v, i) => {
							let nestedList = this.props.data[formobj.index][formobj.key]
							return this.props.onchange(formobj.key, nestedList, i)
 * */



/*
					case "array": {
						return <FormbuilderTEST
							data={[this.props.data[formobj.index][formobj.key] as any]}
							onchange={(key, newValue, index) => {
								let nested_data = this.props.data[formobj.index][formobj.key] as any
								let new_entry = { ...nested_data, [key]: newValue }
								nested_data = new_entry
								console.log(nested_data, "1")
								return this.props.onchange(formobj.key, nested_data, index)
							}
							} />
					}
 * */
