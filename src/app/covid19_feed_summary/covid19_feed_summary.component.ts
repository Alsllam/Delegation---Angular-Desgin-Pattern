import { Component } from '@angular/core';
import { Covid19FeedComponent } from '../shared/abstract_component';
import { Covid9Statistic } from '../shared/model';

@Component({
  selector: 'covid19-feed-summary-component',
  templateUrl: './covid19_feed_summary.component.html',
})
export class Covid19FeedSummaryComponent extends Covid19FeedComponent {
  private totalActiveCases!: number;
  private lastUpdate!: Date;
  public get overallActiveCases(): number {
    return this.totalActiveCases;
  }
  public get updateAt(): Date {
    return this.lastUpdate;
  }
  public override statisticUpdate(statistic: Covid9Statistic[]): void {
    this.updateSummary(statistic);
  }
  private updateSummary(statistic: Covid9Statistic[]) {
    for (const stat of statistic) {
      if (stat.continent === 'All') {
        this.totalActiveCases = stat.cases.active;
        this.lastUpdate = stat.time;
        break;
      }
    }
  }
}
