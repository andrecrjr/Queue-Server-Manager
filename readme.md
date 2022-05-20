# Basic BullMQ Queue Management Template

Generic template to helping create queue management system with NodeJS and ExpressJS.

Just need to fill `.env` in the root project with your redis configuration then open: http://localhost:8000/admin

## Controller
Inside `Controller/Queue/index.ts` it's a class that brings the configuration done for BullMQ and its called in `src/index.ts`.