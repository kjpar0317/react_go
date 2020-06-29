package services

import (
	"../models"
)

var userinfos [] models.IUserinfo

func InitUsers() [] models.IUserinfo {
	userinfos = make([] models.IUserinfo, 2, 100)
	userinfos = append(userinfos, models.IUserinfo{Userid: "admin", Password: "1234", Username: "관리자", Group: "스터디", Admin: true, Email: "kjpar_kr@yahoo.co.kr", HPhone: "000-1111-2222"})
	userinfos = append(userinfos, models.IUserinfo{Userid: "test", Password: "1234", Username: "테스터", Group: "스터디", Email: "a@a.com", HPhone: "010-2222-3333"})

	return userinfos
}

func SelectUser(userid string) models.IUserinfo {
	for _, userinfo := range userinfos {
		if userinfo.Userid == userid {
			return userinfo
		}
	}
	return models.IUserinfo {}
}

func CreateUser(userinfo models.IUserinfo) bool {
	userinfos = append(userinfos, userinfo)

	return true
}

func DeleteUser(userid string) bool {
	for i, userinfo := range userinfos {
		if userinfo.Userid == userid {
			userinfos = append(userinfos[:i], userinfos[i+1:]...)
		}
	}
	return true
}
