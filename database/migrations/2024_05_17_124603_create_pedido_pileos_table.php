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
        Schema::create('pedido_pileos', function (Blueprint $table) {
            $table->id();
            $table->integer('users_id');
            $table->integer('pileo_id')->nullable();
            $table->integer('plan_id');
            $table->string('codigo')->nullable();
            $table->integer('pagar');
            $table->string('name')->nullable();
            $table->string('region')->nullable();
            $table->string('size')->nullable();
            $table->string('image')->nullable();
            $table->string('ssh_keys')->nullable();
            $table->string('vpc_uuid')->nullable();
            $table->string('precio_bacuk')->nullable();
            $table->string('referencia_pago')->nullable();
            $table->string('estado')->default('Pendiente');
            $table->string('metodo_pago')->nullable();
            $table->string('ref_pago')->nullable();
            $table->string('mes_pagos')->nullable();
            $table->string('fecha_activa')->nullable();
            $table->string('fecha_vence')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedido_pileos');
    }
};
