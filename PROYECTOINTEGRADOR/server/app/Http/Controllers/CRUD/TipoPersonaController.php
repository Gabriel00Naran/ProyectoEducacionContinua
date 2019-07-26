<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\TipoPersona;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TipoPersonaController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(TipoPersona::get(),200);
       } else {
          $tipopersona = TipoPersona::findOrFail($id);
          $attach = [];
          return response()->json(["TipoPersona"=>$tipopersona, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(TipoPersona::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $tipopersona = new TipoPersona();
          $lastTipoPersona = TipoPersona::orderBy('id')->get()->last();
          if($lastTipoPersona) {
             $tipopersona->id = $lastTipoPersona->id + 1;
          } else {
             $tipopersona->id = 1;
          }
          $tipopersona->descripcion = $result['descripcion'];
          $tipopersona->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($tipopersona,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $tipopersona = TipoPersona::where('id',$result['id'])->update([
             'descripcion'=>$result['descripcion'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($tipopersona,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return TipoPersona::destroy($id);
    }
}