// Description: Email template for the weekly information
export const weekly_info_template = (confirmedList: { full_name: string, is_ceremony: boolean, is_celebration: boolean, num_guests: number }[], songsList: { guest_name: string, song_name: string, url: string }[]) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación al Evento</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #4CAF50; /* Verde principal */
            font-size: 24px;
            margin: 0;
        }
        .header h2 {
            color: #333;
            font-size: 28px;
            margin: 10px 0 0;
        }
        .section {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Invita.la</h1>
            <h2>Resumen Semanal del Evento</h2>
        </div>
        <div class="section">
            <h2>Personas Confirmadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Asistencia</th>
                        <th>Número de Personas</th>
                    </tr>
                </thead>
                <tbody>
                    ${confirmedList.map(person => `
                    <tr>
                        <td>${person.full_name}</td>
                        <td>${person.is_ceremony && person.is_celebration ? 'Ceremonia y Fiesta' : person.is_ceremony ? 'Ceremonia' : 'Fiesta'}</td>
                        <td>${person.num_guests ?? 0}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="section">
            <h2>Canciones Recomendadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Invitado</th>
                        <th>Canción</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    ${songsList.map(song => `
                    <tr>
                        <td>${song.guest_name}</td>
                        <td>${song.song_name}</td>
                        <td><a href="${song.url}" target="_blank">${song.url}</a></td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="footer">
            <p>Gracias por ser parte de nuestra plataforma</p>
        </div>
    </div>
</body>
</html>
`;

// Description: Email template for the welcome email
export const welcome_template = (userName: string, systemUrl: string, whatsappNumber: string) => `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenida al Sistema de Invitaciones</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #F4F4F4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #4CAF50; /* Verde principal */
            font-size: 24px;
            margin: 0;
        }
        .header h2 {
            color: #333;
            font-size: 28px;
            margin: 10px 0 0;
        }
        .section {
            margin-bottom: 20px;
        }
        .section p {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bienvenido a Invita.la</h1>
            <h2>¡Estamos emocionados de tenerte aquí!</h2>
        </div>
        <div class="section">
            <p>¡Hola ${userName}!</p>
            <p>Estamos muy contentos de darte la bienvenida a nuestro sistema de invitaciones. Ahora puedes hacer realidad tus eventos y compartir momentos especiales con tus invitados.</p>
            <p>Para comenzar, accede a tu panel de control a través del siguiente enlace:</p>
            <a href="${systemUrl}" class="button">Acceder a la invitacion</a>
        </div>
        <div class="section">
            <h2>Próximos Pasos</h2>
            <p>El siguiente paso es finalizar el pago de tus invitaciones para que todo esté listo para tu evento. Si tienes alguna duda o necesitas asistencia, no dudes en contactar a nuestro equipo de soporte técnico.</p>
            <p><strong>Soporte Técnico:</strong> <a href="https://wa.me/${whatsappNumber}" target="_blank">Contactar por WhatsApp</a></p>
        </div>
        <div class="footer">
            <p>Gracias por confiar en nosotros. ¡Estamos aquí para ayudarte a hacer de tu evento un éxito!</p>
        </div>
    </div>
</body>
</html>
`