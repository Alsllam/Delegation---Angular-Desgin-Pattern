export class Covid9Statistic {
  continent: string;
  country: string;
  cases: Covid9StatisticCases;
  time: Date;
}
export class Covid9StatisticCases {
  active: number;
}

export class Covid19GroupStatisticAdapter {
  statistic: Covid9Statistic;
  constructor(stat: Covid9Statistic) {
    this.statistic = stat;
  }
}
