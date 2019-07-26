import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoLaboralComponent } from './infolaboral.component';

describe('InfoLaboralComponent', () => {
   let component: InfoLaboralComponent;
   let fixture: ComponentFixture<InfoLaboralComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InfoLaboralComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InfoLaboralComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});