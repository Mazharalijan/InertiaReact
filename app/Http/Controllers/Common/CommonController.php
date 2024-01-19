<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Districts;
use App\Models\Seattypes;

class CommonController extends Controller
{
    public function singleDistricts(){
        try{
            $districts = Districts::all();
            if(!is_null($districts)){
                return response()->json(
                    [
                        'status' => true,
                        'data' => $districts,
                        'message' => 'record found'

                    ]

                );
            }else{
                return response()->json([
                    'status' => false,
                    'data' => Null,
                    'message' => 'No record found'
                ]
                );
            }

        }catch(\Exception $error){
            return response()->json([
                'status' => false,
                'errors' => $error
            ]);
        }

    }
    public function getSeatType (){
        try{
            $seats = Seattypes::get();
            if(is_null($seats)){
                return response()->json([
                    'data' => $seats,
                    'status' => false,
                    'message' => 'No record found!'
                ]);
            }
            return response()->json([
                'data' => $seats,
                'status' => true,
                'message' => 'record found'
            ]);

        }catch(\Excetpion $error){
            return response()->json([
                'error' => $error,
                'status' => false,
                'message' => 'some internal error'
            ]);
        }
    }
}
