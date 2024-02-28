import { Component, OnChanges } from '@angular/core';
import { CategoryGroup } from '../category-group';
import { ProductsService } from '../products.service';
@Component({
  selector: 'category-groups',
  templateUrl: './category-groups.component.html',
  styleUrl: './category-groups.component.css'
})
export class CategoryGroupsComponent
{

  constructor( private productsService :ProductsService) { }
  selectedOptions: CategoryGroup[] = new Array<CategoryGroup>();

  ngOnInit() {
  this.productsService.getCategoryGroupsView().subscribe(
      (data: CategoryGroup[]) => {
        this.selectedOptions = data;
      }
    )
  }

  groupSelected(group: CategoryGroup) {
    group.selected = !group.selected;
    this.productsService.selectedGroups.set(group.id, group.selected);
  }


}
