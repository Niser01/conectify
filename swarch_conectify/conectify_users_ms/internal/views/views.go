package repository

import (
	"context"

	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/internal/models"
	"github.com/jmoiron/sqlx"
)

// views interface has all the crud methods for the user and saved elements
type views interface {
	create_user(ctx context.Context, names string, lastNames string, photoId int, eMail string, status int, phoneNumber float32) error
	read_userByid(ctx context.Context, id int) (models.User, error)
	read_userByemail(ctx context.Context, eMail string) (models.User, error)
	read_userByname(ctx context.Context, names string) (models.User, error)
	read_userBylastname(ctx context.Context, lastNames string) (models.User, error)
	read_userBypnumber(ctx context.Context, phoneNumber float32) (models.User, error)
	update_userByid(ctx context.Context, id int, names string, lastNames string, photoId int, eMail string, status int, phoneNumber float32) error
	delete_userByid(ctx context.Context, id int) error
	edit_statusByid(ctx context.Context, id int, status int) error

	create_savedElement(ctx context.Context, idUser int, idElement int, idType int) error
	read_savedElements(ctx context.Context, idUser int, idElement int) (models.SavedElement, error)
	delete_savedElement(ctx context.Context, idElement int) error
	delete_allsavedElements(ctx context.Context, idUser int) error
}

// view is the implementation of the views interface
type view struct {
	db *sqlx.DB
}

// New returns the implementation of the views interface
func New(db *sqlx.DB) views {
	return &view{db: db}
}
