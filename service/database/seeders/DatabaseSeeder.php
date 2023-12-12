<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RolSeeder::class,
            RolUsuarioSeeder::class,
            ComponenteSeeder::class,
            EstadoEntregaSeeder::class,
            LoteSeeder::class,
            DespieceSeeder::class,
            InventarioSeeder::class,
            JoyaSeeder::class,
            JoyaComponenteSeeder::class,
        ]);
    }
}
