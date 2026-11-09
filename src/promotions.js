export const promotions = [
{id:'consumer',monthlyInterest:0.89,cae:11.86,bonuses:{model3:1500000,modelY:3000000},name:'Santander Consumer',logo:'santander-consumer-new.gif',min:1,max:60,until:'2026-12-31',unknownTerm:true,note:'Automotriz. Plazos por confirmar. Inventario OTG seleccionado: bono $1,5 MM Model 3 / $3 MM Model Y; excluye MY L y MY LR RWD. Wall Connector puede sumarse al crédito. El bono se descuenta del valor del vehículo menos el pie para calcular las cuotas.'},
{id:'scotia-card',monthlyInterest:0,cae:0.76,name:'Scotiabank',logo:'scotiabank-new.jpg',kind:'Tarjeta',min:24,max:24,until:'2026-11-30',note:'24 cuotas sin interés. Pago vía UPAGO. Confirmar tarjeta, cupo y condiciones.'},
{id:'scotia-loan',monthlyInterest:0.79,cae:11.92,name:'Scotiabank',logo:'scotiabank-new.jpg',kind:'Consumo',min:1,max:60,minimum:30000000,until:'2026-11-30',note:'Crédito de consumo hasta 60 meses. Mínimo $30 MM. Gestión con ejecutivo.'},
{id:'scotia-smart',monthlyInterest:0.79,name:'Scotiabank',logo:'scotiabank-new.jpg',kind:'Inteligente',min:36,max:36,minimum:30000000,balloonMissing:true,until:'2026-11-30',note:'36 cuotas. Mínimo $30 MM. Cuotón y condiciones finales no legibles/completos en la tabla: solicitar cotización.'},
{id:'chile',monthlyInterest:0.99,name:'Chile + Edwards',logo:'banco-de-chile.jpg',kind:'Tarjeta',cae:12.68,min:13,max:36,until:'2026-11-30',note:'Tarjetas Banco de Chile y Edwards. Confirmar elegibilidad y cupo.'},
{id:'bci',monthlyInterest:0.49,cae:6.47,name:'BCI',logo:'bci-logo.jpg',kind:'Tarjeta premium',min:12,max:48,until:'2026-12-31',note:'Tarjetas premium. Pago vía UPAGO. Confirmar cupo.'},
{id:'santander',monthlyInterest:0.99,name:'Santander',logo:'santander.webp',kind:'Tarjeta',cae:13.22,min:25,max:48,until:'2026-11-30',note:'Pago solo con link UPAGO. Confirmar condiciones y cupo.'},
{id:'itau-legend',monthlyInterest:0.79,name:'Itaú',logo:'itau.png',kind:'Legend',cae:10.03,min:24,max:36,until:'2026-12-31',note:'Tarjeta Legend. Pago UPAGO; confirmar condiciones para clientes nuevos.'},
{id:'itau-black',monthlyInterest:0.89,name:'Itaú',logo:'itau.png',kind:'Black / Signature',cae:12.26,min:24,max:36,until:'2026-12-31',note:'Tarjetas Black o Signature. Promoción industria automotriz.'},
{id:'itau-gold',monthlyInterest:1.09,name:'Itaú',logo:'itau.png',kind:'Gold / Blue / Platinum',cae:14.92,min:24,max:36,until:'2026-12-31',note:'Tarjetas Gold, Blue o Platinum. Promoción industria automotriz.'}
];
export const monthlyFromCAE=cae=>cae/1200;
