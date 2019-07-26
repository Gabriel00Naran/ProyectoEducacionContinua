<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Horario";
    protected $fillable = [
       'hora_inicio','hora_fin','tipo_persona__id',
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

    function TipoPersona()
    {
       return $this->belongsTo('App\TipoPersona');
    }

}