<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'foto' => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/perfiles/profile-icon.png',
            //'password' => 123456,
            'password' => sha1('MTIzNDU2'), 
            'dni_cif' => $this->faker->unique()->regexify('[0-9]{8}[A-Z]{1}'),
            'direccion' => $this->faker->address,
        ];
    }
}
