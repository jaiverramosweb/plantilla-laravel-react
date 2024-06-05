<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('locations')->insert([
            // 'id'   => 1
            'name'   => "Norte America"
        ]);
        DB::table('locations')->insert([
            // 'id'   => 2
            'name'   => "Europa"
        ]);
        DB::table('locations')->insert([
            // 'id'   => 3
            'name'   => "Asia"
        ]);
        DB::table('locations')->insert([
            // 'id'   => 4
            'name'   => "Australia"
        ]);
        // DB::table('locations')->insert([
        // 'id'   => 5
        // 'name'   => "Sur America"
        // ]);
    }
}
