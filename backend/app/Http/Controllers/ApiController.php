<?php

namespace App\Http\Controllers;

/**
 * @OA\OpenApi(
 *     @OA\Info(
 *         version="1.0.0",
 *         title="API de Torneo",
 *         description="Documentación de la API del Torneo",
 *         @OA\Contact(
 *             email="soporte@tuapi.com"
 *         )
 *     ),
 *     @OA\Server(
 *         url="http://localhost:8000/",
 *         description="Servidor de Desarrollo"
 *     ),
 *     @OA\Server(
 *         url="http://www.golesqueayudan.com",
 *         description="Servidor de Producción"
 *     ),
 *     @OA\Components(
 *         @OA\SecurityScheme(
 *             securityScheme="BearerAuth",
 *             type="http",
 *             scheme="bearer",
 *             bearerFormat="JWT",
 *             description="Utiliza un token JWT para autenticarte"
 *         )
 *     )
 * )
 */
class ApiController extends Controller
{
    // Este controlador solo define la documentación de Swagger.
}
