import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from './card.model';

/**
 * 卡片效果组件
 * @class CardComponent
*/
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() private cardInput: CardInterface;
    public cardArgs: CardModel;
    ngOnInit(): void {
          this.cardArgs = new CardModel(this.cardInput);
    }
}
