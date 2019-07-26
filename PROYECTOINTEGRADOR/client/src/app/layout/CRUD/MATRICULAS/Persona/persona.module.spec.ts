import { PersonaModule } from './persona.module';

describe('PersonaModule', () => {
   let blackPageModule: PersonaModule;

   beforeEach(() => {
      blackPageModule = new PersonaModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});