<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\DatacenterController;
use App\Http\Controllers\FirewallController;
use App\Http\Controllers\IsoController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PileoController;
use App\Http\Controllers\PlanesController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\SshController;
use App\Http\Controllers\VpcController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/singnup', [AuthController::class, 'singnup']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/users',            UserController::class);
    Route::get('/user-info',                [UserController::class, 'getClient']);

    Route::get('/configuracion',            [ConfigController::class, 'show']);
    Route::post('/configuracion',           [ConfigController::class, 'save']);
    Route::put('/configuracion/{id}',       [ConfigController::class, 'update']);
    Route::delete('/configuracion/{id}',    [ConfigController::class, 'destroy']);

    Route::get('/proveedor',                [ProveedorController::class, 'show']);
    Route::post('/proveedor',               [ProveedorController::class, 'save']);
    Route::put('/proveedor/{id}',           [ProveedorController::class, 'update']);
    Route::delete('/proveedor/{id}',        [ProveedorController::class, 'destroy']);

    Route::get('/location',                 [LocationController::class, 'show']);
    Route::post('/location',                [LocationController::class, 'save']);
    Route::put('/location/{id}',            [LocationController::class, 'update']);
    Route::delete('/location/{id}',         [LocationController::class, 'destroy']);

    Route::get('/datacenter',               [DatacenterController::class, 'show']);
    Route::post('/datacenter',              [DatacenterController::class, 'save']);
    Route::post('/datacenter-update',       [DatacenterController::class, 'update']);
    Route::delete('/datacenter/{id}',       [DatacenterController::class, 'destroy']);

    Route::get('/isos',                     [IsoController::class, 'show']);
    Route::post('/isos',                    [IsoController::class, 'save']);
    Route::post('/isos-update',             [IsoController::class, 'update']);
    Route::delete('/isos/{id}',             [IsoController::class, 'destroy']);

    Route::get('/plan',                     [PlanesController::class, 'all']);
    Route::get('/plan/{id}',                [PlanesController::class, 'show']);
    Route::post('/plan',                    [PlanesController::class, 'save']);
    Route::put('/plan/{id}',                [PlanesController::class, 'update']);
    Route::delete('/plan/{id}',             [PlanesController::class, 'destroy']);

    Route::get('/vpcs',                     [VpcController::class, 'all']);
    Route::get('/vpcs/{reg}',               [VpcController::class, 'show']);
    Route::post('/vpcs',                    [VpcController::class, 'save']);
    Route::put('/vpcs/{id}',                [VpcController::class, 'update']);
    Route::delete('/vpcs/{id}',             [VpcController::class, 'destroy']);

    Route::get('/sshes',                    [SshController::class, 'all']);
    Route::post('/sshes',                   [SshController::class, 'save']);

    Route::get('/pileo',                    [PileoController::class, 'all']);
    Route::post('/pileo',                   [PileoController::class, 'save']);
    Route::post('/crear-pepido-pileo',      [PileoController::class, 'savePedido']);
    Route::get('/get-info-orden/{id}',      [PileoController::class, 'getOrden']);
    Route::post('/epayco',                  [PileoController::class, 'processPayment']);
    Route::get('/get-planes',               [PileoController::class, 'getPlanes']);
    Route::get('/info-pileo/{id}',          [PileoController::class, 'getPileo']);
    Route::get('/action-pileo/{id}',        [PileoController::class, 'actionPileo']);
    Route::post('/apagar-pileo/{id}',       [PileoController::class, 'action']);
    Route::get('/info-backup/{id}',         [PileoController::class, 'infoBackup']);
    Route::get('/get-historial/{id}',       [PileoController::class, 'getHistorial']);

    Route::post('/reservar-ip',             [PileoController::class, 'reservarIp']);
    Route::delete('/reservar-ip/{ip}',      [PileoController::class, 'deleteIp']);

    Route::get('/get-cpu/{ip}',             [PileoController::class, 'getCPU']);
    Route::get('/get-bandwidth/{ip}',       [PileoController::class, 'getBandwidth']);
    Route::get('/get-memory/{ip}',          [PileoController::class, 'getGraficMemory']);

    Route::get('/firewall',                 [FirewallController::class, 'all']);
    Route::get('/firewall/{id}',            [FirewallController::class, 'show']);
    Route::post('/firewall',                [FirewallController::class, 'save']);
    Route::delete('/firewall/{id}',         [FirewallController::class, 'destroy']);
});
