import {type RingQueue} from "../RingQueue.js"

// Maintain a `leading` pointer, push each item individually
//
// A classic implementation of a ring queue, with a `leading` pointer. Unlike
// `SplicePush` and `SpliceSlice`, each item is enqueued individually but, like
// them, this implementation slices the array of items to be enqueued

export class Classic<T> implements RingQueue<T> {
  private _buffer: T[]
  private _length: number
  private _leading: number

  public constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("capacity <= 0")
    }

    this._buffer = new Array<T>(capacity)
    this._length = 0
    this._leading = 0
  }

  public get capacity(): number {
    return this._buffer.length
  }

  public get length(): number {
    return this._length
  }

  public enqueue(...items: T[]): void {
    items = items.slice(-this._buffer.length)

    let bufferIndex = this._leading + this._length
    let itemsIndex = 0

    while (bufferIndex < this._buffer.length && itemsIndex < items.length) {
      this._buffer[bufferIndex] = items[itemsIndex]
      bufferIndex++
      itemsIndex++
    }

    bufferIndex = 0

    while (itemsIndex < items.length) {
      this._buffer[bufferIndex] = items[itemsIndex]
      bufferIndex++
      itemsIndex++
    }

    const overflow = Math.max(0, this._length + items.length - this._buffer.length)
    this._length += items.length - overflow
    this._leading = (this._leading + overflow) % this._buffer.length
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
