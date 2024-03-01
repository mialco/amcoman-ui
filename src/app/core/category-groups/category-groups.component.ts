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
          this.groupSelected(group, true);
          //group.selected = true;
          //this.productsService.selectedGroups.set(group.id, group.selected);
          // The UI does not reflect the changes in the selected property of the group
        });
      }
    );
  }

  allSelectedOptions : number[] = [];//  = this.selectedOptions.map(group => group.id);
  // trackByFn(item: CategoryGroup): number {
  //   return item.id;
  // }
  // compareFn(groupA: CategoryGroup, groupB: CategoryGroup): boolean {
  //   return groupA.id === groupB.id;
  // }

  groupSelected(group: CategoryGroup, initialize:boolean) {
    console.log('groupSelected  - Initialize: ' + initialize);
    if (group.selected == undefined) {
      group.selected = false;
    }

    if (initialize) {
      this.allSelectedOptions = this.selectedOptions.map(group => group.id);
      group.selected = true;
      this.productsService.selectedGroups.set(group.id, group.selected);
      const foundGroup = this.selectedOptions.find(g => g.id == group.id);
      if (foundGroup) {
        foundGroup.selected = group.selected;
      }
      return;
    } else {
      //group.selected = !group.selected;
    }
    console.log('groupSelected  - group.selected: ' + group);
    let selectedGroupId = this.allSelectedOptions.find(g => g == group.id) ;
    this.productsService.selectedGroups.set(group.id, selectedGroupId === undefined );
    this.productsService.updateCategoryTreeOnGroupChange();
  }


}
