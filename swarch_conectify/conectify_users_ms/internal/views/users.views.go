package views

import (
	"context"

	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/internal/models"
)

const (
	queryCreateUser = `
	INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber) 
	VALUES (?, ?, ?, ?, ?, ?)`
	queryread_userByid = `
	SELECT (names, lastNames, photoId, eMail, status, phoneNumber)  
	FROM USERS_PROFILE 
	WHERE id = ?`
	queryread_userByemail = `
	SELECT (names, lastNames, photoId, eMail, status, phoneNumber) 
	FROM USERS_PROFILE 
	WHERE eMail = ?`
	queryread_userByname = `
	SELECT (names, lastNames, photoId, eMail, status, phoneNumber) 
	FROM USERS_PROFILE 
	WHERE names = ?`
	queryread_userBylastname = `
	SELECT (names, lastNames, photoId, eMail, status, phoneNumber) 
	FROM USERS_PROFILE 
	WHERE lastNames = ?`
	queryread_userBypnumber = `
	SELECT (names, lastNames, photoId, eMail, status, phoneNumber) 
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
	SET status = (SELECT (Status) from USERS_STATUS WHERE (id = ?)) 
	WHERE id = ?`

	querycreate_savedElement = `
	INSERT INTO USERS_SAVED_ELEMENTS (idUser, idElement, idType) 
	VALUES (?, ?, ?)`
	queryread_savedElements = `
	SELECT (idUser, idElement, idType) 
	FROM USERS_SAVED_ELEMENTS 
	WHERE idUser = ?`
	querydelete_savedElement = `
	DELETE FROM USERS_SAVED_ELEMENTS 
	WHERE idElement = ?`
	querydelete_allsavedElements = `
	DELETE FROM USERS_SAVED_ELEMENTS 
	WHERE idUser = ?`
)

// create_user creates a new user in the database
func (r *view_struct) create_user(ctx context.Context, names string, lastNames string, photoId int, eMail string, status int, phoneNumber float32) error {
	_, err := r.db.ExecContext(ctx, queryCreateUser, names, lastNames, photoId, eMail, status, phoneNumber)
	if err != nil {
		return err
	}
	return nil
}

func (r *view_struct) read_userByid(ctx context.Context, id int) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByid, id)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *view_struct) read_userByemail(ctx context.Context, eMail string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByemail, eMail)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *view_struct) read_userByname(ctx context.Context, names string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByname, names)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *view_struct) read_userBylastname(ctx context.Context, lastNames string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userBylastname, lastNames)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *view_struct) read_userBypnumber(ctx context.Context, phoneNumber float32) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userBypnumber, phoneNumber)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *view_struct) update_userByid(ctx context.Context, id int, names string, lastNames string, photoId int, eMail string, status int, phoneNumber float32) error {
	_, err := r.db.ExecContext(ctx, queryupdate_userByid, names, lastNames, photoId, eMail, status, phoneNumber, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *view_struct) delete_userByid(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, querydelete_userByid, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *view_struct) edit_statusByid(ctx context.Context, id int, status int) error {
	_, err := r.db.ExecContext(ctx, queryedit_statusByid, status, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *view_struct) create_savedElement(ctx context.Context, idUser int, idElement int, idType int) error {
	_, err := r.db.ExecContext(ctx, querycreate_savedElement, idUser, idElement, idType)
	if err != nil {
		return err
	}
	return nil
}

func (r *view_struct) read_savedElements(ctx context.Context, idUser int) (*models.SavedElement, error) {
	u := &models.SavedElement{}
	err := r.db.GetContext(ctx, u, queryread_savedElements, idUser)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *view_struct) delete_savedElement(ctx context.Context, idElement int) error {
	_, err := r.db.ExecContext(ctx, querydelete_savedElement, idElement)
	if err != nil {
		return err
	}
	return nil
}

func (r *view_struct) delete_allsavedElements(ctx context.Context, idUser int) error {
	_, err := r.db.ExecContext(ctx, querydelete_allsavedElements, idUser)
	if err != nil {
		return err
	}
	return nil
}
