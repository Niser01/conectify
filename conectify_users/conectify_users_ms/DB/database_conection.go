package DB

import (
	"context"
	"fmt"

	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/settings"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// New returns a new sqlx.DB object with the connection to the database
func New(ctx context.Context, s *settings.Settings) (*sqlx.DB, error) {

	connectionString := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s",
		s.DB.User,
		s.DB.Password,
		s.DB.Host,
		s.DB.Port,
		s.DB.Name,
	)

	return sqlx.ConnectContext(ctx, "mysql", connectionString)
}
