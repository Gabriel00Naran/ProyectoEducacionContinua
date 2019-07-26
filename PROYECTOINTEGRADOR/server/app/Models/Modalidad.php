<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modalidad extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Modalidad";
    protected $fillable = [
       'descripcion_modal',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Cursos()
    {
       return $this->hasMany('App\Curso');
    }

}