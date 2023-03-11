package views

import (
	"context"
	"errors"

	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/models"
)

// querys for the database
const (
	queryCreateUser = `
	insert into USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber) 
	values (?, ?, ?, ?, ?, ?)`
	queryread_userByid = `
	SELECT names, lastNames, photoId, eMail, status, phoneNumber
	FROM USERS_PROFILE 
	WHERE id = ?`
	queryread_userByemail = `
	SELECT names, lastNames, photoId, eMail, status, phoneNumber
	FROM USERS_PROFILE 
	WHERE eMail = ?`
	queryread_userByname = `
	SELECT names, lastNames, photoId, eMail, status, phoneNumber
	FROM USERS_PROFILE 
	WHERE names = ?`
	queryread_userBylastname = `
	SELECT names, lastNames, photoId, eMail, status, phoneNumber
	FROM USERS_PROFILE 
	WHERE lastNames = ?`
	queryread_userBypnumber = `
	SELECT names, lastNames, photoId, eMail, status, phoneNumber
	FROM USERS_PROFILE 
	WHERE phoneNumber = ?`
	queryupdate_userByid = `
	UPDATE USERS_PROFILE 
	SET names = ?, lastNames = ?, photoId = ?, eMail = ?, status = ?, phoneNumber = ? 
	WHERE id = ?`
	querydelete_userByid = `
	DELETE FROM USERS_PROFILE 
	WHERE id = ?`
	queryedit_statusByid = `
	UPDATE USERS_PROFILE 
	SET status =  ?
	WHERE id = ?`

	querycreate_savedElement = `
	INSERT INTO USERS_SAVED_ELEMENTS (idUser, idElement, idType)
	VALUES (?, ?, ?)`
	queryread_savedElements = `
	SELECT idUser, idElement, idType
	FROM USERS_SAVED_ELEMENTS 
	WHERE idUser = ?`
	querydelete_savedElement = `
	DELETE FROM USERS_SAVED_ELEMENTS 
	WHERE idElement = ?`
	querydelete_allsavedElements = `
	DELETE FROM USERS_SAVED_ELEMENTS 
	WHERE idUser = ?`
)

var (
	ErrUserAlreadyExists = errors.New("user already exists")
)

// create_user creates a new user in the database
func (r *View_struct) Read_userByemail(ctx context.Context, eMail string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByemail, eMail)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *View_struct) Create_user(ctx context.Context, names string, lastNames string, photoId int, eMail string, status int, phoneNumber string) error {
	u, _ := r.Read_userByemail(ctx, eMail)

	if u != nil {
		return ErrUserAlreadyExists
	}

	_, err := r.db.ExecContext(ctx, queryCreateUser, names, lastNames, photoId, eMail, status, phoneNumber)
	if err != nil {
		return err
	}
	return nil
}

func (r *View_struct) Read_userByid(ctx context.Context, id int) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByid, id)
	if err != nil {
		return nil, err
	}

	return u, nil
}

func (r *View_struct) Read_userByname(ctx context.Context, names string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByname, names)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *View_struct) Read_userBylastname(ctx context.Context, lastNames string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userBylastname, lastNames)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *View_struct) Read_userBypnumber(ctx context.Context, phoneNumber string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userBypnumber, phoneNumber)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *View_struct) Update_userByid(ctx context.Context, id int, names string, lastNames string, photoId int, eMail string, status int, phoneNumber string) error {
	_, err := r.db.ExecContext(ctx, queryupdate_userByid, names, lastNames, photoId, eMail, status, phoneNumber, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *View_struct) Delete_userByid(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, querydelete_userByid, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *View_struct) Edit_statusByid(ctx context.Context, id int, status int) error {
	_, err := r.db.ExecContext(ctx, queryedit_statusByid, id, status)
	if err != nil {
		return err
	}
	return nil
}

func (r *View_struct) Create_savedElement(ctx context.Context, idUser int, idElement int, idType int) error {
	_, err := r.db.ExecContext(ctx, querycreate_savedElement, idUser, idElement, idType)
	if err != nil {
		return err
	}
	return nil
}

func (r *View_struct) Read_savedElements(ctx context.Context, idUser int) (*models.SavedElement, error) {
	u := &models.SavedElement{}
	err := r.db.GetContext(ctx, u, queryread_savedElements, idUser)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *View_struct) Delete_savedElement(ctx context.Context, idElement int) error {
	_, err := r.db.ExecContext(ctx, querydelete_savedElement, idElement)
	if err != nil {
		return err
	}
	return nil
}

func (r *View_struct) Delete_allsavedElements(ctx context.Context, idUser int) error {
	_, err := r.db.ExecContext(ctx, querydelete_allsavedElements, idUser)
	if err != nil {
		return err
	}
	return nil
}
