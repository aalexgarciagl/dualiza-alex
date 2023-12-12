<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('joya_componentes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_componente'); 
            $table->foreign('id_componente')->references('id')->on('componentes')->cascadeOnDelete();
            $table->unsignedBigInteger('id_joya'); 
            $table->foreign('id_joya')->references('id')->on('joyas');
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('joya_componentes');
    }
};
