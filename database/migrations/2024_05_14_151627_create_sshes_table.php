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
        Schema::create('sshes', function (Blueprint $table) {
            $table->id();
            $table->integer('users_id');
            $table->integer('ssh_id');
            $table->string('name');
            $table->text('publicKey');
            $table->text('fingerprint')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sshes');
    }
};
