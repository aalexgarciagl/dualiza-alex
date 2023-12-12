<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Componente>
 */
class ComponenteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $componentes = [
            'RAM', 'Placa base', 'Disco duro', 'Enganche pendiente',
            'Osito de goma', 'Tecla', 'Procesador', 'Correa',
            'Monitor', 'Ratón', 'Cadena', 'Cierre para pulsera',
            'Piedra preciosa', 'Cuenta de cristal', 'Broche',
            'Colgante', 'Aro metálico', 'Gema brillante',
            'Perla', 'Alambre de joyería', 'Conector',
            'Cadena de plata', 'Cadena de oro', 'Cuentas de madera',
            'Cuentas de metal', 'Pendiente base', 'Anillo base',
            'Cierre para collar', 'Charm', 'Cordón de cuero',
        ];
        return [
            'nombre' => $this->faker->unique()->randomElement($componentes),
            'hardware' => $this->faker->randomElement([true,false]) 
        ];
    }
}
