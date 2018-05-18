import { Observable, fromEvent, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PeriodLifeExpectancyData } from './types';

const data: PeriodLifeExpectancyData = require('./data/ssa-period/data.json');

const age = document.getElementById('age');
const visits = document.getElementById('visits');
const remaining = document.getElementById('remaining');
const percent = document.getElementById('percent');

function getNumber$(element: HTMLElement): Observable<number> {
  return fromEvent(element, 'input').pipe(
    map(e => parseInt((e.target as HTMLInputElement).value, 10))
  );
}

const age$ = getNumber$(age!);
const visits$ = getNumber$(visits!);
const remaining$ = combineLatest<number, number>(age$, visits$).pipe(
  map(([age, visits]) => {
    const expectancy = data.male[age] ? data.male[age].expectancy : 0.63
    return Math.max(expectancy * visits, 0)
  })
);

remaining$.subscribe(r => {
  if (isNaN(r)) {
    return;
  }
  remaining!.innerText = r.toString();
});
