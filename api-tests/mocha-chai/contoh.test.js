const { expect } = require('chai')
const { describe } = require('mocha')

describe('Contoh test sederhana', () => {
  it('angka 2 + 2 harusnya 4', () => {
    expect(2 + 2).to.equal(4)
  })

  it('string harus contain kata tertentu', () => {
    expect('hello world').to.include('hell')
  })
})
