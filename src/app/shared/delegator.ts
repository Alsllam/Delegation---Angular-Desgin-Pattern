import { Covid19TrackerEventLoadingState } from './enums';
import { ICovid19TrackerDelegateEvent } from './interface';
import { Covid9Statistic } from './model';

/**
 * @description consider this for internal use only by this module
 * @module Covid19Module
 */

export class Covid19TrackerDelegator implements ICovid19TrackerDelegateEvent {
  constructor(
    private readonly delegates: Map<number, ICovid19TrackerDelegateEvent>
  ) {}
  statisticLoading(
    state: Covid19TrackerEventLoadingState,
    message?: string
  ): void {
    for (const delegate of this.delegates.values()) {
      delegate.statisticLoading(state, message);
    }
  }
  statisticUpdate(statistic: Covid9Statistic[]): void {
    for (const delegate of this.delegates.values()) {
      delegate.statisticUpdate(statistic);
    }
  }
}
