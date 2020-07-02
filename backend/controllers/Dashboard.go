package controllers

import (
	"../services"
	"github.com/labstack/echo"
	"net/http"
)

func SelectLayouts(c echo.Context) (err error) {
	return c.JSON(http.StatusOK, echo.Map{
		"layouts": services.SelectLayouts(),
	})
}
