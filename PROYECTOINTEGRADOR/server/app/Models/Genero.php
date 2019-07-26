<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Genero";
    protected $fillable = [
       'descripcion',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Personas()
    {
       return $this->hasMany('App\Persona');
    }

}