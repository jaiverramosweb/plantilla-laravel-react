<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('plans')->insert([
            // id => 1
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "4",
            'code'                  => "s-1vcpu-512mb-10gb",
            'vcpu'                  => "1",
            'memory'                => "512 MB",
            'storage'               => "10 GB",
            'transfer'              => "500 GB",
            'price'                 => 4,
            'backup_day'            => 0.80,
            'backup_week'           => 1.20,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 2
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "6",
            'code'                  => "s-1vcpu-1gb",
            'vcpu'                  => "1",
            'memory'                => "1 GB",
            'storage'               => "25 GB",
            'transfer'              => "1000 GB",
            'price'                 => 6,
            'backup_day'            => 1.20,
            'backup_week'           => 1.80,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 3
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "12",
            'code'                  => "s-1vcpu-2gb",
            'vcpu'                  => "1",
            'memory'                => "2 GB",
            'storage'               => "50 GB",
            'transfer'              => "2 TB",
            'price'                 => 12,
            'backup_day'            => 2.40,
            'backup_week'           => 3.60,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 4
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "18",
            'code'                  => "s-2vcpu-2gb",
            'vcpu'                  => "2",
            'memory'                => "2 GB",
            'storage'               => "60 GB",
            'transfer'              => "3 TB",
            'price'                 => 18,
            'backup_day'            => 3.60,
            'backup_week'           => 5.40,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 5
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "24",
            'code'                  => "s-2vcpu-4gb",
            'vcpu'                  => "2",
            'memory'                => "4 GB",
            'storage'               => "80 GB",
            'transfer'              => "4 TB",
            'price'                 => 24,
            'backup_day'            => 4.80,
            'backup_week'           => 7.20,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 6
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "48",
            'code'                  => "s-4vcpu-8gb",
            'vcpu'                  => "4",
            'memory'                => "8 GB",
            'storage'               => "160 GB",
            'transfer'              => "5 TB",
            'price'                 => 48,
            'backup_day'            => 9.60,
            'backup_week'           => 14.40,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 7
            'plan'                  => "SILVER",
            'tecnology'             => "SSD",
            'name'                  => "96",
            'code'                  => "s-8vcpu-16gb",
            'vcpu'                  => "8",
            'memory'                => "16 GB",
            'storage'               => "320 GB",
            'transfer'              => "6 TB",
            'price'                 => 96,
            'backup_day'            => 19.12,
            'backup_week'           => 28.80,
            'backing_abjustment'    => 2.0
        ]);


        // INTEL 

        DB::table('plans')->insert([
            // id => 8
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "8",
            'code'                  => "s-1vcpu-1gb-35gb-intel",
            'vcpu'                  => "1 Intel",
            'memory'                => "1 GB",
            'storage'               => "35 GB",
            'transfer'              => "1000 GB",
            'price'                 => 8,
            'backup_day'            => 1.60,
            'backup_week'           => 2.40,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 9
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "16",
            'code'                  => "s-1vcpu-2gb-70gb-intel",
            'vcpu'                  => "1 Intel",
            'memory'                => "2 GB",
            'storage'               => "30 GB",
            'transfer'              => "2 TB",
            'price'                 => 16,
            'backup_day'            => 3.20,
            'backup_week'           => 4.80,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 10
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "24",
            'code'                  => "s-2vcpu-2gb-90gb-intel",
            'vcpu'                  => "2 Intel",
            'memory'                => "2 GB",
            'storage'               => "90 GB",
            'transfer'              => "3 TB",
            'price'                 => 24,
            'backup_day'            => 4.80,
            'backup_week'           => 7.20,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 11
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "32",
            'code'                  => "s-2vcpu-4gb-120gb-intel",
            'vcpu'                  => "2 Intel",
            'memory'                => "4 GB",
            'storage'               => "120 GB",
            'transfer'              => "4 TB",
            'price'                 => 32,
            'backup_day'            => 6.40,
            'backup_week'           => 9.60,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 12
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "48",
            'code'                  => "s-2vcpu-8gb-160gb-intel",
            'vcpu'                  => "2 Intel",
            'memory'                => "8 GB",
            'storage'               => "160 GB",
            'transfer'              => "5 TB",
            'price'                 => 48,
            'backup_day'            => 9.60,
            'backup_week'           => 14.40,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 13
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "64",
            'code'                  => "s-4vcpu-8gb-240gb-intel",
            'vcpu'                  => "4 Intel",
            'memory'                => "8 GB",
            'storage'               => "240 GB",
            'transfer'              => "6 TB",
            'price'                 => 64,
            'backup_day'            => 12.80,
            'backup_week'           => 19.20,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 14
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "96",
            'code'                  => "s-4vcpu-8gb-240gb-intel",
            'vcpu'                  => "4 Intel",
            'memory'                => "16 GB",
            'storage'               => "320 GB",
            'transfer'              => "8 TB",
            'price'                 => 96,
            'backup_day'            => 19.20,
            'backup_week'           => 28.80,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 15
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "128",
            'code'                  => "s-8vcpu-16gb-480gb-intel",
            'vcpu'                  => "8 Intel",
            'memory'                => "16 GB",
            'storage'               => "480 GB",
            'transfer'              => "9 TB",
            'price'                 => 128,
            'backup_day'            => 25.60,
            'backup_week'           => 28.40,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 16
            'plan'                  => "GOLD INTEL",
            'tecnology'             => "NVMe SSD",
            'name'                  => "192",
            'code'                  => "s-8vcpu-32gb-640gb-intel",
            'vcpu'                  => "8 Intel",
            'memory'                => "32 GB",
            'storage'               => "640 GB",
            'transfer'              => "10 TB",
            'price'                 => 192,
            'backup_day'            => 38.40,
            'backup_week'           => 57.60,
            'backing_abjustment'    => 2.0
        ]);


        // AMD

        DB::table('plans')->insert([
            // id => 17
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "7",
            'code'                  => "s-1vcpu-1gb-amd",
            'vcpu'                  => "1 AMD",
            'memory'                => "1 GB",
            'storage'               => "25 GB",
            'transfer'              => "1000 GB",
            'price'                 => 7,
            'backup_day'            => 1.40,
            'backup_week'           => 2.10,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 18
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "14",
            'code'                  => "s-1vcpu-2gb-amd",
            'vcpu'                  => "1 AMD",
            'memory'                => "2 GB",
            'storage'               => "50 GB",
            'transfer'              => "2 TB",
            'price'                 => 14,
            'backup_day'            => 2.80,
            'backup_week'           => 4.20,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 19
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "21",
            'code'                  => "s-2vcpu-2gb-amd",
            'vcpu'                  => "2 AMD",
            'memory'                => "2 GB",
            'storage'               => "60 GB",
            'transfer'              => "3 TB",
            'price'                 => 21,
            'backup_day'            => 4.20,
            'backup_week'           => 6.30,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 20
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "28",
            'code'                  => "s-2vcpu-4gb-amd",
            'vcpu'                  => "2 AMD",
            'memory'                => "4 GB",
            'storage'               => "80 GB",
            'transfer'              => "4 TB",
            'price'                 => 28,
            'backup_day'            => 5.60,
            'backup_week'           => 8.40,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 21
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "42",
            'code'                  => "s-2vcpu-8gb-amd",
            'vcpu'                  => "2 AMD",
            'memory'                => "8 GB",
            'storage'               => "100 GB",
            'transfer'              => "5 TB",
            'price'                 => 42,
            'backup_day'            => 8.40,
            'backup_week'           => 12.60,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 22
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "56",
            'code'                  => "s-4vcpu-8gb-amd",
            'vcpu'                  => "4 AMD",
            'memory'                => "8 GB",
            'storage'               => "160 GB",
            'transfer'              => "5 TB",
            'price'                 => 56,
            'backup_day'            => 11.20,
            'backup_week'           => 16.80,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 23
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "84",
            'code'                  => "s-4vcpu-16gb-amd",
            'vcpu'                  => "4 AMD",
            'memory'                => "16 GB",
            'storage'               => "200 GB",
            'transfer'              => "8 TB",
            'price'                 => 84,
            'backup_day'            => 16.80,
            'backup_week'           => 25.20,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 24
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "112",
            'code'                  => "s-8vcpu-16gb-amd",
            'vcpu'                  => "8 AMD",
            'memory'                => "16 GB",
            'storage'               => "320 GB",
            'transfer'              => "6 TB",
            'price'                 => 112,
            'backup_day'            => 22.40,
            'backup_week'           => 33.60,
            'backing_abjustment'    => 2.0
        ]);
        DB::table('plans')->insert([
            // id => 25
            'plan'                  => "GOLD AMD",
            'tecnology'             => "NVMe SSD",
            'name'                  => "168",
            'code'                  => "s-8vcpu-32gb-amd",
            'vcpu'                  => "8 AMD",
            'memory'                => "32 GB",
            'storage'               => "400 GB",
            'transfer'              => "10 TB",
            'price'                 => 168,
            'backup_day'            => 33.60,
            'backup_week'           => 50.40,
            'backing_abjustment'    => 2.0
        ]);




        $data = array();

        $data[] = [
            "plans_id"          => 1,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 1,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 1,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 1,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 1,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 1,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 2
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 4
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 5
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 9
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 2,
            "datacenters_id"    => 14
        ];


        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 2
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 4
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 5
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 9
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 3,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 2
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 4
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 5
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 9
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 4,
            "datacenters_id"    => 14
        ];


        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 2
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 4
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 5
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 9
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 5,
            "datacenters_id"    => 14
        ];


        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 2
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 4
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 5
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 9
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 6,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 2
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 4
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 5
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 9
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 7,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 8,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 9,
            "datacenters_id"    => 14
        ];

        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 10,
            "datacenters_id"    => 14
        ];

        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 11,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 12,
            "datacenters_id"    => 14
        ];





        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 13,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 14,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 15,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 16,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 17,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 18,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 19,
            "datacenters_id"    => 14
        ];


        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 20,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 21,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 22,
            "datacenters_id"    => 14
        ];



        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 23,
            "datacenters_id"    => 14
        ];




        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 1
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 3
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 12
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 8
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 24,
            "datacenters_id"    => 14
        ];





        $data[] = [
            "plans_id"          => 25,
            "datacenters_id"    => 6
        ];
        $data[] = [
            "plans_id"          => 25,
            "datacenters_id"    => 10
        ];
        $data[] = [
            "plans_id"          => 25,
            "datacenters_id"    => 11
        ];
        $data[] = [
            "plans_id"          => 25,
            "datacenters_id"    => 7
        ];
        $data[] = [
            "plans_id"          => 25,
            "datacenters_id"    => 13
        ];
        $data[] = [
            "plans_id"          => 25,
            "datacenters_id"    => 14
        ];


        foreach ($data as $key) {
            DB::table('plan_datacenters')->insert([
                'plans_id'          => $key['plans_id'],
                'datacenters_id'    => $key['datacenters_id']
            ]);
        }
    }
}
