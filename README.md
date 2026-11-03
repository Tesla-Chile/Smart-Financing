# Smart Financing · Tesla Chile

Comparador de convenios crediticios con selección de modelo, precio y pie. Opciones bancarias y cálculo personalizado por tasa mensual o aproximación por CAE.

Requiere Node.js 20+. Sin dependencias externas.

- Ejecutar: `npm start`. Abrir http://127.0.0.1:5180.
- Pruebas: `npm test`.
- Promociones: `src/promotions.js`, según tabla proporcionada de noviembre de 2026.
- Cálculos: `src/finance.js`.

Cuotas estimadas sin seguros ni cargos no informados. Santander Consumer descuenta el bono según modelo del valor menos pie. Confirmar inventario, elegibilidad, plazos y vigencia con cada entidad. CAE/12 permite una aproximación con pagos iguales, no reconstruye la cuota contractual.

Repositorio independiente de los displays anteriores. Sitio estático compatible con GitHub Pages; subir el código no activa su hosting automáticamente.
