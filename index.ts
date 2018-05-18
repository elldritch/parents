import { Observable, fromEvent, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { LifeExpectancyData } from './types';

const data: LifeExpectancyData = require('./data/json/data.json');

const age = document.getElementById('age');
const visits = document.getElementById('visits');
const remaining = document.getElementById('remaining');

function getNumber$(element: HTMLElement): Observable<number> {
  return fromEvent(element, 'input').pipe(
    map(e => parseInt((e.target as HTMLInputElement).value, 10))
  );
}

const age$ = getNumber$(age!);
const visits$ = getNumber$(visits!);
const remaining$ = combineLatest<number, number>(age$, visits$).pipe(
  map(([age, visits]) => {
    const birthYear = new Date().getFullYear() - age;
    const expectancy = data['USA'].years[birthYear] || 79;
    return (expectancy - age) * visits;
  })
);

remaining$.subscribe(r => {
  if (isNaN(r)) {
    return;
  }
  remaining!.innerText = r.toString();
});
