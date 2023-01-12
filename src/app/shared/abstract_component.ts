import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Covid19TrackerEventLoadingState } from './enums';
import { ICovid19TrackerDelegateEvent } from './interface';
import { Covid9Statistic } from './model';
import {
  Covid19TrackerApiService,
  Covid19TrackerEventService,
} from './service';

@Component({
  template: '',
})
export abstract class Covid19FeedComponent
  implements ICovid19TrackerDelegateEvent, OnDestroy
{
  private delegateId: number;
  public errorMessage: string | undefined;
  public loading!: boolean;
  constructor(
    private readonly eventService: Covid19TrackerEventService,
    protected readonly cdr: ChangeDetectorRef
  ) {
    this.delegateId = eventService.registerDelegate(this);
  }
  public abstract statisticUpdate(statistic: Covid9Statistic[]): void;
  statisticLoading(
    state: Covid19TrackerEventLoadingState,
    message?: string
  ): void {
    console.log(state);
    this.errorMessage = undefined;
    this.loading = state === Covid19TrackerEventLoadingState.LOADING;
    if (state === Covid19TrackerEventLoadingState.ERROR) {
      this.errorMessage = message;
    }
    this.cdr.markForCheck();
  }
  ngOnDestroy(): void {
    this.eventService.unregisterDelegate(this.delegateId);
  }
}
