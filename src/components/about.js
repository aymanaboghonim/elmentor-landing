export function initAbout(i18n){
  document.querySelector('[data-i18n="about.title"]').textContent = i18n.about.title
  document.querySelector('[data-i18n="about.text"]').textContent = i18n.about.text
}
