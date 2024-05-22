# js-ring-queue-benchmarks

Performance tests involving different implementations of the ring queue data structure. From [Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer):

> In computer science, a circular buffer, circular queue, cyclic buffer or ring buffer is a data structure that uses a single, fixed-size buffer as if it were connected end-to-end. This structure lends itself easily to buffering data streams. [...] Circular buffers use FIFO (first in, first out) logic.

All tests were performed on a Macbook Pro M2 2023 with Node.js v22.1.0.

## First run

**Inputs:**

- 5_678 items enqueued per loop
- 5_000 loops per cycle
- 2_000 cycles
- Queue capacity of 10_000 items

**Output:**

- `SplicePush`; total: 352756.9041839988ms, average: 174.70384460670743ms
- `SpliceSlice`; total: 1272853.9823370045ms, average: 622.5844832705278ms
- `ClassicNaive`; total: 368361.8368360011ms, average: 184.97496398345686ms
- `Classic`; total: 238236.70199499963ms, average: 121.47230605724404ms
- `ClassicAlt`; total: 181328.85428800003ms, average: 92.3875508648378ms

## Second run

**Inputs:**

- 95 items enqueued per loop
- 100_000 loops per cycle
- 2_000 cycles
- Queue capacity of 10_000 items

**Output:**

- `SplicePush`; total: 296076.6768270008ms, average: 148.7123338915623ms
- `SpliceSlice`; timed out
- `ClassicNaive`; total: 111395.35066199981ms, average: 55.808464530568536ms
- `Classic`; total: 75771.05843499991ms, average: 38.09141777135401ms
- `ClassicAlt`; total: 56328.39289100003ms, average: 28.24845959527119ms

## Conclusion

`ClassicAlt` is faster across the board, potentially signaling that avoiding `.splice()` and `.slice()` altogether leads to better performance.
