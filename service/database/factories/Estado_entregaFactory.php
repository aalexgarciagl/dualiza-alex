<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estado_entrega>
 */
class Estado_entregaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $nombres = ['enviado', 'entregado', 'clasificado', 'cancelado'];

        return [
            'nombre' => $this->faker->unique()->randomElement($nombres),
        ];
    }
}
