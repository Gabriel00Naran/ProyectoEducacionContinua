<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstadosCivilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('estados_civiles', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('descripcion')->nullable($value = true);
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
       Schema::dropIfExists('estados_civiles');
    }
}