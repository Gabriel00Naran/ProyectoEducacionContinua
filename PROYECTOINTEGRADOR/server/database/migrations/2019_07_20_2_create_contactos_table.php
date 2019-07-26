<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('contactos', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('cedula_contacto')->nullable($value = true);
          $table->string('nombre_contacto')->nullable($value = true);
          $table->string('apellido_contacto')->nullable($value = true);
          $table->string('parentesco_contacto')->nullable($value = true);
          $table->string('direccion_contacto')->nullable($value = true);
          $table->string('fecha_nace_contacto')->nullable($value = true);
          $table->string('lugar_nace_contacto')->nullable($value = true);
          $table->unsignedInteger('persona_id');
          $table->foreign('persona_id')->references('id')->on('personas')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('contactos');
    }
}