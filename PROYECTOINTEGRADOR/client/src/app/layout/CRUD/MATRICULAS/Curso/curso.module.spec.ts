import { CursoModule } from './curso.module';

describe('CursoModule', () => {
   let blackPageModule: CursoModule;

   beforeEach(() => {
      blackPageModule = new CursoModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});