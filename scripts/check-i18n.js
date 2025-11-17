const fs = require('fs');
const en = JSON.parse(fs.readFileSync('i18n/en.json','utf8'));
const ar = JSON.parse(fs.readFileSync('i18n/ar.json','utf8'));
function flatten(obj,prefix=''){ 
  return Object.keys(obj).reduce((acc,k)=>{
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if(typeof v === 'object' && v !== null){
      Object.assign(acc,flatten(v,key));
    } else {
      acc[key]=v
    }
    return acc
  },{})
}
const fe = flatten(en), fa = flatten(ar);
const enKeys = Object.keys(fe), arKeys = Object.keys(fa);
const missingInAr = enKeys.filter(k=>!arKeys.includes(k));
if(missingInAr.length){
  console.error('Missing translations in Arabic:', missingInAr)
  process.exit(1)
} else {
  console.log('i18n check passed')
}
