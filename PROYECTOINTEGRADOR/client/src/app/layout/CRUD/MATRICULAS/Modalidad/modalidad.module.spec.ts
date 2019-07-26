import { ModalidadModule } from './modalidad.module';

describe('ModalidadModule', () => {
   let blackPageModule: ModalidadModule;

   beforeEach(() => {
      blackPageModule = new ModalidadModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});