<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OperatorController;
use App\Http\Controllers\Admin\VotesController;
use App\Http\Controllers\Common\CommonController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/operator/list', [OperatorController::class, 'operatorList'])->name('operator.list');
Route::get('/seats/list', [CommonController::class, 'getSeatType'])->name('seats.list');
Route::post('/candidate-list', [VotesController::class, 'votescandidatelist'])->name('votes.list');
Route::post('/votes-store', [VotesController::class, 'store'])->name('votes.store');
Route::put('/votes-update/{id}', [VotesController::class, 'update'])->name('votes.update');
