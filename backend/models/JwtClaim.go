package models

import "github.com/dgrijalva/jwt-go"

// jwtCustomClaims are custom claims extending default ones.
type IJwtCustomClaims struct {
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	jwt.StandardClaims
}
