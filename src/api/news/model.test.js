import { News } from '.'

let news

beforeEach(async () => {
  news = await News.create({ title: 'test', imgUrl: 'test', link: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = news.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.title).toBe(news.title)
    expect(view.imgUrl).toBe(news.imgUrl)
    expect(view.link).toBe(news.link)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = news.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.title).toBe(news.title)
    expect(view.imgUrl).toBe(news.imgUrl)
    expect(view.link).toBe(news.link)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
