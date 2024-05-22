import {type RingQueue} from "../RingQueue.js"

// Splice the buffer with a slice of itself
//
// A slightly more complex implementation. This approach hints more directly to
// the JIT that the items of the array can can be shifted to the left with a
// single `memcopy`

export class SpliceSlice<T> implements RingQueue<T> {
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
    const shifted = this._buffer.slice(overflow, this._buffer.length)
    this._buffer.splice(0, this._buffer.length, ...shifted, ...items)
  }

  public at(index: number): T | undefined {
    return this._buffer.at(index)
  }
}
