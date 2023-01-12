import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Covid19FeedCountryRankComponent } from './covid19_feed_country_rank/covid19_feed_country_rank.component';
import { Covid19TrackerApiService, Covid19TrackerEventService } from './shared/service';
import { Covid19FeedSummaryComponent } from './covid19_feed_summary/covid19_feed_summary.component';
import { Covid19FeedListComponent } from './covid19-feed/covid19-feed.list.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent,    Covid19FeedCountryRankComponent,
  Covid19FeedSummaryComponent,
  Covid19FeedListComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: Covid19TrackerEventService,
      useClass: Covid19TrackerEventService,
    },
    {
      provide: Covid19TrackerApiService,
      useClass: Covid19TrackerApiService,
    },
  ],
})
export class AppModule {}
