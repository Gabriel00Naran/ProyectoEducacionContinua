import { NivelModule } from './nivel.module';

describe('NivelModule', () => {
   let blackPageModule: NivelModule;

   beforeEach(() => {
      blackPageModule = new NivelModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});