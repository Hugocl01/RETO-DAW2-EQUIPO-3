<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Termwind\Components\Raw;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();

        if (empty($usuarios)) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se ha encontrado usuarios.'
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'usuarios' => $usuarios->map(function ($usuario) {
                return [
                    'id' => $usuario->id,
                    'nombre_completo' => $usuario->nombre_completo,
                    'email' => $usuario->email,
                    'perfil_id' => $usuario->perfil_id,
                    'activo' => $usuario->activo,
                ];
            }),
        ]);
    }

    public function edit(Request $request, Usuario $u)
    {
        $u->nombre_completo = $request->input('nombre_completo');
        $u->email = $request->input('email');
        $u->perfil_id = $request->input('perfil_id');
        $u->activo = $request->input('activo');

        $u->save();
        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'usuario'    => $u
        ], 200);
    }


    public function store()
    {

    }


    public function desactivate() {}
}
