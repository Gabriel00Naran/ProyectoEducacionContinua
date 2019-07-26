<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InfoLaboral extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="InfoLaboral";
    protected $fillable = [
       'idinfo_laboral','empresa_nombre','empresa_direccion','empresa_correo','empresa_numero','empresa_actividad','empresa_austisia_curso','estado','created__at','update__at',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Persona()
    {
       return $this->hasOne('App\Persona');
    }

}