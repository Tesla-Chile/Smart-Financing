export const taxPolicy = {monthly: 0.00066, cap: 0.008};
export function stampTax(capital, months, policy = taxPolicy) {
  return capital * Math.min(policy.monthly * Math.ceil(months), policy.cap);
}
export function conventional(principal, rate, months) {
  return intelligent(principal, rate, months, 0, months);
}
// Payments at months 1..n, plus a balloon at month maturity (n or n+1).
export function intelligent(principal, rate, months, balloon, maturity) {
  const annuity = rate === 0 ? months : -Math.expm1(-months * Math.log1p(rate)) / rate;
  const payment = (principal - balloon / (1 + rate) ** maturity) / annuity;
  if (payment < -0.000001) throw new Error('El cuotón supera el valor financiable. Reduce el cuotón o el pie.');
  return {payment: Math.max(0, payment), interest: Math.max(0, payment * months + balloon - principal)};
}
export function simulate(v) {
  const numeric = ['price','down','bonus','rate','months','balloon','insurance','notary','pledge','admin'];
  for (const k of numeric) if (!Number.isFinite(v[k]) || v[k] < 0) throw new Error('Completa los campos con números válidos, iguales o mayores que cero.');
  if (v.price <= 0 || v.price > 1e12) throw new Error('Ingresa un precio mayor que cero y hasta un billón de pesos.');
  if (!Number.isInteger(v.months) || v.months < 1 || v.months > 120) throw new Error('El plazo debe ser de 1 a 120 meses completos.');
  if (v.rate > 100) throw new Error('La tasa mensual debe estar entre 0% y 100%.');
  if (v.downUnit === '%' && v.down > 100 || v.balloonUnit === '%' && v.balloon > 100) throw new Error('Los porcentajes no pueden superar el 100%.');
  const bonus = v.bonusIncluded ? 0 : v.bonus;
  const net = v.price - bonus;
  const down = v.downUnit === '%' ? v.price * v.down / 100 : v.down;
  if (net <= 0 || down >= net) throw new Error('El bono y el pie deben dejar un monto positivo por financiar.');
  const balloon = v.type === 'intelligent' ? (v.balloonUnit === '%' ? v.price * v.balloon / 100 : v.balloon) : 0;
  const maturity = v.months + (v.type === 'intelligent' && v.nextMonth ? 1 : 0);
  let financedFees = 0, upfrontFees = 0;
  for (const k of ['notary','pledge','admin']) {if(v[k+'Financed']) financedFees += v[k]; else upfrontFees += v[k];}
  const base = net - down + financedFees;
  const taxRate = stampTax(1, maturity);
  // If tax is financed, it is itself part of the documented principal.
  const principal = v.taxFinanced ? base / (1-taxRate) : base;
  const tax = stampTax(principal,maturity);
  const result = v.type === 'intelligent' ? intelligent(principal,v.rate/100,v.months,balloon,maturity) : conventional(principal,v.rate/100,v.months);
  const insuranceTotal = v.insurance * maturity;
  const initial = down + upfrontFees + (v.taxFinanced ? 0 : tax);
  const repayments = result.payment * v.months + balloon;
  const financingCost = result.interest + tax + upfrontFees + financedFees + insuranceTotal;
  return {...result,bonus,net,down,balloon,maturity,principal,tax,initial,insuranceTotal,financingCost,total:initial+repayments+insuranceTotal,financedFees,upfrontFees};
}
