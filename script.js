// Basic i18n loader and UI wiring for the demo (frontend-only)
import { initHero } from './src/components/hero.js'
import { initAbout } from './src/components/about.js'
import { initContact } from './src/components/contact.js'
import { initCircles } from './src/components/circles.js'
import { initNews } from './src/components/news.js'
import { initFounder } from './src/components/founder.js'

const i18nPaths = {
  en: 'i18n/en.json',
  ar: 'i18n/ar.json'
}
let currentLang = localStorage.getItem('el_lang') || 'en'

async function loadTranslations(lang){
  const path = i18nPaths[lang]
  try{
    const res = await fetch(path)
    if(!res.ok) throw new Error('i18n load failed')
    const data = await res.json()
    document.documentElement.lang = lang
    document.documentElement.dir = (lang==='ar')? 'rtl' : 'ltr'
    applyTranslations(data)
    // initialize modules after applying translations
    initHero(data)
    initAbout(data)
    initCircles(data)
    initNews(data)
    initFounder(data)
    initContact(data)
  }catch(e){console.error(e)}
}

function applyTranslations(t){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n')
    const value = key.split('.').reduce((o,k)=> (o||{})[k], t)
    if(value) el.textContent = value
  })
}

// Navigation smooth links and CTA
document.addEventListener('click', e =>{
  const target = e.target.closest('[data-target]')
  if(target){
    const sel = target.getAttribute('data-target')
    const el = document.querySelector(sel)
    if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}) }
  }
})

// Language toggle
const toggle = document.getElementById('langToggle')
function updateToggle(){ toggle.textContent = currentLang==='ar' ? 'English' : 'العربية' }

toggle.addEventListener('click', ()=>{
  currentLang = (currentLang==='en')? 'ar':'en'
  localStorage.setItem('el_lang', currentLang)
  loadTranslations(currentLang)
  updateToggle()
})

// Demo content for circles and news
const circlesData = [
  {id:'learn'},
  {id:'tech'},
  {id:'career'}
]

// (module functions for circles & news moved to src/components/*)

// Form demo-only behavior — show thank you
const form = document.getElementById('joinForm')
const thanks = document.getElementById('thanksMessage')
form.addEventListener('submit', e=>{
  e.preventDefault()
  // For demo-only: don't retain info. Show localized thank you.
  form.hidden = true
  thanks.hidden = false
})

// Load and apply i18n
async function bootstrap(){
  const res = await fetch(i18nPaths[currentLang])
  const t = await res.json()
  applyTranslations(t)
  renderCircles(t.circles)
  renderNews(t.news)
  updateToggle()
}
bootstrap()
