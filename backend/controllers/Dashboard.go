package controllers

import (
	"backend/services"
	"net/http"

	"github.com/labstack/echo"
)

func SelectLayouts(c echo.Context) (err error) {
	return c.JSON(http.StatusOK, echo.Map{
		"layouts": services.SelectLayouts(),
	})
}
