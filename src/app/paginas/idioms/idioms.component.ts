import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-idioms',
  templateUrl: './idioms.component.html',
  styleUrls: ['./idioms.component.scss']
})
export class IdiomsComponent implements OnInit {

  @Output('lang') lang = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  changeLang(value: string) {
    this.lang.emit(value);
  }

}
