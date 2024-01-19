<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Votes;
use App\Models\CandidateConst;
use Inertia\Inertia;
use Carbon\Carbon;
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
        for($i = 0; $i < count($request->all()); $i++){
            $record = [
                'fk_candidate_id' => $request[$i]["candidate"],
                'fk_seat_id' => $request[$i]["seat"],
                'votes' => $request[$i]["votes"],
                'fk_candidate_id' => 36
            ];
                $data[] = $record;


        }

        $votes = Votes::create($data);
        return $votes;

   }
}

