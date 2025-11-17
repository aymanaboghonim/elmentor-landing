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
let currentTheme = localStorage.getItem('el_theme') || 'auto'

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

// Theme toggle
const themeToggle = document.getElementById('themeToggle')

function applyTheme(theme){
  const root = document.documentElement
  if(theme === 'auto'){
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
  updateThemeToggle()
}

function updateThemeToggle(){
  const root = document.documentElement
  const effectiveTheme = root.getAttribute('data-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  themeToggle.textContent = effectiveTheme === 'dark' ? '☀️' : '🌙'
  themeToggle.setAttribute('aria-label', effectiveTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
}

themeToggle.addEventListener('click', ()=>{
  const root = document.documentElement
  const currentEffective = root.getAttribute('data-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  
  const newTheme = currentEffective === 'dark' ? 'light' : 'dark'
  currentTheme = newTheme
  localStorage.setItem('el_theme', newTheme)
  applyTheme(newTheme)
})

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>{
  if(currentTheme === 'auto'){
    updateThemeToggle()
  }
})

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
  initCircles(t)
  initNews(t)
  updateToggle()
  applyTheme(currentTheme)
}
bootstrap()
