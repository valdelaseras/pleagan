import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPleasContainerComponent } from './my-pleas-container.component';

describe('MyPleasContainerComponent', () => {
  let component: MyPleasContainerComponent;
  let fixture: ComponentFixture<MyPleasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPleasContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPleasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
