<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()    {        
        Rol::factory()->create(['id' => 1, 'nombre' => 'admin']);
        Rol::factory()->create(['id' => 2, 'nombre' => 'colaborador']);
        Rol::factory()->create(['id' => 3, 'nombre' => 'diseñador']);
        Rol::factory()->create(['id' => 4, 'nombre' => 'clasificador']);
    }
}
