<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joya_componente extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_joya',
        'id_componente',
        'cantidad'
    ];
}
