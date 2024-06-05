<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfigRequest;
use App\Models\Config;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function show()
    {
        $config = Config::all();

        return response()->json([
            'status' => true,
            'data' => $config
        ]);
    }

    public function save(ConfigRequest $request)
    {
        $config = new Config();
        $config->name = $request->name;
        $config->valor = $request->valor;
        $config->save();

        return response()->json([
            'status' => true,
            'data' => $config
        ], 201);
    }

    public function update(ConfigRequest $request, $id)
    {
        $config = Config::find($id);
        $config->name = $request->name;
        $config->valor = $request->valor;
        $config->save();

        return response()->json([
            'status' => true,
            'data' => $config
        ], 200);
    }

    public function destroy($id)
    {
        $config = Config::find($id);
        $config->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Producto Eliminado'
        ], 200);
    }
}
