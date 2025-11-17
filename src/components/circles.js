export function initCircles(i18n){
  const circles = [ 'learn', 'tech', 'career' ]
  const grid = document.getElementById('circlesGrid')
  grid.innerHTML = ''
  circles.forEach(id=>{
    const card = document.createElement('article')
    card.className = 'circle-card'
    card.tabIndex = 0
    const title = document.createElement('h3')
    title.textContent = i18n.circles[id].title
    const p = document.createElement('p')
    p.textContent = i18n.circles[id].desc
    const btn = document.createElement('button')
    btn.textContent = i18n.hero.cta
    btn.addEventListener('click', ()=>{
      document.querySelector('#contact input[name=email]').focus()
    })
    card.append(title,p,btn)
    grid.append(card)
  })
}
