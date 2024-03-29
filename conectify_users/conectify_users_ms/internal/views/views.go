package views

import (
	"context"

	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/models"
	"github.com/jmoiron/sqlx"
)

// views interface has all the crud methods for the user and saved elements
type View_interface interface {
	Read_userByemail(ctx context.Context, eMail string) (*models.User, error)
	Create_user(ctx context.Context, names string, lastNames string, photoId string, eMail string, status int, phoneNumber string, SSO_UserId string) error
	Read_userByid(ctx context.Context, id int) (*models.User, error)
	Read_idByemail(EMail string) ([]models.UserId, error)
	Read_userByname(names string) ([]models.User, error)
	Read_userBylastname(lastNames string) ([]models.User, error)
	Read_userBypnumber(phoneNumber string) ([]models.User, error)
	Read_idBySSOId(SSO_UserId string) ([]models.UserId, error)
	Update_photoId(ctx context.Context, photoId string, id int) error
	Update_userByid(ctx context.Context, names string, lastNames string, photoId string, eMail string, status int, phoneNumber string, SSO_UserId string, id int) error
	Delete_userByid(ctx context.Context, id int) error
	Edit_statusByid(ctx context.Context, status int, id int) error

	Create_savedElement(ctx context.Context, idUser int, idElement int) error
	Read_savedElements(idUser int) ([]models.SavedElement, error)
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
