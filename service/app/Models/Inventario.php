<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    use HasFactory;
    protected $table = 'inventario';
    protected $fillable = [
        'id_componente',
        'cantidad',
        'updated_at',
        'created_at'
    ];

    public function componente()
    {
        return $this->belongsTo(Componente::class, 'id');
    }
}
