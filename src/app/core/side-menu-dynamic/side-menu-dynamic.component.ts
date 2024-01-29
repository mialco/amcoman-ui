import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatListModule, MatListOption, MatSelectionList } from '@angular/material/list';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'side-menu-dynamic',
  //standalone: true,
  //imports: [],
  templateUrl: './side-menu-dynamic.component.html',
  styleUrl: './side-menu-dynamic.component.css'
})
export class SideMenuDynamicComponent implements OnInit, AfterViewInit{

  @ViewChild('selectionList') selectionList!: MatSelectionList;

  selectedOptions: any[] = [];
  
  ngOnInit() {
  console.log('this.matSelectionList.selectedOptions.selected');
  }
  
  ngAfterViewInit() {
    console.log('this.matSelectionList.selectedOptions.selected'); 
    this.selectionList.selectedOptions.changed.subscribe(() => {
      console.log(this.selectionList.selectedOptions.selected);
      this.handleSelectionChange();
    });
  }

    handleSelectionChange  () {
      // Perform some action based on the selected options
      console.log(this.selectedOptions);
    }


//   menuItems = [
//     {
//         title: 'By Affection',
//         isCollapsed: false,
//         subItems: [
//           {title: 'submenu', isCollapsed: true, subItems :['more aches', 'more acne']}
//           ,'Aches and Pain', 'Acne', 'Allergy and Sinus', 'Arthritis']
//     },
//     {
//         title: 'Supplements',
//         isCollapsed: false,
//         subItems: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D']
//     },
//     {
//       title: 'Supplements No subitems',
//       isCollapsed: false,
//       subItems: []
//   }

//     // Add more items as needed
// ];


// items = [
//   {name: 'Item 1', value: 1},
//   {name: 'Item 2', value: 2},
//   // Add more items as needed
// ];

menuItems: {
  title: string; 
  isCollapsed:boolean; 
  itemData: string ;
    itemsL1?: [
      { title: string; 
        isCollapsed:boolean; 
        itemData: string ;
        itemL1List: string[];
      }];
    levelOneList?:string[];} [] = [
  {
    title: 'By Affection',
    isCollapsed: false,
    itemData: 'Category 1 ',
    itemsL1: [
      {
        title: 'submenu',
        isCollapsed: true,
        itemData: 'Category 1.1',
        itemL1List: ['more aches', 'more acne']
      }
    ]
    ,levelOneList:[ 'Level One List Item 1', 'Level One List Item 2', 'Level One List Item 3']
  },
  {
    title: 'Supplements',
    isCollapsed: false,
    itemData: 'Category 2',
    itemsL1: [
      {
        title: 'Vitamin A',
        isCollapsed: true,
        itemData: 'Category 2.1',
        itemL1List: ['more Vitamin A1', 'more Vitamin A2']
      }
    ]
  },

  {
    title: 'Supplements oly simple items',
    isCollapsed: true,
    itemData: 'Category 3',
    // itemsL1: [
      
    // ],   
    levelOneList: ['Level One more suplements A1', 'Level 1 more Suplements A2']
  },
    
  

  // Add more items as needed
];

}
