import {type RingQueueConstructor} from "./RingQueue.js"
import {SplicePush} from "./implementations/SplicePush.js"
import {SpliceSlice} from "./implementations/SpliceSlice.js"
import {ClassicNaive} from "./implementations/ClassicNaive.js"
import {Classic} from "./implementations/Classic.js"
import {ClassicAlt} from "./implementations/ClassicAlt.js"

interface Options {
  length: number
  loops: number
  cycles: number
  capacity: number
}

function measure(Class: RingQueueConstructor<number>, options: Options): string {
  const {length, loops, cycles, capacity} = options

  const items = Array.from({length: cycles}, () =>
    Array.from({length}, () => Math.random() * length)
  )

  let total = 0
  let average = 0

  for (let cycle = 0; cycle < cycles; cycle++) {
    const queue = new Class(capacity)
    const now = performance.now()

    for (let loop = 0; loop < loops; loop++) {
      queue.enqueue(...items[Math.floor(Math.random() * cycles)])
    }

    const duration = performance.now() - now
    total = total + duration
    average = (average + duration) / 2
  }

  return `${Class.name} [total: ${String(total)}ms | average: ${String(average)}ms]`
}

const OPTIONS: Options[] = [
  {
    length: 5_678,
    loops: 5_000,
    cycles: 2_000,
    capacity: 10_000
  },
  {
    length: 95,
    loops: 100_000,
    cycles: 2_000,
    capacity: 10_000
  }
]

const IMPLEMENTATIONS: RingQueueConstructor<number>[] = [
  SplicePush,
  SpliceSlice,
  ClassicNaive,
  Classic,
  ClassicAlt
]

const ARGV = process.argv.slice(2)

if (ARGV.length !== 2) {
  console.error("Invalid number of arguments")
  process.exit(1)
}

const OPTION = Number.parseInt(ARGV[0])

if (Number.isNaN(OPTION) || !(OPTION in OPTIONS)) {
  console.error("Invalid option index")
  process.exit(1)
}

const IMPLEMENTATION = Number.parseInt(ARGV[1])

if (Number.isNaN(IMPLEMENTATION) || !(IMPLEMENTATION in IMPLEMENTATIONS)) {
  console.error("Invalid implementation index")
  process.exit(1)
}

console.log(measure(IMPLEMENTATIONS[IMPLEMENTATION], OPTIONS[OPTION]))
