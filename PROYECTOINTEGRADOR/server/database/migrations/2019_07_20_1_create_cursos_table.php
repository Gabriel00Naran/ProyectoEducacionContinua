<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCursosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('cursos', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('curso_code')->nullable($value = true);
          $table->string('nombre_curso')->nullable($value = true);
          $table->integer('aforo')->nullable($value = true);
          $table->string('fecha_inicio')->nullable($value = true);
          $table->string('fecha_fin')->nullable($value = true);
          $table->integer('id_modalidad')->nullable($value = true);
          $table->integer('id_nivel')->nullable($value = true);
          $table->integer('id_horario')->nullable($value = true);
          
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('cursos');
    }
}