<?php

namespace App\Http\Controllers;

use App\Models\Datacenter;
use App\Models\DataCenterIso;
use App\Models\Iso;
use App\Models\IsoVersion;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IsoController extends Controller
{
    public function show()
    {
        $isos = Iso::all();

        foreach ($isos as $value) {
            $value->version = IsoVersion::where('isos_id', $value->id)->get();
            $value->datacenter = DataCenterIso::where('iso_id', $value->id)->get();

            foreach ($value->datacenter as $value) {
                $center = Datacenter::find($value->datacenter_id);
                $value->dataCenterName = $center->name;
                $value->dataCenterCode = $center->code;
            }
        }

        return response()->json([
            'status' => true,
            'data' => $isos
        ]);
    }

    public function save(Request $request)
    {
        $urlImg = '';

        $datacenters = json_decode($request->selectedData);
        $versiones = json_decode($request->versions);

        if ($request->file('img') !== null) {

            $imagen         = $request->file('img');
            $nombreimagen   = Carbon::now()->format('dmYhis') . "." . trim($imagen->getClientOriginalName());
            $ruta           = public_path("images/");
            $imagen->move($ruta, $nombreimagen);
            $urlImg = "/images/" . $nombreimagen;
        }

        $iso = new Iso();
        $iso->data_center_isos_id  = 1;
        $iso->name             = $request->name;
        $iso->img                = $urlImg;
        $iso->save();

        foreach ($datacenters as $datacenter) {
            DataCenterIso::create([
                'datacenter_id' => $datacenter->value,
                'iso_id' => $iso->id,
            ]);
        }

        foreach ($versiones as $ver) {
            IsoVersion::create([
                'isos_id' => $iso->id,
                'name' => $ver->version,
                'code' => $ver->code,
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $iso
        ], 201);
    }

    public function update(Request $request)
    {
        $iso = Iso::find($request->id);
        $iso->name = $request->name;

        if ($request->file('img') !== null) {

            $imagen         = $request->file('img');
            $nombreimagen   = Carbon::now()->format('dmYhis') . "." . trim($imagen->getClientOriginalName());
            $ruta           = public_path("images/");
            $imagen->move($ruta, $nombreimagen);
            $urlImg = "/images/" . $nombreimagen;

            $iso->img  = $urlImg;
        }
        $iso->save();

        $datacenters = json_decode($request->selectedData);
        $versiones = json_decode($request->versions);

        DataCenterIso::where('iso_id', $iso->id)->delete();

        foreach ($datacenters as $datacenter) {
            DataCenterIso::create([
                'datacenter_id' => $datacenter->value,
                'iso_id' => $iso->id,
            ]);
        }

        IsoVersion::where('isos_id', $iso->id)->delete();

        foreach ($versiones as $ver) {
            IsoVersion::create([
                'isos_id' => $iso->id,
                'name' => $ver->version,
                'code' => $ver->code,
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $iso
        ], 200);
    }

    public function destroy($id)
    {
        $iso = Iso::find($id);
        DataCenterIso::where('iso_id', $iso->id)->delete();
        IsoVersion::where('isos_id', $iso->id)->delete();
        $iso->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Producto Eliminado'
        ], 200);
    }
}
