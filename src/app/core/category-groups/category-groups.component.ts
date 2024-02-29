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
    console.log('CategoryGroupsComponent ngOnInit');
    this.productsService.getCategoryGroupsView().subscribe(
      (data: CategoryGroup[]) => {
        // data.forEach(element => {
        //     element.selected = true;
        //     this.productsService.selectedGroups.set(element.id, element.selected);
        // });
        this.selectedOptions = data;

        //And I want to esure that the groups are all selected by default
        this.selectedOptions.forEach(group => {
          this.groupSelected(group);
          //group.selected = true;
          //this.productsService.selectedGroups.set(group.id, group.selected);
          // The UI does not reflect the changes in the selected property of the group
        });
      }
    );
  }

  groupSelected(group: CategoryGroup) {
    if (group.selected == undefined) {
      group.selected = false;
    }
    group.selected = !group.selected;
    this.productsService.selectedGroups.set(group.id, group.selected);
    this.productsService.updateCategoryTreeOnGroupChange();
  }


}
