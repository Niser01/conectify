package api

import (
	"github.com/Niser01/conectify/tree/main/conectify_users/conectify_users_ms/internal/views"
	"github.com/labstack/echo/v4"
)

// API is the API of the conectify_users_ms
// It contains the view and the echo instance

type API struct {
	view views.View_interface
}

func New(view views.View_interface) *API {
	return &API{view: view}
}

func (a *API) Start(e *echo.Echo, address string) error {
	a.RegisterRoutes(e)
	return e.Start(address)
}
