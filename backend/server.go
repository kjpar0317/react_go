package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"./controllers"
	"./models"
)

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// CORS 셋팅
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.Logger.Info("프론트 개발자를 위한 설치 없는 백앤드 서버 (휘발성)")

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

	e.Logger.Fatal(e.Start(":8080"))
}
