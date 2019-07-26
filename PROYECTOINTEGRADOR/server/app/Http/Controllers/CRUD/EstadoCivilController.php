<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\EstadoCivil;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EstadoCivilController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(EstadoCivil::get(),200);
       } else {
          $estadocivil = EstadoCivil::findOrFail($id);
          $attach = [];
          return response()->json(["EstadoCivil"=>$estadocivil, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(EstadoCivil::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $estadocivil = new EstadoCivil();
          $lastEstadoCivil = EstadoCivil::orderBy('id')->get()->last();
          if($lastEstadoCivil) {
             $estadocivil->id = $lastEstadoCivil->id + 1;
          } else {
             $estadocivil->id = 1;
          }
          $estadocivil->descripcion = $result['descripcion'];
          $estadocivil->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($estadocivil,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $estadocivil = EstadoCivil::where('id',$result['id'])->update([
             'descripcion'=>$result['descripcion'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($estadocivil,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return EstadoCivil::destroy($id);
    }
}