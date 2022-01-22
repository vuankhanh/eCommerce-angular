import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { Breadcrumb } from 'src/app/models/breadcrumb.interface';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    // this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

}
