import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTopActionsComponent } from './route-top-actions.component';

describe('RouteTopActionsComponent', () => {
  let component: RouteTopActionsComponent;
  let fixture: ComponentFixture<RouteTopActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteTopActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteTopActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should remove Go Back Button if noPrevious is true', () => {
    component.noPrevious = true;
    fixture.detectChanges();
    const backButtonContent = fixture.nativeElement.querySelector('div[aria-label="goback"]');
    expect(backButtonContent).not.toBeTruthy(); // Ensure content inside the div is removed
  });

  it('should remove Go Back Button if noPrevious is true', () => {
    component.noNext = true;
    fixture.detectChanges();
    const nextButtonContent = fixture.nativeElement.querySelector('div[aria-label="gonext"]');
    expect(nextButtonContent).not.toBeTruthy(); // Ensure content inside the div is removed
  });

  it('should emit clickNext when the Next button is clicked', () => {
    spyOn(component.clickNext, 'emit');
    const button = fixture.nativeElement.querySelector('div[aria-label="gonext"]'); // Assuming there's a button with this class
    button.click(); // Simulate button click
    expect(component.clickNext.emit).toHaveBeenCalled(); // Verify emission
  });

  it('should emit clickNext when the Previous button is clicked', () => {
    spyOn(component.clickBack, 'emit');
    const button = fixture.nativeElement.querySelector('div[aria-label="goback"]'); // Assuming there's a button with this class
    button.click(); // Simulate button click
    expect(component.clickBack.emit).toHaveBeenCalled(); // Verify emission
  });
});
