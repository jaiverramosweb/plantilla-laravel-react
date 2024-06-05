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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('plan')->nullable();
            $table->string('tecnology')->nullable();
            $table->string('name')->nullable();
            $table->string('code')->nullable();
            $table->string('vcpu')->nullable();
            $table->string('memory')->nullable();
            $table->string('storage')->nullable();
            $table->string('transfer')->nullable();
            $table->integer('price')->nullable();
            $table->double('backup_day', 8, 2)->nullable();
            $table->double('backup_week', 8, 2)->nullable();
            $table->double('backing_abjustment', 8, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
