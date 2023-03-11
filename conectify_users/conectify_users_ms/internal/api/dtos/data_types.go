package dtos

//dtos stands for data transfer objects and are used to transfer data between the client and the server

type Create_User struct {
	Names       string `json:"names" ` // validate:"required" is a tag that validates that the field is not empty
	LastNames   string `json:"lastNames" validate:"required"`
	PhotoId     int    `json:"photoId" validate:"required"`
	EMail       string `json:"eMail" validate:"required ,min=8"` // validate:"required ,min=8" is a tag that validates that the field is not empty and has a minimum length of 8
	Status      int    `json:"status" validate:"required"`
	PhoneNumber string `json:"phoneNumber" validate:"required,min=10,max=10"` // validate:"required,min=10,max=10" is a tag that validates that the field is not empty and has a minimum length of 10 and a maximum length of 10
}

type Read_userByid struct {
	Id int `json:"id" validate:"required"`
}

type Read_userByemail struct {
	EMail string `json:"eMail" validate:"required"`
}

type Read_userByname struct {
	Names string `json:"names" validate:"required"`
}

type Read_userBylastname struct {
	LastNames string `json:"lastNames" validate:"required"`
}

type Read_userBypnumber struct {
	PhoneNumber string `json:"phoneNumber" validate:"required"`
}

type Update_userByid struct {
	Id          int    `json:"id" validate:"required"`
	Names       string `json:"names" validate:"required"`
	LastNames   string `json:"lastNames" validate:"required"`
	PhotoId     int    `json:"photoId" validate:"required"`
	EMail       string `json:"eMail" validate:"required"`
	Status      int    `json:"status" validate:"required"`
	PhoneNumber string `json:"phoneNumber" validate:"required"`
}

type Delete_userByid struct {
	Id int `json:"id" validate:"required"`
}

type Edit_statusByid struct {
	Id     int `json:"id" validate:"required"`
	Status int `json:"status" validate:"required"`
}

type Create_savedElement struct {
	IdUser    int `json:"idUser" validate:"required"`
	IdElement int `json:"idElement" validate:"required"`
	IdType    int `json:"idType" validate:"required"`
}

type Read_savedElements struct {
	IdUser int `json:"idUser" validate:"required"`
}

type Delete_savedElement struct {
	IdElement int `json:"idElement" validate:"required"`
}

type Delete_allsavedElements struct {
	IdUser int `json:"idUser" validate:"required"`
}
