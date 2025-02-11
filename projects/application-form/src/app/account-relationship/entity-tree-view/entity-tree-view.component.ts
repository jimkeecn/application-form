import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicAngularModule } from '../../../modules/angular.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { IEntityCardInfo, IEntityTreeView } from '../../../models/interface/entity';
import { MatIconModule } from '@angular/material/icon';
import { LinkEntityDialogComponent } from '../link-entity-dialog/link-entity-dialog.component';

@Component({
  selector: 'entity-tree-view',
  imports: [BasicAngularModule,MatDialogModule,MatTreeModule,MatIconModule],
  templateUrl: './entity-tree-view.component.html',
  styleUrl: './entity-tree-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTreeViewComponent {

  childrenAccessor = (node: IEntityTreeView) => node.children ?? [];

  hasChild = (_: number, node: IEntityTreeView) => !!node.children && node.children.length > 0;

  @Input() treeData: IEntityTreeView[] = [];

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
    
  }

  ngOnDestroy() { 
  }

  openLinkEntityDialog(entity: IEntityCardInfo) { 
    const dialogRef = this.dialog.open(LinkEntityDialogComponent, {
      data: entity,
      width: '800px',
      height: '600px',
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
