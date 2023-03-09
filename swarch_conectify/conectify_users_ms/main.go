package main

import (
	"conectify_users_db/database"
	"conectify_users_ms/settings"
	"context"

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
