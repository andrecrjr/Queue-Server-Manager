# Basic BullMQ Queue Management Template - WIP!

Generic template to helping create queue management system with NodeJS and ExpressJS.

# Installation

Use in the terminal `docker-compose up`.

And need to fill an `.env` in the root project with your redis configuration then open: http://localhost:8000/admin

For example to add into the queue you'll need to use the route: http://localhost:8000/add

## Controller
Inside `Controller/Queue/index.ts` it's the class that brings the settings for BullMQ with Redis and its called when the server starts into `app.listen` on `index.js`.

You can create just overriding the **`QueueManager`** class, and override its function `processQueue` so you can uses an `express` route to expose your new class to add to your queue and to BullMQ creates a new route for admin.
