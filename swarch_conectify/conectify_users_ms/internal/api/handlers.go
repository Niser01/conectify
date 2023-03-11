package api

import (
	"net/http"

	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/internal/api/dtos"
	"github.com/Niser01/Arq_soft/tree/main/swarch_conectify/conectify_users_ms/internal/views"
	"github.com/labstack/echo/v4"
)

func (a *API) Create_User(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Create_User{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Create_user(ctx, params.Names, params.LastNames, params.PhotoId, params.EMail, params.Status, params.PhoneNumber)
	if err != nil {
		if err == views.ErrUserAlreadyExists {
			return c.JSON(http.StatusConflict, err)
		}
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, nil)
}

func (a *API) Read_userByid(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Read_userByid{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user, err := a.view.Read_userByid(ctx, params.Id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, user)
}
