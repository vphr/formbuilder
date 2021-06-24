import React from 'react'
import { mkpair, Pair } from '../Pair'
import { formObject } from './formTypes'

type props<s> = {
	data: Pair<s, formObject[]>
	onchange: (key: string, value: any) => void
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
			{this.props.data.snd.map((formobj) => {
				switch (formobj.type) {
					case "boolean": {
						return <div>
							<label >{formobj.key} </label>
							<input type="checkbox" checked={formobj.value} onChange={_ => this.props.onchange(formobj.key, !formobj.value)} />
						</div>

					}
					case "number": {
						return <div>
							<label >{formobj.key} </label>
							<input type="number" value={formobj.value} onChange={c => {
								return this.props.onchange(formobj.key, c.currentTarget.valueAsNumber)
							}} />
						</div>

					}
					case "array": {
						const ob = typeof this.props.data.fst[formobj.key] === "undefined" ? this.props.data.fst[0][formobj.key] : this.props.data.fst[formobj.key]
						return <FormbuilderComponent
							data={mkpair(ob, formobj.value)}
							onchange={(k, v) => {
								ob[0][k] = v
								this.props.onchange(formobj.key, ob)
							}}
						/>
					}
					case "object": {
						const ob = this.props.data.fst[0][formobj.key]
						return <FormbuilderComponent
							data={mkpair(ob, formobj.value)}
							onchange={(k, v) => {
								ob[0][k] = v
								this.props.onchange(formobj.key, ob)
							}}
						/>
					}
					case "string": {
						return <div>
							<label >{formobj.key} </label>
							<input type="text" value={formobj.value} onChange={c => this.props.onchange(formobj.key, c.currentTarget.value)} />
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

