package controllers

import (
	"../models"
	"../services"
	"github.com/labstack/echo"
	"net/http"
)

func SelectUser(c echo.Context) (err error) {
	userid := c.Param("userid")

	return c.JSON(http.StatusOK, echo.Map{
		"userinfo": services.SelectUser(userid),
	})
}

func CreateUser(c echo.Context) (err error) {
	userinfo := new(models.IUserinfo)

	if err = c.Bind(userinfo); err != nil {
		return echo.ErrBadRequest
	}

	return c.JSON(http.StatusOK, echo.Map{
		"isRegisted": services.CreateUser(*userinfo),
	})
}

func DeleteUser(c echo.Context) (err error) {
	userid := c.Param("userid")

	return c.JSON(http.StatusOK, echo.Map{
		"isDeleted": services.DeleteUser(userid),
	})
}
