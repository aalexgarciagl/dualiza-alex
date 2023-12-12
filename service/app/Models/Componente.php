<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Componente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'hardware'
    ];
    public function inventario()
    {
        return $this->hasMany(Inventario::class, 'id_componente');
    }

    public function joyas()
    {
        return $this->belongsToMany(Joya::class, 'joya_componentes', 'id_componente', 'id_joya');
    }
}
