FROM golang:1.23-alpine AS builder

WORKDIR /app
RUN apk add --no-cache gcc musl-dev
COPY . .
RUN go mod download
RUN go build -o server main.go
RUN go build -o seed seed_generator/seed.go

FROM alpine:3.19
WORKDIR /app
RUN apk add --no-cache gcc musl-dev
COPY --from=builder /app/server .
COPY --from=builder /app/seed .
RUN chmod +x ./server && \
    chmod +x ./seed
COPY .env .
EXPOSE 8080
CMD ["/bin/sh", "-c", "./seed || true && ./server"]