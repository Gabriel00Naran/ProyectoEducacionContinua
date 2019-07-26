<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table="Matricula";
    protected $fillable = [
       'resultado','nota','observaciones','nivelAcademico','idPersona','idCurso','idEstado',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Curso()
    {
       return $this->belongsTo('App\Curso');
    }

    function Persona()
    {
       return $this->belongsTo('App\Persona');
    }

    function Estado()
    {
       return $this->belongsTo('App\Estado');
    }

}