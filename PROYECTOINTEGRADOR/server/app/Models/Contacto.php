<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Contacto";
    protected $fillable = [
       'cedulaContacto','nombreContacto','apellidoContacto','parentescoContacto','direccionContacto','fechaNaceContacto','lugarNaceContacto',
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