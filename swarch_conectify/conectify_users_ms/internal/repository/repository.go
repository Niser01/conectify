package repository

import "context"

type Repository interface {
	create_user(ctx context.Context, names string, lastNames string, eMail string, status int, phoneNumber float32) error
	read_userByid(ctx context.Context, id int) (string, string, string, int, float32, error)
	read_userByemail(ctx context.Context, eMail string) (int, string, string, string, int, float32, error)
	read_userByname(ctx context.Context, names string) (int, string, string, string, int, float32, error)
	read_userBylastname(ctx context.Context, lastNames string) (int, string, string, string, int, float32, error)
	read_userBypnumber(ctx context.Context, phoneNumber float32) (int, string, string, string, int, float32, error)
	update_userByid(ctx context.Context, id int, names string, lastNames string, eMail string, status int, phoneNumber float32) error
	delete_userByid(ctx context.Context, id int) error
	edit_statusByid(ctx context.Context, id int, status int) error

	create_savedElement(ctx context.Context, idUser int, idElement int, idType int) error
	read_savedElements(ctx context.Context, idUser int, idElement int) (int, error)
	delete_savedElement(ctx context.Context, idElement int) error
	delete_allsavedElements(ctx context.Context, idUser int) error
}
