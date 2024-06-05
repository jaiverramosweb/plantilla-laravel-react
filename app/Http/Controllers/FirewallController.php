<?php

namespace App\Http\Controllers;

use App\Models\Firewall;
use App\Models\Pileo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FirewallController extends Controller
{
    public function all()
    {
        $user_id = auth()->user()->id;
        $firewalls = Firewall::where('users_id', $user_id)->get();

        foreach ($firewalls as $value) {
            $pileo = Pileo::where('pileo_id', $value->droplet_id)->first();
            $value->pileo_name = $pileo->name;
        }

        return response()->json($firewalls, 200);
    }

    public function show($id)
    {
        $firewall = Firewall::find($id);
        $pileo = Pileo::where('pileo_id', $firewall->droplet_id)->first();

        $firewall->pileo_name = $pileo->name;

        return response()->json($firewall, 200);
    }

    public function save(Request $request)
    {
        $user_id = auth()->user()->id;
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->post('https://api.digitalocean.com/v2/firewalls', $request->data);

        $fire = $response->json();

        $firewall = Firewall::create([
            'users_id' => $user_id,
            'name' => $request->data['name'],
            'firewall_id' => $fire['firewall']['id'],
            'droplet_id' => $request->id,
            'inbound_rules' => json_encode($request->data['inbound_rules']),
            'outbound_rules' => json_encode($request->data['outbound_rules'])
        ]);

        return response()->json($firewall, 201);
    }

    public function destroy($id)
    {
        $keyAutentication = env('KEY_AUTENTICATION');
        Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->delete('https://api.digitalocean.com/v2/firewalls/' . $id);

        Firewall::where('firewall_id', $id)->delete();

        return response()->json('Firewal eliminado', 200);
    }
}
