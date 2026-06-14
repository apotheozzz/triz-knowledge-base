---
title: 3-х колесная тележка Upcart для поднятия по лестнице
created: 2024-01-07 17:29:40Z
layer:
  - фактура
tool:
  - колеса
tool_abstr:
  - тело
action:
  - толкать
product:
  - опорная поверхность
product_abstr:
  - тело
field_out: механическое
field_in: механическое
transformation:
  - дробление
law:
  - моно-би-поли
harmful_tool: тело
harmful_action: задерживать
harmful_product:
  - тело
source: https://www.techinsider.ru/gadgets/238515-kak-legko-perevezti-gruz-po-stupenkam/
source_true: https://upcart.com/products/stair-climbing-trolley-dolly
tags:
  - фактура
  - прием_дробление
  - закономерность_моно-би-поли
  - действие_толкать
  - колеса
  - опорная_поверхность
---
## Аннотация
*Обычную грузовую тележку трудно катить по лестнице: её приходится приподнимать, из-за чего человек устает и напрягает спину. В решении Upcart вместо одного колеса с каждой стороны использован блок из трёх колёс, благодаря чему тележка легче проходит ступеньки и неровности.*
## Описание

**Проблема:**  
Обычную тележку с двумя колёсами трудно тащить по лестнице. Когда колесо упирается в ступеньку, тележку приходится поднимать руками. Из-за этого человек напрягает спину, быстрее устает и может уронить груз.

**Попытки улучшения исходной системы:**
Чтобы тележка легче проходила ступеньки, можно было увеличить диаметр колёс. Большое колесо легче перекатывается через край ступени и меньше застревает на препятствии.

Но такое решение даёт компромисс. Большое колесо увеличивает плечо рычага, поэтому при подъёме по лестнице больше веса передаётся на руки человека. Тележку приходится сильнее удерживать, и нагрузка на спину остаётся высокой.

Кроме того, большие колёса делают тележку крупнее, тяжелее и менее удобной для хранения. Также может уменьшиться устойчивость тележки при движении и остановке.

Поэтому простое увеличение колеса частично помогает проходить ступеньки, но ухудшает удобство, компактность и снижает выигрыш для человека.

**Решение:**  
К тележке добавили не одно колесо с каждой стороны, а **по три колеса**, расположенные вокруг общей оси, как маленькая «звёздочка» или треугольник из колёс.

**Технический принцип действия системы:**
У тележки с каждой стороны стоит блок из трёх колёс. Эти колёса закреплены не отдельно, а вместе — на вращающейся треугольной пластине.

На ровной дороге тележка катится как обычная: нижнее колесо касается земли и вращается.

Когда появляется ступенька, нижнее колесо упирается в край ступени. Тогда поворачивается уже не только само колесо, а весь треугольный блок. Одно колесо остаётся ниже, другое оказывается выше, третье готовится стать следующим опорным колесом.

Получается, что тележка не перепрыгивает ступеньку и не требует сильного подъёма руками. Она постепенно переносит опору с одного колеса на другое и поэтому легче поднимается по лестнице.

## Функциональный принцип действия системы «Тележка»
<div class="fchain-source" hidden aria-hidden="true">
...fchain
человек перемещает ручка тележки
ручка тележки перемещает корпус тележки
корпус тележки перемещает колеса
колеса толкают опорную поверхность
...
</div>
<!-- AUTO-FCHAIN:START -->
<div class="functional-chain" style="max-width: 1054px; margin: 24px 0; overflow-x: auto;">
<svg viewBox="0 0 1054 132" width="100%" role="img" aria-label="Функциональная цепочка" style="display: block; max-width: 100%; height: auto;">
  <defs>
    <marker id="fchain-arrow-4x3m7o" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 8 4 L 0 8 z" fill="#1f1f1f" />
    </marker>
  </defs>
  <style>
    .fchain-box { fill: #f7f7f2; stroke: #1f1f1f; stroke-width: 1.5; }
    .fchain-arrow { stroke: #1f1f1f; stroke-width: 2; stroke-linecap: square; }
    .fchain-object { font: 700 15px Arial, sans-serif; fill: #1f1f1f; }
    .fchain-action { font: 700 14px Arial, sans-serif; fill: #1f1f1f; }
  </style>
    <line x1="144" y1="98" x2="210" y2="98" class="fchain-arrow" marker-end="url(#fchain-arrow-4x3m7o)"></line>
    <text x="181" y="62" text-anchor="middle" class="fchain-action">перемещает</text>
    <line x1="356" y1="98" x2="422" y2="98" class="fchain-arrow" marker-end="url(#fchain-arrow-4x3m7o)"></line>
    <text x="393" y="62" text-anchor="middle" class="fchain-action">перемещает</text>
    <line x1="576" y1="98" x2="642" y2="98" class="fchain-arrow" marker-end="url(#fchain-arrow-4x3m7o)"></line>
    <text x="613" y="62" text-anchor="middle" class="fchain-action">перемещает</text>
    <line x1="770" y1="98" x2="836" y2="98" class="fchain-arrow" marker-end="url(#fchain-arrow-4x3m7o)"></line>
    <text x="807" y="62" text-anchor="middle" class="fchain-action">толкают</text>
    <rect x="24" y="69" width="120" height="58" class="fchain-box"></rect>
    <text x="84" y="103" text-anchor="middle" class="fchain-object">человек</text>
    <rect x="218" y="69" width="138" height="58" class="fchain-box"></rect>
    <text x="287" y="103" text-anchor="middle" class="fchain-object">ручка тележки</text>
    <rect x="430" y="69" width="146" height="58" class="fchain-box"></rect>
    <text x="503" y="103" text-anchor="middle" class="fchain-object">корпус тележки</text>
    <rect x="650" y="69" width="120" height="58" class="fchain-box"></rect>
    <text x="710" y="103" text-anchor="middle" class="fchain-object">колеса</text>
    <rect x="844" y="69" width="186" height="58" class="fchain-box"></rect>
    <text x="937" y="94" text-anchor="middle" class="fchain-object">опорную</text>
    <text x="937" y="112" text-anchor="middle" class="fchain-object">поверхность</text>
</svg>
</div>
<!-- AUTO-FCHAIN:END -->

## Краткий ТРИЗ-анализ
**Конкретная функция:** колеса толкают опорную поверхность
**Абстрактная функция:** система тел толкает тело
**Поле на выходе:** механическое
**Поле на входе:** механическое
**Исходный недостаток:** энергозатратность перемещения тележки (при подъеме по ступеням)
**Конфликтующая пара:** колеса и ступени
**Исходное противоречие условий:** Если сделать колесо большого диаметра, то тележку легко перемещать по ступенькам, но станет тяжелее перемещать по плоской опорной поверхности. Если оставить колесо маленьким, то перемещать тележку по плоской опорной поверхности будет легко, но по ступенькам тяжелее.
**Разрешение противоречия условий:** вместо 1-го большого колеса использовать поворотный блок из 3-х колес
**Прием разрешения противоречия условий:** дробление
**Проявившаяся закономерность:** моно-би-поли
**Вредная конкретная функция:** ступени задерживают тележку
**Вредная абстрактная функция:** тело задерживает тело

<!-- AUTO-VEPOL:START -->

## Вепольно-функциональная формула эффекта

<div class="functional-vepol" style="max-width: 1040px; margin: 24px 0;">
<svg viewBox="0 0 1120 360" width="100%" role="img" aria-label="Вепольно-функциональная формула эффекта" style="display: block; max-width: 100%; height: auto;">
  <defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 4 2 L 0 4 z" fill="#333" />
    </marker>
  </defs>
  <style>
    .vepol-field { font: 700 32px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-sub { font: 26px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-object { font: 700 30px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-verb { font: italic 20px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
  </style>
  <text x="360" y="70" text-anchor="middle" class="vepol-field">Механическое</text>
  <text x="360" y="106" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="790" y="70" text-anchor="middle" class="vepol-field">Механическое</text>
  <text x="790" y="106" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="220" y="292" text-anchor="middle" class="vepol-object">Опорная</text>
  <text x="220" y="326" text-anchor="middle" class="vepol-object">поверхность</text>
  <text x="570" y="292" text-anchor="middle" class="vepol-object">Колеса</text>
  <line x1="302" y1="117" x2="232" y2="237" stroke="#333" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" marker-end="url(#arrowhead)"></line>
  <text x="238" y="178" text-anchor="middle" transform="rotate(-60 238 178)" class="vepol-verb">толкает</text>
  <line x1="500" y1="258" x2="430" y2="138" stroke="#333" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" marker-end="url(#arrowhead)"></line>
  <text x="492" y="190" text-anchor="middle" transform="rotate(60 492 190)" class="vepol-verb">производит</text>
  <line x1="722" y1="117" x2="652" y2="237" stroke="#333" stroke-width="6" stroke-linecap="butt" stroke-linejoin="miter" marker-end="url(#arrowhead)"></line>
  <text x="662" y="178" text-anchor="middle" transform="rotate(-60 662 178)" class="vepol-verb">воздействует</text>
</svg>
</div>

<!-- AUTO-VEPOL:END -->
