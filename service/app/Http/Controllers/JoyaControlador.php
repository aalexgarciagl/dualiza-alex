<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Joya;
use App\Models\Joya_componente;
use App\Models\Componente;



class JoyaControlador extends Controller
{
    /**
     * @author Javier Morales
     */
    public function crearDiseno(Request $request, $id)
    {
        $nombreJoya = $request['joya']['nombre'];
        $fotoJoya = $request['joya']['foto'];
        $joya = Joya::create(['id_usuario' => $id,'nombre' => $nombreJoya, 'foto' => $fotoJoya]);
        $recetas = [];
        $componentesNoInsertados = [];
        foreach ($request['joya']['componentes'] as $componente) {
            $idComponente = ComponenteControlador::getIdComponente($componente['nombre']);
            if (is_null($idComponente)) {
                $c = $componente;
                array_push($componentesNoInsertados, $c);
            } else {
                $cantidad = $componente['cantidad'];
                $receta = Joya_componente::create(['id_componente' => $idComponente, 'id_joya' => $joya->id, 'cantidad' => $cantidad]);
                array_push($recetas, $receta);
            }
        }
        return response()->json(['success' => true, 'recetas' => $recetas, 'Componentes no insertados' => $componentesNoInsertados], 200);
    }

    /**
     * @author Javier Morales
     */
    public function show()
    {
        $joyas = Joya::all();

        $retornar = [];
        foreach ($joyas as $joya) {
            $joyaNombre = $joya->nombre;
            $joyaFoto = $joya->foto;
            $devolver = ['Joya' => $joyaNombre, 'Foto' => $joyaFoto, 'Componentes'=> []];

            $recetas = Joya_componente::where('id_joya', $joya->id)->get();
            foreach ($recetas as $receta) {
                $nombreComponente = ComponenteControlador::getNombreComponente($receta->id_componente);
                $cantidad = $receta->cantidad;
                $componentes = ['nombre' => $nombreComponente, 'cantidad' => $cantidad];
                array_push($devolver['Componentes'], $componentes);
            }

            array_push($retornar, $devolver);
        }
        return response()->json(['joyas' => $retornar], 200);
    }

    /**
     * @author  Javier Morales y Alejandro Garcia
     */
    public function recetaAleatoria(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'joya' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        //Nombre de la joya en la que se quiere inspirar
        $nombreJoyaBuscar = $request->joya;
        //encuentra una joya llamada pulsera
        $joya = Joya::where('nombre', 'like', '%' . $nombreJoyaBuscar . '%')->first();

        if (is_null($joya)) {
            return response()->json(['success' => false, 'message' => 'No hay ninguna joya en la que inspirarse']);
        }
        //devuelve todos los componentes que tiene una joya
        $componentes = $joya->componentes;

        $n1 = rand(0, count($componentes) - 1);
        $n2 = rand(0, count($componentes) - 1);
        while ($n1 === $n2) {
            $n2 = rand(0, count($componentes) - 1);
        }

        $componentesCompartidos = [$componentes[$n1]['id'], $componentes[$n2]['id']];

        $componentesAdmitidos = Componente::all();
        $idsComponentesAdmitidos = [];
        foreach ($componentesAdmitidos as $componente) {
            if (!in_array($componente->id, $componentesCompartidos)) {
                array_push($idsComponentesAdmitidos, $componente->id);
            }
        }

        $random1 = $idsComponentesAdmitidos[array_rand($idsComponentesAdmitidos)];
        $random2 = $idsComponentesAdmitidos[array_rand($idsComponentesAdmitidos)];
        while ($random1 === $random2) {
            $random2 = $idsComponentesAdmitidos[array_rand($idsComponentesAdmitidos)];
        }
        array_push($componentesCompartidos, $random1, $random2);

        //Array con los componentes que hay que crear
        $arrayComponentesNuevo = [];
        foreach ($componentesCompartidos as $id) {
            $componenteNuevaReceta = Componente::find($id);
            array_push($arrayComponentesNuevo, $componenteNuevaReceta);
        }

        $arrayColetillaJoya = [' de chewbacca', ' de Frodo Bolsón', ' de Gandalf el Gris', ' de Aragorn', ' de Legolas', ' de Gimli', ' de Samwise Gamgee', ' de Boromir', ' de Meriadoc Brandigamo', ' de Peregrin Tuk', ' de Anakin Skywalker', ' de Luke Skywalker', ' de Leia Organa', ' de Han Solo', ' de Obi-Wan Kenobi', ' de Yoda'];
        $nombreJoyaFinal = $request->joya . $arrayColetillaJoya[rand(0, count($arrayColetillaJoya) - 1)];

        $joyaPropuesta = ([
            'nombre' => $nombreJoyaFinal,
            'componentes' => []
        ]);

        foreach ($arrayComponentesNuevo as $componente) {
            $c = ([
                'nombre' => $componente->nombre,
                'cantidad' => rand(1,5)
            ]);
            array_push($joyaPropuesta['componentes'],$c);
        }
        return response()->json(['success' => true, 'joya' => $joyaPropuesta]);
    }
    /**
     * @author Alejandro Garcia 
     */
    public function uptadeFoto(Request $request, $id){
        $joya = Joya::find($id);
        if($joya == null){ 
            return response()->json(['success' => false, 'mes' => 'Joya no encontrada'], 404); 
        }
        $joya->foto = $request->foto;
        $joya->save(); 
        return response()->json(['success' => true, 'data' => $joya], 200); 

    }
}
