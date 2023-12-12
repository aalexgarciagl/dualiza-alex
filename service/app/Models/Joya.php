<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joya extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_usuario',
        'nombre',
        'foto'
    ];
    public function componentes()
    {
        return $this->belongsToMany(Componente::class, 'joya_componentes', 'id_joya', 'id_componente');
    }
}

