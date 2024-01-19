<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\User;

class OperatorController extends Controller
{
    public function index(){
        $user = User::where('role','Operator')->get();
            $data = compact('user');
            return Inertia::render('Operator/List',$data);

    }
    public function operatorList(){
        $user = User::where('role','Operator')->get();
        return response().json([
            'data' => $user,
            'status' => true

        ]);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'district' => 'required',
            'phone' => 'required'
        ]);
        if($validator->passes()){
            $data  = [
                'name' => $request->name,
                'email' => $request->email,
                'phoneNo' => $request->phone,
                'fk_district_id' => $request->district
            ];
            try{
                $user = User::create($data);
                if($user){

                    //return Inertia::location(route('operator.list'));
                    //return to_route('operator.list');
                    return response()->json([
                        'status' => true,
                        'message' => 'Record Inserted!'
                    ]);
                }else{
                    return response()->json([

                        'status' => false,
                        'message' => 'Record not inserted!'
                    ]);
                }

            }catch(\Exception $error){
                return response()->json([
                    'error' => $error,
                    'status' => false,
                    'message' => 'Some Internal Error'
                ]);
            }
        }else{
            return response()->json([
                'error' => $validator->errors(),
                'status' => false
            ]);

        }
    }

    public function update($id,Request $request){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json([
                'status' => false,
                'message' => 'No record found!'
            ]);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,id,'.$request->id,
            'district' => 'required',
            'phone' => 'required'
        ]);
        if($validator->passes()){
            $data  = [
                'name' => $request->name,
                'email' => $request->email,
                'phoneNo' => $request->phone,
                'fk_district_id' => $request->district
            ];
            try{
                $user = $user->update($data);
                if($user){
                    return response()->json([
                        'status' => true,
                        'message' => 'Record Updated!'
                    ]);
                }else{
                    return response()->json([

                        'status' => false,
                        'message' => 'Record not updated!'
                    ]);
                }

            }catch(\Exception $error){
                return response()->json([
                    'error' => $error,
                    'status' => false,
                    'message' => 'Some Internal Error'
                ]);
            }
        }else{
            return response()->json([
                'error' => $validator->errors(),
                'status' => false
            ]);

        }

    }

}
