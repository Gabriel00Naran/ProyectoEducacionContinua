<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Contacto;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ContactoController extends Controller
{
    function get(Request $data)
    {
       $this->middleware('jwt.auth');
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Contacto::get(),200);
       } else {
          $contacto = Contacto::findOrFail($id);
          $attach = [];
          return response()->json(["Contacto"=>$contacto, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Contacto::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $contacto = new Contacto();
          $lastContacto = Contacto::orderBy('id')->get()->last();
          if($lastContacto) {
             $contacto->id = $lastContacto->id + 1;
          } else {
             $contacto->id = 1;
          }
          $contacto->cedula_contacto = $result['cedulaContacto'];
          $contacto->nombre_contacto = $result['nombreContacto'];
          $contacto->apellido_contacto = $result['apellidoContacto'];
          $contacto->parentesco_contacto = $result['parentescoContacto'];
          $contacto->direccion_contacto = $result['direccionContacto'];
          $contacto->fecha_nace_contacto = $result['fechaNaceContacto'];
          $contacto->lugar_nace_contacto = $result['lugarNaceContacto'];
          $contacto->persona_id = $result['persona_id'];
          $contacto->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($contacto,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $contacto = Contacto::where('id',$result['id'])->update([
             'cedula_contacto'=>$result['cedulaContacto'],
             'nombre_contacto'=>$result['nombreContacto'],
             'apellido_contacto'=>$result['apellidoContacto'],
             'parentesco_contacto'=>$result['parentescoContacto'],
             'direccion_contacto'=>$result['direccionContacto'],
             'fecha_nace_contacto'=>$result['fechaNaceContacto'],
             'lugar_nace_contacto'=>$result['lugarNaceContacto'],
             'persona_id'=>$result['persona_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($contacto,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Contacto::destroy($id);
    }

}