<?php

namespace App\Http\Controllers;

use App\Http\Requests\VpcRequest;
use App\Models\Vpc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class VpcController extends Controller
{
    public function all()
    {
        $vpcs = Vpc::all();

        return response()->json([
            'status' => true,
            'data' => $vpcs
        ]);
    }

    public function show($reg)
    {
        $user_id = auth()->user()->id;
        $vpcs = Vpc::where('region', $reg)->where('users_id', $user_id)->get();

        return response()->json([
            'status' => true,
            'data' => $vpcs
        ]);
    }

    public function save(VpcRequest $request)
    {
        $user_id = auth()->user()->id;

        $keyAutentication = env('KEY_AUTENTICATION');

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $keyAutentication,
            ])->post('https://api.digitalocean.com/v2/vpcs', [
                'name' => $request->name,
                'description' => $request->description,
                'region' => $request->region,
                'ip_range' => $request->ip_range,
            ]);

            $vpc = $response->json();

            // return response()->json([
            //     'status' => true,
            //     'data'   => $vpc['id']
            // ]);

            if (isset($vpc['id'])) {

                return response()->json([
                    'status' => false,
                    'data'   => $vpc,
                ]);
            } else {

                $dataCreate = [
                    'users_id' => $user_id,
                    'name' => $request->name,
                    'description' => $request->description,
                    'region' => $request->region,
                    'ip_range' => $request->ip_range,
                    'vpc_id' => $vpc['vpc']['id'],
                    'default' => $vpc['vpc']['default'],
                ];

                $createVpc = Vpc::create($dataCreate);

                return $vpc;

                return response()->json([
                    'status'    => true,
                    'data'      => $vpc,
                    'createVpc' => $createVpc,
                ]);
            }
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }
}
