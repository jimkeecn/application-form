import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTreeViewComponent } from './entity-tree-view.component';

describe('EntityTreeViewComponent', () => {
  let component: EntityTreeViewComponent;
  let fixture: ComponentFixture<EntityTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityTreeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
