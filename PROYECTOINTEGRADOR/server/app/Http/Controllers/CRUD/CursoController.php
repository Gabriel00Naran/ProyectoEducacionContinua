<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Curso;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CursoController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Curso::get(),200);
       } else {
          $curso = Curso::findOrFail($id);
          $attach = [];
          return response()->json(["Curso"=>$curso, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Curso::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $curso = new Curso();
          $lastCurso = Curso::orderBy('id')->get()->last();
          if($lastCurso) {
             $curso->id = $lastCurso->id + 1;
          } else {
             $curso->id = 1;
          }
          $curso->curso_code = $result['curso_code'];
          $curso->nombre_curso = $result['nombre_curso'];
          $curso->aforo = $result['aforo'];
          $curso->fecha_inicio = $result['fecha_inicio'];
          $curso->fecha_fin = $result['fecha_fin'];
          $curso->id_modalidad = $result['id_modalidad'];
          $curso->id_nivel = $result['id_nivel'];
          $curso->id_horario = $result['id_horario'];
          $curso->modalidad_id = $result['modalidad_id'];
          $curso->nivel_id = $result['nivel_id'];
          $curso->horario_id = $result['horario_id'];
          $curso->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($curso,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $curso = Curso::where('id',$result['id'])->update([
             'curso_code'=>$result['curso_code'],
             'nombre_curso'=>$result['nombre_curso'],
             'aforo'=>$result['aforo'],
             'fecha_inicio'=>$result['fecha_inicio'],
             'fecha_fin'=>$result['fecha_fin'],
             'id_modalidad'=>$result['id_modalidad'],
             'id_nivel'=>$result['id_nivel'],
             'id_horario'=>$result['id_horario'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($curso,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Curso::destroy($id);
    } 
}