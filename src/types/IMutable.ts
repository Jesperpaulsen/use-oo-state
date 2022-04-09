export type IMutable<T> = {
  -readonly [k in keyof T]: T[k]
}
