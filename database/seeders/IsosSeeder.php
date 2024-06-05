<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IsosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('isos')->insert([
            // id => 1
            'name'  => "Ubuntu",
            'img'   => "/images/isos/ubuntu.png"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 1,
            'name'      => "24.04 (LTS) x64",
            'code'      => "ubuntu-24-04-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 1,
            'name'      => "23.10 x64",
            'code'      => "ubuntu-23-10-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 1,
            'name'      => "22.04 (LTS) x64",
            'code'      => "ubuntu-22-04-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 1,
            'name'      => "20.04 (LTS) x64",
            'code'      => "ubuntu-20-04-x64"
        ]);

        DB::table('isos')->insert([
            // id => 2
            'name'  => "Fedora",
            'img'   => "/images/isos/fedora.webp"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 2,
            'name'      => "39 x64",
            'code'      => "fedora-39-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 2,
            'name'      => "38 x64",
            'code'      => "fedora-38-x64"
        ]);

        DB::table('isos')->insert([
            // id => 3
            'name'  => "Debian",
            'img'   => "/images/isos/debian.png"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 3,
            'name'      => "12 x64",
            'code'      => "debian-12-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 3,
            'name'      => "11 x64",
            'code'      => "debian-11-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 3,
            'name'      => "10 x64",
            'code'      => "debian-10-x64"
        ]);

        DB::table('isos')->insert([
            // id => 4
            'name'  => "CentOS",
            'img'   => "/images/isos/centos.png"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 4,
            'name'      => "9 Stream x64",
            'code'      => "centos-stream-9-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 4,
            'name'      => "8 Stream x64",
            'code'      => "centos-stream-8-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 4,
            'name'      => "7 x64",
            'code'      => "centos-7-x64"
        ]);

        DB::table('isos')->insert([
            // id => 5
            'name'  => "AlmaLinux",
            'img'   => "/images/isos/AlmaLinux.png"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 5,
            'name'      => "AlmaLinux 9",
            'code'      => "almalinux-9-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 5,
            'name'      => "AlmaLinux 8",
            'code'      => "almalinux-8-x64"
        ]);

        DB::table('isos')->insert([
            // id => 6
            'name'  => "Rocky Linux",
            'img'   => "/images/isos/rocklinux.png"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 6,
            'name'      => "9 x64",
            'code'      => "rockylinux-9-x64"
        ]);
        DB::table('iso_versions')->insert([
            'isos_id'   => 6,
            'name'      => "8 x64",
            'code'      => "rockylinux-8-x64"
        ]);


        $data = array();

        $data[] = [
            "datacenter_id" => 1,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 1,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 1,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 1,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 1,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 1,
            "iso_id"        => 6,
        ];


        $data[] = [
            "datacenter_id" => 2,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 2,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 2,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 2,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 2,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 2,
            "iso_id"        => 6,
        ];


        $data[] = [
            "datacenter_id" => 3,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 3,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 3,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 3,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 3,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 3,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 4,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 4,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 4,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 4,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 4,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 4,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 5,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 5,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 5,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 5,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 5,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 5,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 6,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 6,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 6,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 6,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 6,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 6,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 7,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 7,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 7,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 7,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 7,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 7,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 8,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 8,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 8,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 8,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 8,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 8,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 9,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 9,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 9,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 9,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 9,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 9,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 10,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 10,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 10,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 10,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 10,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 10,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 11,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 11,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 11,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 11,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 11,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 11,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 12,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 12,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 12,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 12,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 12,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 12,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 13,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 13,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 13,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 13,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 13,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 13,
            "iso_id"        => 6,
        ];

        $data[] = [
            "datacenter_id" => 14,
            "iso_id"        => 1,
        ];
        $data[] = [
            "datacenter_id" => 14,
            "iso_id"        => 2,
        ];
        $data[] = [
            "datacenter_id" => 14,
            "iso_id"        => 3,
        ];
        $data[] = [
            "datacenter_id" => 14,
            "iso_id"        => 4,
        ];
        $data[] = [
            "datacenter_id" => 14,
            "iso_id"        => 5,
        ];
        $data[] = [
            "datacenter_id" => 14,
            "iso_id"        => 6,
        ];

        foreach ($data as $key) {
            DB::table('data_center_isos')->insert([
                'datacenter_id' => $key['datacenter_id'],
                'iso_id'        => $key['iso_id']
            ]);
        }
    }
}
