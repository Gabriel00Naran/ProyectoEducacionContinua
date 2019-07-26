<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Persona;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PersonaController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Persona::get(),200);
       } else {
          $persona = Persona::findOrFail($id);
          $attach = [];
          return response()->json(["Persona"=>$persona, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Persona::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $persona = new Persona();
          $lastPersona = Persona::orderBy('id')->get()->last();
          if($lastPersona) {
             $persona->id = $lastPersona->id + 1;
          } else {
             $persona->id = 1;
          }
          $persona->nombres = $result['nombres'];
          $persona->apellidos = $result['apellidos'];
          $persona->cedula = $result['cedula'];
          $persona->numCelular = $result['numCelular'];
          $persona->numConvencional = $result['numConvencional'];
          $persona->email = $result['email'];
          $persona->contrasenia = $result['contrasenia'];
          $persona->direccion = $result['direccion'];
          $persona->alergias = $result['alergias'];
          $persona->idTipo = $result['idTipo'];
          $persona->idEstadoCivil = $result['idEstadoCivil'];
          $persona->idGenero = $result['idGenero'];
          $persona->idContacto = $result['idContacto'];
          $persona->idInfoLaboral = $result['idInfoLaboral'];
          $persona->idEstado = $result['idEstado'];
         
          $persona->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($persona,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $persona = Persona::where('id',$result['id'])->update([
             'nombres'=>$result['nombres'],
             'apellidos'=>$result['apellidos'],
             'cedula'=>$result['cedula'],
             'numCelular'=>$result['numCelular'],
             'numConvencional'=>$result['numConvencional'],
             'email'=>$result['email'],
             'contrasenia'=>$result['contrasenia'],
             'direccion'=>$result['direccion'],
             'alergias'=>$result['alergias'],
             'idTipo'=>$result['idTipo'],
             'idEstado_civil'=>$result['idEstadoCivil'],
             'idGenero'=>$result['idGenero'],
             'idContacto'=>$result['idContacto'],
             'idInfoLaboral'=>$result['idInfoLaboral'],
             'idEstado'=>$result['idEstado'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($persona,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Persona::destroy($id);
    }
}