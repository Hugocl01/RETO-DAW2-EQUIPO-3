<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donacion extends Model
{
    use HasFactory, Auditable;
    protected $table = 'donaciones';
    protected $fillable = [
        'ong_id',
        'kilos',
        'importe',
    ];

    public function ong()
    {
        return $this->belongsTo(Ong::class);
    }
}
