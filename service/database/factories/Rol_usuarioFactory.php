<?php

namespace Database\Factories;

use App\Models\Rol_usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rol_usuario>
 */
class Rol_usuarioFactory extends Factory
{
    protected $model = Rol_usuario::class; 
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_usuario' => $this->faker->numberBetween(1, 10),
            'id_rol' => $this->faker->numberBetween(1, 5),
        ];
    }
}
