import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniReminderComponent } from './mini-reminder.component';

describe('MiniReminderComponent', () => {
  let component: MiniReminderComponent;
  let fixture: ComponentFixture<MiniReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniReminderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
