<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CorreoControlador extends Controller
{

    /**
     * @author Alejandro Garcia 
     */
    // public function enviarNuevaPassword(Request $request)
    // {
    //     $contrasena = '1234';
    //     $email = $request->email;  
    //     $cadena = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234';       
        
        
    //     // for ($i=0; $i < 5; $i++) { 
    //     //     $contrasena .= $cadena[rand(0,strlen($cadena)-1)];
    //     // }

    //     $nuevaContrasena64 = base64_encode('123456');       
        
    //     try {  
    //         $nuevaContrasena64sha1 = sha1($nuevaContrasena64);          
    //         //User::where('email', $email)->update(['password' => $nuevaContrasena64sha1]);

            
    //         $messageContent = 'Tu contraseña ha sido restablecida. '.$contrasena.' Por razones de seguridad, te recomendamos cambiarla después de iniciar sesión.';
    //         Mail::raw($messageContent, function ($message) use ($email) {
    //             $message->to($email)->subject('Contraseña restablecida - Dualiza');
    //             $message->from('dualiza96@gmail.com', 'Dualiza');
    //         });

    //         return response()->json(['success' => true, 'message' => 'Se ha enviado una nueva contraseña correctamente','pas' => $nuevaContrasena64sha1], 200);
    //     } catch (\Exception $e) {
            
    //         return response()->json(['success' => false, 'message' => 'Error al restablecer la contraseña'], 500);
    //     }
    // }
}
