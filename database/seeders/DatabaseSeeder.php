<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ConfigSeeder::class);
        $this->call(ProveedoresSeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(DatacenterSeeder::class);
        $this->call(IsosSeeder::class);
        $this->call(PlanesSeeder::class);
        $this->call(UserSeeder::class);
    }
}
