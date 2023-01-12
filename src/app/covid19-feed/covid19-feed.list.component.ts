import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Covid19FeedComponent } from '../shared/abstract_component';
import { Covid19GroupStatisticAdapter, Covid9Statistic } from '../shared/model';

type GroupKey = string;

@Component({
  selector: 'covid19-feed-list-component',
  templateUrl: './covid19-feed.list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Covid19FeedListComponent extends Covid19FeedComponent {
  private readonly listDictionary: Map<GroupKey, Covid9Statistic[]> = new Map();
  private readonly groupDictionary: Map<
    GroupKey,
    Covid19GroupStatisticAdapter
  > = new Map();

  public groups: Covid19GroupStatisticAdapter[] = [];

  public override statisticUpdate(statistic: Covid9Statistic[]): void {
    this.updateGroupList(statistic);
    this.sortGroupList();
  }

  public getList(group: Covid9Statistic): Covid9Statistic[] {
    Covid9Statistic;
    const groupKey = this.generateGroupKey(group);
    const list = this.listDictionary.get(groupKey);

    if (list === undefined) {
      throw new Error(`'${groupKey}' groupKey is not found in the dictionary.`);
    }

    return list;
  }

  private updateGroupList(statistic: Covid9Statistic[]) {
    for (const stat of statistic) {
      if (stat.continent === 'All') {
        continue;
      }

      const groupKey = this.generateGroupKey(stat);
      const group = this.listDictionary.get(stat.continent);

      if (stat.continent === stat.country) {
        this.groupDictionary.set(
          groupKey,
          new Covid19GroupStatisticAdapter(stat)
        );

        if (group === undefined) {
          this.listDictionary.set(groupKey, []);
        }

        continue;
      }

      if (group === undefined) {
        this.listDictionary.set(groupKey, [stat]);
      } else {
        group.push(stat);
      }
    }
  }

  private generateGroupKey(statistic: Covid9Statistic): string {
    return statistic.continent;
  }

  private sortGroupList(): void {
    this.groups = Array.from(this.groupDictionary.values()).sort(
      (
        compareA: Covid19GroupStatisticAdapter,
        compareB: Covid19GroupStatisticAdapter
      ) => {
        return (
          compareB.statistic.cases.active - compareA.statistic.cases.active
        );
      }
    );

    for (const list of this.listDictionary.values()) {
      list.sort((compareA: Covid9Statistic, compareB: Covid9Statistic) => {
        return compareB.cases.active - compareA.cases.active;
      });
    }
  }
}
