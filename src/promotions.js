export const promotions = [
{id:'consumer',bonuses:{model3:1500000,modelY:3000000},name:'Santander Consumer',logo:'santander-consumer-new.gif',rate:.89,min:1,max:60,until:'2026-12-31',unknownTerm:true,note:'Automotriz. Plazos por confirmar. Inventario OTG seleccionado: bono $1,5 MM Model 3 / $3 MM Model Y; excluye MY L y MY LR RWD. Wall Connector puede sumarse al crédito. El bono se descuenta del valor del vehículo menos el pie para calcular las cuotas.'},
{id:'tanner',name:'Tanner',logo:'tanner.jpg',rate:1.19,min:1,max:60,unknownTerm:true,note:'Automotriz. Sin fecha límite registrada; plazos por confirmar.'},
{id:'forum',name:'Forum',logo:'forum.jpg',rate:1.29,min:1,max:60,unknownTerm:true,note:'Automotriz. Sin fecha límite registrada; plazos por confirmar.'},
{id:'scotia-card',name:'Scotiabank',logo:'scotiabank-new.jpg',kind:'Tarjeta',rate:0,min:24,max:24,until:'2026-11-30',note:'24 cuotas sin interés. Pago vía UPAGO. Confirmar tarjeta, cupo y condiciones.'},
{id:'scotia-loan',name:'Scotiabank',logo:'scotiabank-new.jpg',kind:'Consumo',rate:.79,min:1,max:60,minimum:30000000,until:'2026-11-30',note:'Crédito de consumo hasta 60 meses. Mínimo $30 MM. Gestión con ejecutivo.'},
{id:'scotia-smart',name:'Scotiabank',logo:'scotiabank-new.jpg',kind:'Inteligente',rate:.79,min:36,max:36,minimum:30000000,balloonMissing:true,until:'2026-11-30',note:'36 cuotas. Mínimo $30 MM. Cuotón y condiciones finales no legibles/completos en la tabla: solicitar cotización.'},
{id:'chile',name:'Chile + Edwards',logo:'banco-de-chile.jpg',kind:'Tarjeta',rate:.99,cae:12.68,min:13,max:36,until:'2026-11-30',note:'Tarjetas Banco de Chile y Edwards. Confirmar elegibilidad y cupo.'},
{id:'bci',name:'BCI',logo:'bci-logo.jpg',kind:'Tarjeta premium',rate:.49,min:12,max:48,until:'2026-12-31',note:'Tarjetas premium. Pago vía UPAGO. Confirmar cupo.'},
{id:'santander',name:'Santander',logo:'santander.webp',kind:'Tarjeta',rate:.99,cae:13.22,min:25,max:48,until:'2026-11-30',note:'Pago solo con link UPAGO. Confirmar condiciones y cupo.'},
{id:'itau-legend',name:'Itaú',logo:'itau.png',kind:'Legend',rate:.79,cae:10.03,min:24,max:36,until:'2026-12-31',note:'Tarjeta Legend. Pago UPAGO; confirmar condiciones para clientes nuevos.'},
{id:'itau-black',name:'Itaú',logo:'itau.png',kind:'Black / Signature',rate:.89,cae:12.26,min:24,max:36,until:'2026-12-31',note:'Tarjetas Black o Signature. Promoción industria automotriz.'},
{id:'itau-gold',name:'Itaú',logo:'itau.png',kind:'Gold / Blue / Platinum',rate:1.09,cae:14.92,min:24,max:36,until:'2026-12-31',note:'Tarjetas Gold, Blue o Platinum. Promoción industria automotriz.'}
];
export const monthlyFromCAE=cae=>cae/1200;
