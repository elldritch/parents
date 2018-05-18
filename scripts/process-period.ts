#!/usr/bin/env ts-node
import path = require('path');
import fs = require('fs');

import parse = require('csv-parse/lib/sync');
import { PeriodLifeExpectancyData } from '../types';

type CSV = string[][];

// Read raw CSV.
const file = path.join(__dirname, '..', 'data', 'ssa-period', 'raw.tsv');
const contents = fs.readFileSync(file, { encoding: 'utf8' });

// Parse CSV rows into object.
const csv: CSV = parse(contents, { delimiter: '\t'});
const data: PeriodLifeExpectancyData = csv.reduce((obj: PeriodLifeExpectancyData, row) => {
  const [
    age, maleDeathProbability, maleLives, maleExpectancy, femaleDeathProbability, femaleLives, femaleExpectancy
  ] = row;
  obj.male[parseInt(age, 10)] = {
    deathProbability: parseFloat(maleDeathProbability),
    lives: parseInt(maleLives, 10),
    expectancy: parseFloat(maleExpectancy)
  };
  obj.female[parseInt(age, 10)] = {
    deathProbability: parseFloat(femaleDeathProbability),
    lives: parseInt(femaleLives, 10),
    expectancy: parseFloat(femaleExpectancy)
  };
  return obj;
}, { year: 2014, male: {}, female: {} });

// Write object to JSON.
const out = path.join(__dirname, '..', 'data', 'ssa-period', 'data.json');
fs.writeFileSync(out, JSON.stringify(data, null, 2), { encoding: 'utf8' });
