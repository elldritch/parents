#!/usr/bin/env ts-node
import path = require('path');
import fs = require('fs');

import parse = require('csv-parse/lib/sync');
import { CohortLifeExpectancyData, Maybe } from '../types';

type CSV = string[][];

// Read raw CSV.
const file = path.join(__dirname, '..', 'data', 'world-bank-cohort', 'raw', 'data.csv');
const contents = fs.readFileSync(file, { encoding: 'utf8' });
// The first 4 lines are metadata for the CSV file.
const lines = contents.split('\n');
const raw = lines.slice(5).join('\n');

// Parse CSV rows into object.
const csv: CSV = parse(raw);
const data: CohortLifeExpectancyData = csv.reduce((obj: CohortLifeExpectancyData, row) => {
  const [countryName, countryCode, indicatorName, indicatorCode, ...years] = row;
  obj[countryCode] = {
    name: countryName,
    years: years.reduce((y: { [year: string]: Maybe<number> }, s, i) => {
      y[i + 1960] = s === '' ? null : parseInt(s, 10);
      return y;
    }, {})
  };
  return obj;
}, {});

// Write object to JSON.
const out = path.join(__dirname, '..', 'data', 'world-bank-cohort', 'json', 'data.json');
fs.writeFileSync(out, JSON.stringify(data, null, 2), { encoding: 'utf8' });
