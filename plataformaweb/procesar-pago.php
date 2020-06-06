<?php
    // SDK de Mercado Pago
    require __DIR__ .  '/vendor/autoload.php';

    // Agrega credenciales
    MercadoPago\SDK::setAccessToken('APP_USR-8999955948543756-100722-d0ee14b45eeaadf5ea1769d45c925475__LD_LB__-18880512');


    // Crea un objeto de preferencia
    $preference = new MercadoPago\Preference();

    // Crea un ítem en la preferencia
    $item = new MercadoPago\Item();
    $item->title = 'Mi producto';
    $item->quantity = 1;
    $item->unit_price = 75.56;
    $preference->items = array($item);
    $preference->save();


?>