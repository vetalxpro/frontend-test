import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [ './products-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('productAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.3)' }),
          stagger(150, [
              animate(
                '0.3s',
                style({
                  opacity: 1, transform: 'scale(1)'
                })
              )
            ]
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[];

  constructor() {
  }

  ngOnInit() {
  }

  trackProducts( index, product: Product ): number {
    return product.id;
  }

}
