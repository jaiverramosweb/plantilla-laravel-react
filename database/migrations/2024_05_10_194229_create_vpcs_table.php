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
        Schema::create('vpcs', function (Blueprint $table) {
            $table->id();
            $table->integer('users_id');
            $table->string('vpc_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('region');
            $table->string('ip_range');
            $table->boolean('default')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vpcs');
    }
};
