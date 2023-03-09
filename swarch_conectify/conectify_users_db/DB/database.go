package conectifyusersdb

import (
	"conectify_users_ms/settings"
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"
)

func New(ctx context.Context, s *settings.Settings) (*sqlx.DB, error) {

	connectionString := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true",
		s.DB.User,
		s.DB.Password,
		s.DB.Host,
		s.DB.Port,
		s.DB.Name,
	)

	return sqlx.ConnectContext(ctx, "mysql", connectionString)
}
