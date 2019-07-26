<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Horario;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class HorarioController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Horario::get(),200);
       } else {
          $horario = Horario::findOrFail($id);
          $attach = [];
          return response()->json(["Horario"=>$horario, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Horario::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $horario = new Horario();
          $lastHorario = Horario::orderBy('id')->get()->last();
          if($lastHorario) {
             $horario->id = $lastHorario->id + 1;
          } else {
             $horario->id = 1;
          }
          $horario->hora_inicio = $result['hora_inicio'];
          $horario->hora_fin = $result['hora_fin'];
          $horario->tipo_persona__id = $result['tipo_persona__id'];
          $horario->tipo_persona_id = $result['tipo_persona_id'];
          $horario->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($horario,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $horario = Horario::where('id',$result['id'])->update([
             'hora_inicio'=>$result['hora_inicio'],
             'hora_fin'=>$result['hora_fin'],
             'tipo_persona__id'=>$result['tipo_persona__id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($horario,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Horario::destroy($id);
    }

}