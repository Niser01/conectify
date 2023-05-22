package views

import (
	"context"
	"errors"

	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/models"
)

// querys for the database
const (
	queryCreateUser = `
	INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber, sso_userId) 
	VALUES (?, ?, ?, ?, ?, ?, ?)`
	queryread_userByid = `
	SELECT *
	FROM USERS_PROFILE 
	WHERE id = ?`
	queryread_userByemail = `
	SELECT *
	FROM USERS_PROFILE 
	WHERE eMail = ?`
	querygetid_Byemail = `
	SELECT id
	from USERS_PROFILE 
	WHERE eMail = ?`
	queryread_userByname = `
	SELECT *
	FROM USERS_PROFILE 
	WHERE names = ?`
	queryread_userBylastname = `
	SELECT *
	FROM USERS_PROFILE 
	WHERE lastNames = ?`
	queryread_userBypnumber = `
	SELECT *
	FROM USERS_PROFILE 
	WHERE phoneNumber = ?`
	queryread_userBySSOID = `
	SELECT id
	FROM USERS_PROFILE 
	WHERE sso_userId = ?`
	queryupdate_photoId = `
	UPDATE USERS_PROFILE 
	SET photoId = ?
	WHERE id = ?`
	queryupdate_userByid = `
	UPDATE USERS_PROFILE 
	SET names = ?, lastNames = ?, photoId = ?, eMail = ?, status = ?, phoneNumber = ? , sso_userId = ?
	WHERE id = ?`
	querydelete_userByid = `
	DELETE FROM USERS_PROFILE 
	WHERE id = ?`
	queryedit_statusByid = `
	UPDATE USERS_PROFILE 
	SET status =  ?
	WHERE id = ?`

	querycreate_savedElement = `
	INSERT INTO USERS_SAVED_ELEMENTS (idUser, idElement)
	VALUES (?, ?)`
	queryread_savedElements = `
	SELECT  idUser, idElement
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

// Reads user from DB, since there can only be a unique email, the function is used first when creating a user it gets the system conext and gets the email
func (r *View_struct) Read_userByemail(ctx context.Context, eMail string) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByemail, eMail)
	if err != nil {
		return nil, err
	}
	return u, nil
}

// create_user creates a new user in the database, it uses the ExcecContext method
func (r *View_struct) Create_user(ctx context.Context, names string, lastNames string, photoId string, eMail string, status int, phoneNumber string, SSO_UserId string) error {
	u, _ := r.Read_userByemail(ctx, eMail)

	if u != nil {
		return ErrUserAlreadyExists
	}
	_, err := r.db.ExecContext(ctx, queryCreateUser, names, lastNames, photoId, eMail, status, phoneNumber, SSO_UserId)
	if err != nil {
		return err
	}
	return nil
}

// Reads the user info by their id
func (r *View_struct) Read_userByid(ctx context.Context, id int) (*models.User, error) {
	u := &models.User{}
	err := r.db.GetContext(ctx, u, queryread_userByid, id)
	if err != nil {
		return nil, err
	}

	return u, nil
}

// This function returns only the id of the user when searching by the email
func (r *View_struct) Read_idByemail(eMail string) ([]models.UserId, error) {
	u := []models.UserId{}
	err := r.db.Select(&u, querygetid_Byemail, eMail)

	if err != nil {
		println(err)
		return nil, err
	}
	return u, nil
}

// This function retuns an array of all the names that exist on the system, it uses the Select method from sqlx
func (r *View_struct) Read_userByname(names string) ([]models.User, error) {
	u := []models.User{}
	err := r.db.Select(&u, queryread_userByname, names)
	if err != nil {
		return nil, err
	}
	return u, nil
}

// This function retuns an array of all the last names that exist on the system, it uses the Select method from sqlx
func (r *View_struct) Read_userBylastname(lastNames string) ([]models.User, error) {
	u := []models.User{}
	err := r.db.Select(&u, queryread_userBylastname, lastNames)
	if err != nil {
		return nil, err
	}
	return u, nil
}

// This function retuns an array of all the phonenumbers that exist on the system, it uses the Select method from sqlx
func (r *View_struct) Read_userBypnumber(phoneNumber string) ([]models.User, error) {
	u := []models.User{}
	err := r.db.Select(&u, queryread_userBypnumber, phoneNumber)
	if err != nil {
		return nil, err
	}
	return u, nil
}

// Gets the id of the user using the sso_id
func (r *View_struct) Read_idBySSOId(SSO_UserId string) ([]models.UserId, error) {
	u := []models.UserId{}
	err := r.db.Select(&u, queryread_userBySSOID, SSO_UserId)
	if err != nil {
		return nil, err
	}
	return u, nil
}

// updates the reference of the photo id
func (r *View_struct) Update_photoId(ctx context.Context, photoId string, id int) error {
	_, err := r.db.ExecContext(ctx, queryupdate_photoId, photoId, id)
	if err != nil {
		return err
	}
	return nil
}

// This function updates the user information, the user is selected by it´s id,  it uses the ExcecContext method
func (r *View_struct) Update_userByid(ctx context.Context, names string, lastNames string, photoId string, eMail string, status int, phoneNumber string, SSO_UserId string, id int) error {
	_, err := r.db.ExecContext(ctx, queryupdate_userByid, names, lastNames, photoId, eMail, status, phoneNumber, SSO_UserId, id)
	if err != nil {
		return err
	}
	return nil
}

// This funcition delets a user it uses the ExcecContext method
func (r *View_struct) Delete_userByid(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, querydelete_userByid, id)
	if err != nil {
		return err
	}
	return nil
}

// This function edits the status of a user  it uses the ExcecContext method
func (r *View_struct) Edit_statusByid(ctx context.Context, status int, id int) error {
	_, err := r.db.ExecContext(ctx, queryedit_statusByid, status, id)
	if err != nil {
		return err
	}
	return nil
}

// This function uses the saved element table, and creates a new element that is saved by the user.
func (r *View_struct) Create_savedElement(ctx context.Context, idUser int, idElement int) error {
	_, err := r.db.ExecContext(ctx, querycreate_savedElement, idUser, idElement)
	if err != nil {
		return err
	}
	return nil
}

// This funcion gets all the previously saved elements by the user it uses the Select method from sqlx
func (r *View_struct) Read_savedElements(idUser int) ([]models.SavedElement, error) {
	u := []models.SavedElement{}
	err := r.db.Select(&u, queryread_savedElements, idUser)
	if err != nil {
		return nil, err
	}
	return u, nil
}

// This function is used in case the user wats to delete one of the saved elemets,
func (r *View_struct) Delete_savedElement(ctx context.Context, idElement int) error {
	_, err := r.db.ExecContext(ctx, querydelete_savedElement, idElement)
	if err != nil {
		return err
	}
	return nil
}

// This function is used in case the user wants to delete all the saved elements or in case the user profile is deleted.
func (r *View_struct) Delete_allsavedElements(ctx context.Context, idUser int) error {
	_, err := r.db.ExecContext(ctx, querydelete_allsavedElements, idUser)
	if err != nil {
		return err
	}
	return nil
}
