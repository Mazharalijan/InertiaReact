<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OperatorController;
use App\Http\Controllers\Admin\VotesController;
use App\Http\Controllers\Common\CommonController;

use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::get('/votes', [VotesController::class, 'index'])->name('votes.list');
Route::get('/operator', [OperatorController::class, 'index'])->name('operator.list');
Route::put('/operator/{id}', [OperatorController::class, 'update'])->name('operator.update');
Route::post('/operator',[OperatorController::class , 'store'])->name('operator.stroe')->middleware(['HandleInertiaRequests']);
Route::get('/single-districts',[CommonController::class,'singleDistricts'])->name('common.district');

