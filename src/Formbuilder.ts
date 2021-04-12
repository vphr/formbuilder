import { courses, Lectures, lectures } from "../models/course";
import { student, Student} from "../models/student";
import { ArrayVal, PickArray } from "./Array";
import { Fun } from "./Fun";
import { Id } from "./Id";
import { mkpair, Pair } from "./Pair";
import { omitMany, pick, pickMany } from "./Pickers";
import { Unit } from "./Void";


type Formbuilder = {
	Entity: <a, b, c> (data: a, f: Fun<FormStep<a, Unit>, FormStep<b, c>>) => final
}

type FormStep<a, b> = {
	entity: Pair<a, b>
	select: <p extends keyof a>(...p: p[]) => FormStep<Omit<a, p>, Pick<a, p> & b>
	nextEntity: <c, d, e>(data: c, f: Fun<FormStep<c, b>, any>) => FormStep<d, e>
	Children: <arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, Unit>, FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>) =>
		FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p> & b> 
		//FormStep<Omit<ArrayVal<a[arr]>, p>, { [key in arr]: Array<Pick<ArrayVal<a[arr]>, p>> }>
}

const Formbuilder = (): Formbuilder => ({
	Entity: function <a, b, c>(data: a, f: Fun<FormStep<a, Unit>, FormStep<b, c>>): final {
		let t = f.f(formstep(mkpair(data, {})))
		return { data: t }
	}
})
const formstep = <a, b>(data: Pair<a, b>): FormStep<a, b> => ({
	entity: data,
	select: function <p extends keyof a>(...p: p[]): FormStep<Omit<a, p>, Pick<a, p> & b> {
		let t1 = omitMany(data.fst, p)
		let t2 = pickMany(data.fst, p)
		let t3 = { ...data.snd, ...t2 }
		return formstep(mkpair(t1, t3))
	},
	nextEntity: function <c, d, e>(data: c, f: Fun<FormStep<c, b>, FormStep<d, e>>): FormStep<d, e> {
		return f.f(formstep(mkpair(data, this.entity.snd)))
	},
	Children: function<arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, Unit>, FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>):
FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p> & b> {
		let ob = data.fst[arr][0]
		let t22 = formstep(mkpair(ob,{}))
		let t2 = f.f(t22)
		let t3 = { ...t2.entity.snd, ...data.snd }
		let t5 = formstep(mkpair(t2.entity.fst, t3))
		return t5
	}



})
type final = { data: any }
let t = Formbuilder().Entity(student, Fun(q => q.select("gender", "Name").Children("grades",Fun(q => q.select("CourseId","Grade")))
	.nextEntity(lectures, Fun(q => q.select("Title").nextEntity(courses, Fun(q => q.select("Name_2")))))))

console.log(t.data)