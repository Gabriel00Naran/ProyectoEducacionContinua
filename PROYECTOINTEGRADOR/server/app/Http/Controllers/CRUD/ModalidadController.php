<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Modalidad;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ModalidadController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Modalidad::get(),200);
       } else {
          $modalidad = Modalidad::findOrFail($id);
          $attach = [];
          return response()->json(["Modalidad"=>$modalidad, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Modalidad::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $modalidad = new Modalidad();
          $lastModalidad = Modalidad::orderBy('id')->get()->last();
          if($lastModalidad) {
             $modalidad->id = $lastModalidad->id + 1;
          } else {
             $modalidad->id = 1;
          }
          $modalidad->descripcion_modal = $result['descripcion_modal'];
          $modalidad->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($modalidad,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $modalidad = Modalidad::where('id',$result['id'])->update([
             'descripcion_modal'=>$result['descripcion_modal'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($modalidad,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Modalidad::destroy($id);
    }


}