<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $foto = 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/perfiles/profile-icon.png';
        User::create([
            'nombre' => 'root',
            'email' => 'root@gmail.com',
            'foto' => $foto,
            //'password' => rooter,  
            'password' => sha1('cm9vdGVy'),
            'dni_cif' => 'root',
            'direccion' => 'root',
        ]);
        User::create([
            'nombre' => 'colaborador',
            'email' => 'colaborador@gmail.com',
            'foto' => $foto,
            //'password' => 123456,  
            'password' => sha1('MTIzNDU2'),
            'dni_cif' => 'colaborador',
            'direccion' => 'colaborador',
        ]);
        User::create([
            'nombre' => 'administrador',
            'email' => 'administrador@gmail.com',
            'foto' => $foto,
            //'password' => 123456,  
            'password' => sha1('MTIzNDU2'),
            'dni_cif' => 'administrador',
            'direccion' => 'administrador',
        ]);
        User::create([
            'nombre' => 'clasificador',
            'email' => 'clasificador@gmail.com',
            'foto' => $foto,
            //'password' => 123456,  
            'password' => sha1('MTIzNDU2'),
            'dni_cif' => 'clasificador',
            'direccion' => 'clasificador',
        ]);
        User::create([
            'nombre' => 'diseñador',
            'email' => 'diseñador@gmail.com',
            'foto' => $foto,
            //'password' => 123456,  
            'password' => sha1('MTIzNDU2'),
            'dni_cif' => 'diseñador',
            'direccion' => 'diseñador',
        ]);
    }
}
