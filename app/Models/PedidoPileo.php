<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoPileo extends Model
{
    use HasFactory;

    protected $guarded = [];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($pedido) {
            $lastPedido = self::orderBy('id', 'desc')->first();
            $lastCodigo = $lastPedido ? $lastPedido->codigo : 'PDO0000';
            $nextCodigo = 'PDO' . str_pad((int)substr($lastCodigo, 3) + 1, 4, '0', STR_PAD_LEFT);

            $pedido->codigo = $nextCodigo;
        });
    }
}
