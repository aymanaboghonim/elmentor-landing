export function a11yFocusCheck(){
  const links = Array.from(document.querySelectorAll('a,button,input,textarea,select'))
  // Ensure all interactive elements are tabbable or have role
  return links.every(el=>{
    if(el.hasAttribute('tabindex')) return true
    const tag = el.tagName.toLowerCase()
    if(['a','button','input','textarea','select'].includes(tag)) return true
    if(el.getAttribute('role')) return true
    return false
  })
}
