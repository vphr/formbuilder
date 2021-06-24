import { ArrayVal, Last, OmitArray, PickArray } from "./Array";
import { Fun } from "./Fun";
import { mkpair, Pair } from "./Pair";
import { omitMany, pickMany } from "./Pickers";
import { formObject, processObjectKeys } from "./types/formTypes";
import { Unit } from "./Void";

type FormStack<a, b> = Pair<a[], b[]>
type Formbuilder = {
	Entity: <a, b, c> (data: a, f: Fun<FormStep<a, Unit>, FormStep<b, c>>) => final<a,c>
}

type FormStep<a, b> = {
	entity: FormStack<a, b>
	select: <p extends keyof OmitArray<a>>(...p: p[]) => FormStep<Omit<a, p>, Pick<a, p> | b>
	nextEntity: <c, d, e>(data: c, f: Fun<FormStep<c, b>, FormStep<d, e>>) => FormStep<d, e>
	Children: <arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, any>,
		FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>) =>
		FormStep<Omit<ArrayVal<a[arr]>, p>, b | { [x: string]: Pick<ArrayVal<a[arr]>, p>[] }>
}

export const Formbuilder = (): Formbuilder => ({
	Entity: function <a, b, c>(data: a, f: Fun<FormStep<a, Unit>, FormStep<b, c>>): final<a, c> {
		let t = f.f(formstep(mkpair([data], [])))
		console.log(data)
		return {
			data: t.entity.snd,
			processedkeys: processObjectKeys<c>(t.entity.snd),
			data_query_pair: mkpair(data, processObjectKeys<c>(t.entity.snd))		}
	}
})
const formstep = <a, b>(data: FormStack<a, b>): FormStep<a, b> => ({
	entity: data,
	select: function <p extends keyof OmitArray<a>>(...p: p[]): FormStep<Omit<a, p>, Pick<a, p> | b> {
		return formstep(mkpair([omitMany(Last(data.fst), p)], [...data.snd, pickMany(Last(data.fst), p)]))
	},
	nextEntity: function <c, d, e>(data: c, f: Fun<FormStep<c, b>, FormStep<d, e>>): FormStep<d, e> {
		return f.f(formstep(mkpair([data], this.entity.snd)))
	},
	Children: function <arr extends keyof PickArray<a>, p extends keyof ArrayVal<a[arr]>>(arr: arr, f: Fun<FormStep<ArrayVal<a[arr]>, any>,
		FormStep<Omit<ArrayVal<a[arr]>, p>, Pick<ArrayVal<a[arr]>, p>>>):
		FormStep<Omit<ArrayVal<a[arr]>, p>, b | { [x: string]: Pick<ArrayVal<a[arr]>, p>[] }> {
		let res = f.f(formstep(mkpair([Last(data.fst)[arr][0]], [])))
		return formstep(mkpair(res.entity.fst, [{ [arr]: res.entity.snd }, ...data.snd]))
	}
})
type final<a, c> = {
	data: c[],
	processedkeys: formObject[],
	data_query_pair: Pair<a, formObject[]>
}

