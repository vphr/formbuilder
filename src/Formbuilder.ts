import { courses, lectures } from "../models/course";
import { student, Student } from "../models/student";
import { ArrayVal, flatten_array, Last, PickArray } from "./Array";
import { Fun } from "./Fun";
import { Id } from "./Id";
import { mkpair, Pair } from "./Pair";
import { omitMany, pickMany } from "./Pickers";
import { formObject, processObjectKeys } from "./types/formTypes";
import { objToElement } from "./types/formTypesExperimental";
import { Unit } from "./Void";

type FormStack<a, b> = Pair<a[], b[]>
type Formbuilder = {
	Entity: <a, b, c> (data: a, f: Fun<FormStep<a, Unit>, FormStep<b, c>>) => final<c>
}

type FormStep<a, b> = {
	entity: FormStack<a, b>
	select: <p extends keyof a>(...p: p[]) => FormStep<Omit<a, p>, Pick<a, p> | b>
	nextEntity: <c, d, e>(data: c, f: Fun<FormStep<c, b>, FormStep<d, e>>) => FormStep<d, e>
	Children: <arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, any>,
		FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>) =>
		//Children: <arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, any>, FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>) =>
		//FormStep<Omit<ArrayVal<a[arr]>, p>, b | Pick<ArrayVal<a[arr]>, p>[]>
		FormStep<Omit<ArrayVal<a[arr]>, p>, b | { [x: string]: Pick<ArrayVal<a[arr]>, p>[] }>
}

export const Formbuilder = (): Formbuilder => ({
	Entity: function <a, b, c>(data: a, f: Fun<FormStep<a, Unit>, FormStep<b, c>>): final<c> {
		let t = f.f(formstep(mkpair([data], [])))
		return {
			data: t.entity.snd,
			flat_data: flatten_array(t.entity.snd),
			processedkeys: processObjectKeys<c>(t.entity.snd)
		}
	}
})
const formstep = <a, b>(data: FormStack<a, b>): FormStep<a, b> => ({
	entity: data,
	select: function <p extends keyof a>(...p: p[]): FormStep<Omit<a, p>, Pick<a, p> | b> {
		return formstep(mkpair([omitMany(Last(data.fst), p)], [...data.snd, pickMany(Last(data.fst), p)]))
	},
	nextEntity: function <c, d, e>(data: c, f: Fun<FormStep<c, b>, FormStep<d, e>>): FormStep<d, e> {
		return f.f(formstep(mkpair([data], this.entity.snd)))
	},
	//[x: string]: Pick<ArrayVal<a[arr]>
	Children: function <arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, any>,
		FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>):
		//FormStep<Omit<ArrayVal<a[arr]>, p>, b | Pick<ArrayVal<a[arr]>, p>[]> {
		FormStep<Omit<ArrayVal<a[arr]>, p>, b | { [x: string]: Pick<ArrayVal<a[arr]>, p>[] }> {
		let res = f.f(formstep(mkpair([Last(data.fst)[arr][0]], [])))
		//	return formstep(mkpair(res.entity.fst, [res.entity.snd, ...data.snd]))
		return formstep(mkpair(res.entity.fst, [{ [arr]: res.entity.snd }, ...data.snd]))
	}
})
type final<a> = {
	data: a[],
	flat_data: a[]
	processedkeys: formObject[]
}
export let t = Formbuilder().Entity(student, Fun(q => q.select("gender", "Name", "enrolled").Children("grades", Fun(q => q.select("CourseId", "Grade")
	.Children("test", Fun(q => q.select("example")))))
	.nextEntity(lectures, Fun(q => q.select("Title").nextEntity(courses, Fun(q => q.select("Name")))))))
let t1 = Formbuilder().Entity(student, Fun(q => q.select("Name")))

