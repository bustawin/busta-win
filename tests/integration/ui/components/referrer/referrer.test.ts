import { describe, expect, it } from 'vitest'
import example from '@ui/components/referrer/example'
import coder from '@ui/components/referrer/coder'

describe('referrer', () => {
  describe('computing', () => {
    describe('Given example', () => {
      it('computes well', async () => {
        const result = coder(example)
        expect(result).toEqual(
          'Bustamante, X. & Federo, R. (2024). Nice Paper, Academy of Management Journal, 4 (2), 100-110.'
        )
      })
    })
  })
})
