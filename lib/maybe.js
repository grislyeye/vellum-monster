class Maybe {

  orUndefined() {
    return this.orElse(undefined)
  }

}

export const Nothing = Object.assign(new Maybe(), {

  map(f) { return Nothing },

  flatMap(f) { return Nothing },

  orElse(other) { return other },

  forEach(f) {},

  toString() { return 'Nothing' }

})

class Some extends Maybe {

  constructor(value) {
    super()
    this._value = value
  }

  map(f) {
    return maybe(f(this._value))
  }

  flatMap(f) {
    return f(this._value)
  }

  orElse(other) {
    return this._value
  }

  forEach(f) { f(this._value) }

  toString() {
    return `Some(${this._value})`
  }

}

const some = value => new Some(value)

const maybe = value => value === null || value === undefined ? Nothing : some(value)

export { maybe as Maybe, some as Some }
