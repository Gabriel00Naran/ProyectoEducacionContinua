import { EstadoCivilModule } from './estadocivil.module';

describe('EstadoCivilModule', () => {
   let blackPageModule: EstadoCivilModule;

   beforeEach(() => {
      blackPageModule = new EstadoCivilModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});