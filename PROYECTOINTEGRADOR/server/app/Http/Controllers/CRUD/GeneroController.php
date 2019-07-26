<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Genero;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GeneroController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Genero::get(),200);
       } else {
          $genero = Genero::findOrFail($id);
          $attach = [];
          return response()->json(["Genero"=>$genero, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Genero::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $genero = new Genero();
          $lastGenero = Genero::orderBy('id')->get()->last();
          if($lastGenero) {
             $genero->id = $lastGenero->id + 1;
          } else {
             $genero->id = 1;
          }
          $genero->descripcion = $result['descripcion'];
          $genero->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($genero,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $genero = Genero::where('id',$result['id'])->update([
             'descripcion'=>$result['descripcion'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($genero,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Genero::destroy($id);
    }

}