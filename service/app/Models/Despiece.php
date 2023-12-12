<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despiece extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_lote',
        'id_componente',
        'cantidad',
        'descripcion'
    ];
}
