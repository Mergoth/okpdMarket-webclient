import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ClassificatorItem, Classificator} from "../../domain/classificator";
import {ClassificatorService} from "../../service/classificator.service";

const CACHED_SATE = new Map<string, State>();


@Component({
  selector: 'clsf-search',
  styleUrls: ['./clsf-search.css'],
  templateUrl: './clsf-search.html',
  providers: [ClassificatorService]
})
export class ClsfSearchComponent implements OnInit {

  clsf: Classificator;

  query: string = "";

  searchResult: ClassificatorItem[];

  searching:boolean = false;

  constructor(private route: ActivatedRoute, private classificatorService: ClassificatorService) { }

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const clsfTypeCode = params['type'];
      this.searchResult = null;
      this.query = null;
      this.classificatorService.classificatorType(clsfTypeCode).then(clsf => {
        this.clsf = clsf;
        if(CACHED_SATE.has(clsfTypeCode)) {
          const state = CACHED_SATE.get(clsfTypeCode);
          this.searchResult = state.searchResult;
          this.query = state.query;
        }
      });
    });
  }

  highlight(text: string) {
    return text.replace(new RegExp(this.query, 'gi'), '<b>$&</b>');
  }

  search() {
    if(!this.query) {
      return
    }
    this.searchResult = null;
    this.searching = true;
    this.classificatorService.getList(this.query, this.clsf.code).then(res => {
      this.searchResult = res;
      CACHED_SATE.set(this.clsf.code, {
        searchResult: this.searchResult,
        query: this.query
      });
    }).then(_ => this.searching = false);
  }

}

interface State {
  searchResult: ClassificatorItem[];
  query: string;
}
