package services

import (
	"backend/models"
)

var userinfos []models.IUserinfo

func InitUsers() []models.IUserinfo {
	// userinfos = [] models.IUserinfo {}
	userinfos = make([]models.IUserinfo, 0, 100)
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
	return models.IUserinfo{}
}

func CreateUser(userinfo models.IUserinfo) bool {
	// userid가 있는 경우 false
	if SelectUser(userinfo.Userid) == (models.IUserinfo{}) {
		userinfos = append(userinfos, userinfo)
		return true
	} else {
		return false
	}
}

func EditUser(userinfo models.IUserinfo) bool {
	for index, tmpuserinfo := range userinfos {
		if tmpuserinfo.Userid == userinfo.Userid {
			userinfos[index] = tmpuserinfo
		}
	}
	return true
}

func DeleteUser(userid string) bool {
	// userid가 있는 경우 false
	if SelectUser(userid) == (models.IUserinfo{}) {
		return false
	} else {
		for i, userinfo := range userinfos {
			if userinfo.Userid == userid {
				userinfos = append(userinfos[:i], userinfos[i+1:]...)
			}
		}
		return true
	}
}
