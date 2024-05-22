import {type RingQueue} from "../RingQueue.js"

// Maintain both a `leading` and `trailing` pointers, push items individually
//
// A classic implementation of a ring queue, with both a `leading` and a
// `trailing` pointers. Unlike `SplicePush` and `SpliceSlice`, each item is
// enqueued individually. This implementation is naive in the sense that the
// `leading` and `trailing` pointers are updated at every item being enqueued
// and that, usually, the rear of the queue can be inferred from `leading` and
// `length` without a significant performance penalty

export class ClassicNaive<T> implements RingQueue<T> {
  private _buffer: T[]
  private _length: number
  private _leading: number
  private _trailing: number

  public constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("capacity <= 0")
    }

    this._buffer = new Array<T>(capacity)
    this._length = 0
    this._leading = 0
    this._trailing = 0
  }

  public get capacity(): number {
    return this._buffer.length
  }

  public get length(): number {
    return this._length
  }

  public enqueue(...values: T[]): void {
    for (const value of values) {
      if (this._length < this._buffer.length) {
        this._length += 1
      } else {
        this._leading = (this._leading + 1) % this._buffer.length
      }

      this._buffer[this._trailing] = value
      this._trailing = (this._trailing + 1) % this._buffer.length
    }
  }

  public at(index: number): T | undefined {
    if (index < 0) {
      index += this._length
    }

    if (index < 0 || index >= this._length) {
      return undefined
    }

    return this._buffer[(this._leading + index) % this._buffer.length]
  }
}
