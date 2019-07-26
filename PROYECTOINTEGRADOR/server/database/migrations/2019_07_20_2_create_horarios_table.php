<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('horarios', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->time('hora_inicio')->nullable($value = true);
          $table->time('hora_fin')->nullable($value = true);
          $table->integer('tipo_persona__id')->nullable($value = true);
          $table->unsignedInteger('curso_id');
          $table->foreign('curso_id')->references('id')->on('cursos')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('horarios');
    }
}