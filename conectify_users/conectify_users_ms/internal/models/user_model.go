package models

//user db model
type User struct {
	ID          int    `db:"id"`
	Names       string `db:"names"`
	LastNames   string `db:"lastNames"`
	PhotoId     int    `db:"photoId"`
	EMail       string `db:"eMail"`
	Status      int    `db:"status"`
	PhoneNumber string `db:"phoneNumber"`
}

//saved db element model
type SavedElement struct {
	IDUser    int `db:"idUser"`
	IDElement int `db:"idElement"`
	IDType    int `db:"idType"`
}
