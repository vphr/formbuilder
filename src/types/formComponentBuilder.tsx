import React from 'react'
import { formObject, getFormType, processObjectKeys } from './formTypes'

type props<a> = {
	data: a[]
	onchange: <t>(key: string, value: t, index: number) => void
}
type state = {
}


export class FormbuilderComponent<a> extends React.Component<props<a>, state> {
	constructor(props: props<a>) {
		super(props)
		this.state = {
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
							<input type="number" value={formobj.value} onChange={c => {
								return this.props.onchange(formobj.key, c.currentTarget.valueAsNumber, formobj.index)
							}} />
						</div>

					}
					case "object": {
						return <FormbuilderComponent
							data={this.props.data[formobj.index][formobj.key]}
							onchange={(k, v, i) => {


								//								let res3 = { ...this.props.data[formobj.index][formobj.key] }
								//								let res11 = { ...res3, [i]: { ...res3[i], [k]: v } }
								//								let res9 = { ...res3, ...res10 }
								//								let result = Object.assign({}, ...Object.keys(res11).flatMap(k => res11[k]))
								//								console.log(res11)

								let initial = { ...this.props.data[formobj.index] }
								let withnewval = { ...initial[formobj.key], [i]: { ...initial[formobj.key][i], [k]: v } }
								let result = Object.assign({}, ...Object.keys(withnewval).map(k => withnewval[k]))
								this.props.onchange(formobj.key, Array(result), formobj.index)
							}}
						/>
					}
					case "nestedobject": {
						return <div>nested</div>
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

