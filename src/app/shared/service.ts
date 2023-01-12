import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Covid19TrackerDelegator } from './delegator';
import { Covid19TrackerEventLoadingState } from './enums';
import {
  ICovid19TrackerDelegateEvent,
  ICovid19TrackerEvent,
} from './interface';
import { Covid9Statistic } from './model';

@Injectable({
  providedIn: 'root',
})
export class Covid19TrackerEventService implements ICovid19TrackerEvent {
  private delegator!: Covid19TrackerDelegator;
  private delegateId: number = 0;
  private readonly delegates: Map<number, ICovid19TrackerDelegateEvent> =
    new Map();

  constructor(private readonly apiService: Covid19TrackerApiService) {
    this.delegator = new Covid19TrackerDelegator(this.delegates);
  }
  public registerDelegate(delegate: ICovid19TrackerDelegateEvent): number {
    this.delegateId++;
    this.delegates.set(this.delegateId, delegate);
    return this.delegateId;
  }
  public unregisterDelegate(delegateId: number): void {
    if (this.delegates.has(delegateId) === false) {
      throw new Error(`'${delegateId}' delegate not found in this dictionary`);
    }
    this.delegates.delete(delegateId);
  }
  public loadStatistics(): void {
    this.delegator.statisticLoading(Covid19TrackerEventLoadingState.LOADING);
    this.apiService.getStatistics().subscribe({
      next: (statistic: Covid9Statistic[]) => {
        this.delegator.statisticLoading(
          Covid19TrackerEventLoadingState.SUCCESS
        );
        this.delegator.statisticUpdate(Object.seal(statistic));
      },
      error: (error: HttpErrorResponse) => {
        this.delegator.statisticLoading(
          Covid19TrackerEventLoadingState.ERROR,
          error.message
        );
      },
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class Covid19TrackerApiService {
  getStatistics(): Observable<Covid9Statistic[]> {
    return of([
      {
        continent: 'All',
        cases: { active: 21723621 },
        country: 'All',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'Japan1',
        cases: { active: 10000 },
        country: 'Japan',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'USA1',
        cases: { active: 9000 },
        country: 'USA',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'S-Korea1',
        cases: { active: 8000 },
        country: 'S-Korea',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'Poland1',
        cases: { active: 7000 },
        country: 'Poland',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'Vietanm1',
        cases: { active: 6000 },
        country: 'Vietanm',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'Egypt1',
        cases: { active: 5000 },
        country: 'Egypt',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'Tunsia1',
        cases: { active: 4000 },
        country: 'Tunsia',
        time: new Date(2023, 1, 7),
      },
      {
        continent: 'Italy1',
        cases: { active: 3000 },
        country: 'Italy',
        time: new Date(2023, 1, 7),
      },
    ] as Covid9Statistic[]).pipe(delay(3000));
  }
}
