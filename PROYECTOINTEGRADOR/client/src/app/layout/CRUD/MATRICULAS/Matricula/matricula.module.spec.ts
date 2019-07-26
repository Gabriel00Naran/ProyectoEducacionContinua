import { MatriculaModule } from './matricula.module';

describe('MatriculaModule', () => {
   let blackPageModule: MatriculaModule;

   beforeEach(() => {
      blackPageModule = new MatriculaModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});