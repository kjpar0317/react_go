package models

type IUserinfo struct {
	Userid   string `json:"userid"`
	Password string `json:"password"`
	Username string `json:"username"`
	Group    string `json:"group"`
	Admin    bool   `json:"admin"`
	Email    string `json:"email"`
	HPhone    string `json:"hphone"`
}
