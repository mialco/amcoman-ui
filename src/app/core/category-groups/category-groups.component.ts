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
    this.initializeGroups();
  }
  isInitialized = false;
  allSelectedOptions : number[] = [];//  = this.selectedOptions.map(group => group.id);

  initializeGroups(): void {
    console.log('initializeGroups');
    this.productsService.getCategoryGroupsView().subscribe(
      (data: CategoryGroup[]) => {
        this.selectedOptions = data;
        this.allSelectedOptions = this.selectedOptions.map(group => group.id);
        data.forEach(group => {
          group.selected = true;
          this.productsService.selectedGroups.set(group.id, true);
        });
        console.log('initializeGroups - SelectedOptions: ' + JSON.stringify( this.selectedOptions));
        this.productsService.updateCategoryTreeOnGroupChange();        
        this.isInitialized = true;
      },
    ),
      (error: any) => console.log(error);

  }

onSelectionChange(event: any) { 
  this.productsService.selectedGroups.forEach((value: boolean, key: number) => {
    if(this.allSelectedOptions.find(g => g == key) === undefined){
      this.productsService.selectedGroups.set(key, false);
    }else{
      this.productsService.selectedGroups.set(key, true);
    }
  });
  this.productsService.updateCategoryTreeOnGroupChange();
}

}
