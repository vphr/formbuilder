import React from 'react'
import { student, Student } from '../models/student';
import { Formbuilder } from './Formbuilder';
import { Fun } from './Fun';
import { FormbuilderComponent } from './types/formComponentBuilder';

type nest4 = {
	layer4element1: string
	layer4element2: number

}
type nest3 = {
	layer3element1: string
	layer3element3: number
	layer3element2: nest4[]

}
type nest2 = {
	layer2element1: string
	layer2element3: boolean
	layer2element2: nest3[]

}
type nest1 = {
	layer1element1: string
	layer1element2: nest2[]
}
type Appstate = {
	randomelement: string
	anotherelement: number
	yetanother: boolean
	nest: nest1[]
}
class App extends React.Component<{}, Appstate> {
	constructor(props: {}) {
		super(props)
		this.state = {
			randomelement: "",
			anotherelement: 0,
			yetanother: false,
			nest: [{
				layer1element1: "layer1", layer1element2:
					[{
						layer2element1: "layer2", "layer2element3": false, layer2element2:
							[{
								layer3element1: "layer3", "layer3element3": 344, layer3element2:
									[{ layer4element1: "layer4", layer4element2: 4 }]
							}]
					}]
			}]
		}
	}
	change = <T extends keyof Appstate>(prop: T, value: Appstate[T]) => {
		this.setState({ ...this.state, [prop]: value })
	}
	render(): JSX.Element {
		return (
			<div>
				<div>
					{JSON.stringify(this.state)}
				</div>
			<div className="App">
				<FormbuilderComponent
					data={Formbuilder().Entity(this.state, Fun(q => q.select("yetanother", "randomelement", "anotherelement")
						.Children("nest", Fun(q => q.Children("layer1element2", Fun(q => q.select("layer2element1", "layer2element3")
							.Children("layer2element2", Fun(q => q.select("layer3element1", "layer3element3")
								.Children("layer3element2", Fun(q => q.select("layer4element1", "layer4element2")))
							))
						))
						))
					)).data_query_pair}
					onchange={this.change}
					/>
			</div>
			</div>
		)
	}
}
export default App;

