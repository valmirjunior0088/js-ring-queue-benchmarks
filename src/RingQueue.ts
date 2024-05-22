export interface RingQueue<T> {
  capacity: number
  length: number
  enqueue(...items: T[]): void
  at(index: number): T | undefined
}

export interface RingQueueConstructor<T> {
  name: string
  new (capacity: number): RingQueue<T>
}
