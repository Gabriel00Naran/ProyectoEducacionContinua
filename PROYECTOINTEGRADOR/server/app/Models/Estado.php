<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Estado";
     protected $fillable = [
       'estado',
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

    function Matriculas()
    {
       return $this->hasMany('App\Matricula');
    }

}