import { Component, OnInit, Input } from '@angular/core';
import { CardAction } from 'src/app/models/card-actions.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() content: string;
  @Input() actions: CardAction[];
  actionRoutes: []
  constructor() { }

  parseParams(action: CardAction) {
    const params = action.actionRoute.split("/");
    params.shift();
    return params
  }
  ngOnInit(): void {
    console.log(this.actions);
  }

}
