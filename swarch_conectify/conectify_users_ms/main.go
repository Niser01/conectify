package main

import (
	"context"

	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/DB"
	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/internal/views"
	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/settings"
	"go.uber.org/fx"
)

func main() {
	app := fx.New(
		fx.Provide(
			context.Background,
			settings.New,
			DB.New,
			views.New,
		),
		fx.Invoke(),
	)

	app.Run()
}
