import {conventional,intelligent} from './finance.js?v=20261105-cae-2';
import {promotions,monthlyFromCAE} from './promotions.js?v=20261109-modalidad-global';
const form=document.querySelector('#form');
const money=n=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n);
const chileDate=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let today=chileDate();
function refreshDate(){const now=new Date();const date=chileDate();const el=document.querySelector('#current-date');el.dateTime=date;el.textContent=new Intl.DateTimeFormat('es-CL',{timeZone:'America/Santiago',day:'numeric',month:'long',year:'numeric'}).format(now);if(date!==today){today=date;update();}}
refreshDate();
setInterval(refreshDate,30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshDate();});
let cards=new Map();
const generic='<span class="generic-logo" aria-hidden="true">▦</span>';
function update(){
 const data=new FormData(form),price=Number(data.get('price').replaceAll('.','')),down=Number(data.get('down').replaceAll('.','')),principal=price-down,months=Number(data.get('months')),rate=Number(data.get('rate')),custom=form.elements.custom.checked;
 const smart=data.get('modality')==='smart';
 const balloon=smart?Number(data.get('balloon').replaceAll('.','')):0;
 const validBalloon=!smart||(Number.isSafeInteger(balloon)&&balloon>0&&balloon<=principal);
 document.querySelector('#balloon-field').hidden=!smart;form.elements.balloon.required=smart;
 document.querySelector('#custom-fields').hidden=!custom;
 const error=document.querySelector('#error');error.hidden=true;cards.clear();
 if(!data.get('model')){document.querySelector('#rows').innerHTML='<div class="model-empty"><strong>Elige tu Tesla</strong><p>Selecciona un modelo para ver las cuotas disponibles.</p></div>';document.querySelector('#capital').innerHTML='';document.querySelector('#personal-preview').innerHTML='';return;}
 const modelExcluded=p=>p.id==='consumer'&&['Model Y Premium LR RWD','Model Y L Premium AWD'].includes(data.get('model'));
 if(!data.get('price')||!data.get('down')||!Number.isFinite(principal)||price<=0||down<0||principal<=0||price>1e12||(custom&&(!data.get('rate')||!Number.isFinite(rate)||rate<0||rate>100||!Number.isInteger(months)||months<1||months>120))){error.hidden=false;error.textContent='Revisa el valor, pie y condiciones personalizadas. El pie debe ser menor al valor del vehículo.';document.querySelector('#rows').innerHTML='';document.querySelector('#personal-preview').innerHTML='';return;}
 document.querySelector('#capital').innerHTML=`<span>Monto antes de bonos</span><strong>${money(principal)}</strong>`;
 if (!validBalloon) {
   error.hidden=false;
   error.textContent='Ingresa un cuotón mayor que cero y no superior al monto financiado.';
   document.querySelector('#rows').replaceChildren();
   document.querySelector('#personal-preview').replaceChildren();
   return;
 }
 const personal={id:'personal',name:'Personalizado',kind:smart?'Inteligente':'Convencional',balloon,cae:rate,personal:true,note:'Aproximación con CAE/12, capital líquido y cuotas iguales; no reproduce necesariamente la cuota contractual.'};
 const bonusFor=p=>p.bonuses?.[data.get('model').startsWith('Model 3')?'model3':'modelY']||0;
 const financedFor=p=>Math.max(0,principal-bonusFor(p));
 function paymentFor(p,n) {
   const financed=financedFor(p);
   if ((p.until && today>p.until) || !Number.isFinite(p.cae) || balloon>financed) return null;
   const monthlyRate=monthlyFromCAE(p.cae);
   return smart ? intelligent(financed,monthlyRate,n,balloon,n).payment : conventional(financed,monthlyRate,n).payment;
 }
 function card(p,n){const financed=financedFor(p);const bonus=bonusFor(p);const expired=p.until&&today>p.until;const payment=paymentFor(p,n);const unavailable=payment===null;const key=p.id+'-'+n;cards.set(key,{p,n,payment,principal:financed,bonus,balloon});return `<button type="button" class="offer ${p.personal?'personal':''} ${unavailable?'unavailable':''}" data-card="${key}"><div class="logo">${p.personal?generic:`<img src="assets/${p.logo}" alt="${p.name}">`}</div><span class="offer-name">${p.name}</span><small>${p.kind||'Automotriz'}</small><strong>${payment===null?(expired?'Vencida':balloon>financed?'Revisa el cuotón':'Solicitar cotización'):money(payment)}</strong>${smart&&payment!==null?`<small>+ cuotón ${money(balloon)}</small>`:''}<span class="rate">${Number.isFinite(p.cae)?'CAE '+p.cae.toLocaleString('es-CL')+'% anual':'CAE por confirmar'}</span><span class="rate monthly-interest">${Number.isFinite(p.monthlyInterest)?(p.monthlyInterest===0?'Sin interés':p.monthlyInterest.toLocaleString('es-CL')+'% interés mensual'):'Interés no informado'}</span>${p.minimum?`<span class="rate">Desde ${money(p.minimum)}</span>`:''}${bonus?`<span class="promo-bonus">Bono ${money(bonus)}</span>`:''}</button>`;}
 document.querySelector('#personal-preview').innerHTML=!validBalloon?'Ingresa un cuotón mayor que cero y no superior al monto financiado.':custom?`<span>Tu cuota a ${months} meses</span><strong>${money(paymentFor(personal,months))}</strong>${smart?`<span>Cuotón adicional: ${money(balloon)} · mes ${months}</span>`:''}`:'';
 const sortValue=(p,n)=>paymentFor(p,n)??Infinity;
 const terms=[...new Set([60,48,36,24,12,...(custom?[months]:[])])].sort((a,b)=>b-a);
 document.querySelector('#rows').innerHTML=terms.map(n=>`<section class="term-row"><div class="term"><strong>${n}</strong><span>meses</span></div><div class="offer-list">${[...promotions.filter(p=>!modelExcluded(p)&&n>=p.min&&n<=p.max),...(custom&&validBalloon&&n===months?[personal]:[])].sort((a,b)=>sortValue(a,n)-sortValue(b,n)).map(p=>card(p,n)).join('')}</div></section>`).join('');
}
form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',e=>{const el=e.target;if(el.hasAttribute('data-money')){const before=el.value.slice(0,el.selectionStart).replace(/\D/g,'').length;el.value=el.value.replace(/\D/g,'').replace(/^0+(?=\d)/,'').replace(/\B(?=(\d{3})+(?!\d))/g,'.');let pos=0,count=0;while(pos<el.value.length&&count<before){if(/\d/.test(el.value[pos]))count++;pos++;}el.setSelectionRange(pos,pos);}update();});form.addEventListener('change',update);
document.querySelector('#rows').addEventListener('click',e=>{const b=e.target.closest('[data-card]');if(!b)return;const {p,n,payment,principal,bonus,balloon}=cards.get(b.dataset.card);const body=document.querySelector('#detail-body');body.replaceChildren();const h=document.createElement('h2');h.textContent=p.name+' · '+n+' meses';body.append(h);for(const value of [p.kind||'Crédito automotriz',payment===null?'Solicita una cotización a la entidad.':'Cuota estimada: '+money(payment),'Monto financiado: '+money(principal),balloon&&payment!==null?'Último pago: '+money(payment+balloon)+' (cuota mensual + cuotón de '+money(balloon)+').' :'',bonus?'Bono descontado del capital: '+money(bonus):'',p.note,p.until?'Vigencia registrada: '+p.until:'Sin fecha de vencimiento registrada.',p.cae?'CAE publicada: '+p.cae+'% (referencia de la promoción, no calculada para esta simulación).':'','Estimación con CAE/12 y cuotas iguales. No se suman otra vez los costos incluidos en la CAE.', 'Desgravamen, comisiones y otros cargos: confirmar en cotización oficial.']){if(value){const para=document.createElement('p');para.textContent=value;body.append(para);}}document.querySelector('#detail').showModal();});document.querySelector('#close').onclick=()=>document.querySelector('#detail').close();update();
