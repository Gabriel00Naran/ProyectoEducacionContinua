<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInfosLaboralesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('infos_laborales', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->integer('idinfo_laboral')->nullable($value = true);
          $table->string('empresa_nombre')->nullable($value = true);
          $table->string('empresa_direccion')->nullable($value = true);
          $table->string('empresa_correo')->nullable($value = true);
          $table->string('empresa_numero')->nullable($value = true);
          $table->string('empresa_actividad')->nullable($value = true);
          $table->string('empresa_austisia_curso')->nullable($value = true);
          $table->string('estado')->nullable($value = true);
          $table->string('created__at')->nullable($value = true);
          $table->string('update__at')->nullable($value = true);
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
       Schema::dropIfExists('infos_laborales');
    }
}