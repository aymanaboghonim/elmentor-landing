export function initNews(i18n){
  const list = document.getElementById('newsList')
  list.innerHTML = ''
  const news = [{id:'one'}]
  for(const n of news){
    const item = document.createElement('div')
    item.className = 'news-list-item'
    const h = document.createElement('h4')
    h.textContent = i18n.news[n.id].title
    const p = document.createElement('p')
    p.textContent = i18n.news[n.id].summary
    item.append(h,p)
    list.append(item)
  }
}
