<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProveedorRequest;
use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    public function show()
    {
        $proveed = Proveedor::all();

        return response()->json([
            'status' => true,
            'data' => $proveed
        ]);
    }

    public function save(ProveedorRequest $request)
    {
        $proveed = new Proveedor();
        $proveed->name = $request->name;
        $proveed->save();

        return response()->json([
            'status' => true,
            'data' => $proveed
        ], 201);
    }

    public function update(ProveedorRequest $request, $id)
    {
        $proveed = Proveedor::find($id);
        $proveed->name = $request->name;
        $proveed->save();

        return response()->json([
            'status' => true,
            'data' => $proveed
        ], 200);
    }

    public function destroy($id)
    {
        $proveed = Proveedor::find($id);
        $proveed->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Producto Eliminado'
        ], 200);
    }
}
