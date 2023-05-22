package api

import "github.com/labstack/echo/v4"

//routes for users
//the section that is ":id" is where the 1 id the user is placed to make the search
//the routes are divided by users and saved element, to give order to the requests

func (a *API) RegisterRoutes(e *echo.Echo) {
	users := e.Group("/users")
	users.POST("/create", a.Create_User)
	users.GET("/id_read/:id", a.Read_userByid)
	users.GET("/email_read/:eMail", a.Read_userByemail)
	users.GET("/id_by_email/:eMail", a.Read_idByemail)
	users.GET("/name_read/:names", a.Read_userByname)
	users.GET("/lastname_read/:lastNames", a.Read_userBylastname)
	users.GET("/phone_read/:phoneNumber", a.Read_userBypnumber)
	users.GET("/id_by_sso/:sso_userid", a.Read_idBySSOId)
	users.PUT("/update_photo", a.Update_photoId)
	users.PUT("/update", a.Update_userByid)
	users.DELETE("/delete", a.Delete_userByid)
	users.PUT("/edit_status", a.Edit_statusByid)

	savedElement := e.Group("/savedElement")
	savedElement.POST("/create", a.Create_savedElement)
	savedElement.GET("/id_read/:idElement", a.Read_savedElements)
	savedElement.DELETE("/delete", a.Delete_savedElement)
	savedElement.DELETE("/delete_all", a.Delete_allsavedElements)

}
