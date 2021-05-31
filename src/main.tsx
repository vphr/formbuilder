import React from 'react'
import { student, Student } from '../models/student';
import { flatten_array } from './Array';
import { Formbuilder, sample1 } from './Formbuilder';
import { Fun } from './Fun';
import { FormbuilderTEST } from './types/formComponentBuilder';
import { Testformbuilder } from './types/formElementBuilder';
import { mergeFunction, NumberElement } from './types/formTypes';

type Appstate = {
	randomelement: string
	anotherelement: number
	yetanother: boolean
}
type Appstate2 = Student

class App extends React.Component<{}, Appstate2> {
	constructor(props: {}) {
		super(props)
		this.state = student
		/*this.state = {
			randomelement: "",
			anotherelement: 0,
			yetanother: false
		}*/
	}
	change = <T extends keyof Appstate>(prop: T, value: Appstate[T]) => {
		this.setState({ ...this.state, [prop]: value })
	}
	render(): JSX.Element {
		return (
			<div className="App">
				<FormbuilderTEST attr={mergeFunction(Formbuilder().Entity(this.state, Fun(q => q.select("gender", "Name", "enrolled").Children("grades", Fun(q => q.select("CourseId", "Grade")
					.Children("test", Fun(q => q.select("example"))))))).flat_data)}
					onchange={(k, v, i) => this.setState({ ...this.state, [k]: v })} />
			</div>
		)
	}
}
export default App;
