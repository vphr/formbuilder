
export type Student = {
	Name: string
	Surname: string
	studentId: number
	enrolled: boolean
	gender: 'm' | 'f'
	grades: Grade[]
}
export const student: Student = {
	Name: "",
	Surname: "",
	gender: 'm',
	enrolled: true,
	studentId: 0,
	grades: [{ CourseId: 0, Grade: 0, test: [{ example: "hello" }] }],
}

export type Grade = {
	Grade: number
	CourseId: number
	test: Test[]
}
export type Test = {
	example: string
}
