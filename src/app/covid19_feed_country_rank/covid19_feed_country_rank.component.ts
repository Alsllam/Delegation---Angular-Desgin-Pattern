import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Covid19FeedComponent } from '../shared/abstract_component';
import { Covid9Statistic } from '../shared/model';

@Component({
  selector: 'covid19-feed-country-rank-component',
  templateUrl: './covid19_feed_country_rank.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Covid19FeedCountryRankComponent extends Covid19FeedComponent {
  private ranking: Covid9Statistic[] = [];
  public readonly rankLimit: number = 5;
  public get list(): Covid9Statistic[] {
    return this.ranking;
  }
  public override statisticUpdate(statistic: Covid9Statistic[]): void {
    this.updateRanking(statistic);
  }
  private updateRanking(statistic: Covid9Statistic[]) {
    this.ranking = statistic
      .filter((stat) => stat.continent !== stat.country)
      .sort((compareA: Covid9Statistic, compareB: Covid9Statistic) => {
        return compareB.cases.active - compareA.cases.active;
      })
      .slice(0, this.rankLimit);
  }
}
