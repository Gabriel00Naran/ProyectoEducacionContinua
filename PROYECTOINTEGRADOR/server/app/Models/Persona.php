<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table="Persona";
    protected $fillable = [
       'nombres','apellidos','cedula','numCelular','numConvencional','email','contrasenia','direccion','alergias','idTipo','idEstadoCivil','idGenero','idContacto','idInfoLaboral','idEstado',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function TipoPersona()
    {
       return $this->belongsTo('App\TipoPersona');
    }

    function EstadoCivil()
    {
       return $this->belongsTo('App\EstadoCivil');
    }

    function Genero()
    {
       return $this->belongsTo('App\Genero');
    }

    function Contacto()
    {
       return $this->belongsTo('App\Contacto');
    }

    function InfoLaboral()
    {
       return $this->belongsTo('App\InfoLaboral');
    }

    function Estado()
    {
       return $this->belongsTo('App\Estado');
    }
 }