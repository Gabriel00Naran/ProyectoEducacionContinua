<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModalidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('modalidades', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('descripcion_modal')->nullable($value = true);
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
       Schema::dropIfExists('modalidades');
    }
}