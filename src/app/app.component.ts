import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor( private router: Router,
               private route: ActivatedRoute,
               private titleService: Title ) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(( event ) => event instanceof NavigationEnd)
    )
      .subscribe(() => {
        this.changeTitle();
      });
  }

  private changeTitle() {
    let route = this.route;
    while ( route.firstChild ) {
      route = route.firstChild;
    }
    if ( route.outlet === 'primary' ) {
      let { title } = route.snapshot.data;
      title = title ? `${title} - ` : '';
      this.titleService.setTitle(`${title}Test-Frontend`);
    }
  }
}
