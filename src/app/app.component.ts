import {Component} from "@angular/core";



@Component({
  selector: 'app',
  template: `<h1>ОКПД Маркет</h1>
   <nav >
     <a  *ngFor="let link of links"  
         [routerLink]="[link.link]"
         [routerLinkActive]="'active'"
         (click)="activeLink = link.link"
     >
         {{link.title}}
     </a>
   </nav>
   <md-card>
       <router-outlet></router-outlet>
   </md-card>
`,
  styles: [` 
      nav a {
          border-bottom: 2px solid rgb(238, 238, 238);
      }
      
      nav a.active {
          pointer-events: none;
          opacity: 1;
          border-bottom: 2px solid #607D8B;
      }
  `]
})
export class AppComponent {

    activeLink = '/search';

    links = [
        {link: '/tree', title: 'Дерево'},
        {link: '/search', title: 'Полнотекстовый поиск'}
    ];
}
