// import { assertType, beforeEach, it } from 'vitest'
// import KSGarbageTruck from '../src'
// import type { IData } from '../src'

// declare module 'vitest' {
//   export interface TestContext {
//     ksgt?: KSGarbageTruck
//   }
// }

// beforeEach(async (ctx) => {
//   const ksgt = new KSGarbageTruck()
//   await ksgt.fetchData()
//   ctx.ksgt = ksgt
// })

// it('getNearestData', async (ctx) => {
//   const d = ctx.ksgt?.getNearestData(22.6877358, 120.2916524, 10) || []
//   assertType<IData[]>(d)
// })

import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})
