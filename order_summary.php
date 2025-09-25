<?php
$order_id = isset($_GET['order_id']) ? $_GET['order_id'] : null;

if (!$order_id) {
    echo "Order ID is required.";
    exit;
}

$nestjs_api_url = "http://localhost:6001/orders/{$order_id}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $nestjs_api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
    echo "Failed to fetch order details.";
    exit;
}


$order = json_decode($response, true);


if (!$order || $order['status'] !== 'success') {
    echo "Order not found.";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Summary</title>
</head>
<body>
    <h1>Order Summary</h1>
    <p><strong>Order ID:</strong> <?php echo htmlspecialchars($order['data']['id']); ?></p>
    <p><strong>User ID:</strong> <?php echo htmlspecialchars($order['data']['user']['id']); ?></p>
    <p><strong>Amount:</strong> $<?php echo htmlspecialchars($order['data']['amount']); ?></p>
</body>
</html>
