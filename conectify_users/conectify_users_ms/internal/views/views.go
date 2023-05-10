package views

import (
	"context"

	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/models"
	"github.com/jmoiron/sqlx"
)

// views interface has all the crud methods for the user and saved elements
type View_interface interface {
	Create_user(ctx context.Context, names string, lastNames string, photoId int, eMail string, status int, phoneNumber string) error
	Read_userByid(ctx context.Context, id int) (*models.User, error)
	Read_userByemail(ctx context.Context, eMail string) (*models.User, error)
	Read_userByname(ctx context.Context, names string) (*models.User, error)
	Read_userBylastname(ctx context.Context, lastNames string) (*models.User, error)
	Read_userBypnumber(ctx context.Context, phoneNumber string) (*models.User, error)
	Update_userByid(ctx context.Context, id int, names string, lastNames string, photoId int, eMail string, status int, phoneNumber string) error
	Delete_userByid(ctx context.Context, id int) error
	Edit_statusByid(ctx context.Context, id int, status int) error

	Create_savedElement(ctx context.Context, idUser int, idElement int) error
	Read_savedElements(ctx context.Context, idUser int) (*models.SavedElement, error)
	Delete_savedElement(ctx context.Context, idElement int) error
	Delete_allsavedElements(ctx context.Context, idUser int) error
}

// view is the implementation of the views interface
type View_struct struct {
	db *sqlx.DB
}

// New returns the implementation of the views interface
func New(db *sqlx.DB) View_interface {
	return &View_struct{db: db}
}
