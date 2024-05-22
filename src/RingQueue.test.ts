import {describe, test} from "mocha"
import {expect} from "chai"
import {type RingQueueConstructor} from "./RingQueue.js"

export function checkSanity(Class: RingQueueConstructor<number>): void {
  describe(Class.name, () => {
    test("`.capacity` does not change", () => {
      const queue = new Class(5)
      expect(queue.capacity, "queue.capacity").to.equal(5)

      queue.enqueue(0, 1, 2)
      expect(queue.capacity, "queue.capacity").to.equal(5)
      expect(queue.capacity, "queue.capacity").to.equal(5)

      queue.enqueue(3, 4, /* overwrites */ 5)
      expect(queue.capacity, "queue.capacity").to.equal(5)

      queue.enqueue(0, 1, 2, 3, 4, /* overwrites */ 5)
      expect(queue.capacity, "queue.capacity").to.equal(5)
    })

    test("`.length` changes", () => {
      const queue = new Class(5)
      expect(queue.length, "queue.length").to.equal(0)

      queue.enqueue(0, 1, 2)
      expect(queue.length, "queue.length").to.equal(3)

      queue.enqueue(3, 4, /* overwrites */ 5)
      expect(queue.length, "queue.length").to.equal(5)

      queue.enqueue(0, 1, 2, 3, 4, /* overwrites */ 5)
      expect(queue.length, "queue.length").to.equal(5)
    })

    test("`.enqueue()` wraps around, single invocation", () => {
      const queue = new Class(5)

      queue.enqueue(0, 1, 2, 3, 4, /* overwrites */ 5)
      expect(queue.at(0), "queue.at(0)").to.equal(1)
      expect(queue.at(1), "queue.at(1)").to.equal(2)
      expect(queue.at(2), "queue.at(2)").to.equal(3)
      expect(queue.at(3), "queue.at(3)").to.equal(4)
      expect(queue.at(4), "queue.at(4)").to.equal(5)
      expect(queue.at(5), "queue.at(5)").to.equal(undefined)
    })

    test("`.enqueue()` wraps around, multiple invocations", () => {
      const queue = new Class(5)

      queue.enqueue(0, 1, 2)
      expect(queue.at(0), "queue.at(0)").to.equal(0)
      expect(queue.at(1), "queue.at(1)").to.equal(1)
      expect(queue.at(2), "queue.at(2)").to.equal(2)
      expect(queue.at(3), "queue.at(3)").to.equal(undefined)

      queue.enqueue(3, 4, /* overwrites */ 5)
      expect(queue.at(0), "queue.at(0)").to.equal(1)
      expect(queue.at(1), "queue.at(1)").to.equal(2)
      expect(queue.at(2), "queue.at(2)").to.equal(3)
      expect(queue.at(3), "queue.at(3)").to.equal(4)
      expect(queue.at(4), "queue.at(4)").to.equal(5)
      expect(queue.at(5), "queue.at(5)").to.equal(undefined)
    })

    test("`.at()` with positive index", () => {
      const queue = new Class(5)

      queue.enqueue(0, 1, 2)
      expect(queue.at(0), "queue.at(0)").to.equal(0)
      expect(queue.at(1), "queue.at(1)").to.equal(1)
      expect(queue.at(2), "queue.at(2)").to.equal(2)
      expect(queue.at(3), "queue.at(3)").to.equal(undefined)
    })

    test("`.at()` with negative index", () => {
      const queue = new Class(5)

      queue.enqueue(0, 1, 2)
      expect(queue.at(-1), "queue.at(-1)").to.equal(2)
      expect(queue.at(-2), "queue.at(-2)").to.equal(1)
      expect(queue.at(-3), "queue.at(-3)").to.equal(0)
      expect(queue.at(-4), "queue.at(-4)").to.equal(undefined)
    })
  })
}
