<?php

namespace App\Http\Controllers;

use App\Models\PedidoPileo;
use App\Models\Pileo;
use App\Models\Plan;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PileoController extends Controller
{
    public function all()
    {
        $user_id = auth()->user()->id;
        $pileos = Pileo::where('users_id', $user_id)->get();
        return response()->json($pileos, 200);
    }

    public function save($id)
    {
        // return $request->all();
        $data = PedidoPileo::find($id);

        $user_id = auth()->user()->id;
        $keyAutentication = env('KEY_AUTENTICATION');

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $keyAutentication,
            ])->post('https://api.digitalocean.com/v2/droplets', [
                'name' => $data->name,
                'region' => $data->region,
                'size' => $data->size,
                'image' => $data->image,
                'ssh_keys' => json_decode($data->ssh_keys),
                // 'backups' => $request->name,
                'monitoring' => true,
                'vpc_uuid' => $data->vpc_uuid,
            ]);

            $pileo = $response->json();

            if ($pileo['droplet']['id']) {
                $pileoData = Pileo::create([
                    'users_id' => $user_id,
                    'pileo_id' => $pileo['droplet']['id'],
                    'name' => $data->name,
                    'region' => $data->region,
                    'size' => $data->size,
                    'image' => $data->image,
                    'ssh_keys' => $data->ssh_keys,
                    'vpc_uuid' => $data->vpc_uuid
                ]);

                if ($pileoData) {
                    $months = 1;

                    $startDate = Carbon::now();
                    $endDate = $startDate->copy()->addMonths($months);

                    $orden = PedidoPileo::find($data->id);
                    $orden->pileo_id        = $pileoData->id;
                    $orden->estado          = 'Activo';
                    $orden->fecha_activa    = $startDate->toDateString();
                    $orden->fecha_vence     = $endDate->toDateString();
                    $orden->save();

                    return response()->json($orden, 200);
                }
            }
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }

    public function processPayment(Request $request)
    {
        $p_cust_id_cliente = '1453384'; // Ingresa el valor correspondiente
        $p_key             = '74c344478113cbcaaccb47044acf3af4a48fa42b'; // Ingresa el valor correspondiente

        $x_ref_payco      = $request->input('x_ref_payco');
        $x_transaction_id = $request->input('x_transaction_id');
        $x_amount         = $request->input('x_amount');
        $x_currency_code  = $request->input('x_currency_code');
        $x_signature      = $request->input('x_signature');

        $signature = hash('sha256', $p_cust_id_cliente . '^' . $p_key . '^' . $x_ref_payco . '^' . $x_transaction_id . '^' . $x_amount . '^' . $x_currency_code);

        $numOrder   = '2531'; // Este valor es un ejemplo se debe reemplazar con el número de orden que tiene registrado en su sistema
        $valueOrder = '10000'; // Este valor es un ejemplo se debe reemplazar con el valor esperado de acuerdo al número de orden del sistema del comercio

        $x_response     = $request->input('x_response');
        $x_motivo       = $request->input('x_response_reason_text');
        $x_id_invoice   = $request->input('x_id_invoice');
        $x_autorizacion = $request->input('x_approval_code');

        if ($x_id_invoice === $numOrder && $x_amount === $valueOrder) {
            if ($x_signature == $signature) {
                $x_cod_response = $request->input('x_cod_response');
                switch ((int) $x_cod_response) {
                    case 1:
                        // transacción aceptada
                        break;
                    case 2:
                        // transacción rechazada
                        break;
                    case 3:
                        // transacción pendiente
                        break;
                    case 4:
                        // transacción fallida
                        break;
                }
            } else {
                return response()->json(['error' => 'Firma no válida'], 400);
            }
        } else {
            return response()->json(['error' => 'Número de orden o valor pagado no coinciden'], 400);
        }

        return response()->json(['message' => 'Procesamiento exitoso'], 200);
    }

    public function savePedido(Request $request)
    {
        $user_id = auth()->user()->id;

        $pepido = PedidoPileo::create([
            'users_id' => $user_id,
            'plan_id' => $request->producto_id,
            'pagar' => $request->pagar,
            'name' => $request->name,
            'region' => $request->region,
            'size' => $request->size,
            'image' => $request->image,
            'ssh_keys' => json_encode($request->ssh_keys),
            'vpc_uuid' => $request->vpc_uuid
        ]);

        return response()->json($pepido, 201);
    }

    public function getOrden($id)
    {
        $pepido = PedidoPileo::find($id);

        // $data = $this->save($pepido);

        $pepido->plan = Plan::find($pepido->plan_id);

        return response()->json([
            'pedido' => $pepido,
            // 'data' => $data,
        ], 200);
    }

    public function getPlanes()
    {
        $user_id = auth()->user()->id;
        $planes = PedidoPileo::where('users_id', $user_id)->get();
        return response()->json($planes, 200);
    }

    public function getPileo($id)
    {
        $pileo = Pileo::find($id);
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->get('https://api.digitalocean.com/v2/droplets/' . $pileo->pileo_id);

        $info = $response->json();

        return response()->json($info, 200);
    }

    public function actionPileo($id)
    {
        $action = Pileo::select('id', 'action')->where('pileo_id', $id)->first();
        return response()->json($action, 200);
    }

    public function action(Request $request, $id)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->post('https://api.digitalocean.com/v2/droplets/' . $id . '/actions', [
            'type' => $request->action
        ]);

        $action = $response->json();

        $pileo = Pileo::where('pileo_id', $id)->first();
        $pileo->action = $request->action;
        $pileo->save();

        return response()->json($action, 200);
    }

    public function infoBackup($id)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->get('https://api.digitalocean.com/v2/droplets/' . $id . '/backups');

        $info = $response->json();

        return response()->json($info, 200);
    }

    public function getHistorial($id)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->get('https://api.digitalocean.com/v2/droplets/' . $id . '/actions');

        $info = $response->json();

        return response()->json($info, 200);
    }

    public function reservarIp(Request $request)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->post('https://api.digitalocean.com/v2/reserved_ips', [
            'droplet_id' => intval($request->droplet_id)
        ]);

        $ip = $response->json();

        return response()->json($ip, 200);
    }

    public function deleteIp($ip)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->delete('https://api.digitalocean.com/v2/reserved_ips/' . $ip);

        $delet = $response->json();
        return response()->json($delet, 200);
    }

    public function getCPU($id)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $date = new DateTime();
        $timestamp = $date->getTimestamp();
        $unaHoraMenos = $timestamp - 3600;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->get('https://api.digitalocean.com/v2/monitoring/metrics/droplet/cpu?host_id=' . $id . '&start=' . $unaHoraMenos . '&end=' . $timestamp);

        $data = $response->json();

        $timestamps = array_map(function ($value) {
            $date = new DateTime("@{$value[0]}");
            $date->setTimezone(new DateTimeZone("UTC"));
            return $date->format('H:i');
        }, $data['data']['result'][0]['values']);

        $values = array_map(function ($value) {
            return $value[1];
        }, $data['data']['result'][0]['values']);

        $mapGrafic = array_map(function ($result) {
            $data = [
                'name' => $result['metric']['mode'],
                'type' => 'line',
                'stack' => 'Total',
                'data' => array_map(function ($value) {
                    return $value[1];
                }, $result['values'])
            ];

            return $data;
        }, $data['data']['result']);

        return response()->json([
            'timestamps' => $timestamps,
            'mapGrafic' => $mapGrafic
        ], 200);
    }

    public function getBandwidth($id)
    {
        $publicInbound = $this->getGraf($id, "public", "inbound");
        $publicOutbound = $this->getGraf($id, "public", "outbound");
        $privateInbound = $this->getGraf($id, "private", "inbound");
        $privateOnbound = $this->getGraf($id, "private", "outbound");

        $dataResult = [];

        $timestamps = array_map(function ($value) {
            $date = new DateTime("@{$value[0]}");
            $date->setTimezone(new DateTimeZone("UTC"));
            return $date->format('H:i');
        }, $publicInbound[0]['values']);

        foreach ($publicInbound as $pubIn) {
            $data = [
                'name' => $pubIn['metric']['direction'] . " " . $pubIn['metric']['interface'],
                'type' => 'line',
                'stack' => 'Total',
                'data' => array_map(function ($value) {
                    return $value[1];
                }, $pubIn['values'])
            ];
            $dataResult[] = $data;
        }

        foreach ($publicOutbound as $pubOn) {
            $data = [
                'name' => $pubOn['metric']['direction'] . " " . $pubOn['metric']['interface'],
                'type' => 'line',
                'stack' => 'Total',
                'data' => array_map(function ($value) {
                    return $value[1];
                }, $pubOn['values'])
            ];
            $dataResult[] = $data;
        }

        foreach ($privateInbound as $pri) {
            $data = [
                'name' => $pri['metric']['direction'] . " " . $pri['metric']['interface'],
                'type' => 'line',
                'stack' => 'Total',
                'data' => array_map(function ($value) {
                    return $value[1];
                }, $pri['values'])
            ];
            $dataResult[] = $data;
        }

        foreach ($privateOnbound as $priOn) {
            $data = [
                'name' => $priOn['metric']['direction'] . " " . $priOn['metric']['interface'],
                'type' => 'line',
                'stack' => 'Total',
                'data' => array_map(function ($value) {
                    return $value[1];
                }, $priOn['values'])
            ];
            $dataResult[] = $data;
        }

        return response()->json([
            'timestamps' => $timestamps,
            'dataResult' => $dataResult
        ], 200);
    }

    public function getGraf($id, $interfac, $direction)
    {
        $keyAutentication = env('KEY_AUTENTICATION');
        $date = new DateTime();
        $timestamp = $date->getTimestamp();
        $unaHoraMenos = $timestamp - 3600;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->get('https://api.digitalocean.com/v2/monitoring/metrics/droplet/bandwidth?host_id=' . $id . '&interface=' . $interfac . '&direction=' . $direction . '&start=' . $unaHoraMenos . '&end=' . $timestamp);

        $data = $response->json();
        return $data['data']['result'];
    }

    public function getGraficMemory($id)
    {
        $keyAutentication = env('KEY_AUTENTICATION');

        $date = new DateTime();
        $timestamp = $date->getTimestamp();
        $unaHoraMenos = $timestamp - 3600;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $keyAutentication,
        ])->get('https://api.digitalocean.com/v2/monitoring/metrics/droplet/memory_free?host_id=' . $id . '&start=' . $unaHoraMenos . '&end=' . $timestamp);

        $data = $response->json();

        // return $data['data'];

        $timestamps = array_map(function ($value) {
            $date = new DateTime("@{$value[0]}");
            $date->setTimezone(new DateTimeZone("UTC"));
            return $date->format('H:i');
        }, $data['data']['result'][0]['values']);

        $dataResult = [];

        foreach ($data['data']['result'] as $pubIn) {
            $chart = array_map(function ($value) {
                $memoriaActual = $value[1];
                $memoriaTotal = 65000000;
                $porcentajeUsoMemoria = ($memoriaActual / $memoriaTotal) * 100;
                return round($porcentajeUsoMemoria, 1);
            }, $pubIn['values']);

            $data = [
                'name' => 'memoria',
                'type' => 'line',
                'stack' => 'Total',
                'data' => $chart,
            ];

            $dataResult[] = $data;
        }

        return response()->json([
            'timestamps' => $timestamps,
            'dataResult' => $dataResult
        ], 200);
    }
}
