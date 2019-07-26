<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Estado;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EstadoController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Estado::get(),200);
       } else {
          $estado = Estado::findOrFail($id);
          $attach = [];
          return response()->json(["Estado"=>$estado, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Estado::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $estado = new Estado();
          $lastEstado = Estado::orderBy('id')->get()->last();
          if($lastEstado) {
             $estado->id = $lastEstado->id + 1;
          } else {
             $estado->id = 1;
          }
          $estado->estado = $result['estado'];
          $estado->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($estado,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $estado = Estado::where('id',$result['id'])->update([
             'estado'=>$result['estado'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($estado,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Estado::destroy($id);
    }
}