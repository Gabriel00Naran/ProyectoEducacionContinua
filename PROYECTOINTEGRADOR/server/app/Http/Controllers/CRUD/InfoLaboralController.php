<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\InfoLaboral;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class InfoLaboralController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(InfoLaboral::get(),200);
       } else {
          $infolaboral = InfoLaboral::findOrFail($id);
          $attach = [];
          return response()->json(["InfoLaboral"=>$infolaboral, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(InfoLaboral::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $infolaboral = new InfoLaboral();
          $lastInfoLaboral = InfoLaboral::orderBy('id')->get()->last();
          if($lastInfoLaboral) {
             $infolaboral->id = $lastInfoLaboral->id + 1;
          } else {
             $infolaboral->id = 1;
          }
          $infolaboral->idinfo_laboral = $result['idinfo_laboral'];
          $infolaboral->empresa_nombre = $result['empresa_nombre'];
          $infolaboral->empresa_direccion = $result['empresa_direccion'];
          $infolaboral->empresa_correo = $result['empresa_correo'];
          $infolaboral->empresa_numero = $result['empresa_numero'];
          $infolaboral->empresa_actividad = $result['empresa_actividad'];
          $infolaboral->empresa_austisia_curso = $result['empresa_austisia_curso'];
          $infolaboral->estado = $result['estado'];
          $infolaboral->created__at = $result['created__at'];
          $infolaboral->update__at = $result['update__at'];
          $infolaboral->persona_id = $result['persona_id'];
          $infolaboral->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($infolaboral,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $infolaboral = InfoLaboral::where('id',$result['id'])->update([
             'idinfo_laboral'=>$result['idinfo_laboral'],
             'empresa_nombre'=>$result['empresa_nombre'],
             'empresa_direccion'=>$result['empresa_direccion'],
             'empresa_correo'=>$result['empresa_correo'],
             'empresa_numero'=>$result['empresa_numero'],
             'empresa_actividad'=>$result['empresa_actividad'],
             'empresa_austisia_curso'=>$result['empresa_austisia_curso'],
             'estado'=>$result['estado'],
             'created__at'=>$result['created__at'],
             'update__at'=>$result['update__at'],
             'persona_id'=>$result['persona_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($infolaboral,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return InfoLaboral::destroy($id);
    }



}