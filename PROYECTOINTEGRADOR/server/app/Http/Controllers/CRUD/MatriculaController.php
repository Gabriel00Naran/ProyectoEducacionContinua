<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Matricula;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MatriculaController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Matricula::get(),200);
       } else {
          $matricula = Matricula::findOrFail($id);
          $attach = [];
          return response()->json(["Matricula"=>$matricula, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Matricula::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $matricula = new Matricula();
          $lastMatricula = Matricula::orderBy('id')->get()->last();
          if($lastMatricula) {
             $matricula->id = $lastMatricula->id + 1;
          } else {
             $matricula->id = 1;
          }
          $matricula->resultado = $result['resultado'];
          $matricula->nota = $result['nota'];
          $matricula->observaciones = $result['observaciones'];
          $matricula->nivel_academico = $result['nivelAcademico'];
          $matricula->id_persona = $result['idPersona'];
          $matricula->id_curso = $result['idCurso'];
          $matricula->id_estado = $result['idEstado'];
          $matricula->curso_id = $result['curso_id'];
          $matricula->persona_id = $result['persona_id'];
          $matricula->estado_id = $result['estado_id'];
          $matricula->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($matricula,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $matricula = Matricula::where('id',$result['id'])->update([
             'resultado'=>$result['resultado'],
             'nota'=>$result['nota'],
             'observaciones'=>$result['observaciones'],
             'nivel_academico'=>$result['nivel_academico'],
             'id_persona'=>$result['id_persona'],
             'id_curso'=>$result['id_curso'],
             'id_estado'=>$result['id_estado'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($matricula,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Matricula::destroy($id);
    }

}