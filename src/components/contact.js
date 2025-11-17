export function initContact(i18n){
  const form = document.getElementById('joinForm')
  const thanks = document.getElementById('thanksMessage')
  // localize placeholders
  document.getElementById('email').placeholder = i18n.contact.email
  document.getElementById('name').placeholder = i18n.contact.name
  form.addEventListener('submit', e=>{
    e.preventDefault()
    form.hidden = true
    thanks.hidden = false
    thanks.querySelector('p').textContent = i18n.contact.thanks
  })
}
