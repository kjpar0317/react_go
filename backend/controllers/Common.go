package controllers

import (
	"../models"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"net/http"
)

/**
// query string으로 들어올때
name := c.QueryParam("name")
// url의 path variable 획득할때
name := c.Param("name")
// from submit을 통해 전달되는 파라메터 획득
name := c.FormValue("name")
// body json을 통한 파라메터 획득
params := make(map[string]string)
_ := c.Bind(&params)
name = params["name"]
 */
func Accessible(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Accessible")
}

func Restricted(c echo.Context) (err error) {
	user := c.Get("user").(*jwt.Token)

	claims := user.Claims.(*models.IJwtCustomClaims)
	name := claims.Name
	return c.String(http.StatusOK, "Welcome "+name+"!")
}
