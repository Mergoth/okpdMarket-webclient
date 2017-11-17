import {AfterContentInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, Event, NavigationEnd} from "@angular/router";
import {ClassificatorService} from "../service/classificator.service";
import {Classificator} from "../domain/classificator";

@Component({
    selector: 'clsfs-tabs',
    template: `
 <nav md-tab-nav-bar *ngIf="activeLink">
    <a md-tab-link
       *ngFor="let tab of tabs; let i = index" 
       [active]="activeLinkIndex === i"
       [routerLinkActive]="'active'"
       (click)="activeLinkIndex = i"
       [routerLink]="tab.link"
       >
      {{tab.title}}
    </a>
  </nav>
 <div class="loading" *ngIf="!activeLink"></div>
 <router-outlet></router-outlet>
`,
    providers: [ClassificatorService]
})
export class ClsfTabsComponent implements OnInit, AfterContentInit {
    ngAfterContentInit(): void {
        console.log('After content init');
    }


    tabs: Tab[] = [];

    classificatorTypes: Classificator[];

    activeLinkIndex = 0;

    activeLink;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private classificatorService: ClassificatorService) {
    }

    selectTab(link: string) {
        this.activeLinkIndex = this.tabs.findIndex(tab => tab.link == link);
        this.activeLink = link;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log('TABS change parans:', params)
        });
        this.subscribeToRouteChange();
        this.classificatorService.classificatorTypes().then(res => {
            this.classificatorTypes = res;
            this.tabs = [];
            this.classificatorTypes.forEach(clsfType => this.tabs.push({
                link: clsfType.code,
                title: clsfType.name
            }));
        }).then(_ => setTimeout(this.navigateDefault(), 1000));
    }

    navigateDefault() {
        console.log('navigateDefault')
        const defaultType = this.classificatorTypes[0].code;
        if(!this.activeLink) {
            this.router.navigate(['./', defaultType], { relativeTo: this.route });
        } else {
            this.activeLinkIndex = this.tabs.findIndex(tab => tab.link == this.activeLink);
        }
    }

    //todo: супер мега хак и-за неправильной работы роутера Ангуляра. При изменении роута переключает таб.
    subscribeToRouteChange() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                const urlPath = event.url.split("/");
                let routeMap = {};
                (this.router.config as Object[]).forEach((route) => {
                    const componentName = route['component'] ? route['component']['name'] : '';
                    const path = route['path'];
                    if(urlPath.indexOf(path) > -1) {
                        routeMap[componentName] = route['path'];
                    }
                });
                let currentPathName = routeMap['ClsfTabsComponent'];
                const currentUrlIndex = urlPath.indexOf(currentPathName);
                if (currentUrlIndex > -1 && currentUrlIndex < urlPath.length) {
                    const childPath = urlPath[currentUrlIndex + 1];
                    this.selectTab(childPath);
                }
            }
        });
    }


}

interface Tab {
    link:string;
    title:string;
}