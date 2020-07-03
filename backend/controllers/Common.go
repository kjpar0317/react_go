package controllers

import (
	"backend/models"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
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
/**
new 와 make 의 차이
new(T):포인터를 반환하여 타입*T의 값으로 T를 입력하고, 메모리를 할당합니다. new(T)는 T{}와 같습니다. (초기화 X, 즉 제로 값이 되는것이다)
make(T):T유형의 초기화된 값을 반환하고, 메모리를 할당하고 초기화합니다. 그것은 slice, map, channel에 사용된다.
*/
/*
struct 비교
session := &Session{}
if (Session{}) == *session {
    fmt.Println("session is empty")
}
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
