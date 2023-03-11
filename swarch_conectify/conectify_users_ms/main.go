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
		fx.Invoke(
			func(ctx context.Context, v views.View_interface) {
				err := v.Create_savedElement(ctx, 1, 1, 1)
				if err != nil {
					panic(err)
				}

			},
		),
	)

	app.Run()
}
