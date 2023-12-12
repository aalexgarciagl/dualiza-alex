<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    use HasFactory;
    protected $table = 'colaboradores';

    protected $fillable = [
        'id_usuario',
        'cif',
        'direccion'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id_usuario', 'id');
    }
}
