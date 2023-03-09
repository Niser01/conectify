package main

import (
	"context"
	"swarch_conectify_users/conectify_users_db/DB"
	"swarch_conectify_users/conectify_users_ms/settings"

	"github.com/jmoiron/sqlx"
	"go.uber.org/fx"
)

func main() {
	app := fx.New(
		fx.Provide(
			context.Background,
			settings.New,
			DB.New,
		),
		fx.Invoke(
			func(db *sqlx.DB) {
				_, err := db.Query("SELECT * FROM USERS_PROFILE")
				if err != nil {
					panic(err)
				}
			},
		),
	)

	app.Run()
}
