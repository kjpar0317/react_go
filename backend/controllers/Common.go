package controllers

import (
	"../models"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"net/http"
)

func Accessible(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Accessible")
}

func Restricted(c echo.Context) (err error) {
	user := c.Get("user").(*jwt.Token)

	claims := user.Claims.(*models.IJwtCustomClaims)
	name := claims.Name
	return c.String(http.StatusOK, "Welcome "+name+"!")
}
