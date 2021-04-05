import { Fun } from "./Fun"

type Id<a> = a

export const Id = <a>(): Fun<a, Id<a>> => Fun(a => a)
