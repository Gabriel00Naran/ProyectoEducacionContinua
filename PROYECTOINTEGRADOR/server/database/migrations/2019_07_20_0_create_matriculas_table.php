<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatriculasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('matriculas', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('resultado')->nullable($value = true);
          $table->decimal('nota')->nullable($value = true);
          $table->longtext('observaciones')->nullable($value = true);
          $table->string('nivel_academico')->nullable($value = true);
          $table->integer('id_persona')->nullable($value = true);
          $table->integer('id_curso')->nullable($value = true);
          $table->integer('id_estado')->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('matriculas');
    }
}