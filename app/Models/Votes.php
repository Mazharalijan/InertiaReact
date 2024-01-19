<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Votes extends Model
{
    use HasFactory;
    protected $table= 'votes';
    protected $primaryKey = 'voteID';

    protected $fillable = [
        'votes',
        'fk_candidate_id',
        'fk_seat_id',
        'EUID',
        'UUID',
        'created_at',
    ];

    public function candidatesconst()
    {
        return $this->hasOne(CandidateConst::class, 'fk_candidate_id', 'fk_candidate_id');
    }
}
