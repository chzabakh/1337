FROM node AS build

WORKDIR backend

COPY tsconfig*.json ./
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY .env ./
COPY src ./src

RUN npx prisma generate
RUN npm run build

FROM node

COPY --from=build /backend/node_modules ./node_modules
COPY --from=build /backend/package*.json ./
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/src ./src
COPY --from=build /backend/prisma ./prisma
COPY --from=build /backend/.env ./

EXPOSE 9000

ENTRYPOINT [ "npm", "run", "start:deploy" ]