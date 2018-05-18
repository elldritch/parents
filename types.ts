export type CohortLifeExpectancyData = {
  [code: string]: {
    name: string;
    years: {
      [year: number]: Maybe<number>;
    };
  };
};

export type PeriodLifeExpectancyData = {
  year: number;
  male: PeriodLifeExpectancy;
  female: PeriodLifeExpectancy;
};

export type PeriodLifeExpectancy = {
  [age: number]: {
    deathProbability: number;
    lives: number;
    expectancy: number;
  };
};

export type Maybe<T> = T | null;
