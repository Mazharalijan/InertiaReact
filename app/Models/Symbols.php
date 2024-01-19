<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Symbols extends Model
{
    use HasFactory;
    protected $table="party_symbol";
    protected $primaryKey ="PartySymbolID";

    public function party(){
        return $this->hasOne(Parties::class, 'partyID', 'fk_party_id');
    }
}
