package models

type User struct {
	ID          int     `db:"id"`
	Names       string  `db:"names"`
	LastNames   string  `db:"last_names"`
	EMail       string  `db:"e_mail"`
	Status      int     `db:"status"`
	PhoneNumber float32 `db:"phone_number"`
}

type SavedElement struct {
	IDUser    int `db:"id_user"`
	IDElement int `db:"id_element"`
	IDType    int `db:"id_type"`
}
