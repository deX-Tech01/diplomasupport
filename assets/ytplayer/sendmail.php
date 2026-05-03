<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1️⃣ Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // 2️⃣ Where to send the email
    $to = "lawsan5gsecretariat@gmail.com"; //myEmail
    $subject = "New Message from School Website";

    // 3️⃣ Email body content
    $body = "You have received a new message from your website contact form.\n\n"
          . "Name: $name\n"
          . "Email: $email\n"
          . "Phone: $phone\n\n"
          . "Message:\n$message\n";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    // 4️⃣ Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "<h2>Thank you, $name. Your message has been sent successfully!</h2>";
    } else {
        echo "<h2>Sorry, there was a problem sending your message. Please try again later.</h2>";
    }
}
?>
