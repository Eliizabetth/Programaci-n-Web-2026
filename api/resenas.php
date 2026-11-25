<?php
require __DIR__ . '/helpers.php';

$archivo = __DIR__ . '/data/resenas.json';

if (!file_exists($archivo)) {
    $iniciales = require __DIR__ . '/data/resenas-iniciales.php';
    file_put_contents(
        $archivo,
        json_encode($iniciales, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );
}

$resenas = json_decode(file_get_contents($archivo), true);
if (!is_array($resenas)) {
    $resenas = require __DIR__ . '/data/resenas-iniciales.php';
}

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    if (isset($_GET['id'])) {
        $id = (string) $_GET['id'];
        foreach ($resenas as $r) {
            if ((string) $r['id'] === $id) {
                responder($r);
            }
        }
        responder(['error' => 'Reseña no encontrada'], 404);
    }

    responder($resenas);
}

if ($metodo === 'POST') {
    $entrada = json_decode(file_get_contents('php://input'), true) ?? [];

    $cliente = trim($entrada['cliente'] ?? '');
    $platillo = trim($entrada['platillo'] ?? '');
    $calificacion = (int) ($entrada['calificacion'] ?? 0);
    $comentario = trim($entrada['comentario'] ?? '');

    if (
        strlen($cliente) < 2 ||
        $platillo === '' ||
        strlen($comentario) < 4 ||
        $calificacion < 1 ||
        $calificacion > 5
    ) {
        responder(['error' => 'Datos incompletos o inválidos'], 422);
    }

    $nueva = [
        'id' => uniqid(),
        'cliente' => $cliente,
        'platillo' => $platillo,
        'calificacion' => $calificacion,
        'comentario' => $comentario,
    ];

    $resenas[] = $nueva;

    file_put_contents(
        $archivo,
        json_encode($resenas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );

    responder($nueva, 201);
}

responder(['error' => 'Método no permitido'], 405);