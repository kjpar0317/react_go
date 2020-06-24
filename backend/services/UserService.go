package services

import (
	"../models"
)

var (
	global = New()
)

func initUsers() [2]models.IUserinfo {
	var userinfos [2]models.IUserinfo

	userinfos[0] = models.IUserinfo{"admin", "1234", "관리자", "스터디", true}
	userinfos[1] = models.IUserinfo{"test", "1234", "테스터", "스터디", false}

	return userinfos
}

func New() [2]models.IUserinfo {
	return initUsers()
}
