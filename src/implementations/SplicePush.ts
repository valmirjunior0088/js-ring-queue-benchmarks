import {type RingQueue} from "../RingQueue.js"

// Splice out the front, push to the back
//
// The simplest implementation. Could work well due to how straightfoward it
// is, meaning the JIT gets the purpose of the code much more easily than if
// the semantics were hidden behind manual optimizations

export class SplicePush<T> implements RingQueue<T> {
  private _buffer: T[]
  private readonly _capacity: number

  public constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("capacity <= 0")
    }

    this._buffer = []
    this._capacity = capacity
  }

  public get capacity(): number {
    return this._capacity
  }

  public get length(): number {
    return this._buffer.length
  }

  public enqueue(...items: T[]): void {
    items = items.slice(-this._capacity)

    const overflow = Math.max(0, this._buffer.length + items.length - this._capacity)
    this._buffer.splice(0, overflow)
    this._buffer.push(...items)
  }

  public at(index: number): T | undefined {
    return this._buffer.at(index)
  }
}
