# Metaverso Microservicio de Monedas

Este microservicio fue creado para gestionar la aparición y desaparición de coleccionables en forma de monedas en el metaverso. Cada moneda tiene una posición única en el espacio 3D y puede ser recogida por un usuario para obtener su recompensa. Una vez que una moneda es recogida, desaparece y ya no está disponible para otros usuarios.

## Desafío

Crear un microservicio que permita a los clientes conectarse a través de sockets (Socket.io). Una vez conectado, el cliente debe indicar al microservicio en qué espacio del metaverso está (sala) y el microservicio le devolverá todas las monedas de esa sala junto con su posición (x, y, z).

El cliente puede enviar una señal al microservicio indicando que ha recogido una moneda, y el microservicio debe eliminarla de las monedas disponibles. Además, el microservicio debe enviar una señal a todos los clientes para informarles qué monedas ya no están disponibles (cuando alguien más las recoge).

Se debe montar una API REST para consultar información básica y avanzada, como la cantidad de monedas disponibles en una sala.

La configuración del microservicio se realiza mediante un archivo JSON que especifica las salas, la cantidad de monedas a generar y un área 3D (xmax, xmin, ymax...) donde se generarán las monedas. La persistencia de las posiciones de las monedas generadas se realiza en Redis.

Otra característica importante es que las monedas generadas tienen un tiempo de vida (TTL), lo que significa que cada hora se generará un nuevo conjunto de monedas y las monedas de la hora anterior se eliminarán.

## Tecnologías Utilizadas

- Express
- Node.js
- TypeScript
- Redis
- Socket.io
- Docker

## Instalación y Ejecución

1. Clona el repositorio.
2. Instala las dependencias: npm install
3. Configura el archivo JSON con la información de las salas y monedas.
4. Ejecuta la aplicación: npm start

¡Explora el metaverso, recoge monedas y disfruta de las recompensas!