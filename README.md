# La Abi · Apartamentos turísticos (Salamanca)

Web de presentación y solicitud de reserva del apartamento. Next.js 16 + Tailwind 4,
sin base de datos: las solicitudes se envían por WhatsApp o correo desde el navegador.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Qué tocar para cambiar contenido

Casi todo está centralizado en **`src/lib/site.ts`**:

| Bloque      | Qué contiene                                                        |
|-------------|---------------------------------------------------------------------|
| `site`      | Nombre, teléfono, WhatsApp, correo, dirección, nº de registro, mapa |
| `pricing`   | Precio base y de fin de semana, temporada alta, limpieza, mínimos    |
| `facts`     | Las cuatro cifras del hero (huéspedes, dormitorios, baños, m²)      |
| `photos`    | Fotos de la galería, con su texto alternativo y su título            |
| `amenities` | Equipamiento agrupado en cuatro bloques                              |
| `nearby`    | Distancias andando a los puntos de interés                           |
| `faqs`      | Preguntas frecuentes                                                 |

Los valores marcados con `⚠️ CONFIRMAR` son provisionales y hay que sustituirlos
por los reales antes de publicar (teléfono, correo, dirección, coordenadas del
mapa, número de registro de turismo de Castilla y León y tarifas).

## Fotos

Las fotos optimizadas viven en `public/img/`. Los originales están en `fotos/`
(excluidos del despliegue). Para regenerar a partir de un original nuevo:

```bash
ffmpeg -i fotos/NUEVA.PNG -vf "scale=1200:-2:flags=lanczos" -q:v 3 public/img/nombre.jpg
```

Después añade la entrada correspondiente en `photos` dentro de `src/lib/site.ts`.

## Reservas

No hay base de datos ni pasarela de pago. El formulario valida las fechas, calcula
el precio en el navegador y genera un mensaje con todos los datos que el huésped
envía por WhatsApp o por correo. El siguiente paso natural, cuando el cliente lo
pida, sería conectar un calendario de disponibilidad y cobro del anticipo.
