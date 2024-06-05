<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatacenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = array();

        $data[] = [
            // id => 1
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "New York 1",
            "flag"          => "/images/countries/usa.png",
            "code"          => "nyc1"
        ];
        $data[] = [
            // id => 2
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "New York 2",
            "flag"          => "/images/countries/usa.png",
            "code"          => "nyc2"
        ];
        $data[] = [
            // id => 3
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "New York 3",
            "flag"          => "/images/countries/usa.png",
            "code"          => "nyc3"
        ];

        $data[] = [
            // id => 4
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "San Francisco 1",
            "flag"          => "/images/countries/usa.png",
            "code"          => "sfo1"
        ];
        $data[] = [
            // id => 5
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "San Francisco 2",
            "flag"          => "/images/countries/usa.png",
            "code"          => "sfo2"
        ];
        $data[] = [
            // id => 6
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "San Francisco 3",
            "flag"          => "/images/countries/usa.png",
            "code"          => "sfo3"
        ];

        $data[] = [
            // id => 7
            "proveedors_id" => 1,
            "locations_id"  => 1,
            "name"          => "Toronto",
            "flag"          => "/images/countries/toronto.png",
            "code"          => "tor1"
        ];

        $data[] = [
            // id => 8
            "proveedors_id" => 1,
            "locations_id"  => 2,
            "name"          => "London",
            "flag"          => "/images/countries/london.png",
            "code"          => "lon1"
        ];

        $data[] = [
            // id => 9
            "proveedors_id" => 1,
            "locations_id"  => 2,
            "name"          => "Amsterdam 1",
            "flag"          => "/images/countries/amsterdan.png",
            "code"          => "ams2"
        ];
        $data[] = [
            // id => 10
            "proveedors_id" => 1,
            "locations_id"  => 2,
            "name"          => "Amsterdam 2",
            "flag"          => "/images/countries/amsterdan.png",
            "code"          => "ams3"
        ];

        $data[] = [
            // id => 11
            "proveedors_id" => 1,
            "locations_id"  => 2,
            "name"          => "Frankfurt",
            "flag"          => "/images/countries/frankfurt.png",
            "code"          => "fra1"
        ];

        $data[] = [
            // id => 12
            "proveedors_id" => 1,
            "locations_id"  => 3,
            "name"          => "Singapore",
            "flag"          => "/images/countries/singapur.png",
            "code"          => "sgp1"
        ];

        $data[] = [
            // id => 13
            "proveedors_id" => 1,
            "locations_id"  => 3,
            "name"          => "Bangalore",
            "flag"          => "/images/countries/bangalore.png",
            "code"          => "blr1"
        ];

        $data[] = [
            // id => 14
            "proveedors_id" => 1,
            "locations_id"  => 4,
            "name"          => "Sydney",
            "flag"          => "/images/countries/signey.png",
            "code"          => "syd1"
        ];



        foreach ($data as $key) {
            DB::table('datacenters')->insert([
                'proveedors_id' => $key['proveedors_id'],
                'locations_id'  => $key['locations_id'],
                'name'          => $key['name'],
                'flag'          => $key['flag'],
                'code'          => $key['code'],
            ]);
        }
    }
}
