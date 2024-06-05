<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationRequest;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function show()
    {
        $location = Location::all();

        return response()->json([
            'status' => true,
            'data' => $location
        ]);
    }

    public function save(LocationRequest $request)
    {
        $location = new Location();
        $location->name = $request->name;
        $location->save();

        return response()->json([
            'status' => true,
            'data' => $location
        ], 201);
    }

    public function update(LocationRequest $request, $id)
    {
        $location = Location::find($id);
        $location->name = $request->name;
        $location->save();

        return response()->json([
            'status' => true,
            'data' => $location
        ], 200);
    }

    public function destroy($id)
    {
        $location = Location::find($id);
        $location->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Producto Eliminado'
        ], 200);
    }
}
