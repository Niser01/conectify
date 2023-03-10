package repository

import (
	"context"

	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/internal/models"
)

const ()

func (r *view) create_user(ctx context.Context, names string, lastNames string, photoId int, eMail string, status int, phoneNumber float32) error {
	panic("implement me")
}

func (r *view) read_userByid(ctx context.Context, id int) (models.User, error) {
	panic("implement me")
}

func (r *view) read_userByemail(ctx context.Context, eMail string) (models.User, error) {
	panic("implement me")
}

func (r *view) read_userByname(ctx context.Context, names string) (models.User, error) {
	panic("implement me")
}

func (r *view) read_userBylastname(ctx context.Context, lastNames string) (models.User, error) {
	panic("implement me")
}

func (r *view) read_userBypnumber(ctx context.Context, phoneNumber float32) (models.User, error) {
	panic("implement me")
}

func (r *view) update_userByid(ctx context.Context, id int, names string, lastNames string, photoId int, eMail string, status int, phoneNumber float32) error {
	panic("implement me")
}

func (r *view) delete_userByid(ctx context.Context, id int) error {
	panic("implement me")
}

func (r *view) edit_statusByid(ctx context.Context, id int, status int) error {
	panic("implement me")
}

func (r *view) create_savedElement(ctx context.Context, idUser int, idElement int, idType int) error {
	panic("implement me")
}

func (r *view) read_savedElements(ctx context.Context, idUser int, idElement int) (models.SavedElement, error) {
	panic("implement me")
}

func (r *view) delete_savedElement(ctx context.Context, idElement int) error {
	panic("implement me")
}

func (r *view) delete_allsavedElements(ctx context.Context, idUser int) error {
	panic("implement me")
}
