package main

import (
	"context"
	"swarch_conectify/conectify_users_db/DB/database"
	"swarch_conectify/conectify_users_ms/settings"

	"go.uber.org/fx"
)

func main() {
	app := fx.New(
		fx.Provide(
			context.Background,
			settings.New,
			database.New,
		),
		fx.Invoke(),
	)

	app.Run()
}
