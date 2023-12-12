<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class AwsController extends Controller
{

    /**
     * @author Alejandro Garcia 
     */
    public function subirImagen(Request $request){
        $messages = [
            'max' => 'El campo se excede del tamano maximo'
        ];

        $validator = Validator::make($request->all(), [
            'imagen' => 'required|image|max:2048',
        ],$messages);

        if($validator->fails()){
            return response()->json($validator->errors(),202);
        }

        if($request->hasFile('imagen')){
            $file = $request->file('imagen');
            
            $path = $file->storeAs('perfiles',$file->getClientOriginalName(),'s3');

            $url = Storage::disk('s3')->url($path);
            return response()->json(['path' => $path, 'url' => $url],200); 
        }
        return response()->json(['error' => 'No se recibio ningun archivo.'], 400); 
    }

    /**
     * @author Alejandro Garcia 
     */
    public function subirImagenJoya(Request $request){
        $messages = [
            'max' => 'El campo se excede del tamano maximo'
        ];

        $validator = Validator::make($request->all(), [
            'imagen' => 'required|image|max:2048',
        ],$messages);

        if($validator->fails()){
            return response()->json($validator->errors(),202);
        }

        if($request->hasFile('imagen')){
            $file = $request->file('imagen');
            
            $path = $file->storeAs('joyas',$file->getClientOriginalName(),'s3');

            $url = Storage::disk('s3')->url($path);
            return response()->json(['path' => $path, 'url' => $url],200); 
        }
        return response()->json(['error' => 'No se recibio ningun archivo.'], 400); 
    }
}
