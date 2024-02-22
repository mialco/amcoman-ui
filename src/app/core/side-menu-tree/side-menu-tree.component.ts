import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'side-menu-tree',
  templateUrl: './side-menu-tree.component.html',
  styleUrl: './side-menu-tree.component.css'
})



export class SideMenuTreeComponent {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  toggleSelection(node: TreeNode) {
    //node.selected = !node.selected;
  }
}
  

interface TreeNode {
  id?: number;
  name: string;
  children?: TreeNode[];
  //selected?: boolean;
  //control?: FormControl;

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