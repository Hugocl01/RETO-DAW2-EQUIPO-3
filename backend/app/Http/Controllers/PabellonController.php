<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PabellonResource;
use App\Models\Pabellon;

class PabellonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'pabellones' => PabellonResource::collection(Pabellon::all())
        ]);
    }

    /**
     * Obtener todos las pabellones.
     *
     * @OA\Get(
     *     path="/api/lista/pabellones",
     *     summary="Obtener todos los pabellones, pero solo los valores necesarios para el front",
     *     tags={"Pabellones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de pabellones",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="pabellones",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Pabellon")
     *             )
     *         )
     *     )
     * )
     */
    public function getListaPabellones()
    {
        $pabellon = Pabellon::getLista();
        return response()->json($pabellon);
    }
}
