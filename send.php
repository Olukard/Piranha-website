<?php

$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];

// echo "Ваше имя ${userName}";

// Load Composer's autoloader
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';
require 'phpMailer/Exception.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'ssl://smtp.yandex.ru';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'developer@artemsweb.ru';                     // SMTP username
    $mail->Password   = 'ejrnzxkkryamblnc';                               // SMTP password
    $mail->SMTPSecure = 'SSL';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to (587)
    $mail->CharSet    = "utf-8";

    //Recipients
    $mail->setFrom('developer@artemsweb.ru');
    $mail->addAddress('ScPiranha@yandex.ru');     // Add a recipient (SwimClubPiranha@gmail.com)

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта Piranha';
    $mail->Body    = "Имя клиента: ${userName} <br>Его телефон: ${userPhone} <br>И почта: ${userEmail}.";

    if ($mail->send()) {
        echo "ok";
        // header('location: thanks.html');
    } else {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
    
} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}