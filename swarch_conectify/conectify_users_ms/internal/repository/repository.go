package repository

import "context"

type Repository interface {
	createUser(ctx context.Context, names string, lastNames string, eMail string, status int, phoneNumber float32) error
	getuserByid(ctx context.Context, id int) (string, string, string, int, float32, error)
	getuserByemail(ctx context.Context, eMail string) (int, string, string, string, int, float32, error)
	getuserByname(ctx context.Context, names string) (int, string, string, string, int, float32, error)
	getuserBylastname(ctx context.Context, lastNames string) (int, string, string, string, int, float32, error)
	getuserBypnumber(ctx context.Context, phoneNumber float32) (int, string, string, string, int, float32, error)
	edituserByid(ctx context.Context, id int, names string, lastNames string, eMail string, status int, phoneNumber float32) error
	deleteuserByid(ctx context.Context, id int) error
	editstatusByid(ctx context.Context, id int, status int) error
}
