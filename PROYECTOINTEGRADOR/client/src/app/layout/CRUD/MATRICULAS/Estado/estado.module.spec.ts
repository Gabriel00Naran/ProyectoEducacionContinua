import { EstadoModule } from './estado.module';

describe('EstadoModule', () => {
   let blackPageModule: EstadoModule;

   beforeEach(() => {
      blackPageModule = new EstadoModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});