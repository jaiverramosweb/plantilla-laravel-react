<?php

namespace App\Http\Controllers;

use App\Http\Requests\DatacenterRequest;
use App\Models\Datacenter;
use App\Models\Location;
use App\Models\Proveedor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DatacenterController extends Controller
{
    public function show()
    {
        $datacenter = Datacenter::all();

        foreach ($datacenter as $value) {
            $value->provider = Proveedor::find($value->proveedors_id);
            $value->location = Location::find($value->locations_id);
        }

        return response()->json([
            'status' => true,
            'data' => $datacenter
        ]);
    }

    public function save(DatacenterRequest $request)
    {
        $urlImg = '';

        if ($request->file('flag') !== null) {

            $imagen         = $request->file('flag');
            $nombreimagen   = Carbon::now()->format('dmYhis') . "." . trim($imagen->getClientOriginalName());
            $ruta           = public_path("images/");
            $imagen->move($ruta, $nombreimagen);
            $urlImg = "/images/" . $nombreimagen;
        }

        $datacenter = new Datacenter();
        $datacenter->proveedors_id    = $request->proveedors_id;
        $datacenter->locations_id     = $request->locations_id;
        $datacenter->name             = $request->name;
        $datacenter->flag             = $urlImg;
        $datacenter->code             = $request->code;
        $datacenter->save();

        return response()->json([
            'status' => true,
            'data' => $datacenter
        ], 201);
    }

    public function update(DatacenterRequest $request)
    {
        $datacenter = Datacenter::find($request->id);

        if ($request->file('flag') !== null) {

            $imagen         = $request->file('flag');
            $nombreimagen   = Carbon::now()->format('dmYhis') . "." . trim($imagen->getClientOriginalName());
            $ruta           = public_path("images/");
            $imagen->move($ruta, $nombreimagen);
            $urlImg = "/images/" . $nombreimagen;

            $datacenter->flag  = $urlImg;
        }

        $datacenter->proveedors_id    = $request->proveedors_id;
        $datacenter->locations_id     = $request->locations_id;
        $datacenter->name             = $request->name;
        $datacenter->code             = $request->code;
        $datacenter->save();

        return response()->json([
            'status' => true,
            'data' => $datacenter
        ], 200);
    }

    public function destroy($id)
    {
        $datacenter = Datacenter::find($id);
        $datacenter->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Producto Eliminado'
        ], 200);
    }
}
