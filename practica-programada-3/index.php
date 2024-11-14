<?php
$transacciones = [];

function registrarTransaccion($id, $descripcion, $monto)
{
  global $transacciones;
  // profe ahi vi que si uno va a agregar solo una funcion a la vez es mejor no usar array_push haha
  // https://www.php.net/manual/es/function.array-push.php
  // igual por puntitos hubiera sido asi jaja:
  // array_push($transacciones, [ 'id' => $id, 'descripcion' => $descripcion, 'monto' => $monto]);
  $transacciones[] = [
    'id' => $id,
    'descripcion' => $descripcion,
    'monto' => $monto
  ];
}

function generarEstadoDeCuenta()
{
  global $transacciones;
  $montoTotalContado = 0;
  foreach ($transacciones as $transaccion) {
    $montoTotalContado += $transaccion['monto'];
  }
  $ratioInteres = 1.026;
  $ratioCashback = 0.001;
  $montoConInteres = $montoTotalContado * $ratioInteres;
  $cashback = $montoTotalContado * $ratioCashback;
  $montoFinal = $montoConInteres - $cashback;

  $contenidoArchivo = "Estado de Cuenta:\n";
  $contenidoArchivo .= "-----------------------------------\n";
  foreach ($transacciones as $transaccion) {
    $contenidoArchivo .= "Id: {$transaccion['id']} - Descripcion: {$transaccion['descripcion']} - Monto: {$transaccion['monto']}\n";
  }
  $contenidoArchivo .= "-----------------------------------\n";
  $contenidoArchivo .= "Monto total contado: " . $montoTotalContado . "\n";
  $contenidoArchivo .= "Monto con Interés (2.6%): " . $montoConInteres . "\n";
  $contenidoArchivo .= "Cashback (0.1%): " . $cashback . "\n";
  $contenidoArchivo .= "Monto Final a Pagar: " . $montoFinal . "\n";

  echo $contenidoArchivo;

  file_put_contents("estado_cuenta.txt", $contenidoArchivo);
  echo "\nEstado de cuenta creado con exito.\n";
}

// ejemplo uso
registrarTransaccion(1, "Super", 50.75);
registrarTransaccion(2, "Internet", 120.00);
registrarTransaccion(3, "", 75.50);
registrarTransaccion(4, "Cena en restaurante", 45.30);

generarEstadoDeCuenta();
