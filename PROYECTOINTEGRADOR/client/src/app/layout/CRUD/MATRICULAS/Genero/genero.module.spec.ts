import { GeneroModule } from './genero.module';

describe('GeneroModule', () => {
   let blackPageModule: GeneroModule;

   beforeEach(() => {
      blackPageModule = new GeneroModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});