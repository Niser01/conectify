package api

import "github.com/labstack/echo/v4"

//routes for users

func (a *API) RegisterRoutes(e *echo.Echo) {
	users := e.Group("/users")
	users.POST("/create", a.Create_User)
	users.GET("/id_read", a.Read_userByid)
	users.GET("/email_read", a.Read_userByemail)
	users.GET("/name_read", a.Read_userByname)
	users.GET("lastname_read", a.Read_userBylastname)
	users.GET("/phone_read", a.Read_userBypnumber)
	users.POST("/update", a.Update_userByid)
	users.DELETE("/delete", a.Delete_userByid)
	users.POST("/edit_status", a.Edit_statusByid)

	savedElement := e.Group("/savedElement")
	savedElement.POST("/create", a.Create_savedElement)
	savedElement.GET("/id_read", a.Read_savedElements)
	savedElement.DELETE("/delete", a.Delete_savedElement)
	savedElement.DELETE("/delete_all", a.Delete_allsavedElements)

}
