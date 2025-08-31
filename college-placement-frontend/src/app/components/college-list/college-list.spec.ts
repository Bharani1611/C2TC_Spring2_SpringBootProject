import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeList } from './college-list';

describe('CollegeList', () => {
  let component: CollegeList;
  let fixture: ComponentFixture<CollegeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollegeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
