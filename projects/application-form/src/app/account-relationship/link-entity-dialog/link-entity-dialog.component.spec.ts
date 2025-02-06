import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEntityDialogComponent } from './link-entity-dialog.component';

describe('LinkEntityDialogComponent', () => {
  let component: LinkEntityDialogComponent;
  let fixture: ComponentFixture<LinkEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkEntityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
