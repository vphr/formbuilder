import { Fun } from "./Fun"

export type Pair<a, b> = { fst: a, snd: b }
	& {
		map: <a1, b1>(l: Fun<a, a1>, r: Fun<b, b1>) => Pair<a1, b1>
	}

const pair = <a, b>(): Fun<a, Fun<b, Pair<a, b>>> =>
	Fun(a => Fun(b => ({
		fst: a, snd: b,
		map: function <a1, b1>(l: Fun<a, a1>, r: Fun<b, b1>): Pair<a1, b1> {
			return pair_map(l, r).f(this)
		}
	})))

export const mkpair = <a, b>(a: a, b: b): Pair<a, b> =>
({
	fst: a,
	snd: b,
	map: function <a1, b1>(l: Fun<a, a1>, r: Fun<b, b1>): Pair<a1, b1> {
		return pair_map(l, r).f(this)
	}
})

const pair_mapleft = <a, a1, b>(f: Fun<a, a1>): Fun<Pair<a, b>, Pair<a1, b>> =>
	Fun(p =>
		pair<a1, b>().f(f.f(p.fst)).f(p.snd)
	)
const pair_mapright = <a, b, b1>(f: Fun<b, b1>): Fun<Pair<a, b>, Pair<a, b1>> =>
	Fun(p =>
		pair<a, b1>().f(p.fst).f(f.f(p.snd))
	)
const pair_map = <a, b, a1, b1>(l: Fun<a, a1>, r: Fun<b, b1>): Fun<Pair<a, b>, Pair<a1, b1>> =>
	Fun(p => pair<a1, b1>().f(pair_mapleft<a, a1, b>(l).f(p).fst)
		.f(pair_mapright<a, b, b1>(r).f(p).snd))


