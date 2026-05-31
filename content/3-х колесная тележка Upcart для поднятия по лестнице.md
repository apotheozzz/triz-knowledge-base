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
object:
  - опорная поверхность
object_abstr:
  - тело
field_out: механическое
field_in: механическое
transformation:
  - дробление
law:
  - моно-би-поли
harmful_tool:
  - тело
harmful_action: задерживать
harmful_object: тело
tags:
  - Фактура
source: https://www.techinsider.ru/gadgets/238515-kak-legko-perevezti-gruz-po-stupenkam/
---

## Аннотация
*Обычную грузовую тележку трудно катить по лестнице: её приходится приподнимать, из-за чего человек устает и напрягает спину. В решении Upcart вместо одного колеса с каждой стороны использован блок из трёх колёс, благодаря чему тележка легче проходит ступеньки и неровности.*
## Описание

**Проблема:**  
Обычную тележку с двумя колёсами трудно тащить по лестнице. Когда колесо упирается в ступеньку, тележку приходится поднимать руками. Из-за этого человек напрягает спину, быстрее устает и может уронить груз.

**Решение:**  
К тележке добавили не одно колесо с каждой стороны, а **по три колеса**, расположенные вокруг общей оси, как маленькая «звёздочка» или треугольник из колёс.

**Технический принцип действия системы:**
У тележки с каждой стороны стоит блок из трёх колёс. Эти колёса закреплены не отдельно, а вместе — на вращающейся треугольной пластине.

На ровной дороге тележка катится как обычная: нижнее колесо касается земли и вращается.

Когда появляется ступенька, нижнее колесо упирается в край ступени. Тогда поворачивается уже не только само колесо, а весь треугольный блок. Одно колесо остаётся ниже, другое оказывается выше, третье готовится стать следующим опорным колесом.

Получается, что тележка не перепрыгивает ступеньку и не требует сильного подъёма руками. Она постепенно переносит опору с одного колеса на другое и поэтому легче поднимается по лестнице.
## Функциональный принцип действия системы
Человек перемещает ручку тележки
Ручка тележки перемещает корпус тележки
Корпус тележки перемещает колеса
Колеса толкают опорную поверхность
## ТРИЗ-анализ


Конкретная функция: колеса толкают опорную поверхность
Абстрактная функция: система тел толкает тело
Поле на выходе: механическое
Поле на входе: механическое
Исходный недостаток: энергозатратность перемещения тележки (при подъеме по лестнице)
Исходное противоречие условий: Если сделать колесо большого диаметра, то тележку легко перемещать по ступенькам, но станет тяжелее перемещать по дороге. Если оставить колесо маленьким, то перемещать тележку по дороге будет легко, но по ступенькам тяжелее.
Разрешение противоречия: вместо 1-го большого колеса использовать поворотный блок из 3-х колес
Прием разрешения противоречия условий: дробление
Проявившаяся закономерность: моно-би-поли
Вредная конкретная функция: ступени задерживают тележку
Вредная абстрактная функция: тело задерживает тело

<!-- AUTO-VEPOL:START -->

## Функциональный веполь

<div class="functional-vepol" style="max-width: 920px; margin: 24px 0;">
<svg viewBox="0 0 960 360" width="100%" role="img" aria-label="Функциональный веполь" style="display: block; max-width: 100%; height: auto;">
  <defs>
    <marker id="vepol-arrow" markerWidth="28" markerHeight="28" refX="24" refY="14" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M4,4 L24,14 L4,24 Z" fill="#2f2f2f" />
    </marker>
  </defs>
  <style>
    .vepol-title { font: 700 34px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-sub { font: 28px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-value { font: 28px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
    .vepol-arrow { stroke: #303030; stroke-width: 7; stroke-linecap: square; marker-end: url(#vepol-arrow); }
    .vepol-label { font: italic 24px Georgia, "Times New Roman", serif; fill: #c71818; }
    .vepol-prod-label { font: italic 24px Georgia, "Times New Roman", serif; fill: #1f1f1f; }
  </style>
  <text x="315" y="56" text-anchor="middle" class="vepol-title">П2</text>
  <text x="315" y="96" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="315" y="132" text-anchor="middle" class="vepol-value">(механическое)</text>
  <text x="770" y="56" text-anchor="middle" class="vepol-title">П1</text>
  <text x="770" y="96" text-anchor="middle" class="vepol-sub">поле взаимодействия</text>
  <text x="770" y="132" text-anchor="middle" class="vepol-value">(механическое)</text>
  <text x="120" y="292" text-anchor="middle" class="vepol-title">В1</text>
  <text x="120" y="330" text-anchor="middle" class="vepol-sub">(изделие)</text>
  <text x="120" y="356" text-anchor="middle" class="vepol-value">груз</text>
  <text x="505" y="292" text-anchor="middle" class="vepol-title">В2</text>
  <text x="505" y="330" text-anchor="middle" class="vepol-sub">(инструмент)</text>
  <text x="505" y="356" text-anchor="middle" class="vepol-value">тело</text>
  <line x1="210" y1="160" x2="155" y2="242" class="vepol-arrow"></line>
  <text x="183" y="210" text-anchor="middle" transform="rotate(-58 183 210)" class="vepol-label">перемещать</text>
  <line x1="505" y1="240" x2="455" y2="158" class="vepol-arrow"></line>
  <text x="525" y="198" text-anchor="middle" transform="rotate(58 525 198)" class="vepol-prod-label">производит</text>
  <line x1="655" y1="160" x2="585" y2="242" class="vepol-arrow"></line>
  <text x="625" y="207" text-anchor="middle" transform="rotate(-50 625 207)" class="vepol-label">воздействие</text>
</svg>
</div>

<!-- AUTO-VEPOL:END -->

