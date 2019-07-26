import { TipoPersonaModule } from './tipopersona.module';

describe('TipoPersonaModule', () => {
   let blackPageModule: TipoPersonaModule;

   beforeEach(() => {
      blackPageModule = new TipoPersonaModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});