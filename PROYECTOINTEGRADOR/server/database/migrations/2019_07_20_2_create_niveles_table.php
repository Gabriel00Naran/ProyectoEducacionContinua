<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNivelesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('niveles', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('nivel')->nullable($value = true);
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
       Schema::dropIfExists('niveles');
    }
}