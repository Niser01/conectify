package api

import (
	"net/http"
	"strconv"

	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/api/dtos"
	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/views"
	"github.com/labstack/echo/v4"
)

//handlers for the API

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
	id := c.Param("id")
	idnum, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user, err := a.view.Read_userByid(ctx, idnum)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, user)
}

func (a *API) Read_userByemail(c echo.Context) error {
	ctx := c.Request().Context()
	EMail := c.Param("eMail")
	err := c.Bind(&EMail)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user, err := a.view.Read_userByemail(ctx, EMail)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, user)
}

func (a *API) Read_userByname(c echo.Context) error {
	ctx := c.Request().Context()
	Names := c.Param("names")
	err := c.Bind(&Names)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user, err := a.view.Read_userByname(ctx, Names)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, user)
}

func (a *API) Read_userBylastname(c echo.Context) error {
	ctx := c.Request().Context()
	LastNames := c.Param("lastNames")
	err := c.Bind(&LastNames)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user, err := a.view.Read_userBylastname(ctx, LastNames)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, user)
}

func (a *API) Read_userBypnumber(c echo.Context) error {
	ctx := c.Request().Context()
	PhoneNumber := c.Param("phoneNumber")
	err := c.Bind(&PhoneNumber)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user, err := a.view.Read_userBypnumber(ctx, PhoneNumber)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, user)
}

func (a *API) Update_userByid(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Update_userByid{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Update_userByid(ctx, params.Id, params.Names, params.LastNames, params.PhotoId, params.EMail, params.Status, params.PhoneNumber)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, nil)
}

func (a *API) Delete_userByid(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Delete_userByid{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Delete_userByid(ctx, params.Id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, nil)
}

func (a *API) Edit_statusByid(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Edit_statusByid{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Edit_statusByid(ctx, params.Id, params.Status)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, nil)
}

func (a *API) Create_savedElement(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Create_savedElement{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Create_savedElement(ctx, params.IdUser, params.IdElement, params.IdType)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, nil)
}

func (a *API) Read_savedElements(c echo.Context) error {
	ctx := c.Request().Context()
	IdUser := c.Param("idUser")
	idnum, err := strconv.Atoi(IdUser)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	elements, err := a.view.Read_savedElements(ctx, idnum)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, elements)
}

func (a *API) Delete_savedElement(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Delete_savedElement{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Delete_savedElement(ctx, params.IdElement)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, nil)
}

func (a *API) Delete_allsavedElements(c echo.Context) error {
	ctx := c.Request().Context()
	params := dtos.Delete_allsavedElements{}
	err := c.Bind(&params)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = a.view.Delete_allsavedElements(ctx, params.IdUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, nil)
}
