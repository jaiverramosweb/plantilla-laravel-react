<?php

namespace App\Http\Controllers;

use App\Models\Ssh;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SshController extends Controller
{
    public function all()
    {
        $user_id = auth()->user()->id;
        $sshes = Ssh::where('users_id', $user_id)->get();
        return response()->json($sshes, 200);
    }

    public function save(Request $request)
    {
        $user_id = auth()->user()->id;
        $keyAutentication = env('KEY_AUTENTICATION');

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $keyAutentication,
            ])->post('https://api.digitalocean.com/v2/account/keys', [
                'name' => $request->name,
                'public_key' => $request->public_key,
            ]);

            $ssh = $response->json();

            return response()->json([
                'status' => true,
                'data'   => $ssh
            ]);
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }
}
