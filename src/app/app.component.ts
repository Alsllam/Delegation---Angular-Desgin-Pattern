import { Component, OnInit, VERSION } from '@angular/core';
import { Covid19TrackerEventService } from './shared/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly covid19TrackerEventService: Covid19TrackerEventService
  ) {}
  ngOnInit(): void {
    this.covid19TrackerEventService.loadStatistics();
  }
}
