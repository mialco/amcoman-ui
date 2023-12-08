import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'truncate',
  templateUrl: './truncate.component.html',
  styleUrls: ['./truncate.component.css']
})
export class TruncateComponent implements OnInit {

  @Input()
  text!: string;
  @Input()
  maxLength!: number;
  @Input()
  isHtml!: boolean;

  constructor() { }

  ngOnInit() {
    this.text = this.text.length > this.maxLength ?this.text.substring(0,this.maxLength) + ' ...': this.text;
  }

}
