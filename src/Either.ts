import { Fun } from './Fun'

type Left<a> = { kind: "Left", value: a }
type Right<a> = { kind: "Right", value: a }
type Either<a, b> =
	(Left<a> | Right<b>)
	& {
		map: <newA>(f: Fun<a, newA>) => Either<newA, b>
		then: <newA>(f: Fun<a, Either<newA, b>>) => Either<newA, b>
	}

const left = <a, b>(a: a): Either<a, b> => ({
	kind: "Left",
	value: a,
	map: function <newA>(this: Either<a, b>, f: Fun<a, newA>): Either<newA, b> {
		return either_map<a, newA, b>().f(f).f(this)
	},
	then: function <newA>(f: Fun<a, Either<newA, b>>): Either<newA, b> {
		return either_bind(this, f)
	}
})
const right = <a, b>(b: b): Either<a, b> => ({
	kind: "Right",
	value: b,
	map: function <newA>(this: Either<a, b>, f: Fun<a, newA>): Either<newA, b> {
		return either_map<a, newA, b>().f(f).f(this)
	},
	then: function <newA>(f: Fun<a, Either<newA, b>>): Either<newA, b> {
		return either_bind(this, f)
	}
})

const either_map = <a, newA, b>(): Fun<Fun<a, newA>, Fun<Either<a, b>, Either<newA, b>>> =>
	Fun(f =>
		Fun(x =>
			x.kind == "Right" ? right(x.value)
				: left(f.f(x.value))
		))

const either_unit = <a, b>(x: a): Either<a, b> => left(x)
const either_join = <a, b>(x: Either<Either<a, b>, b>): Either<a, b> =>
	x.kind == "Right" ? right(x.value)
		: x.value



const either_bind = <a, b, newA>(p: Either<a, b>, f: Fun<a, Either<newA, b>>): Either<newA, b> =>
	either_join(p.map(f))
