<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Nivel;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NivelController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Nivel::get(),200);
       } else {
          $nivel = Nivel::findOrFail($id);
          $attach = [];
          return response()->json(["Nivel"=>$nivel, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Nivel::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $nivel = new Nivel();
          $lastNivel = Nivel::orderBy('id')->get()->last();
          if($lastNivel) {
             $nivel->id = $lastNivel->id + 1;
          } else {
             $nivel->id = 1;
          }
          $nivel->nivel = $result['nivel'];
          $nivel->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($nivel,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $nivel = Nivel::where('id',$result['id'])->update([
             'nivel'=>$result['nivel'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($nivel,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Nivel::destroy($id);
    }   
}