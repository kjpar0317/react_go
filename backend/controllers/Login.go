package controllers

import (
	"../models"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"net/http"
	"time"

	"../services"
)

type Login struct {
	Userid  string `json:"userid" form:"userid" query:"userid"`
	Password string `json:"password" form:"password" query:"password"`
}

func DoLogin(c echo.Context) (err error) {
	linfo := new(Login)

	if err = c.Bind(linfo); err != nil {
		return echo.ErrUnauthorized
	}

	userinfos := services.InitUsers()
	services.InitBoardList()

	var loginUserinfo *models.IUserinfo

	for _, userinfo := range userinfos {
		if userinfo.Userid == linfo.Userid && userinfo.Password == linfo.Password {
			loginUserinfo = &userinfo
		}
	}

	// Throws unauthorized error
	if loginUserinfo == nil {
		return echo.ErrUnauthorized
	}

	// Set custom claims
	claims := models.IJwtCustomClaims{
		loginUserinfo.Userid,
		loginUserinfo.Admin,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	} // Create token with claims

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": t,
		"userinfo": loginUserinfo,
	})
}
