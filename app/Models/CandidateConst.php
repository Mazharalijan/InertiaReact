<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Candidate;

class CandidateConst extends Model
{
    use HasFactory;
    protected $table= "candidate_const";
    protected $primaryKey = "CCID";

    public function Candidates()
    {
        return $this->hasOne(Candidate::class, 'candidateID', 'fk_candidate_id');
    }
    public function Symbols()
    {
        return $this->hasOne(Symbols::class, 'PartySymbolID', 'fk_symbol_id');
    }
    public function Seats()
    {
        return $this->hasOne(SeatTypes::class, 'seatID', 'fk_seat_id');
    }
}
