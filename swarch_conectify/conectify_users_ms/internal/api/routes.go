package api

import "github.com/labstack/echo/v4"

func (a *API) RegisterRoutes(e *echo.Echo) {
	users := e.Group("/users")
	users.POST("/create_user", a.Create_User)
	users.GET("/userByid", a.Read_userByid)
}
