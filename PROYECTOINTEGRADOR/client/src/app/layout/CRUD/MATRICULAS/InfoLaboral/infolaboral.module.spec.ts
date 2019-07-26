import { InfoLaboralModule } from './infolaboral.module';

describe('InfoLaboralModule', () => {
   let blackPageModule: InfoLaboralModule;

   beforeEach(() => {
      blackPageModule = new InfoLaboralModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});