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
        Schema::create('despieces', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_lote'); 
            $table->foreign('id_lote')->references('id')->on('lotes');
            $table->unsignedBigInteger('id_componente'); 
            $table->string('descripcion');
            $table->integer('cantidad');
            $table->foreign('id_componente')->references('id')->on('componentes')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('despieces');
    }
};
