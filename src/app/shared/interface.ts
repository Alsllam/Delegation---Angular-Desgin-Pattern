import { Covid19TrackerEventLoadingState } from './enums';
import { Covid9Statistic } from './model';

export interface ICovid19TrackerDelegateEvent {
  statisticLoading(
    state: Covid19TrackerEventLoadingState,
    message?: string
  ): void;
  statisticUpdate(statistic: Covid9Statistic[]): void;
}


export interface ICovid19TrackerEvent{
  registerDelegate(delegate: ICovid19TrackerDelegateEvent):number;
  unregisterDelegate(delegateId: number): void;
  loadStatistics(): void
}