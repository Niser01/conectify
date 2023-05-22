package models

//user db model
type User struct {
	ID          int    `db:"id"`
	Names       string `db:"names"`
	LastNames   string `db:"lastNames"`
	PhotoId     string `db:"photoId"`
	EMail       string `db:"eMail"`
	Status      int    `db:"status"`
	PhoneNumber string `db:"phoneNumber"`
	SSO_UserId  string `db:"sso_userId"`
}

type UserId struct {
	ID int `db:"id"`
}

//saved db element model
type SavedElement struct {
	IDUser    int `db:"idUser"`
	IDElement int `db:"idElement"`
}
