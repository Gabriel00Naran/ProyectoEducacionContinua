<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Curso";
    protected $fillable = [
       'curso_code','nombre_curso','aforo','fecha_inicio','fecha_fin','id_modalidad','id_nivel','id_horario',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Modalidad()
    {
       return $this->belongsTo('App\Modalidad');
    }

    function Nivel()
    {
       return $this->belongsTo('App\Nivel');
    }

    function Horario()
    {
       return $this->belongsTo('App\Horario');
    }

    function Matriculas()
    {
       return $this->hasMany('App\Matricula');
    }

}