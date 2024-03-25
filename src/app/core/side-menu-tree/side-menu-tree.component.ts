import { Component, Inject, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ProductsService } from '../products.service';
import { TreeNode } from '../tree-node.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'side-menu-tree',
  templateUrl: './side-menu-tree.component.html',
  styleUrl: './side-menu-tree.component.css'
})



export class SideMenuTreeComponent implements OnInit{
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  //dataSource = new MatTreeNestedDataSource<TreeNode>();
  //dataSource = this.productService.treeDataSource;

  constructor(public productService: ProductsService, 
    private router: Router) {

  }

  //private selectedNodes : Map<number, boolean>  = new Map<number, boolean>();

  ngOnInit(): void {
    
    console.log('SideMenuTreeComponent ngOnInit');
    this.productService.getCategoryTree([]).subscribe(data => {  this.productService.treeDataSource.data = data; })
    

    
    console.log('SideMenuTreeComponent ngOnInit');
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  toggleSelection(node: TreeNode) {
    //node.selected = !node.selected;
  }

  treeClicked(node: TreeNode): void {

    console.log("Tree clicked: " + node.name + " " + node.selected);
    let nodeId = node.id||-1;
    let selected = false
    if (node.selected == undefined )
    {
      selected = false;
    }
    else
    {
      selected = node.selected;
    }
    this.productService.selectedNodes.set(nodeId, selected);
    console.log("Tree clicked: " + node.name + " " + node.id + " " + this.productService.selectedNodes.get(nodeId));  
    let selectedNodesIds:number[] = []
    this.productService.selectedNodes.forEach((value,key)  => {
      console.log('Node id: ' + key + ' Selected: ' + value);
      if (value)
      {
        selectedNodesIds.push(key);
      }          
    });
    console.log('Selected nodes: ' + JSON.stringify(selectedNodesIds));
    //I want to navigate to the products page with the selected nodes but not loading the page again
    //I want to pass the selected nodes to the products page

    //Update the products page with the selected nodes
    this.productService.pageState.categories = selectedNodesIds;
    this.productService.pageState.searchTerm = '';
    this.productService.pageState.totalItems = 0;
    this.productService.pageState.totalPages = 0;
    this.productService.pageState.currentPage = 1;
    this.router.navigate(['products/list'],  { queryParams: { categories :  selectedNodesIds.join(',') , currentPage : this.productService.pageState.currentPage , pageSize: this.productService.pageState.pageSize} } );
  console.log('Tree clicked: ' + node.name + ' ' + ' Page: ' + this.productService.pageState.currentPage);
  }

  navBarClicked(): void {
    console.log('NavBar clicked');
    let selectedNodesIds:number[] = []
    this.productService.selectedNodes.forEach((value,key)  => {
      console.log('Node id: ' + key + ' Selected: ' + value);
      if (value)
      {
        selectedNodesIds.push(key);
      }          
    });
    
    this.router.navigate(['products/list'],  { queryParams: { categories :  selectedNodesIds.join(',') , currentPage : this.productService.getCurrentPage() , pageSize: this.productService.getPageSize()} } );
    //console.log('Tree clicked: ' + node.name + ' ' + ' Page: ' + this.productService.getCurrentPage());
  }
 
}

 

  const TREE_DATA: TreeNode[] = [
    {
      id: 1,
      name: 'Parent 1',
      //control: new FormControl(),
      children: [
        { name: 'Child 1.1', id: 11 },
        { name: 'Child 1.2',id:12, children: [{ name: 'Grandchild 1.2.1',id:122 }] },
      ],
    },
    {
      name: 'Parent 2',
      id: 2,
      //control: new FormControl(),
      children: [{ name: 'Child 2.1', id:21 }, { name: 'Child 2.2', id:22 }],
    },
    {
      name: 'Parent 3',
      //control: new FormControl(),
      children: [
        {
          name: 'ChildParent 3.1',
          id: 31,
          children: 
          [{ name: 'Grandchild 3.1.1', id:311 }, { name: 'Grandchild 3.1.2', id:312.}, 
        { name: 'Grandchild 3.1.3', id:313, children: [{name: 'child 4', id:4}, ]  }, { name: 'Grandchild 3.1.4', id:314 },
        ],
        },
        { name: 'Child 3.2', id:32   },
        { name: 'Child 3.3' , id:33  },
        { name: 'Child 3.1' , id: 3111  }, { name: 'Child 3.2', id:322, children: [{name: 'child 4', id:4}, ]  }, { name: 'Child 3.3' , id:333 },],
    }

  ];

  const TREE_DATA1: TreeNode[] = [
    {
      name: 'Parent 1',
      //control: new FormControl(),
      children: [
        { name: 'Child 1.1' },
        { name: 'Child 1.2', children: [{ name: 'Grandchild 1.2.1' }] },
      ],
    },
    {
      name: 'Parent 2',
      //control: new FormControl(),
      children: [{ name: 'Child 2.1' }, { name: 'Child 2.2' }],
    },
  ];