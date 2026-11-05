import {test} from 'node:test';
import assert from 'node:assert/strict';
import {promotions,monthlyFromCAE} from '../src/promotions.js';
import {conventional} from '../src/finance.js';
test('CAE estimates amortize principal using annual CAE divided by 12',()=>{let balance=26500000;const r=monthlyFromCAE(11.86);const payment=conventional(balance,r,60).payment;for(let m=0;m<60;m++)balance=balance*(1+r)-payment;assert.ok(Math.abs(balance)<.001);});
test('interest-free card still reflects positive CAE',()=>{const p=promotions.find(p=>p.id==='scotia-card');assert.equal(p.cae,.76);assert.ok(conventional(24000000,monthlyFromCAE(p.cae),24).payment>1000000);});
test('only supplied CAEs are calculated; removed lenders are absent',()=>{assert.ok(!promotions.some(p=>['forum','tanner'].includes(p.id)));assert.equal(promotions.find(p=>p.id==='scotia-smart').cae,undefined);assert.ok(promotions.every(p=>p.balloonMissing||Number.isFinite(p.cae)));});
