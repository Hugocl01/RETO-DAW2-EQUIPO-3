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

    public function getListaPabellones()
    {
        $pabellon = Pabellon::getLista();
        return response()->json($pabellon);
    }
}
