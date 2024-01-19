<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Votes;
use App\Models\CandidateConst;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class VotesController extends Controller
{
   public function index(){
    $votes = Votes::with(['candidatesconst.Candidates','candidatesconst.Symbols.party','candidatesconst.Seats.Districts.Divisions'])
    ->has('candidatesconst.Seats')
    ->get();

    $data  = compact('votes');

    return Inertia::render('Votes/List')->with($data);
   }
   public function votescandidatelist(Request $request){
    $validator = Validator::make($request->all(), [
        'seatcode' => 'required',
    ]);
    if ($validator->fails()) {
        return response()->json([
            'error' => $validator->errors(),
            'status' => false,
        ]);
    }

    try {
        $candidate = CandidateConst::with(['Candidates','Symbols.party'])->where('fk_seat_id', $request->seatcode)->get();
        if (! is_null($candidate)) {
            //return redirect()->route('votes.test1');

            return response()->json([
                'data' => $candidate,
                'status' => true,
            ]);
        } else {
            return response()->json([
                'data' => null,
                'status' => true,
            ]);
        }

    } catch (\Exception $error) {
        return response()->json([
            'data' => null,
            'status' => false,
            'error' => $error,
        ]);
    }
   }
   public function store(Request $request){

        $data = [];
        //arrange request data in array
        foreach ($request->all() as $record) {
                $formattedRecord = [
                    'fk_candidate_id' => $record["candidate"],
                    'fk_seat_id' => $record["seat"],
                    'votes' => $record["votes"],
                    'EUID' => 36,
                    'created_at' => now(),
                ];

                $data[] = $formattedRecord;
        }
        // start try catch block
        try{

            DB::beginTransaction();
            // record insertion query
            $votes = Votes::insert($data);
            DB::commit();
                if($votes){
                    // if record inserted
                    return response()->json([
                        'status' => true,
                        'message' => 'record inserted'
                    ]);
                }else{
                    // if record not inserted
                    return response()->json([
                        'status' => false,
                        'message' => 'record not inserted'
                    ]);
                }
        }
        catch(\Exception $error){
        // some internal error occure
            DB::rollback();
            return response()->json([
                'error' => $error,
                'status' => false,
                'message'=> 'some internal error'
            ]);
        }
    }
}

