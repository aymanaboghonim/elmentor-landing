export function initHero(i18n){
  const cta = document.getElementById('ctaJoin')
  cta.textContent = i18n.hero.cta
  cta.addEventListener('click', ()=>{
    document.querySelector('#contact').scrollIntoView({behavior:'smooth'})
  })
}
