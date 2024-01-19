<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Districts extends Model
{
    use HasFactory;
    protected $table = "districts";
    protected $primaryKey = "distID";

    public function Divisions(){
        return $this->hasOne(Divisions::class, 'divID', 'fk_division_id');
    }
}
