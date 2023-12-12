<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class pruebasAccesoTest extends TestCase
{

    public function test_registro()
    {
        $fak = \Faker\Factory::create('es_ES');

        $datos = [
            "name" => $fak->name,
            "email" => $fak->email,
            "password" => $fak->password,
            "foto" => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/perfiles/profile-icon.png',
            "dni_cif" => $fak->dni,
            "direccion" => "calle toledo"
        ];

        // Prueba de éxito
        $this->json('post', '/api/register', $datos)
            ->assertStatus(201)
            ->assertJson(["success" => true]);

        $datos = [
            "name" => $fak->name,
            "email" => $fak->email,
            "password" => $fak->password,
            "foto" => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/perfiles/profile-icon.png',
            "dni_cif" => $fak->dni,
            "direccion" => "calle toledo"
        ];
        // Prueba de falla
        $this->json('post', '/api/register', $datos)
            ->assertStatus(400);
    }

    public function test_login()
    {
        $datos = [
            "email" => "root@gmail.com",
            "password" => "1234",
        ];
        //caso de no autorizado 
        $this->json('post', '/api/login', $datos)
            ->assertStatus(204);
    }

    public function test_login_token()
    {
        $datos = [
            "email" => "sss@gmail.com",
            "password" => "1234",
            "rol" => "colaborador"
        ];
        $this->json("post", "/api/login/token", $datos)
            ->assertStatus(200)
            ->assertJson(["success" => true]);

        $datos2 = [
            "email" => "ssss@gmail.com",
            "password" => "1234",
            "rol" => "colaborador"
        ];
        $this->json("post", "/api/login/token", $datos2)
            ->assertStatus(404)
            ->assertJson(["success" => false]);
    }

    public function test_logout()
    {
        $datos = [
            "email" => "root@gmail.com"
        ];

        //caso exito
        $this->json("post", "/api/logout", $datos)
            ->assertStatus(200);

        //caso erroneo
        $datos2 = [
            "email" => "error@gmail.com"
        ];
        $this->json("post", "/api/logout", $datos2)
            ->assertStatus(404);
    }
}
