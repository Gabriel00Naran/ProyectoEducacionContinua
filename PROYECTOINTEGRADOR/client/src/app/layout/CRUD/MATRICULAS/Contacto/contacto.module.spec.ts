import { ContactoModule } from './contacto.module';

describe('ContactoModule', () => {
   let blackPageModule: ContactoModule;

   beforeEach(() => {
      blackPageModule = new ContactoModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});