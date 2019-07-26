<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('personas', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('nombres')->nullable($value = true);
          $table->string('apellidos')->nullable($value = true);
          $table->string('cedula')->nullable($value = true);
          $table->integer('num_celular')->nullable($value = true);
          $table->integer('num_convencional')->nullable($value = true);
          $table->string('email')->nullable($value = true);
          $table->string('contrasenia')->nullable($value = true);
          $table->longtext('direccion')->nullable($value = true);
          $table->longtext('alergias')->nullable($value = true);
          $table->integer('id_tipo')->nullable($value = true);
          $table->integer('id_estado_civil')->nullable($value = true);
          $table->integer('id_genero')->nullable($value = true);
          $table->integer('id_contacto')->nullable($value = true);
          $table->integer('id_info_laboral')->nullable($value = true);
          $table->integer('id_estado')->nullable($value = true);
          $table->unsignedInteger('matricula_id');
          $table->foreign('matricula_id')->references('id')->on('matriculas')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('personas');
    }
}