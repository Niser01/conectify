FROM golang:latest

WORKDIR /conectify_users_ms

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./conectify_users_ms .
COPY . .
ARG URL=0.0.0.0:8080


CMD ["./conectify_users_ms"]