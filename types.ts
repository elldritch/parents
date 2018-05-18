export type LifeExpectancyData = {
  [code: string]: {
    name: string;
    years: {
      [year: string]: Maybe<number>;
    };
  };
};

export type Maybe<T> = T | null;
