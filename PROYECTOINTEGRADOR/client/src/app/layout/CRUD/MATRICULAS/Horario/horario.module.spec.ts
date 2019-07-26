import { HorarioModule } from './horario.module';

describe('HorarioModule', () => {
   let blackPageModule: HorarioModule;

   beforeEach(() => {
      blackPageModule = new HorarioModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});