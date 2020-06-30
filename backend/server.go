package main

import (
	"fmt"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"./controllers"
	"./models"
)

func main() {
	e := echo.New()

	e.HideBanner = true

	fmt.Println(">> 백앤드 서버 v0.1 (휘발성)")
	fmt.Println("만든 이유 : 백앤드를 전혀 모르는 프론트앤드 개발자 개인 연습용")
	fmt.Println("주의점 : DB가 없기 때문에 휘발성임(서버 재기동 시 데이터 초기화)")
	fmt.Println("라이센스 : 공개용라이선스 (개인 무료)")
	fmt.Println("만든이 : 박광주(kjpar_kr@yahoo.co.kr)")

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// CORS 셋팅
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	/*
	  로그 포맷 참고
	 https://echo.labstack.com/middleware/logger
	*/
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} ${method} - ${uri} ${status}\n",
	}))

	// Login route
	e.POST("/login", controllers.DoLogin)
	// Unauthenticated route
	e.GET("/", controllers.Accessible)

	// Restricted group
	r := e.Group("/api")

	// Configure middleware with the custom claims type
	var config = middleware.JWTConfig{
		Claims:     &models.IJwtCustomClaims{},
		SigningKey: []byte("secret"),
	}

	r.Use(middleware.JWTWithConfig(config))

	r.POST("/test", controllers.Restricted)
	r.POST("/user/:userid", controllers.SelectUser)
	r.POST("/user/register", controllers.CreateUser)
	r.POST("/user/delete/:userid", controllers.DeleteUser)
	r.POST("/board/list", controllers.SelectBoardList)
	r.POST("/board/add", controllers.AddBoard)
	r.POST("/board/edit", controllers.EditBoard)
	r.POST("/board/del/:bbsno", controllers.DeleteBoard)

	e.Logger.Fatal(e.Start(":7080"))
}
