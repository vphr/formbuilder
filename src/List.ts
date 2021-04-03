import { Fun } from './Fun'

type Empty =
	({
		kind: "Empty"
	})
type Cons<a> =
	({
		kind: "Cons"
		head: a
		tail: List<a>
	})

type List<a> = (Empty | Cons<a>) &
{
	map: <b>(f: Fun<a, b>) => List<b>
	then: <b>(f: Fun<a, List<b>>) => List<b>
}
const empty = <a>(): List<a> => ({
	kind: "Empty",
	map: function <b>(f: Fun<a, b>): List<b> {
		return list_map<a, b>(f).f(this)
	},
	then: function <b>(f: Fun<a, List<b>>): List<b> {
		return list_bind(this, f)
	}
})


const cons = <a>(head: a, tail: List<a>): List<a> => ({
	kind: "Cons",
	head: head,
	tail: tail,
	map: function <b>(f: Fun<a, b>): List<b> {
		return list_map<a, b>(f).f(this)
	},
	then: function <b>(f: Fun<a, List<b>>): List<b> {
		return list_bind(this, f)
	}
})

const list_map = <a, b>(f: Fun<a, b>): Fun<List<a>, List<b>> =>
	Fun(k =>
		k.kind == "Empty" ? empty() :
			cons(f.f(k.head), list_map(f).f(k.tail))
	)


const list_unit = <a>(): List<a> => empty<a>()
const list_join = <a>(x: List<List<a>>): List<a> =>
	x.kind == "Empty" ? list_unit() :
		x.head.kind == "Empty" ? list_unit() :
			cons(x.head.head, x.head.tail)

const list_bind = <a, b>(k: List<a>, f: Fun<a, List<b>>): List<b> => {
	return list_map(f).then(Fun(list_join)).f(k)

}




