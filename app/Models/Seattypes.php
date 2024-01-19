<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seattypes extends Model
{
    use HasFactory;
    protected $table = "seat_types";
    protected $primaryKey = 'seatID';

    public function Districts(){
        return $this->hasOne(Districts::class, 'distID', 'fk_district_id');
    }
}
