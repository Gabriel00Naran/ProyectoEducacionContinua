<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'LA WEB DE DEADPOOL DEBERIA FUNCIONAR';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);


   //Matriculas

   //CRUD ProfilePicture
   $router->post('/profilepicture', ['uses' => 'ProfilePictureController@post']);
   $router->get('/profilepicture', ['uses' => 'ProfilePictureController@get']);
   $router->get('/profilepicture/paginate', ['uses' => 'ProfilePictureController@paginate']);
   $router->put('/profilepicture', ['uses' => 'ProfilePictureController@put']);
   $router->delete('/profilepicture', ['uses' => 'ProfilePictureController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);

   //CRUD Contacto
   $router->post('/contacto', ['uses' => 'ContactoController@post']);
   $router->get('/contacto', ['uses' => 'ContactoController@get']);
   $router->get('/contacto/paginate', ['uses' => 'ContactoController@paginate']);
   $router->put('/contacto', ['uses' => 'ContactoController@put']);
   $router->delete('/contacto', ['uses' => 'ContactoController@delete']);
  

   //CRUD Curso
   $router->post('/curso', ['uses' => 'CursoController@post']);
   $router->get('/curso', ['uses' => 'CursoController@get']);
   $router->get('/curso/paginate', ['uses' => 'CursoController@paginate']);
   $router->put('/curso', ['uses' => 'CursoController@put']);
   $router->delete('/curso', ['uses' => 'CursoController@delete']);

   //CRUD Estado
   $router->post('/estado', ['uses' => 'EstadoController@post']);
   $router->get('/estado', ['uses' => 'EstadoController@get']);
   $router->get('/estado/paginate', ['uses' => 'EstadoController@paginate']);
   $router->put('/estado', ['uses' => 'EstadoController@put']);
   $router->delete('/estado', ['uses' => 'EstadoController@delete']);

   //CRUD EstadoCivil
   $router->post('/estadocivil', ['uses' => 'EstadoCivilController@post']);
   $router->get('/estadocivil', ['uses' => 'EstadoCivilController@get']);
   $router->get('/estadocivil/paginate', ['uses' => 'EstadoCivilController@paginate']);
   $router->put('/estadocivil', ['uses' => 'EstadoCivilController@put']);
   $router->delete('/estadocivil', ['uses' => 'EstadoCivilController@delete']);

   //CRUD Genero
   $router->post('/genero', ['uses' => 'GeneroController@post']);
   $router->get('/genero', ['uses' => 'GeneroController@get']);
   $router->get('/genero/paginate', ['uses' => 'GeneroController@paginate']);
   $router->put('/genero', ['uses' => 'GeneroController@put']);
   $router->delete('/genero', ['uses' => 'GeneroController@delete']);

   //CRUD Horario
   $router->post('/horario', ['uses' => 'HorarioController@post']);
   $router->get('/horario', ['uses' => 'HorarioController@get']);
   $router->get('/horario/paginate', ['uses' => 'HorarioController@paginate']);
   $router->put('/horario', ['uses' => 'HorarioController@put']);
   $router->delete('/horario', ['uses' => 'HorarioController@delete']);

   //CRUD InfoLaboral
   $router->post('/infolaboral', ['uses' => 'InfoLaboralController@post']);
   $router->get('/infolaboral', ['uses' => 'InfoLaboralController@get']);
   $router->get('/infolaboral/paginate', ['uses' => 'InfoLaboralController@paginate']);
   $router->put('/infolaboral', ['uses' => 'InfoLaboralController@put']);
   $router->delete('/infolaboral', ['uses' => 'InfoLaboralController@delete']);

   //CRUD Matricula
   $router->post('/matricula', ['uses' => 'MatriculaController@post']);
   $router->get('/matricula', ['uses' => 'MatriculaController@get']);
   $router->get('/matricula/paginate', ['uses' => 'MatriculaController@paginate']);
   $router->put('/matricula', ['uses' => 'MatriculaController@put']);
   $router->delete('/matricula', ['uses' => 'MatriculaController@delete']);

   //CRUD Modalidad
   $router->post('/modalidad', ['uses' => 'ModalidadController@post']);
   $router->get('/modalidad', ['uses' => 'ModalidadController@get']);
   $router->get('/modalidad/paginate', ['uses' => 'ModalidadController@paginate']);
   $router->put('/modalidad', ['uses' => 'ModalidadController@put']);
   $router->delete('/modalidad', ['uses' => 'ModalidadController@delete']);

   //CRUD Nivel
   $router->post('/nivel', ['uses' => 'NivelController@post']);
   $router->get('/nivel', ['uses' => 'NivelController@get']);
   $router->get('/nivel/paginate', ['uses' => 'NivelController@paginate']);
   $router->put('/nivel', ['uses' => 'NivelController@put']);
   $router->delete('/nivel', ['uses' => 'NivelController@delete']);

   //CRUD Persona
   $router->post('/persona', ['uses' => 'PersonaController@post']);
   $router->get('/persona', ['uses' => 'PersonaController@get']);
   $router->get('/persona/paginate', ['uses' => 'PersonaController@paginate']);
   $router->put('/persona', ['uses' => 'PersonaController@put']);
   $router->delete('/persona', ['uses' => 'PersonaController@delete']);

   //CRUD TipoPersona
   $router->post('/tipopersona', ['uses' => 'TipoPersonaController@post']);
   $router->get('/tipopersona', ['uses' => 'TipoPersonaController@get']);
   $router->get('/tipopersona/paginate', ['uses' => 'TipoPersonaController@paginate']);
   $router->put('/tipopersona', ['uses' => 'TipoPersonaController@put']);
   $router->delete('/tipopersona', ['uses' => 'TipoPersonaController@delete']);
});
