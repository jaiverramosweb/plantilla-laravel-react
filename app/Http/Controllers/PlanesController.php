<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlanRequest;
use App\Models\Datacenter;
use App\Models\Plan;
use App\Models\planDatacenter;
use Illuminate\Http\Request;

class PlanesController extends Controller
{
    public function all()
    {
        $planes = Plan::all();

        foreach ($planes as $value) {
            $value->datacenter = planDatacenter::where('plans_id', $value->id)->get();

            foreach ($value->datacenter as $value) {
                $center = Datacenter::find($value->datacenters_id);
                $value->dataCenterName = $center->name;
                $value->dataCenterCode = $center->code;
            }
        }


        return response()->json([
            'status' => true,
            'data' => $planes
        ]);
    }

    public function show($id)
    {
        $item = planDatacenter::where('datacenters_id', $id)->get();

        $datacenters = [];

        foreach ($item as $value) {
            $data = Plan::find($value->plans_id);

            array_push($datacenters, $data);
        }

        return response()->json($datacenters, 200);
    }

    public function save(PlanRequest $request)
    {
        $datacenters = json_decode($request->datacenters);

        $plan = new Plan();
        $plan->plan                 = $request->plan;
        $plan->tecnology            = $request->tecnology;
        $plan->name                 = $request->name;
        $plan->code                 = $request->code;
        $plan->vcpu                 = $request->vcpu;
        $plan->memory               = $request->memory;
        $plan->storage              = $request->storage;
        $plan->transfer             = $request->transfer;
        $plan->price                = $request->price;
        $plan->backup_day           = $request->backup_day;
        $plan->backup_week          = $request->backup_week;
        $plan->backing_abjustment   = $request->backing_abjustment;

        $plan->save();

        foreach ($datacenters as $datacenter) {
            planDatacenter::create([
                'plans_id' => $plan->id,
                'datacenters_id' => $datacenter->value,
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $plan
        ], 201);
    }

    public function update(PlanRequest $request, $id)
    {
        $datacenters = json_decode($request->datacenters);

        $plan = Plan::find($id);

        $plan->plan                 = $request->plan;
        $plan->tecnology            = $request->tecnology;
        $plan->name                 = $request->name;
        $plan->code                 = $request->code;
        $plan->vcpu                 = $request->vcpu;
        $plan->memory               = $request->memory;
        $plan->storage              = $request->storage;
        $plan->transfer             = $request->transfer;
        $plan->backup_day           = $request->backup_day;
        $plan->backup_week          = $request->backup_week;
        $plan->backing_abjustment   = $request->backing_abjustment;

        $plan->save();

        planDatacenter::where('plans_id', $plan->id)->delete();

        foreach ($datacenters as $datacenter) {
            planDatacenter::create([
                'plans_id' => $plan->id,
                'datacenters_id' => $datacenter->value,
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $plan
        ], 200);
    }

    public function destroy($id)
    {
        $plan = Plan::find($id);

        planDatacenter::where('plans_id', $plan->id)->delete();

        $plan->delete();


        return response()->json([
            'status'  => true,
            'message' => 'Producto Eliminado'
        ], 200);
    }
}
