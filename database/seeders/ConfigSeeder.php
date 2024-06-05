<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('configs')->insert([
            'name'   => "TRM",
            'valor'  => 4000
        ]);

        DB::table('configs')->insert([
            'name'   => "Ajuste Bancario",
            'valor'  => 2
        ]);

        DB::table('configs')->insert([
            'name'   => "Comisión",
            'valor'  => 15
        ]);

        DB::table('configs')->insert([
            'name'   => "Comisión Vendendor",
            'valor'  => 10
        ]);
    }
}
