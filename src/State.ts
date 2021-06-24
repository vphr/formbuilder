import { Fun } from "./Fun"
import { Unit } from "./Void"
import { Id } from "./Id";
import { mkpair, Pair, pair_apply } from "./Pair";

type State<s, a> = {
	f: Fun<s, Pair<a, s>>
	then: <b>(k: (_: a) => State<s, b>) => State<s, b>
}

const runState = <s, a>(f: Fun<s, Pair<a, s>>): State<s, a> => ({
	f: f,
	then: function <b>(k: (_: a) => State<s, b>): State<s, b> {
		return state_bind(Fun(k)).f(this)
	}
})
const State = <s, a>(f: State<s, a>): Fun<s, Pair<a, s>> =>
	f.f

const state_map = <s, a, b>(f: Fun<a, b>): Fun<State<s, a>, State<s, b>> =>
	Fun(s0 =>
		runState(
			Fun(s => {
				let t = s0.f.f(s)
				let t2 = f.f(t.fst)
				return mkpair(t2, t.snd)
			})
		)
	)

const state_unit = <s, a>(a: a): State<s, a> => runState(Fun(s0 => mkpair(a, s0)))

const state_join = <s, a>(x: State<s, State<s, a>>): State<s, a> =>
	runState(
		x.f.then(Fun(x1 => pair_apply(x1.map(Fun(State), Id()))
		))
	)
const state_bind = <s, a, b>(f: Fun<a, State<s, b>>): Fun<State<s, a>, State<s, b>> =>
	state_map<s, a, State<s, b>>(f).then(Fun(state_join))


export const get_state = <s>() => <k extends keyof s>(kk: k): State<s, s[k]> =>
	runState(Fun(s0 => mkpair(s0[kk], s0)))

export const set_state = <s>() => <k extends keyof s>(kk: k) => (val: s[k]): State<s, Unit> =>
	runState(Fun(s0 => mkpair({}, { ...s0, [kk]: val })))
